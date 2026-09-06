// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/es-ct.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagEsCt: FC<FlagCoreProps> = ({
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
    data-code="es-ct"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fcdd09" d="M0 0h640v480H0z"/>
  <path stroke="#da121a" strokeWidth="60" d="M0 90h810m0 120H0m0 120h810m0 120H0" transform="scale(.79012 .88889)"/>
  </svg>
);

export default FlagEsCt;
