# Engineering Standards

## Product Principle

Capture fast. Decide later. Return now.

Every engineering decision should protect this loop.

## General Standards

- Keep the MVP simple.
- Prefer readable code over clever abstractions.
- Build one vertical slice at a time.
- Avoid abstractions until repeated behavior makes the need clear.
- Keep user-facing behavior explicit and easy to test.
- Do not add AI features in the MVP.
- Do not add notifications in the MVP.

## TypeScript

- Use TypeScript for application code.
- Prefer explicit domain types for thoughts, spaces, and review state.
- Avoid broad `any` types.
- Keep functions small enough to read without jumping across many files.
- Name functions by product intent, such as `createThought`, `listInboxThoughts`, and `markThoughtProcessed`.

## React Native / Expo

- Keep screens focused on user workflows.
- Keep capture accessible with minimal navigation.
- Provide clear loading, empty, and error states.
- Preserve unsaved capture text while the user remains on the capture screen.
- Avoid UI complexity that turns Composure into a task manager.

## Data Access

- Supabase is the source of truth for MVP data.
- Every thought must belong to exactly one space.
- Authorization should be based on space membership where practical.
- Keep raw Supabase queries close to domain data helpers instead of scattering them through UI components.
- Do not expose collaboration UI in the MVP.

## Database

- Use migrations for schema changes.
- Add constraints for required data, especially thought body and space ownership.
- Enable Row Level Security for user-owned data.
- Add indexes for inbox and upcoming review queries when those tables are introduced.

## Testing

Prioritize tests around the core loop:

- A thought can be captured with text and space.
- A thought can include a review time.
- Inbox excludes processed thoughts.
- Upcoming reviews are ordered by review time.
- Marking a thought processed removes it from active lists.
- A thought cannot exist without a space.

## Pull Requests

- Keep PRs small and implementation-oriented.
- Link the relevant Linear issue when one exists.
- Include acceptance criteria in the PR description.
- Call out any schema, RLS, or product-scope changes directly.
- Do not mix unrelated refactors into feature PRs.
