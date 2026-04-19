// Hand-curated BCP-47 locale → ISO 3166 alpha-2 country code mapping.
// A language doesn't always have a single flag (English → US or GB?); the
// base-code entry picks a house default, documented per-line.

export const LOCALE_TO_FLAG: Readonly<Record<string, string | null>> = {
  // English
  en: "us",           // default for bare "en" — can be overridden per-consumer
  "en-US": "us",
  "en-GB": "gb",
  "en-AU": "au",
  "en-CA": "ca",
  "en-IE": "ie",
  "en-IN": "in",
  "en-NZ": "nz",
  "en-ZA": "za",

  // Persian / Dari / Tajik
  fa: "ir",
  "fa-IR": "ir",
  "fa-AF": "af",
  prs: "af",
  tg: "tj",

  // Arabic
  ar: "sa",
  "ar-AE": "ae",
  "ar-BH": "bh",
  "ar-DZ": "dz",
  "ar-EG": "eg",
  "ar-IQ": "iq",
  "ar-JO": "jo",
  "ar-KW": "kw",
  "ar-LB": "lb",
  "ar-LY": "ly",
  "ar-MA": "ma",
  "ar-OM": "om",
  "ar-PS": "ps",
  "ar-QA": "qa",
  "ar-SA": "sa",
  "ar-SY": "sy",
  "ar-TN": "tn",
  "ar-YE": "ye",

  // Spanish
  es: "es",
  "es-ES": "es",
  "es-AR": "ar",
  "es-CL": "cl",
  "es-CO": "co",
  "es-MX": "mx",
  "es-PE": "pe",

  // Portuguese
  pt: "pt",
  "pt-PT": "pt",
  "pt-BR": "br",

  // Chinese
  zh: "cn",
  "zh-Hans": "cn",
  "zh-Hant": "tw",
  "zh-CN": "cn",
  "zh-HK": "hk",
  "zh-TW": "tw",
  "zh-SG": "sg",

  // French
  fr: "fr",
  "fr-FR": "fr",
  "fr-BE": "be",
  "fr-CA": "ca",
  "fr-CH": "ch",

  // German
  de: "de",
  "de-DE": "de",
  "de-AT": "at",
  "de-CH": "ch",

  // Italian
  it: "it",
  "it-IT": "it",
  "it-CH": "ch",

  // Dutch / Flemish
  nl: "nl",
  "nl-NL": "nl",
  "nl-BE": "be",

  // Scandinavian
  sv: "se",
  no: "no",
  nb: "no",
  nn: "no",
  da: "dk",
  fi: "fi",
  is: "is",

  // East Asia
  ja: "jp",
  ko: "kr",
  "ko-KR": "kr",
  "ko-KP": "kp",
  vi: "vn",
  th: "th",
  km: "kh",
  lo: "la",
  my: "mm",
  id: "id",
  ms: "my",

  // South Asia
  hi: "in",
  bn: "bd",
  "bn-IN": "in",
  ta: "in",
  te: "in",
  kn: "in",
  ml: "in",
  mr: "in",
  gu: "in",
  pa: "in",
  or: "in",
  sd: "pk",
  ur: "pk",
  "ur-IN": "in",
  ne: "np",
  si: "lk",

  // Turkish / Central Asia
  tr: "tr",
  az: "az",
  uz: "uz",
  kk: "kz",
  ky: "kg",
  tk: "tm",

  // Eastern Europe / Slavic
  ru: "ru",
  uk: "ua",
  be: "by",
  pl: "pl",
  cs: "cz",
  sk: "sk",
  hu: "hu",
  ro: "ro",
  "ro-MD": "md",
  bg: "bg",
  sr: "rs",
  hr: "hr",
  sl: "si",
  mk: "mk",
  sq: "al",
  bs: "ba",
  mt: "mt",

  // Baltic
  lt: "lt",
  lv: "lv",
  et: "ee",

  // Greek
  el: "gr",

  // Semitic / Middle East
  he: "il",
  ps: "af",
  ku: null,       // Kurdish — no single country flag
  ckb: "iq",
  am: "et",
  ti: "er",
  om: "et",
  so: "so",
  sw: "ke",

  // Africa
  af: "za",
  zu: "za",
  xh: "za",
  ha: "ng",
  yo: "ng",
  ig: "ng",
  rw: "rw",
  mg: "mg",

  // Americas / indigenous
  qu: "pe",
  gn: "py",
  ay: "bo",

  // Celtic / UK sub-regions
  cy: "gb-wls",
  ga: "ie",
  gd: "gb-sct",

  // Other
  eu: "es-pv",
  ca: "es-ct",
  gl: "es-ga",
  eo: null,       // Esperanto — no flag
  la: null,       // Latin — no flag
  ia: null,       // Interlingua — no flag
};

export type SupportedLocale = keyof typeof LOCALE_TO_FLAG;
