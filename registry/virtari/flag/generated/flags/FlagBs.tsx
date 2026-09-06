// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/bs.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagBs: FC<FlagCoreProps> = ({
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
    data-code="bs"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="bs-a">
      <path fillOpacity=".7" d="M-12 0h640v480H-12z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#bs-a)" transform="translate(12)">
    <path fill="#fff" d="M968.5 480h-979V1.8h979z"/>
    <path fill="#ffe900" d="M968.5 344.5h-979V143.3h979z"/>
    <path fill="#08ced6" d="M968.5 480h-979V320.6h979zm0-318.7h-979V2h979z"/>
    <path fill="#000001" d="M-11 0c2.3 0 391.8 236.8 391.8 236.8L-12 479.2z"/>
  </g>
  </svg>
);

export default FlagBs;
