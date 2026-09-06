// Normalize Persian (۰-۹) and Arabic-Indic (٠-٩) digits to ASCII 0-9.
// Matches WhatsApp / Telegram / iOS phone-field UX — users type in their
// native numerals, but the value parses as a Western-digit phone number.

const PERSIAN_ZERO = 0x06f0; // ۰
const ARABIC_ZERO = 0x0660; // ٠

export function normalizeDigits(input: string): string {
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const code = input.charCodeAt(i);
    if (code >= PERSIAN_ZERO && code <= PERSIAN_ZERO + 9) {
      out += String.fromCharCode(0x30 + (code - PERSIAN_ZERO));
    } else if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
      out += String.fromCharCode(0x30 + (code - ARABIC_ZERO));
    } else {
      out += input[i];
    }
  }
  return out;
}
