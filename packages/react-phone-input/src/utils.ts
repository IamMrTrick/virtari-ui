import type { CountryCode } from "@virtari-packages/react-flag";
import { loadLibPhone } from "./lazy-libphonenumber";
import { normalizeDigits } from "./digits";

/**
 * Parse any phone string and return its canonical E.164 form, or `null` when
 * the string is not a valid phone number for the given country. Async because
 * `libphonenumber-js` loads lazily.
 */
export async function toE164(
  value: string,
  country: CountryCode,
): Promise<string | null> {
  const lib = await loadLibPhone();
  try {
    const n = lib.parsePhoneNumberFromString(
      normalizeDigits(value),
      country.toUpperCase() as never,
    );
    return n?.isValid() ? (n.number as string) : null;
  } catch {
    return null;
  }
}

/**
 * Boolean validity check. Async; uses the lazy libphonenumber load.
 */
export async function isValidPhone(
  value: string,
  country?: CountryCode,
): Promise<boolean> {
  const lib = await loadLibPhone();
  try {
    if (!country) {
      return lib.isValidPhoneNumber(normalizeDigits(value));
    }
    return lib.isValidPhoneNumber(
      normalizeDigits(value),
      country.toUpperCase() as never,
    );
  } catch {
    return false;
  }
}
