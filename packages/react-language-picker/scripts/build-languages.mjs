#!/usr/bin/env node
// Generate a typed language dataset from iso-639-1 + @cospired/i18n-iso-languages,
// joined with the hand-curated LOCALE_TO_FLAG map.
// Run via `pnpm codegen`.

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const require = createRequire(import.meta.url);

function requireFromPackage(mod) {
  const candidates = [
    resolve(root, "node_modules", mod),
    resolve(root, "../..", "node_modules", mod),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  return mod;
}

async function main() {
  const iso6391 = require(requireFromPackage("iso-639-1"));
  // @cospired/i18n-iso-languages — translation dictionaries
  const langs = require(requireFromPackage("@cospired/i18n-iso-languages"));
  for (const ui of ["en", "fa", "ar"]) {
    try {
      langs.registerLocale(require(requireFromPackage(`@cospired/i18n-iso-languages/langs/${ui}.json`)));
    } catch {
      /* optional — fallback to English name */
    }
  }

  // Parse local TS file for the flag map (can't import TS directly in Node).
  const flagMapSrc = await readFile(resolve(root, "src/data/localeToFlag.ts"), "utf8");
  const flagMap = parseFlagMap(flagMapSrc);

  const baseCodes = iso6391.getAllCodes ? iso6391.getAllCodes() : iso6391.default.getAllCodes();
  const iso = iso6391.default ?? iso6391;

  const baseEntries = baseCodes.map((code) => ({
    locale: code,
    native: iso.getNativeName(code) || iso.getName(code) || code,
    english: iso.getName(code) || code,
  }));

  // Regional / script variants come from the flag map — they extend the base list.
  const regionalLocales = Object.keys(flagMap).filter((k) => k.includes("-"));
  for (const locale of regionalLocales) {
    const base = locale.split("-")[0];
    const baseEntry = baseEntries.find((e) => e.locale === base);
    if (!baseEntry) continue;
    baseEntries.push({
      locale,
      native: baseEntry.native,
      english: baseEntry.english,
    });
  }

  // Translated display names (keyed by consumer-ui locale).
  const entries = baseEntries.map((e) => {
    const flag = flagMap[e.locale] ?? flagMap[e.locale.split("-")[0]] ?? null;
    const base = e.locale.split("-")[0];
    const names = {
      en: safeTranslate(langs, base, "en") || e.english,
      fa: safeTranslate(langs, base, "fa") || e.native,
      ar: safeTranslate(langs, base, "ar") || e.native,
    };
    return {
      locale: e.locale,
      native: e.native,
      english: e.english,
      flag,
      names,
    };
  });

  // Deduplicate & sort by English name.
  const seen = new Set();
  const deduped = entries.filter((e) => {
    if (seen.has(e.locale)) return false;
    seen.add(e.locale);
    return true;
  });
  deduped.sort((a, b) => a.english.localeCompare(b.english));

  await rm(resolve(root, "src/generated"), { recursive: true, force: true });
  await mkdir(resolve(root, "src/generated"), { recursive: true });

  const out = `// AUTO-GENERATED. DO NOT EDIT.
import type { CountryCode } from "@virtari/react-flag";

export interface LanguageEntry {
  locale: string;
  native: string;
  english: string;
  flag: CountryCode | null;
  names: { en: string; fa: string; ar: string };
}

export const languages: readonly LanguageEntry[] = ${JSON.stringify(deduped, null, 2)} as const;

export const languagesByLocale: Readonly<Record<string, LanguageEntry>> = (() => {
  const map: Record<string, LanguageEntry> = {};
  for (const l of languages) map[l.locale] = l;
  return map;
})();
`;

  await writeFile(join(root, "src/generated/languages.ts"), out, "utf8");

  console.log(`[react-language-picker] generated ${deduped.length} languages -> src/generated/languages.ts`);
}

function parseFlagMap(src) {
  // Tiny parser for entries like `"en-US": "us",` or `fa: "ir",` or `ku: null,`.
  const body = src.slice(src.indexOf("{") + 1, src.lastIndexOf("}"));
  const map = {};
  const re = /["']?([a-zA-Z][a-zA-Z0-9-]*)["']?\s*:\s*(?:"([a-zA-Z0-9-]+)"|null)/g;
  let m;
  while ((m = re.exec(body))) {
    const [, key, value] = m;
    if (!key) continue;
    map[key] = value ?? null;
  }
  return map;
}

function safeTranslate(langs, base, ui) {
  try {
    return langs.getName(base, ui);
  } catch {
    return null;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
