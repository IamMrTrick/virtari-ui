// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/pw.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagPw: FC<FlagCoreProps> = ({
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
    data-code="pw"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="pw-a">
      <path fillOpacity=".7" d="M-70.3 0h640v480h-640z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#pw-a)" transform="translate(70.3)">
    <path fill="#4aadd6" d="M-173.4 0h846.3v480h-846.3z"/>
    <path fill="#ffde00" d="M335.6 232.1a135.9 130.1 0 1 1-271.7 0 135.9 130.1 0 1 1 271.7 0"/>
  </g>
  </svg>
);

export default FlagPw;
