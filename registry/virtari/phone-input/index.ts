import "./PhoneInput.css";
export { PhoneInput } from "./PhoneInput";
export type { PhoneInputProps, PhoneInputValue, PhoneInputSize } from "./PhoneInput";

export { PhoneInputCountrySelect } from "./PhoneInputCountrySelect";
export type { PhoneInputCountrySelectProps } from "./PhoneInputCountrySelect";

export { usePhoneInput } from "./use-phone-input";
export type { UsePhoneInputProps } from "./use-phone-input";

export { normalizeDigits } from "./digits";
export { toE164, isValidPhone } from "./utils";

export {
  countries,
  countriesByCode,
  dialCodeToCountries,
} from "./generated/countries";
export type { CountryEntry } from "./generated/countries";
