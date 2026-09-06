// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/kw.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagKw: FC<FlagCoreProps> = ({
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
    data-code="kw"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="kw-a">
      <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#kw-a)" transform="scale(.9375)">
    <path fill="#fff" d="M0 170.6h1024v170.7H0z"/>
    <path fill="#f31830" d="M0 341.3h1024V512H0z"/>
    <path fill="#00d941" d="M0 0h1024v170.7H0z"/>
    <path fill="#000001" d="M0 0v512l255.4-170.7.6-170.8z"/>
  </g>
  </svg>
);

export default FlagKw;
