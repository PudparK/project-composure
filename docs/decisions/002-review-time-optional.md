# Decision

## Context

Composure should help users capture quickly and return to the present.

Requiring a review time for every thought may slow capture and force a decision before the user is ready.

## Decision

Review time is optional during capture.

A thought may be saved with text and space only. If `review_at` is present, the thought appears in upcoming reviews. If `review_at` is absent, the thought remains in the inbox until processed or scheduled later.

## Consequences

- Capture can stay low-friction.
- Inbox must support thoughts with and without review times.
- Upcoming reviews only includes unprocessed thoughts where `review_at` is present.
- The app may later add lightweight scheduling prompts, but should not block capture on scheduling.
