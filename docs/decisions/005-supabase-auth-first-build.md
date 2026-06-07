# Decision

## Context

Composure needs a current user before thoughts, spaces, and memberships can be safely persisted through Supabase RLS.

A local-only prototype would allow faster UI iteration, but it would delay validation of the app's core data boundary: every thought belongs to a user-visible space and every space is protected by membership-based access.

## Decision

Use Supabase Auth for the first test build.

The app should gate the MVP tabs behind a minimal email and password authentication flow. Auth state should live in a shared provider, and route files should remain thin.

## Consequences

- The first runnable product slices depend on Supabase project configuration.
- The new-user database trigger creates the user's initial Personal, Work, and Family spaces after signup.
- The capture, inbox, upcoming, and spaces features can query data through RLS from the start.
- A local-only prototype path is deferred unless Supabase setup blocks testing.
