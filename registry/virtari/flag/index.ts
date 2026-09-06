import "./Flag.css";
export { Flag } from "./Flag";
export type { FlagProps, FlagCoreProps, FlagSize } from "./Flag";

export { countryCodes, hasFlag } from "./generated/codes";
export type { CountryCode } from "./generated/codes";

export { flagManifest } from "./generated/manifest";

// Tree-shakable named flag components: FlagAd, FlagAe, … FlagGbEng, …
export * from "./generated";
