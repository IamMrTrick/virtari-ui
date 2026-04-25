import { SlashCommandMenu } from "@yoopta/ui/slash-command-menu";

/**
 * Slash menu — auto-detects "/" typed in the editor and opens at the caret.
 * SlashCommandMenu (v6 primitive) self-wires the trigger via internal
 * useSlashCommand hook, derives items from registered plugins, and positions
 * via floating-ui. Render-prop API gives `props.items` populated automatically.
 */
export function SlashMenu() {
  return (
    <SlashCommandMenu>
      {(props) => (
        <SlashCommandMenu.Content>
          <SlashCommandMenu.List>
            <SlashCommandMenu.Empty>No blocks found</SlashCommandMenu.Empty>
            {props.items.map((item) => (
              <SlashCommandMenu.Item
                key={item.id}
                value={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon ?? null}
              />
            ))}
          </SlashCommandMenu.List>
          <SlashCommandMenu.Footer />
        </SlashCommandMenu.Content>
      )}
    </SlashCommandMenu>
  );
}
