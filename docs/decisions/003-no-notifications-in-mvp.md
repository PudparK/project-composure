# Decision

## Context

Composure stores review times, which could imply reminders or push notifications.

Notifications add platform complexity, permission prompts, background behavior, and product expectations that are not required to validate the core capture loop.

## Decision

Notifications are not part of the MVP.

The MVP may store `review_at` and show upcoming reviews, but it should not schedule, request, or send push notifications.

## Consequences

- Scheduling remains a visible review aid, not an alerting system.
- Expo notification setup should not be added during MVP work.
- Agents should reject notification-related implementation unless the MVP scope changes.
- Future notification work needs its own product decision and implementation slice.
