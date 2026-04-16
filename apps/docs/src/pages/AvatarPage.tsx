import { Avatar } from "@virtari/react-avatar";
import { Section, Row } from "../components";

export function AvatarPage() {
  return (
    <>
      <Section title="Sizes">
        <Row>
          <Avatar fallback="XS" size="xs" />
          <Avatar fallback="SM" size="sm" />
          <Avatar fallback="MD" />
          <Avatar fallback="LG" size="lg" />
          <Avatar fallback="XL" size="xl" />
        </Row>
      </Section>

      <Section title="With Image" description="Falls back to initials when image fails to load.">
        <Row>
          <Avatar
            src="https://i.pravatar.cc/150?u=virtari1"
            alt="User avatar"
            fallback="VD"
            size="lg"
          />
          <Avatar
            src="https://i.pravatar.cc/150?u=virtari2"
            alt="User avatar"
            fallback="AB"
            size="lg"
          />
          <Avatar
            src="https://broken-url.example"
            alt="Broken image"
            fallback="FB"
            size="lg"
          />
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Avatar } from "@virtari/react-avatar";

<Avatar
  src="/avatar.jpg"
  alt="John Doe"
  fallback="JD"
  size="lg"
/>`}</pre>
      </Section>
    </>
  );
}
