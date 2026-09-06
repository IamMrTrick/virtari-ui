// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ax.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagAx: FC<FlagCoreProps> = ({
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
    data-code="ax"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="ax-a">
      <path fillOpacity=".7" d="M106.3 0h1133.3v850H106.3z"/>
    </clipPath>
  </defs>
  <g clipPath="url(#ax-a)" transform="matrix(.56472 0 0 .56482 -60 -.1)">
    <path fill="#0053a5" d="M0 0h1300v850H0z"/>
    <g fill="#ffce00">
      <path d="M400 0h250v850H400z"/>
      <path d="M0 300h1300v250H0z"/>
    </g>
    <g fill="#d21034">
      <path d="M475 0h100v850H475z"/>
      <path d="M0 375h1300v100H0z"/>
    </g>
  </g>
  </svg>
);

export default FlagAx;
