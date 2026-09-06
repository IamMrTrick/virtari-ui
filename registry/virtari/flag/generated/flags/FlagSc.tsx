// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/sc.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagSc: FC<FlagCoreProps> = ({
  size,
  rounded = true,
  title,
  className,
  style,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={cn("vds-flag", className)}
    data-size={typeof size === "string" ? size : undefined}
    data-rounded={rounded === false ? undefined : rounded === "full" ? "full" : ""}
    data-code="sc"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" d="M0 0h640v480H0Z"/>
  <path fill="#d92223" d="M0 480V0h640v160z"/>
  <path fill="#fcd955" d="M0 480V0h426.7z"/>
  <path fill="#003d88" d="M0 480V0h213.3z"/>
  <path fill="#007a39" d="m0 480 640-160v160z"/>
  </svg>
);

export default FlagSc;
