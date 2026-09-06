// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/xx.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagXx: FC<FlagCoreProps> = ({
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
    data-code="xx"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" fillRule="evenodd" stroke="#adb5bd" strokeWidth="1.1" d="M.5.5h638.9v478.9H.5z"/>
  <path fill="none" stroke="#adb5bd" strokeWidth="1.1" d="m.5.5 639 479m0-479-639 479"/>
  </svg>
);

export default FlagXx;
