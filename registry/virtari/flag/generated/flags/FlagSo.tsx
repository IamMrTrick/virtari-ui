// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/so.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagSo: FC<FlagCoreProps> = ({
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
    data-code="so"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="so-a">
      <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#so-a)" transform="translate(80)scale(.9375)">
    <path fill="#40a6ff" d="M-128 0h768v512h-768z"/>
    <path fill="#fff" d="M336.5 381.2 254 327.7l-82.1 54 30.5-87.7-82-54.2L222 239l31.4-87.5 32.1 87.3 101.4.1-81.5 54.7z"/>
  </g>
  </svg>
);

export default FlagSo;
