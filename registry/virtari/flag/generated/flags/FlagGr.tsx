// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gr.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGr: FC<FlagCoreProps> = ({
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
    data-code="gr"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#0d5eaf" fillRule="evenodd" d="M0 0h640v53.3H0z"/>
  <path fill="#fff" fillRule="evenodd" d="M0 53.3h640v53.4H0z"/>
  <path fill="#0d5eaf" fillRule="evenodd" d="M0 106.7h640V160H0z"/>
  <path fill="#fff" fillRule="evenodd" d="M0 160h640v53.3H0z"/>
  <path fill="#0d5eaf" d="M0 0h266.7v266.7H0z"/>
  <path fill="#0d5eaf" fillRule="evenodd" d="M0 213.3h640v53.4H0z"/>
  <path fill="#fff" fillRule="evenodd" d="M0 266.7h640V320H0z"/>
  <path fill="#0d5eaf" fillRule="evenodd" d="M0 320h640v53.3H0z"/>
  <path fill="#fff" fillRule="evenodd" d="M0 373.3h640v53.4H0z"/>
  <g fill="#fff" fillRule="evenodd" strokeWidth="1.3">
    <path d="M106.7 0H160v266.7h-53.3z"/>
    <path d="M0 106.7h266.7V160H0z"/>
  </g>
  <path fill="#0d5eaf" d="M0 426.7h640V480H0z"/>
  </svg>
);

export default FlagGr;
