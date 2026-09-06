// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/mu.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagMu: FC<FlagCoreProps> = ({
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
    data-code="mu"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#00a04d" d="M0 360h640v120H0z"/>
    <path fill="#151f6d" d="M0 120h640v120H0z"/>
    <path fill="#ee2737" d="M0 0h640v120H0z"/>
    <path fill="#ffcd00" d="M0 240h640v120H0z"/>
  </g>
  </svg>
);

export default FlagMu;
