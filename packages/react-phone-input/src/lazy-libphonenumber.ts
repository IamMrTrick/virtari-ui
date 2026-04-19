// Lazy wrapper around libphonenumber-js/min. The full module is ~75KB gz; we
// defer loading it until the first time the consumer actually interacts with
// a PhoneInput so the initial route stays light.
//
// The loaded module is memoized at the module scope, so subsequent calls are
// synchronous after the first resolve.

import type * as LibPhone from "libphonenumber-js/min";

let cached: typeof LibPhone | null = null;
let inflight: Promise<typeof LibPhone> | null = null;

export function getLibPhone(): typeof LibPhone | null {
  return cached;
}

export function loadLibPhone(): Promise<typeof LibPhone> {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = import("libphonenumber-js/min").then((mod) => {
    cached = mod;
    inflight = null;
    return mod;
  });
  return inflight;
}
