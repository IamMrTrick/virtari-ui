import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@virtari/react-alert-dialog";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

export function AlertDialogPage() {
  return (
    <>
      <Section title="Delete Confirmation" description="A destructive action that requires confirmation.">
        <Row>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <div style={{ display: "flex", gap: "var(--vds-space-2)", justifyContent: "flex-end" }}>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive">Yes, delete</Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
      </Section>

      <Section title="General Confirmation" description="A non-destructive confirmation dialog.">
        <Row>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Publish Changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Publish changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This will make your changes visible to all users. You can
                revert later if needed.
              </AlertDialogDescription>
              <div style={{ display: "flex", gap: "var(--vds-space-2)", justifyContent: "flex-end" }}>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button>Publish</Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from "@virtari/react-alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Confirm</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>`}</pre>
      </Section>
    </>
  );
}
