# Architecture

## Overview

Composure is a React Native / Expo app backed by Supabase and Postgres.

The MVP should keep the architecture direct and readable. The core product loop is capture, assign to space, schedule review, return now, and later process.

## Principles

- Keep the MVP simple.
- Avoid premature abstraction.
- Prefer readable TypeScript over clever patterns.
- Keep feature boundaries clear enough to support future collaboration.
- Do not build collaboration, AI, or notifications in the MVP.

## High-Level Stack

- React Native for mobile UI.
- Expo for development, builds, and native capability management.
- TypeScript for application code.
- Supabase Auth for user identity when authentication is introduced.
- Supabase client for data access.
- Postgres for durable thought, space, and membership data.

## Client Architecture

The app should be organized around product features rather than technical layers only.

Suggested feature areas:

- Capture: thought entry, space selection, review scheduling, save action.
- Inbox: unprocessed thought list.
- Upcoming: scheduled unprocessed thought list.
- Spaces: initial personal, work, and family space records.
- Thought detail: view and process a thought when needed.

Shared client concerns:

- Supabase client setup.
- Auth session access.
- Data fetching helpers.
- Common UI components.
- Date and time formatting.

## Navigation

The MVP should start with a small navigation model:

- Capture as the fastest entry point.
- Inbox for unprocessed thoughts.
- Upcoming for scheduled reviews.
- Optional thought detail screen if list-level actions become crowded.

The capture flow should not be buried behind multiple screens.

## Data Access

The app should use Supabase as the source of truth for MVP data.

Expected access patterns:

- Create a thought.
- List unprocessed thoughts for the current user.
- List upcoming unprocessed thoughts for the current user.
- Mark a thought processed.
- Read spaces available to the current user.

Data access should be grouped by domain intent, such as `createThought`, `listInboxThoughts`, `listUpcomingReviews`, and `markThoughtProcessed`, rather than exposing raw query details throughout screens.

## Future Collaboration Boundary

The MVP should model spaces in a way that can later support multiple members.

Important boundary:

- A thought belongs to a space.
- A space can have memberships.
- In MVP, every space is effectively owned by one user.
- Later, a space can be shared by adding memberships without changing the thought table shape.

The UI should not expose shared spaces, invites, roles, comments, or presence in the MVP.

## Supabase Responsibilities

Supabase should provide:

- Authentication and current user identity.
- Postgres tables for thoughts, spaces, and memberships.
- Row Level Security to keep user data isolated.
- Timestamps and database-side integrity constraints.

## Offline Behavior

Offline-first behavior is not required for MVP.

The app should handle loading, empty, and error states clearly. If network access fails during capture, the user should not lose entered text while still on the screen.

## Notifications

Notifications are out of scope for the MVP. The MVP may store `review_at`, but it should not schedule push notifications.

## Testing Strategy

Initial testing should focus on the core loop:

- A thought can be captured with text, space, and review time.
- Inbox excludes processed thoughts.
- Upcoming reviews are ordered by review time.
- Marking a thought processed removes it from active lists.
- Every thought requires a space.

## Implementation Order

1. Define database schema and Row Level Security.
2. Scaffold Expo and Supabase client setup.
3. Create initial spaces for a user.
4. Build capture flow.
5. Build inbox.
6. Build upcoming reviews.
7. Add processed state.
8. Polish empty, loading, and error states.
