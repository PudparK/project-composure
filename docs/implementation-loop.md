# Implementation Loop

## Purpose

This document defines the operating cadence for implementation work.

Prompts describe agent roles. This loop describes how work should move from request to verified state without losing context.

## Loop

### 1. Intake

- Identify the user outcome.
- Confirm the work belongs to the MVP.
- Read `docs/current-state.md`.
- Check `docs/decisions/` for settled product or architecture decisions.
- Read `docs/codebase-structure.md` before creating or moving code.
- Review the relevant source docs before changing files.

### 2. Slice

- Define the smallest vertical slice that can produce working behavior.
- Name what is explicitly out of scope.
- Prefer one user-visible outcome over partial infrastructure.
- Create or select a small Linear issue when Linear is being used.

### 3. Inspect

- Inspect the current files and folder structure.
- Reuse existing patterns.
- Confirm the planned files follow `docs/codebase-structure.md`.
- Identify data model, RLS, navigation, and UI implications.
- Avoid redesigning solved decisions.

### 4. Implement

- Make the smallest coherent change.
- Keep business logic out of UI components where practical.
- Keep raw Supabase access near domain data helpers.
- Avoid unrelated refactors.
- Avoid new dependencies unless necessary and documented.

### 5. Verify

- Run the most relevant checks available for the change.
- For behavior changes, verify acceptance criteria directly.
- For schema or data access changes, verify constraints and RLS assumptions.
- Note any checks that could not be run.

### 6. Update State

- Update `docs/current-state.md` when work changes what exists, what is complete, what is in progress, known risks, or technical debt.
- Add a decision file under `docs/decisions/` when a product or architecture decision is made.
- Update existing docs when behavior changes.

### 7. Review

- Review for scope creep, unnecessary abstraction, data integrity, and UX friction.
- Check `docs/definition-of-done.md`.
- Confirm the implementation still supports the product principle:

Capture fast. Decide later. Return now.

### 8. Close Out

Return:

- Files changed
- What changed
- Verification performed
- Risks or follow-ups

## State Update Rules

Update `docs/current-state.md` when any of these change:

- A feature moves from not started to in progress.
- A feature is completed.
- A new risk or debt item is discovered.
- A folder or major file structure changes.
- A decision affects implementation direction.

Do not use `docs/current-state.md` for speculative ideas. Use it as operational memory for the current repo.
