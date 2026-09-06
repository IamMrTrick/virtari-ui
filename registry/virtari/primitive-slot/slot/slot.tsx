import * as React from 'react';
import { composeRefs } from '../compose-refs';

declare module 'react' {
  interface ReactElement {
    $$typeof?: symbol | string;
  }
}

const REACT_LAZY_TYPE = Symbol.for('react.lazy');

interface LazyReactElement extends React.ReactElement {
  $$typeof: typeof REACT_LAZY_TYPE;
  _payload: PromiseLike<Exclude<React.ReactNode, PromiseLike<unknown>>>;
}

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

export type Usable<T> = PromiseLike<T> | React.Context<T>;
const use: typeof React.use | undefined = (React as { use?: typeof React.use }).use;

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof value === 'object' && value !== null && 'then' in value;
}

function isLazyComponent(element: React.ReactNode): element is LazyReactElement {
  return (
    element != null &&
    typeof element === 'object' &&
    '$$typeof' in element &&
    element.$$typeof === REACT_LAZY_TYPE &&
    '_payload' in element &&
    isPromiseLike(element._payload)
  );
}

/* @__NO_SIDE_EFFECTS__ */ export function createSlot(ownerName: string) {
  const SlotClone = createSlotClone(ownerName);
  const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
    const { children: originalChildren, ...slotProps } = props;
    const children = isLazyComponent(originalChildren) && typeof use === 'function'
      ? use(originalChildren._payload)
      : originalChildren;
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      const newElement = slottable.props.children;

      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          // because the new element will be the one rendered, we are only interested
          // in grabbing its children (`newElement.props.children`)
          if (React.Children.count(newElement) > 1) return React.Children.only(null);
          return React.isValidElement(newElement)
            ? (newElement.props as { children: React.ReactNode }).children
            : null;
        } else {
          return child;
        }
      });

      return (
        <SlotClone {...slotProps} ref={forwardedRef}>
          {React.isValidElement(newElement)
            ? React.cloneElement(newElement, undefined, newChildren)
            : null}
        </SlotClone>
      );
    }

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {children}
      </SlotClone>
    );
  });

  Slot.displayName = `${ownerName}.Slot`;
  return Slot;
}

const Slot = createSlot('Slot');

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children: React.ReactNode;
}

/* @__NO_SIDE_EFFECTS__ */ function createSlotClone(ownerName: string) {
  const SlotClone = React.forwardRef<HTMLElement, SlotCloneProps>((props, forwardedRef) => {
    const { children: originalChildren, ...slotProps } = props;
    const children = isLazyComponent(originalChildren) && typeof use === 'function'
      ? use(originalChildren._payload)
      : originalChildren;

    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props = mergeProps(slotProps, children.props as AnyProps);
      // do not pass ref to React.Fragment for React 19 compatibility
      if (children.type !== React.Fragment) {
        props.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React.cloneElement(children, props);
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  });

  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

const SLOTTABLE_IDENTIFIER = Symbol('virtari.slottable');

interface SlottableProps {
  children: React.ReactNode;
}

interface SlottableComponent extends React.FC<SlottableProps> {
  __vdsId: symbol;
}

/* @__NO_SIDE_EFFECTS__ */ export function createSlottable(ownerName: string) {
  const Slottable: SlottableComponent = ({ children }) => {
    return <>{children}</>;
  };
  Slottable.displayName = `${ownerName}.Slottable`;
  Slottable.__vdsId = SLOTTABLE_IDENTIFIER;
  return Slottable;
}

const Slottable = createSlottable('Slottable');

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, unknown>;

function isSlottable(
  child: React.ReactNode,
): child is React.ReactElement<SlottableProps, typeof Slottable> {
  return (
    React.isValidElement(child) &&
    typeof child.type === 'function' &&
    '__vdsId' in child.type &&
    child.type.__vdsId === SLOTTABLE_IDENTIFIER
  );
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (typeof slotPropValue === 'function' && typeof childPropValue === 'function') {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (typeof slotPropValue === 'function') {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = {
        ...(slotPropValue as React.CSSProperties | undefined),
        ...(childPropValue as React.CSSProperties | undefined),
      };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as React.ReactElement & { ref?: React.Ref<unknown> }).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> }).ref;
  }

  // Not DEV
  return (element.props as { ref?: React.Ref<unknown> }).ref ||
    (element as React.ReactElement & { ref?: React.Ref<unknown> }).ref;
}

export {
  Slot,
  Slottable,
  //
  Slot as Root,
};
export type { SlotProps };
