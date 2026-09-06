import { useState } from "react";
import { Input, InputField, InputWrapper, InputIcon, InputGroup, InputAddon, PasswordInputField, type InputSize } from "@virtari-packages/react-input";
import { IconSearch, IconMail } from "@virtari-packages/react-icons";
import { CodeBlock } from "@virtari-packages/react-code";
import { Label } from "@virtari-packages/react-label";
import { Stack, Cluster } from "@virtari-packages/react-layout";
import { Switch } from "@virtari-packages/react-switch";
import { Section } from "../components";

const sizes: InputSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
function TypingPulseDemo() {
  const [pulse, setPulse] = useState(false);
  return <Stack gap="md">
    <Cluster gap="sm"><Switch id="input-typing-pulse" checked={pulse} onCheckedChange={setPulse} /><Label htmlFor="input-typing-pulse">Enable optional typing pulse</Label></Cluster>
    <InputField label="Try typing" typingPulse={pulse} placeholder="Type at your own pace" description="Focus and typing keep the same native input mounted." />
  </Stack>;
}
export function InputPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("virtari");
  const [password, setPassword] = useState("");
  return <>
    <Section title="Field composition" description="InputField owns label, helper, error and counter spacing. An error also marks the native input invalid. Use persistent labels; placeholders are optional examples.">
      <Stack gap="lg">
        <InputField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} description="We'll send a confirmation link." error={email && !/\S+@\S+\.\S+/.test(email) ? "Enter a valid email address." : undefined} />
        <InputField label="Public handle" name="username" autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} description="Visible on your profile." error={username.length < 4 ? "Use at least four characters." : undefined} showCounter maxLength={24} metaLayout="inline" />
      </Stack>
    </Section>
    <Section title="Sizes" description="Seven control sizes use the same height scale as Button and Select. Compact sizes suit dense desktop layouts; choose larger targets and adequate separation for touch.">
      <Stack gap="md">{sizes.map(size => <InputField key={size} label={`Size ${size}`} size={size} placeholder="Enter a value" />)}</Stack>
    </Section>
    <Section title="Icons and affixes" description="Decorative icons reserve their width plus a text gap. Logical start/end slots follow RTL automatically. Use InputAddon for text affixes; interactive actions need their own named button outside the hidden icon slot.">
      <Stack gap="lg">
        <Stack gap="xs"><Label htmlFor="input-search">Search</Label><InputWrapper><InputIcon side="start"><IconSearch /></InputIcon><Input id="input-search" type="search" placeholder="Search projects" /></InputWrapper></Stack>
        <Stack gap="xs"><Label htmlFor="input-icon-email">Contact email</Label><InputWrapper><Input id="input-icon-email" type="email" name="contactEmail" autoComplete="email" placeholder="you@example.com" /><InputIcon side="end"><IconMail /></InputIcon></InputWrapper></Stack>
        <Stack gap="xs"><Label htmlFor="input-site">Website name</Label><InputGroup><InputAddon>https://</InputAddon><Input id="input-site" name="website" placeholder="example" /><InputAddon side="end">.com</InputAddon></InputGroup></Stack>
        <Stack gap="xs" dir="rtl"><Label htmlFor="input-rtl">جستجوی پروژه</Label><InputWrapper><InputIcon side="start"><IconSearch /></InputIcon><Input id="input-rtl" placeholder="نام پروژه را وارد کنید" /></InputWrapper></Stack>
      </Stack>
    </Section>
    <Section title="Surfaces and states" description="Fields inherit bordered, tonal or elevated appearance. data-field-tone=strong adds the next alpha layer while retaining the host color. Invalid, read-only and disabled are distinct states.">
      <Stack gap="lg">
        {(["bordered", "tonal", "elevated"] as const).map(surface => <Stack key={surface} gap="sm" data-surface-style={surface}><InputField label={`${surface} field`} placeholder="Default field tone" /><InputField label={`${surface} · stronger tone`} data-field-tone="strong" placeholder="Stronger field tone" /></Stack>)}
        <InputField label="Project name" defaultValue="" error="Enter a project name to continue." required />
        <InputField label="Read-only reference" value="VDS-2048" readOnly description="You can focus and copy this value." />
        <InputField label="Unavailable field" defaultValue="Not editable" disabled />
      </Stack>
    </Section>
    <Section title="Password" description="Use current-password without strength feedback for sign-in. For a new password, optional local strength feedback explains requirements; it does not replace server validation.">
      <Stack gap="lg">
        <PasswordInputField label="Sign-in password" name="currentPassword" autoComplete="current-password" showStrengthMeter={false} />
        <PasswordInputField label="New password" name="newPassword" autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} showCounter maxLength={64} showRequirements requirementsLabel="Password requirements" strengthLabel="Password strength" strengthOptions={{ userInputs: [username, email] }} />
      </Stack>
    </Section>
    <Section title="Optional typing feedback" description="Typing pulse is off by default and respects reduced motion. It is visual feedback only; it must never be required to use a field."><TypingPulseDemo /></Section>
    <Section title="Usage" description="Import the exported package styles after core and tokens. Use size for the control size; inputSize remains a deprecated compatibility alias.">
      <CodeBlock renderer="static" language="tsx" filename="AccountFields.tsx" code={`import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-input/styles";
import "@virtari-packages/react-layout/styles";
import { InputField, PasswordInputField } from "@virtari-packages/react-input";
import { Stack } from "@virtari-packages/react-layout";

export function AccountFields() {
  return (
    <Stack gap="lg">
      <InputField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        size="lg"
        description="Use the email associated with your account."
      />
      <PasswordInputField
        label="Password"
        name="password"
        autoComplete="current-password"
        showStrengthMeter={false}
      />
    </Stack>
  );
}`} />
    </Section>
  </>;
}
