# Definition Of Done

## Purpose

This document defines when a feature or implementation slice is complete.

Agents should use this as the close-out checklist before returning work.

## Feature Done Checklist

A feature is considered done when:

- Acceptance criteria pass.
- Loading states exist where async data is used.
- Error states exist where operations can fail.
- Empty states exist for empty lists or missing data.
- Types compile.
- No console errors are introduced.
- Behavior has been manually verified when possible.
- Relevant automated tests pass when tests exist.
- Docs are updated if behavior changed.
- `docs/current-state.md` is updated if implementation state changed.
- A decision record is added when a new product or architecture decision was made.
- No unrelated refactors are included.
- No unnecessary dependencies are added.

## MVP-Specific Checks

- Capture remains low-friction.
- Every thought belongs to exactly one space.
- Review time remains optional unless a decision changes it.
- Processed thoughts leave active inbox and upcoming views.
- Upcoming reviews only show unprocessed thoughts with `review_at`.
- No AI features are introduced.
- No notifications are introduced.
- No collaboration UI is introduced.

## Documentation Done Checklist

Documentation-only changes are considered done when:

- The new or changed docs match the current product direction.
- Cross-references are updated.
- `docs/current-state.md` reflects new operational docs or decisions.
- No stale guidance remains in prompts or workflow docs.

## Close-Out Format

When returning completed work, include:

- Files changed.
- What changed.
- Verification performed.
- Risks or follow-ups.
