import { cn } from "../../lib/utils";
import {
  Suspense,
  lazy,
  useMemo,
  type CSSProperties,
  type ComponentType,
  type SVGProps,
} from "react";
import { flagManifest } from "./generated/manifest";
import type { CountryCode } from "./generated/codes";

export type FlagSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;

/**
 * Props accepted by every generated `FlagXx` component (and by `<Flag code>`).
 * We intentionally omit the `ref` handling here — flags are render-only SVGs;
 * consumers who need a ref can drop down to the named import.
 */
export interface FlagCoreProps extends Omit<SVGProps<SVGSVGElement>, "title"> {
  /** Size preset — shares ramp with Input/Button/etc. Pass a number for a raw inline-size. */
  size?: FlagSize;
  /** `true` → subtle 2px corner · `"full"` → circular · `false` → hard corners. Default `true`. */
  rounded?: boolean | "full";
  /** Renders an accessible `<title>` inside the SVG. Without it, the flag is aria-hidden. */
  title?: string;
}

export interface FlagProps extends FlagCoreProps {
  /** ISO 3166-1 alpha-2 code (plus supported sub-regions like `gb-eng`). */
  code: CountryCode;
  /** Optional fallback node while the flag chunk is loading. Defaults to an invisible placeholder of the same aspect ratio. */
  fallback?: React.ReactNode;
}

const cache = new Map<CountryCode, ComponentType<FlagCoreProps>>();

function getComponent(code: CountryCode): ComponentType<FlagCoreProps> {
  const hit = cache.get(code);
  if (hit) return hit;
  const loader = flagManifest[code];
  const Lazy = lazy(loader);
  cache.set(code, Lazy);
  return Lazy;
}

/**
 * Dynamic flag component. Lazy-loads the per-country SVG chunk via the generated
 * manifest, so only flags actually rendered end up in the bundle.
 *
 * For maximum tree-shaking in routes where the flag is known at build time,
 * prefer the named import (e.g. `import { FlagIr } from "."`).
 */
export function Flag({ code, fallback, style, ...rest }: FlagProps) {
  const Component = useMemo(() => getComponent(code), [code]);
  const placeholderStyle: CSSProperties = {
    display: "inline-block",
    aspectRatio: "4 / 3",
    ...style,
  };
  return (
    <Suspense fallback={fallback ?? <span aria-hidden className={cn("vds-flag-placeholder")} style={placeholderStyle} />}>
      <Component style={style} {...rest} />
    </Suspense>
  );
}
