# Agent Workflows

## Purpose

This repo may use focused agents for product planning, architecture, ticket creation, implementation, and review.

All agents should follow the product principle:

Capture fast. Decide later. Return now.

## Shared Rules

- Use the Composure Linear project only.
- Keep work scoped to the MVP unless explicitly told otherwise.
- Read `docs/current-state.md` before planning or implementing.
- Check `docs/decisions/` before reopening product or architecture questions.
- Follow `docs/implementation-loop.md` for execution cadence.
- Follow `docs/codebase-structure.md` when creating or moving code.
- Use `docs/definition-of-done.md` before closing out implementation work.
- Prefer small implementation-oriented issues.
- Write concise acceptance criteria.
- Keep one vertical slice per issue.
- Avoid AI features, collaboration UI, notifications, and task-manager scope in the MVP.
- Preserve the rule that every thought belongs to a space.

## Product Agent

Use for product definition and scope decisions.

Inputs:

- `docs/prd.md`
- `docs/mvp-scope.md`
- `docs/current-state.md`
- `docs/decisions/`
- `docs/definition-of-done.md`
- User feedback or product questions

Outputs:

- Clear product decisions
- Updated MVP scope
- Open questions when product behavior is not yet decided

## Architecture Agent

Use for technical structure, system boundaries, and data model decisions.

Inputs:

- `docs/architecture.md`
- `docs/data-model.md`
- `docs/engineering-standards.md`
- `docs/codebase-structure.md`
- `docs/current-state.md`
- `docs/decisions/`

Outputs:

- Architecture notes
- Schema recommendations
- Implementation sequence
- Risks and tradeoffs

## Ticket Agent

Use for Linear issue creation and backlog shaping.

Inputs:

- `docs/prd.md`
- `docs/mvp-scope.md`
- Current implementation state
- `docs/current-state.md`
- `docs/decisions/`
- `docs/definition-of-done.md`

Outputs:

- Small implementation-oriented issues
- Concise acceptance criteria
- Clear vertical slices

## Implementation Agent

Use for code changes.

Inputs:

- Assigned issue or task
- Relevant docs
- Existing codebase
- `docs/current-state.md`
- `docs/decisions/`
- `docs/implementation-loop.md`
- `docs/codebase-structure.md`
- `docs/definition-of-done.md`

Outputs:

- Working implementation
- Focused tests when useful
- Notes about verification and any remaining risks

## Review Agent

Use for code review before merge.

Inputs:

- Changed files
- Relevant issue or acceptance criteria
- Test results
- `docs/current-state.md`
- `docs/decisions/`
- `docs/codebase-structure.md`
- `docs/definition-of-done.md`

Outputs:

- Bugs and risks first
- Missing test coverage
- Scope concerns
- Clear approval or requested changes

## Default Workflow

1. Read `docs/current-state.md`.
2. Confirm product scope from the PRD and MVP scope.
3. Check `docs/decisions/` for settled decisions.
4. Check architecture and data model constraints.
5. Create or select a small Linear issue.
6. Follow `docs/codebase-structure.md`.
7. Follow `docs/implementation-loop.md`.
8. Check `docs/definition-of-done.md`.
9. Update `docs/current-state.md` after meaningful state changes.
10. Review against acceptance criteria and MVP boundaries.
