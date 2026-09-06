// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gb-eng.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGbEng: FC<FlagCoreProps> = ({
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
    data-code="gb-eng"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" d="M0 0h640v480H0z"/>
  <path fill="#ce1124" d="M281.6 0h76.8v480h-76.8z"/>
  <path fill="#ce1124" d="M0 201.6h640v76.8H0z"/>
  </svg>
);

export default FlagGbEng;
