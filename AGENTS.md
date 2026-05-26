# AGENTS.md

## Project

This repo is for Composure, a React Native / Expo app focused on thought compartmentalization and work-life balance.

The app helps users:

- Capture thoughts quickly
- Assign thoughts to a personal, work, or family space
- Schedule a future time to process them
- Return to the present without losing the thought

## Product Principle

Capture fast. Decide later. Return now.

The product should feel:

- calm
- lightweight
- intentional
- low-friction
- emotionally quiet

Avoid productivity-tool complexity.

## Tech Stack

- React Native
- Expo
- TypeScript
- Supabase
- Postgres

## Engineering Philosophy

- Keep the MVP simple
- Prefer boring technology
- Design for future collaboration without implementing it yet
- Avoid premature abstraction
- Prefer readable code over cleverness
- Prefer composition over deep inheritance
- Keep diffs small and reviewable
- Build vertical slices instead of partial systems

## MVP Rules

Core features only:

- Capture thought
- Inbox
- Upcoming reviews
- Spaces
- Mark thought processed

Not allowed in MVP:

- AI features of any kind
- notifications
- gamification
- social features
- collaboration
- analytics dashboards
- background orchestration systems
- plugin systems
- advanced state management libraries unless necessary

## Thought Rules

Every thought:

- belongs to a space
- can include an optional review time
- is unprocessed until `processed_at` is set
- can be marked processed

## Code Rules

- Do not introduce new dependencies unless necessary
- Explain why any new dependency is needed
- Do not refactor unrelated code
- Do not create abstractions for hypothetical future needs
- Prefer explicit code over meta-programming
- Keep business logic separated from UI components
- Prefer server simplicity over client complexity

## File Rules

Before making changes:

1. Read docs/prd.md
2. Read docs/mvp-scope.md
3. Read docs/architecture.md
4. Read docs/data-model.md
5. Read docs/current-state.md
6. Read docs/codebase-structure.md
7. Check docs/decisions/ for settled decisions
8. Use docs/implementation-loop.md for execution cadence
9. Use docs/definition-of-done.md before closing out

When behavior changes:

- update relevant docs
- update docs/current-state.md
- add or update a decision record when a decision is made or changed

Do not:

- rename files unnecessarily
- reorganize folders without reason
- create duplicate patterns
- introduce multiple ways of doing the same thing

## Linear Rules

Use the Composure Linear project only.

Prefer:

- small implementation-oriented issues
- concise acceptance criteria
- one vertical slice per issue

Each issue should:

- define the user outcome
- define acceptance criteria
- define what is out of scope

## Implementation Workflow

For each issue:

1. Understand the requirement
2. Review existing patterns
3. Implement the smallest working solution
4. Verify behavior
5. Summarize changes clearly

After implementation return:

1. Files changed
2. What changed
3. How to test
4. Risks or follow-ups

## Review Rules

Review for:

- scope creep
- unnecessary abstraction
- overengineering
- hidden side effects
- unclear naming
- broken UX simplicity
- unnecessary dependencies

Challenge complexity when a simpler solution exists.
