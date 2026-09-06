// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/lr.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagLr: FC<FlagCoreProps> = ({
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
    data-code="lr"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="lr-a">
      <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#lr-a)" transform="scale(.9375)">
    <path fill="#fff" d="M0 0h767.9v512H0z"/>
    <path fill="#006" d="M0 0h232.7v232.8H0z"/>
    <path fill="#c00" d="M0 464.9h767.9V512H0z"/>
    <path fill="#c00" d="M0 465.4h767.9V512H0zm0-92.9h767.9v46.2H0zm0-93.2h766V326H0zM232.7 0h535.1v46.5H232.7zm0 186h535.1v46.8H232.7zm0-92.7h535.1v46.5H232.7z"/>
    <path fill="#fff" d="m166.3 177.5-50.7-31-50.4 31.3 18.7-50.9-50.3-31.4 62.3-.4 19.3-50.7L135 95h62.3l-50.1 31.7z"/>
  </g>
  </svg>
);

export default FlagLr;
