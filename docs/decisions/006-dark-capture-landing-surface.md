# Decision

## Context

Composure's primary interaction is the capture moment. The first screen should help the user set down a thought quickly, choose a space, optionally defer review, and return to the present.

A conventional light form screen can make capture feel like task entry or note management. The desired direction is a darker, quieter landing surface with fewer visible form boundaries.

## Decision

Use a dark, minimal capture landing surface as the design target for the MVP.

The capture screen should center the experience around a large prompt-style thought input, space pills, a quiet review-time control, a soft primary Save button, and a bottom sheet for review-time choices.

## Consequences

- Capture should not be implemented as a card-heavy form.
- Thought input should visually behave more like a prompt with an underline than a boxed field.
- Review time remains optional and should be selected from a small bottom sheet, not a full calendar in MVP.
- The app should avoid visual patterns that suggest task management, productivity scoring, reminders, or collaboration.
- `docs/design-system.md` is the source of truth for MVP UI styling and component behavior.
