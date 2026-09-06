// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/sj.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagSj: FC<FlagCoreProps> = ({
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
    data-code="sj"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#ef2b2d" d="M0 0h640v480H0z"/>
  <path fill="#fff" d="M180 0h120v480H180z"/>
  <path fill="#fff" d="M0 180h640v120H0z"/>
  <path fill="#002868" d="M210 0h60v480h-60z"/>
  <path fill="#002868" d="M0 210h640v60H0z"/>
  </svg>
);

export default FlagSj;
