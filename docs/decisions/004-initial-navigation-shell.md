# Decision

## Context

The first runnable Composure app needs a small navigation shell for Capture, Inbox, Upcoming, and Spaces without adding business logic, authentication, or Supabase integration.

The existing codebase structure document allows Expo Router route files under `app/` and asks route files to stay thin.

## Decision

Use Expo Router for the initial navigation shell.

The initial app uses tab routes for:

- Capture
- Inbox
- Upcoming
- Spaces

Route files under `app/` delegate to feature screen modules under `features/`.

## Consequences

- The app has a concrete Expo routing convention from the start.
- Navigation remains close to Expo defaults and avoids custom navigation setup.
- Feature folders can grow vertically as each MVP slice is implemented.
- No Supabase, authentication, thought creation, scheduling, or processing behavior is introduced by the shell.
