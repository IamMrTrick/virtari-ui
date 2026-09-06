import {
  GregorianCalendar,
  PersianCalendar,
  IslamicUmalquraCalendar,
  IslamicCivilCalendar,
  IslamicTabularCalendar,
  BuddhistCalendar,
  JapaneseCalendar,
  HebrewCalendar,
  IndianCalendar,
  EthiopicCalendar,
  EthiopicAmeteAlemCalendar,
  TaiwanCalendar,
  type Calendar,
  type DateValue,
} from "@internationalized/date";

export type { DateValue };

export type CalendarSystem =
  | "gregory"
  | "persian"
  | "islamic-umalqura"
  | "islamic-civil"
  | "islamic-tbla"
  | "buddhist"
  | "japanese"
  | "hebrew"
  | "indian"
  | "ethiopic"
  | "ethioaa"
  | "roc";

/** Factory mapping calendar identifier → Calendar instance. */
export function createCalendar(identifier: string): Calendar {
  switch (identifier) {
    case "persian":
      return new PersianCalendar();
    case "islamic-umalqura":
      return new IslamicUmalquraCalendar();
    case "islamic-civil":
      return new IslamicCivilCalendar();
    case "islamic-tbla":
      return new IslamicTabularCalendar();
    case "buddhist":
      return new BuddhistCalendar();
    case "japanese":
      return new JapaneseCalendar();
    case "hebrew":
      return new HebrewCalendar();
    case "indian":
      return new IndianCalendar();
    case "ethiopic":
      return new EthiopicCalendar();
    case "ethioaa":
      return new EthiopicAmeteAlemCalendar();
    case "roc":
      return new TaiwanCalendar();
    case "gregory":
    default:
      return new GregorianCalendar();
  }
}

/** Resolve the locale string when a calendar system override is provided. */
export function resolveLocale(locale: string, calendar?: CalendarSystem): string {
  if (!calendar || calendar === "gregory") return locale;
  return locale.includes("-u-")
    ? locale
    : `${locale}-u-ca-${calendar}`;
}
