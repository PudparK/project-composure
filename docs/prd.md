# Composure PRD

## Overview

Composure is a React Native / Expo app for thought compartmentalization and intentional deferral.

The app helps users quickly capture intrusive or distracting thoughts, assign each thought to a personal, work, or family space, schedule a future review time, and return to the present without losing the thought.

Product principle:

Capture fast. Decide later. Return now.

## Problem

People often lose focus because important but poorly timed thoughts demand attention immediately. Existing note-taking and task tools can preserve the thought, but they often require too many decisions during capture: where it belongs, what action it needs, when to revisit it, and how to classify it.

Composure should reduce the capture moment to the few decisions needed to safely defer the thought.

## Goals

- Capture a thought in seconds.
- Require every thought to belong to a space.
- Let users schedule when they will review the thought.
- Provide a clear inbox for unprocessed thoughts.
- Provide a clear upcoming view for scheduled reviews.
- Let users mark a thought as processed once they have dealt with it.
- Keep the MVP small enough to validate the core loop.

## Non-Goals

- Collaboration features.
- AI categorization, summarization, coaching, or suggestions.
- Push notifications.
- Complex task management.
- Recurring reviews.
- Shared workspaces or teams.
- Calendar sync.

## Target User

The MVP is for an individual user who needs a lightweight way to capture thoughts without letting them interrupt the current moment.

Primary contexts:

- A work thought appears during family time.
- A family or personal thought appears during work.
- A worry or distracting thought appears during focused activity.
- The user wants to preserve the thought without processing it immediately.

## Core User Journey

1. User opens Composure.
2. User captures a thought.
3. User assigns the thought to a space: personal, work, or family.
4. User schedules a future review time.
5. User returns to the present.
6. Later, the user opens the inbox or upcoming reviews.
7. User processes the thought and marks it processed.

## MVP Features

### Capture Thought

Users can enter short freeform thought text and save it quickly.

Acceptance criteria:

- A thought cannot be saved without text.
- A thought cannot be saved without a space.
- A thought can be saved with a scheduled review time.
- A saved thought appears in the inbox until processed.

### Spaces

Users can assign each thought to one of the initial spaces.

Acceptance criteria:

- Initial spaces are personal, work, and family.
- Every thought belongs to exactly one space.
- Space assignment is visible wherever thoughts are listed.

### Schedule Future Review

Users can set a future review time for a thought.

Acceptance criteria:

- A thought can store a review date and time.
- Upcoming reviews show thoughts with future review times.
- The MVP does not send notifications.

### Inbox

Users can see unprocessed thoughts in one place.

Acceptance criteria:

- Inbox lists unprocessed thoughts.
- Processed thoughts are excluded from the inbox.
- Each inbox item shows thought text, space, and review time when present.

### Upcoming Reviews

Users can see thoughts scheduled for future review.

Acceptance criteria:

- Upcoming reviews lists unprocessed thoughts with review times.
- Items are sorted by review time ascending.
- Processed thoughts are excluded.

### Mark Thought Processed

Users can mark a thought as processed once they have handled it.

Acceptance criteria:

- A processed timestamp is recorded.
- Processed thoughts no longer appear in inbox or upcoming reviews.
- The action is available from thought list items or a thought detail view.

## Success Criteria

- A user can complete the capture loop without deciding how to fully process the thought.
- A user can reliably find deferred thoughts later.
- The data model can support future shared spaces without changing the core thought ownership model.

## Open Questions

- Should processed thoughts have a read-only history view in MVP?
- Should the app require authentication in the first test build, or allow a local-only prototype first?
