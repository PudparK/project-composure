# Codebase Structure

## Purpose

This document defines where code belongs and how modules should depend on each other.

Agents should follow this contract when creating files, moving code, or reviewing architecture drift.

## app/

Route and screen entry points only.

Use for:

- Expo Router routes when Expo Router is chosen.
- Navigation-level screen composition.
- Route params and route handoff.

Do not place:

- Business logic.
- Supabase queries.
- Heavy state logic.
- Reusable feature components.

Screens in `app/` should delegate workflow behavior to feature modules.

## features/

Feature-oriented product modules.

Expected MVP features:

- `capture`
- `inbox`
- `upcoming`
- `spaces`
- `thoughts`

Each feature may contain:

- `components/`
- `hooks/`
- `services/`
- `types.ts`
- `utils.ts`

Feature modules own product behavior for their area. For example, capture-specific validation belongs in `features/capture`, while general date formatting belongs in `lib/`.

## lib/

Shared infrastructure and low-level utilities only.

Use for:

- Supabase client setup.
- Date utilities.
- Storage helpers.
- Environment/config helpers.
- Generic formatting helpers.

Do not place:

- Feature-specific business logic.
- Screen-specific state.
- Product workflow orchestration.

If a helper knows about capture, inbox, upcoming reviews, or spaces, it probably belongs in `features/`, not `lib/`.

## services/

External system integrations only.

Use for:

- Supabase domain gateway modules if they are shared across features.
- Future external API integrations.

Do not place:

- UI logic.
- Route logic.
- Generic utilities.

MVP note: prefer feature-local `services/` unless an integration is truly shared across multiple features.

## types/

Shared domain types only.

Use for:

- Cross-feature domain types.
- Supabase generated database types.
- Shared enums or unions that are part of the domain contract.

Do not place:

- Component prop types that are only used in one component.
- Feature-private types.

Prefer feature-local `types.ts` until a type is genuinely shared.

## components/

Shared reusable UI components only.

Use for:

- App-wide primitives.
- Small reusable controls.
- Shared layout components.

Do not place:

- Feature-specific list items.
- Screen-specific sections.
- Components that depend on a single feature's data shape.

## Import Boundaries

- `app/` may import from `features/`, `components/`, `lib/`, and `types/`.
- `features/` may import from `components/`, `lib/`, and `types/`.
- `features/` should not import from `app/`.
- Feature modules should avoid importing from sibling features unless the dependency is explicitly shared and stable.
- `lib/` should not import from `features/` or `app/`.
- `types/` should not import from `app/` or feature UI modules.

## Ownership Rules

- Product workflow logic belongs to the owning feature.
- Infrastructure belongs to `lib/` or `services/`.
- Shared UI belongs to `components/`.
- Cross-feature domain contracts belong to `types/`.
- Route files should remain thin.

When unsure, keep code closer to the feature first. Promote to shared folders only after real reuse appears.

## New Folder Rule

Do not create a new top-level folder without updating this document and `docs/current-state.md`.
