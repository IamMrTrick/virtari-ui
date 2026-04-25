import { ActionMenuList } from "@yoopta/ui/action-menu-list";

type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor: HTMLElement | null;
  placement: Placement;
};

export function ActionMenu({ open, onOpenChange, anchor, placement }: Props) {
  return (
    <ActionMenuList
      open={open}
      anchor={anchor}
      onOpenChange={onOpenChange}
      view="small"
      placement={placement}
    >
      <ActionMenuList.Content />
    </ActionMenuList>
  );
}
