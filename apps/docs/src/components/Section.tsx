import { Stack as VdsStack, Cluster, type StackProps, type ClusterProps } from "@virtari-packages/react-layout";
import { Heading, Text } from "@virtari-packages/react-text";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <VdsStack as="section" className="docs-section" gap="md">
      <Heading level={2} size="5" className="docs-section-title">{title}</Heading>
      {description && <Text as="p" size="2" tone="muted" leading="relaxed" className="docs-section-description">{description}</Text>}
      {children}
    </VdsStack>
  );
}

export function Row({ className, ...props }: ClusterProps) {
  return <Cluster {...props} className={["docs-row", className].filter(Boolean).join(" ")} />;
}

export function Stack({ className, ...props }: StackProps) {
  return <VdsStack {...props} className={["docs-stack", className].filter(Boolean).join(" ")} />;
}
