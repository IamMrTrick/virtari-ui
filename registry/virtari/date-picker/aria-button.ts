import type {
  ButtonHTMLAttributes,
  FocusEvent,
  MouseEvent,
} from "react";

type ButtonLikeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  onFocusChange?: (isFocused: boolean) => void;
  onPress?: (...args: any[]) => void;
};

export function toButtonProps(
  props: ButtonLikeProps,
): ButtonHTMLAttributes<HTMLButtonElement> {
  const {
    disabled,
    isDisabled,
    onBlur,
    onClick,
    onFocus,
    onFocusChange,
    onPress,
    ...domProps
  } = props;

  return {
    ...domProps,
    disabled: disabled ?? isDisabled,
    "aria-disabled": isDisabled ? true : domProps["aria-disabled"],
    onClick: chainMouseHandlers(onClick, () => {
      onPress?.(undefined);
    }),
    onFocus: chainFocusHandlers(onFocus, () => {
      onFocusChange?.(true);
    }),
    onBlur: chainFocusHandlers(onBlur, () => {
      onFocusChange?.(false);
    }),
  };
}

function chainMouseHandlers(
  first: ButtonHTMLAttributes<HTMLButtonElement>["onClick"],
  second: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined,
) {
  return (event: MouseEvent<HTMLButtonElement>) => {
    first?.(event);
    if (!event.defaultPrevented) {
      second?.(event);
    }
  };
}

function chainFocusHandlers(
  first: ButtonHTMLAttributes<HTMLButtonElement>["onFocus"] | ButtonHTMLAttributes<HTMLButtonElement>["onBlur"],
  second: ((event: FocusEvent<HTMLButtonElement>) => void) | undefined,
) {
  return (event: FocusEvent<HTMLButtonElement>) => {
    first?.(event);
    if (!event.defaultPrevented) {
      second?.(event);
    }
  };
}
