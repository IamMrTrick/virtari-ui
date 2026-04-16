import { useState } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
} from "@virtari/react-toast";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

export function ToastPage() {
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <>
      <Section title="Basic Toast" description="Click the button to show a toast notification.">
        <ToastProvider>
          <Row>
            <Button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setOpen(true), 100);
              }}
            >
              Show Toast
            </Button>
          </Row>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Your changes have been saved.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </Section>

      <Section title="With Action" description="Toast with an undo action button.">
        <ToastProvider>
          <Row>
            <Button
              variant="outline"
              onClick={() => {
                setActionOpen(false);
                setTimeout(() => setActionOpen(true), 100);
              }}
            >
              Show Action Toast
            </Button>
          </Row>
          <Toast open={actionOpen} onOpenChange={setActionOpen}>
            <ToastTitle>Item deleted</ToastTitle>
            <ToastDescription>The item was moved to trash.</ToastDescription>
            <ToastAction altText="Undo" asChild>
              <Button size="sm" variant="outline">Undo</Button>
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  ToastProvider, Toast, ToastTitle, ToastDescription,
  ToastAction, ToastClose, ToastViewport,
} from "@virtari/react-toast";

const [open, setOpen] = useState(false);

<ToastProvider>
  <Button onClick={() => setOpen(true)}>Show Toast</Button>
  <Toast open={open} onOpenChange={setOpen}>
    <ToastTitle>Saved</ToastTitle>
    <ToastDescription>Your changes have been saved.</ToastDescription>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`}</pre>
      </Section>
    </>
  );
}
