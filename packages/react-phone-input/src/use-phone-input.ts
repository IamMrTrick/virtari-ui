import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CountryCode } from "@virtari-packages/react-flag";
import { countries, countriesByCode, type CountryEntry } from "./generated/countries";
import { normalizeDigits } from "./digits";
import { getLibPhone, loadLibPhone } from "./lazy-libphonenumber";

export interface PhoneInputValue {
  /** ISO 3166-1 alpha-2 of the currently-selected country. */
  country: CountryCode;
  /** National number, formatted-as-you-type for display. */
  national: string;
  /** Canonical E.164 string. `null` until the current input parses as valid. */
  e164: string | null;
  /** True when the current value is a valid, complete phone number. */
  isValid: boolean;
}

export interface UsePhoneInputProps {
  value?: string;
  defaultValue?: string;
  defaultCountry?: CountryCode;
  onChange?: (next: PhoneInputValue) => void;
  onValidityChange?: (isValid: boolean) => void;
  /** Auto-convert ۰۱۲۳… / ٠١٢٣… to ASCII before parsing. Default `true`. */
  normalize?: boolean;
}

function detectCountry(): CountryCode {
  if (typeof navigator === "undefined") return "us" as CountryCode;
  const lang = navigator.language || "en-US";
  const match = lang.match(/[-_]([a-zA-Z]{2})/);
  const code = (match?.[1] ?? "").toLowerCase();
  if (code && code in countriesByCode) return code as CountryCode;
  return "us" as CountryCode;
}

function stripDialPrefix(input: string, dialCode: string): string {
  const digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith(dialCode)) return digits.slice(dialCode.length);
  if (digits.startsWith("+" + dialCode.replace(/^\+/, ""))) {
    return digits.slice(dialCode.length);
  }
  return digits.replace(/^\+/, "");
}

export function usePhoneInput({
  value,
  defaultValue,
  defaultCountry,
  onChange,
  onValidityChange,
  normalize = true,
}: UsePhoneInputProps) {
  const isControlled = value !== undefined;

  const [internalCountry, setInternalCountry] = useState<CountryCode>(
    defaultCountry ?? detectCountry(),
  );
  const [internalRaw, setInternalRaw] = useState<string>(defaultValue ?? "");
  // Re-render bump after lazy lib loads so AsYouType formatting kicks in.
  const [libReady, setLibReady] = useState<boolean>(!!getLibPhone());

  useEffect(() => {
    if (libReady) return;
    let mounted = true;
    loadLibPhone().then(() => {
      if (mounted) setLibReady(true);
    });
    return () => {
      mounted = false;
    };
  }, [libReady]);

  const currentRaw = isControlled ? (value ?? "") : internalRaw;

  // When a controlled value arrives as E.164, infer country from it so the
  // picker stays in sync without the consumer threading two props.
  const inferredCountry: CountryCode = useMemo(() => {
    if (!isControlled) return internalCountry;
    const lib = getLibPhone();
    if (!lib) return internalCountry;
    try {
      const parsed = lib.parsePhoneNumberFromString(currentRaw);
      if (parsed?.country) return parsed.country.toLowerCase() as CountryCode;
    } catch {
      /* ignore */
    }
    return internalCountry;
  }, [currentRaw, isControlled, internalCountry]);

  const country: CountryCode = isControlled ? inferredCountry : internalCountry;
  const countryEntry: CountryEntry =
    countriesByCode[country] ?? (countriesByCode.us as CountryEntry);

  const formatted: PhoneInputValue = useMemo(() => {
    const lib = getLibPhone();
    const normalized = normalize ? normalizeDigits(currentRaw) : currentRaw;
    if (!lib) {
      return {
        country,
        national: normalized,
        e164: null,
        isValid: false,
      };
    }
    try {
      const ayt = new lib.AsYouType(country.toUpperCase() as never);
      const national = ayt.input(normalized);
      const number = ayt.getNumber();
      const isValid = number?.isValid() ?? false;
      return {
        country,
        national,
        e164: isValid ? (number!.number as string) : null,
        isValid,
      };
    } catch {
      return { country, national: normalized, e164: null, isValid: false };
    }
  }, [currentRaw, country, normalize]);

  const prevValidity = useRef<boolean>(formatted.isValid);
  useEffect(() => {
    if (prevValidity.current !== formatted.isValid) {
      prevValidity.current = formatted.isValid;
      onValidityChange?.(formatted.isValid);
    }
  }, [formatted.isValid, onValidityChange]);

  const setNationalFromUser = useCallback(
    (raw: string) => {
      const normalized = normalize ? normalizeDigits(raw) : raw;
      if (!isControlled) setInternalRaw(normalized);
      const lib = getLibPhone();
      const next: PhoneInputValue = (() => {
        if (!lib) return { country, national: normalized, e164: null, isValid: false };
        const ayt = new lib.AsYouType(country.toUpperCase() as never);
        const national = ayt.input(normalized);
        const number = ayt.getNumber();
        const isValid = number?.isValid() ?? false;
        return {
          country,
          national,
          e164: isValid ? (number!.number as string) : null,
          isValid,
        };
      })();
      onChange?.(next);
    },
    [country, isControlled, normalize, onChange],
  );

  const setCountry = useCallback(
    (nextCountry: CountryCode) => {
      setInternalCountry(nextCountry);
      const entry = countriesByCode[nextCountry];
      const stripped = stripDialPrefix(currentRaw, entry?.dialCode ?? "+");
      if (!isControlled) setInternalRaw(stripped);
      const lib = getLibPhone();
      if (lib) {
        const ayt = new lib.AsYouType(nextCountry.toUpperCase() as never);
        const national = ayt.input(normalize ? normalizeDigits(stripped) : stripped);
        const number = ayt.getNumber();
        const isValid = number?.isValid() ?? false;
        onChange?.({
          country: nextCountry,
          national,
          e164: isValid ? (number!.number as string) : null,
          isValid,
        });
      } else {
        onChange?.({
          country: nextCountry,
          national: stripped,
          e164: null,
          isValid: false,
        });
      }
    },
    [currentRaw, isControlled, normalize, onChange],
  );

  return {
    country,
    countryEntry,
    value: formatted,
    allCountries: countries,
    setCountry,
    setNational: setNationalFromUser,
  } as const;
}
