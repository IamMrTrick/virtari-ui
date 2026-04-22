import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enNav from "./locales/en/nav.json";
import enPageMeta from "./locales/en/pageMeta.json";
import enIntroduction from "./locales/en/introduction.json";

import faCommon from "./locales/fa/common.json";
import faNav from "./locales/fa/nav.json";
import faPageMeta from "./locales/fa/pageMeta.json";
import faIntroduction from "./locales/fa/introduction.json";

export const SUPPORTED_LOCALES = ["en", "fa"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    pageMeta: enPageMeta,
    introduction: enIntroduction,
  },
  fa: {
    common: faCommon,
    nav: faNav,
    pageMeta: faPageMeta,
    introduction: faIntroduction,
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  ns: ["common", "nav", "pageMeta", "introduction"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
