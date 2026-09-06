// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cd.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCd: FC<FlagCoreProps> = ({
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
    data-code="cd"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#007fff" d="M0 0h640v480H0z"/>
  <path fill="#f7d618" d="M28.8 96H96l20.8-67.2L137.6 96h67.2l-54.4 41.6 20.8 67.2-54.4-41.6-54.4 41.6 20.8-67.2zM600 0 0 360v120h40l600-360V0z"/>
  <path fill="#ce1021" d="M640 0 0 384v96L640 96z"/>
  </svg>
);

export default FlagCd;
