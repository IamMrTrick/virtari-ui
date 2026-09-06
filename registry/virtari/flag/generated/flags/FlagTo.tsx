// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/to.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagTo: FC<FlagCoreProps> = ({
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
    data-code="to"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd" strokeWidth="1pt">
    <path fill="#c10000" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 0h250v200.3H0z"/>
    <g fill="#c10000">
      <path d="M102.8 31.2h39.9v139.6h-39.8z"/>
      <path d="M192.6 81v40H53V81z"/>
    </g>
  </g>
  </svg>
);

export default FlagTo;
