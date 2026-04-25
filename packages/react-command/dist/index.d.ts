import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Command as Command$1 } from 'cmdk';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DialogContentProps } from '@virtari-packages/react-dialog';
export { ParsedCombo, UseHotkeyOptions, parseCombo, useHotkey } from '@virtari-packages/utils';

interface CommandRootProps extends ComponentPropsWithoutRef<typeof Command$1> {
}
declare const CommandRoot: react.ForwardRefExoticComponent<CommandRootProps & react.RefAttributes<HTMLDivElement>>;
interface CommandInputProps extends ComponentPropsWithoutRef<typeof Command$1.Input> {
}
declare const CommandInput: react.ForwardRefExoticComponent<CommandInputProps & react.RefAttributes<HTMLInputElement>>;
interface CommandListProps extends ComponentPropsWithoutRef<typeof Command$1.List> {
}
declare const CommandList: react.ForwardRefExoticComponent<CommandListProps & react.RefAttributes<HTMLDivElement>>;
interface CommandGroupProps extends ComponentPropsWithoutRef<typeof Command$1.Group> {
}
declare const CommandGroup: react.ForwardRefExoticComponent<CommandGroupProps & react.RefAttributes<HTMLDivElement>>;
interface CommandItemProps extends Omit<ComponentPropsWithoutRef<typeof Command$1.Item>, "children"> {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    /** Keyboard shortcut for this action (e.g. "mod+k"). Rendered visually via <Kbd>. */
    shortcut?: string;
    children?: ReactNode;
}
declare const CommandItem: react.ForwardRefExoticComponent<CommandItemProps & react.RefAttributes<HTMLDivElement>>;
interface CommandEmptyProps extends ComponentPropsWithoutRef<typeof Command$1.Empty> {
}
declare const CommandEmpty: react.ForwardRefExoticComponent<CommandEmptyProps & react.RefAttributes<HTMLDivElement>>;
interface CommandLoadingProps extends ComponentPropsWithoutRef<typeof Command$1.Loading> {
}
declare const CommandLoading: react.ForwardRefExoticComponent<CommandLoadingProps & react.RefAttributes<HTMLDivElement>>;
interface CommandSeparatorProps extends ComponentPropsWithoutRef<typeof Command$1.Separator> {
}
declare const CommandSeparator: react.ForwardRefExoticComponent<CommandSeparatorProps & react.RefAttributes<HTMLDivElement>>;

interface CommandDialogProps extends Omit<DialogContentProps, "children" | "title"> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Optional global toggle combo. Not bound by default — consumer must opt in. */
    hotkey?: string | string[] | false;
    title?: ReactNode;
    description?: ReactNode;
    /** Hide title/description visually but keep them for screen readers. */
    hideTitle?: boolean;
    children?: ReactNode;
}
declare function CommandDialog({ open, onOpenChange, hotkey, title, description, hideTitle, children, ...contentProps }: CommandDialogProps): react_jsx_runtime.JSX.Element;

/**
 * Split a combo string into its visual parts for rendering. On macOS, modifiers
 * become symbols (⌘⇧⌥⌃); elsewhere, spelled-out labels (Ctrl/Alt/Shift).
 */
declare function formatCombo(combo: string): string[];

declare const Command: {
    readonly Root: react.ForwardRefExoticComponent<CommandRootProps & react.RefAttributes<HTMLDivElement>>;
    readonly Input: react.ForwardRefExoticComponent<CommandInputProps & react.RefAttributes<HTMLInputElement>>;
    readonly List: react.ForwardRefExoticComponent<CommandListProps & react.RefAttributes<HTMLDivElement>>;
    readonly Group: react.ForwardRefExoticComponent<CommandGroupProps & react.RefAttributes<HTMLDivElement>>;
    readonly Item: react.ForwardRefExoticComponent<CommandItemProps & react.RefAttributes<HTMLDivElement>>;
    readonly Empty: react.ForwardRefExoticComponent<CommandEmptyProps & react.RefAttributes<HTMLDivElement>>;
    readonly Loading: react.ForwardRefExoticComponent<CommandLoadingProps & react.RefAttributes<HTMLDivElement>>;
    readonly Separator: react.ForwardRefExoticComponent<CommandSeparatorProps & react.RefAttributes<HTMLDivElement>>;
};

export { Command, CommandDialog, type CommandDialogProps, CommandEmpty, type CommandEmptyProps, CommandGroup, type CommandGroupProps, CommandInput, type CommandInputProps, CommandItem, type CommandItemProps, CommandList, type CommandListProps, CommandLoading, type CommandLoadingProps, CommandRoot, type CommandRootProps, CommandSeparator, type CommandSeparatorProps, formatCombo };
