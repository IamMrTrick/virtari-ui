interface TablerIconMeta {
  name: string;
  category: string;
  tags: (string | number)[];
  styles: { outline?: unknown; filled?: unknown };
}

declare module "*/icons.json" {
  const data: Record<string, TablerIconMeta>;
  export default data;
}
