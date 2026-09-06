// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/dk.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagDk: FC<FlagCoreProps> = ({
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
    data-code="dk"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#c8102e" d="M0 0h640.1v480H0z"/>
  <path fill="#fff" d="M205.7 0h68.6v480h-68.6z"/>
  <path fill="#fff" d="M0 205.7h640.1v68.6H0z"/>
  </svg>
);

export default FlagDk;
