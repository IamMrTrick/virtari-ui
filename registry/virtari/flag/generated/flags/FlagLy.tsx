// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ly.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagLy: FC<FlagCoreProps> = ({
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
    data-code="ly"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="ly-a">
      <path d="M166.7-20h666.6v500H166.7z"/>
    </clipPath>
  </defs>
  <g clipPath="url(#ly-a)" transform="matrix(.96 0 0 .96 -160 19.2)">
    <path fill="#239e46" d="M0-20h1000v500H0z"/>
    <path fill="#000001" d="M0-20h1000v375H0z"/>
    <path fill="#e70013" d="M0-20h1000v125H0z"/>
    <path fill="#fff" d="M544.2 185.8a54.3 54.3 0 1 0 0 88.4 62.5 62.5 0 1 1 0-88.4M530.4 230l84.1-27.3-52 71.5v-88.4l52 71.5z"/>
  </g>
  </svg>
);

export default FlagLy;
