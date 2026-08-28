export declare const canUseDOM: boolean;
export declare function composeEventHandlers<E extends {
    defaultPrevented: boolean;
}>(originalEventHandler?: (event: E) => void, ourEventHandler?: (event: E) => void, { checkForDefaultPrevented }?: {
    checkForDefaultPrevented?: boolean | undefined;
}): (event: E) => void;
export declare function getOwnerWindow(element: Node | null | undefined): Window & typeof globalThis;
export declare function getOwnerDocument(element: Node | null | undefined): Document;
/**
 * Lifted from https://github.com/ariakit/ariakit/blob/main/packages/ariakit-core/src/utils/dom.ts#L37
 * MIT License, Copyright (c) AriaKit.
 */
export declare function getActiveElement(node: Node | null | undefined, activeDescendant?: boolean): HTMLElement | null;
export declare function isFrame(element: Element): element is HTMLIFrameElement;
