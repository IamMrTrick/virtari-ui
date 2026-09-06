import "./Command.css";
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandLoading,
  CommandSeparator,
} from "./Command";

export {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandLoading,
  CommandSeparator,
};

export { CommandDialog } from "./CommandDialog";

export type {
  CommandRootProps,
  CommandInputProps,
  CommandListProps,
  CommandGroupProps,
  CommandItemProps,
  CommandEmptyProps,
  CommandLoadingProps,
  CommandSeparatorProps,
} from "./Command";
export type { CommandDialogProps } from "./CommandDialog";

export { formatCombo, parseCombo } from "./shortcut";
export type { ParsedCombo } from "./shortcut";

/* Re-export useHotkey so consumers can bind shortcuts without a second import. */
export { useHotkey } from "../../lib/utils";
export type { UseHotkeyOptions } from "../../lib/utils";

export const Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Group: CommandGroup,
  Item: CommandItem,
  Empty: CommandEmpty,
  Loading: CommandLoading,
  Separator: CommandSeparator,
} as const;
