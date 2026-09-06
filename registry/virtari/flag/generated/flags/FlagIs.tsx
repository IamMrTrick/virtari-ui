// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/is.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagIs: FC<FlagCoreProps> = ({
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
    data-code="is"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="is-a">
      <path fillOpacity=".7" d="M0 0h640v480H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="0" clipPath="url(#is-a)">
    <path fill="#003897" d="M0 0h666.7v480H0z"/>
    <path fill="#fff" d="M0 186.7h186.7V0h106.6v186.7h373.4v106.6H293.3V480H186.7V293.3H0z"/>
    <path fill="#d72828" d="M0 213.3h213.3V0h53.4v213.3h400v53.4h-400V480h-53.4V266.7H0z"/>
  </g>
  </svg>
);

export default FlagIs;
