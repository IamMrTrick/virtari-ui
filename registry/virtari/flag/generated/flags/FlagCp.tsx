// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cp.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCp: FC<FlagCoreProps> = ({
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
    data-code="cp"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd" strokeWidth="1pt">
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#000091" d="M0 0h213.3v480H0z"/>
    <path fill="#e1000f" d="M426.7 0H640v480H426.7z"/>
  </g>
  </svg>
);

export default FlagCp;
