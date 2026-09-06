// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ps.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagPs: FC<FlagCoreProps> = ({
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
    data-code="ps"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#009639" d="M0 0h640v480H0z"/>
  <path fill="#fff" d="M0 0h640v320H0z"/>
  <path d="M0 0h640v160H0z"/>
  <path fill="#ed2e38" d="m0 0 320 240L0 480Z"/>
  </svg>
);

export default FlagPs;
