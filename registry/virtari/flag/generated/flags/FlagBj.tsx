// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/bj.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagBj: FC<FlagCoreProps> = ({
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
    data-code="bj"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="bj-a">
      <path fill="gray" d="M67.6-154h666v666h-666z"/>
    </clipPath>
  </defs>
  <g clipPath="url(#bj-a)" transform="matrix(.961 0 0 .7207 -65 111)">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#319400" d="M0-154h333v666H0z"/>
      <path fill="#ffd600" d="M333-154h666v333H333z"/>
      <path fill="#de2110" d="M333 179h666v333H333z"/>
    </g>
  </g>
  </svg>
);

export default FlagBj;
