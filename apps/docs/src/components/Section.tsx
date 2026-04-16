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
    <section className="docs-section">
      <h2 className="docs-section-title">{title}</h2>
      {description && <p className="docs-section-description">{description}</p>}
      {children}
    </section>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="docs-row">{children}</div>;
}

export function Stack({ children }: { children: React.ReactNode }) {
  return <div className="docs-stack">{children}</div>;
}
