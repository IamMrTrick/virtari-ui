// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/nr.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagNr: FC<FlagCoreProps> = ({
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
    data-code="nr"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="nr-a">
      <path fillOpacity=".7" d="M-54.7 0H628v512H-54.7z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#nr-a)" transform="translate(51.3)scale(.9375)">
    <path fill="#002170" d="M-140 0H884v512H-140z"/>
    <path fill="#ffb20d" d="M-140 234.1H884V278H-140z"/>
    <path fill="#fff" d="m161.8 438-33-33-10.5 45.4-12-45-31.9 34 12.1-45L42 407.9l33-33-45.4-10.6 45-12-34-31.8 45 12L72 288l33 33 10.6-45.4 12 45 31.8-34-12 45 44.5-13.5-33 33 45.4 10.5-45 12 34 32-45-12.2z"/>
  </g>
  </svg>
);

export default FlagNr;
