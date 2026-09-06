// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/bv.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagBv: FC<FlagCoreProps> = ({
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
    data-code="bv"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="bv-a">
      <path fillOpacity=".7" d="M0 0h640v480H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#bv-a)">
    <path fill="#fff" d="M-28 0h699.7v512H-28z"/>
    <path fill="#d72828" d="M-53-77.8h218.7v276.2H-53zM289.4-.6h381v199h-381zM-27.6 320h190.4v190.3H-27.6zm319.6 2.1h378.3v188.2H292z"/>
    <path fill="#003897" d="M196.7-25.4H261v535.7h-64.5z"/>
    <path fill="#003897" d="M-27.6 224.8h698v63.5h-698z"/>
  </g>
  </svg>
);

export default FlagBv;
