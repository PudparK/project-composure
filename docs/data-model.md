# Data Model

## Overview

The Composure data model should support the MVP while leaving a clean path to future collaboration.

Core MVP concepts:

- Users capture thoughts.
- Every thought belongs to a space.
- Spaces start as personal, work, and family.
- Thoughts can have a future review time.
- Thoughts can be marked processed.

Future collaboration concept:

- Spaces can later have multiple members.
- The MVP should include a membership table, but the product should only create single-user spaces.

## Tables

### profiles

Stores app-level user metadata linked to Supabase Auth.

Columns:

- `id uuid primary key references auth.users(id)`
- `display_name text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Notes:

- Keep profile data minimal in MVP.
- Do not store collaboration preferences yet.

### spaces

Stores thought compartments such as personal, work, and family.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `owner_id uuid not null references auth.users(id)`
- `name text not null`
- `kind text not null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `archived_at timestamptz`

Constraints:

- `kind` should initially allow `personal`, `work`, `family`, and `custom`.
- `name` is required.
- Initial MVP spaces should use `personal`, `work`, and `family`.

Future collaboration:

- `owner_id` identifies the creator or administrative owner.
- Access should eventually come from `space_memberships`, not only `owner_id`.

### space_memberships

Stores user access to spaces. In MVP, this table supports one member per space.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `space_id uuid not null references spaces(id) on delete cascade`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `role text not null default 'owner'`
- `created_at timestamptz not null default now()`

Constraints:

- Unique pair: `space_id`, `user_id`.
- `role` should initially allow `owner`, `member`.

MVP behavior:

- Create one owner membership for each user-owned space.
- Do not expose invites, sharing, or roles in the UI.

### thoughts

Stores captured thoughts.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `space_id uuid not null references spaces(id)`
- `created_by uuid not null references auth.users(id)`
- `body text not null`
- `review_at timestamptz`
- `processed_at timestamptz`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Constraints:

- `body` must not be empty.
- `space_id` is required.
- `processed_at` is null until the thought is processed.

Indexes:

- `thoughts_created_by_idx` on `created_by`.
- `thoughts_space_id_idx` on `space_id`.
- `thoughts_inbox_idx` on `created_by, processed_at, created_at`.
- `thoughts_upcoming_idx` on `created_by, processed_at, review_at`.

## Derived Views

These can be implemented as queries first. Database views are optional and should not be added unless they reduce repeated complexity.

### Inbox

Definition:

- Thoughts visible to the current user.
- `processed_at is null`.

Suggested sort:

- Newest first by `created_at`.

### Upcoming Reviews

Definition:

- Thoughts visible to the current user.
- `processed_at is null`.
- `review_at is not null`.

Suggested sort:

- Earliest `review_at` first.

## Row Level Security

RLS should protect data by space membership.

Expected policies:

- Users can read spaces where they have a `space_memberships` row.
- Users can read thoughts in spaces where they have a `space_memberships` row.
- Users can create thoughts only in spaces where they have a membership.
- Users can update thoughts only in spaces where they have a membership.
- Users can read their own profile.
- Users can read memberships for spaces they belong to.

MVP simplification:

- Because all MVP spaces are single-user spaces, membership-based policies still behave like owner-only access.

## Initial Space Creation

When a user starts using the app, create three spaces:

- Personal, with `kind = 'personal'`.
- Work, with `kind = 'work'`.
- Family, with `kind = 'family'`.

Each space should also create one `space_memberships` row for the user with `role = 'owner'`.

## Future Collaboration Considerations

Do not implement these in MVP, but keep the schema compatible:

- Inviting another user to a space.
- Adding a second member to an existing space.
- Role-based permissions for owner and member.
- Shared inbox views by space.
- Activity history or comments.

Avoid adding collaboration-only tables until product behavior is defined.
