import fs from 'node:fs';
import crypto from 'node:crypto';

export const COLLECTIONS = ['packages', 'sections', 'tokens', 'utilities', 'examples', 'sources'];
export const LIMITS = { records: 50, sourceLength: 32000 };

export class LookupError extends Error {}

export function loadKnowledge(dataDirectory) {
  const catalog = JSON.parse(fs.readFileSync(new URL('catalog.json', dataDirectory), 'utf8'));
  const sources = JSON.parse(fs.readFileSync(new URL('sources.json', dataDirectory), 'utf8'));
  if (catalog.schemaVersion !== 1) throw new Error('Unsupported Virtari catalog schema; rebuild the MCP snapshot.');
  const indexes = new Map();
  for (const collection of COLLECTIONS) {
    if (!Array.isArray(catalog[collection])) throw new Error(`Missing collection: ${collection}`);
    const index = new Map();
    for (const record of catalog[collection]) {
      if (typeof record.id !== 'string' || index.has(record.id)) throw new Error(`Invalid or duplicate ID in ${collection}`);
      index.set(record.id, record);
    }
    indexes.set(collection, index);
  }
  for (const record of catalog.sources) {
    if (!Object.hasOwn(sources, record.id) || typeof sources[record.id] !== 'string') throw new Error(`Missing source snapshot: ${record.id}`);
    const text = sources[record.id];
    if (Buffer.byteLength(text) !== record.bytes || crypto.createHash('sha256').update(text).digest('hex') !== record.sha256) {
      throw new Error(`Source snapshot integrity mismatch: ${record.id}`);
    }
  }
  return { catalog, sources, indexes };
}

export function getRecord(knowledge, collection, id) {
  const index = knowledge.indexes.get(collection);
  if (!index) throw new LookupError(`Unknown collection: ${collection}`);
  const record = index.get(id);
  if (!record) throw new LookupError(`Unknown ${collection} ID: ${id}. Use list_records to discover exact IDs.`);
  return record;
}

const uri = (collection, id) => `virtari://record/${collection}/${encodeURIComponent(id)}`;
function summarize(collection, record) {
  const keys = {
    packages: ['id', 'name', 'version', 'category', 'description', 'skill'],
    sections: ['id', 'name', 'description', 'skill'],
    tokens: ['id', 'name', 'value', 'selector', 'conditions', 'category', 'sourceId', 'line'],
    utilities: ['id', 'className', 'category', 'declarations', 'breakpoint', 'condition', 'sourceId'],
    examples: ['id', 'title', 'page', 'packageIds', 'sourceId', 'startLine', 'endLine'],
    sources: ['id', 'sha256', 'bytes', 'kind'],
  }[collection];
  return { ...Object.fromEntries(keys.filter(key => Object.hasOwn(record, key)).map(key => [key, record[key]])), uri: uri(collection, record.id) };
}

export function listRecords(knowledge, { collection, query, category, packageId, offset = 0, limit = 20 }) {
  let records = [...knowledge.indexes.get(collection)?.values() ?? []];
  if (!knowledge.indexes.has(collection)) throw new LookupError(`Unknown collection: ${collection}`);
  if (packageId) {
    const pkg = getRecord(knowledge, 'packages', packageId);
    const packageSources = new Set(pkg.sourceIds);
    records = records.filter(record => collection === 'packages' ? record.id === packageId
      : collection === 'sources' ? packageSources.has(record.id)
        : collection === 'examples' ? record.packageIds.includes(packageId)
          : collection === 'sections' ? record.sourcePaths.some(source => pkg.sourceIds.some(id => id === source || id.startsWith(source + '/')))
            : packageSources.has(record.sourceId));
  }
  if (category) records = records.filter(record => record.category === category);
  if (query?.trim()) {
    const terms = query.toLowerCase().trim().split(/\s+/u);
    records = records.filter(record => {
      // Search reference metadata, never send every example body just to discover a match.
      const { code, imports, ...metadata } = record;
      const haystack = JSON.stringify(metadata).toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }
  const items = records.slice(offset, offset + limit).map(record => summarize(collection, record));
  const nextOffset = offset + items.length < records.length ? offset + items.length : null;
  return { collection, total: records.length, offset, limit, nextOffset, items };
}

export function readSource(knowledge, { id, offset = 0, length = 12000 }) {
  const record = getRecord(knowledge, 'sources', id);
  const source = knowledge.sources[record.id];
  const text = source.slice(offset, offset + length);
  return { id, sha256: record.sha256, units: 'UTF-16 code units; LF-normalized text', total: source.length, offset, length: text.length, nextOffset: offset + text.length < source.length ? offset + text.length : null, text };
}

export function catalogSummary(knowledge) {
  return {
    schemaVersion: knowledge.catalog.schemaVersion,
    collections: Object.fromEntries(COLLECTIONS.map(collection => [collection, knowledge.catalog[collection].length])),
    categories: Object.fromEntries(['packages', 'tokens', 'utilities'].map(collection => [collection, [...new Set(knowledge.catalog[collection].map(record => record.category))].sort()])),
    limits: LIMITS,
    workflow: 'Search with list_records, read exact metadata with get_record, then read_source for implementation context. Follow nextOffset until null. Extracted examples may require page helpers. All IDs are catalog IDs, never arbitrary filesystem paths.',
    resourceTemplates: { record: 'virtari://record/{collection}/{id}', source: 'virtari://source/{id}/{offset}/{length}' },
    uriEncoding: 'Encode each ID with encodeURIComponent when inserting it into a resource URI.',
  };
}
