// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/tt.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagTt: FC<FlagCoreProps> = ({
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
    data-code="tt"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" d="M0 0h640v480H0z"/>
  <path fill="#e00000" fillRule="evenodd" d="M463.7 480 0 1v478.8zM176.3 0 640 479V.2z"/>
  <path fill="#000001" fillRule="evenodd" d="M27.7.2h118.6l468.2 479.3H492.2z"/>
  </svg>
);

export default FlagTt;
