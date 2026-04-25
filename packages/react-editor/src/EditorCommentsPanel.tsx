import { Button } from "@virtari-packages/react-button";
import { Textarea } from "@virtari-packages/react-textarea";
import {
  Icon,
  IconCheck,
  IconMessageCircle,
  IconTrash,
  IconX,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import type { EditorCommentThread } from "./types";

interface EditorCommentsPanelProps {
  className?: string;
  composerOpen: boolean;
  draft: string;
  pendingQuote: string;
  threads: EditorCommentThread[];
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onResolve: (id: string) => void;
  onRemove: (id: string) => void;
}

function formatThreadDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export function EditorCommentsPanel({
  className,
  composerOpen,
  draft,
  pendingQuote,
  threads,
  onDraftChange,
  onSubmit,
  onCancel,
  onResolve,
  onRemove,
}: EditorCommentsPanelProps) {
  if (!composerOpen && threads.length === 0) {
    return null;
  }

  return (
    <section className={cn("vds-editor-comments", className)}>
      {composerOpen ? (
        <div className="vds-editor-comments-composer">
          <div className="vds-editor-comments-header">
            <span className="vds-editor-comments-title">
              <Icon icon={IconMessageCircle} size="sm" />
              Add comment
            </span>
            <Button
              type="button"
              variant="ghost"
              color="contrast"
              size="xs"
              className="vds-editor-comments-close"
              onClick={onCancel}
            >
              <Icon icon={IconX} size="sm" />
            </Button>
          </div>

          {pendingQuote ? (
            <blockquote className="vds-editor-comments-quote">
              {pendingQuote}
            </blockquote>
          ) : null}

          <Textarea
            inputSize="sm"
            className="vds-editor-comments-input"
            rows={4}
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Leave context for this selection..."
          />

          <div className="vds-editor-comments-actions">
            <Button
              type="button"
              variant="ghost"
              color="contrast"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="soft"
              color="primary"
              size="sm"
              disabled={draft.trim().length === 0}
              onClick={onSubmit}
            >
              Add comment
            </Button>
          </div>
        </div>
      ) : null}

      {threads.length > 0 ? (
        <div className="vds-editor-comments-list">
          {threads.map((thread) => (
            <article
              key={thread.id}
              className="vds-editor-comment-card"
              data-status={thread.status}
            >
              <header className="vds-editor-comment-card-header">
                <span className="vds-editor-comment-card-title">
                  <Icon icon={IconMessageCircle} size="sm" />
                  {thread.status === "resolved" ? "Resolved comment" : "Comment"}
                </span>
                <time
                  className="vds-editor-comment-card-date"
                  dateTime={thread.createdAt}
                >
                  {formatThreadDate(thread.createdAt)}
                </time>
              </header>

              {thread.quote ? (
                <blockquote className="vds-editor-comment-card-quote">
                  {thread.quote}
                </blockquote>
              ) : null}

              <p className="vds-editor-comment-card-body">{thread.body}</p>

              <div className="vds-editor-comment-card-actions">
                {thread.status === "open" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    color="success"
                    size="xs"
                    onClick={() => onResolve(thread.id)}
                  >
                    <Icon icon={IconCheck} size="sm" />
                    Resolve
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  color="danger"
                  size="xs"
                  onClick={() => onRemove(thread.id)}
                >
                  <Icon icon={IconTrash} size="sm" />
                  Remove
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
