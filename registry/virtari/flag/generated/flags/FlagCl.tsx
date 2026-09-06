// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cl.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCl: FC<FlagCoreProps> = ({
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
    data-code="cl"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="cl-a">
      <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#cl-a)" transform="scale(.9375)">
    <path fill="#fff" d="M256 0h512v256H256z"/>
    <path fill="#0039a6" d="M0 0h256v256H0z"/>
    <path fill="#fff" d="M167.8 191.7 128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4z"/>
    <path fill="#d52b1e" d="M0 256h768v256H0z"/>
  </g>
  </svg>
);

export default FlagCl;
