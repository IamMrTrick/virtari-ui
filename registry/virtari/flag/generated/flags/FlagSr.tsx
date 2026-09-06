// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/sr.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagSr: FC<FlagCoreProps> = ({
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
    data-code="sr"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#377e3f" d="M.1 0h640v480H.1z"/>
  <path fill="#fff" d="M.1 96h640v288H.1z"/>
  <path fill="#b40a2d" d="M.1 144h640v192H.1z"/>
  <path fill="#ecc81d" d="m320 153.2 56.4 173.6-147.7-107.3h182.6L263.6 326.8z"/>
  </svg>
);

export default FlagSr;
