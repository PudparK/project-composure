# Design System

## Purpose

This document defines the visual and interaction direction for Composure's MVP UI surfaces.

The design should make the app feel like a place to set a thought down, not a place to manage work.

Product principle:

Capture fast. Decide later. Return now.

## Experience Qualities

Composure should feel:

- Calm.
- Lightweight.
- Intentional.
- Emotionally quiet.
- Low-friction.
- Private.

The UI should avoid productivity-tool density. It should not feel like task creation, project management, coaching, analytics, or a notification system.

## Landing Capture Surface

The primary app surface is Capture.

The landing capture screen should use a dark, quiet full-screen composition:

- Deep navy background.
- Large empty breathing room above the input.
- Thought input as the dominant first action.
- Placeholder: `What's on your mind?`
- Minimal underline below the input instead of a boxed field.
- Space selector directly below the input.
- Review time control below the spaces.
- Save action on the same horizontal plane as review control.
- Review time picker presented as a bottom sheet.

The capture surface should communicate: write it down, choose where it belongs, decide when to see it again, and leave.

## Color Tokens

### Core

- `surface.base`: `#081224`
- `surface.raised`: `#202a3c`
- `surface.subtle`: `#111a2d`
- `surface.control`: `#131d31`
- `surface.controlSelected`: `#d7e3f1`

### Text

- `text.primary`: `#e8eef8`
- `text.secondary`: `#a4adbd`
- `text.placeholder`: `#5f6879`
- `text.inverse`: `#0b1627`

### Lines And Borders

- `border.strong`: `#d8e2ef`
- `border.subtle`: `#29344a`

### Actions

- `action.primary`: `#d7e3f1`
- `action.primaryPressed`: `#c3d2e4`
- `action.quiet`: `#141e32`
- `action.quietPressed`: `#1a263d`

Use color sparingly. The palette should stay mostly dark navy, softened gray-blue, and pale blue action surfaces.

## Typography

Use the platform default font.

- Screen prompt: 28-32, weight 700, line height 36-40.
- Section label: 12, weight 700, uppercase.
- Control text: 18-20, weight 400-500.
- Body/list text: 16-18, weight 400.
- Metadata: 12-14, weight 500.

Do not use negative letter spacing. Do not scale type with viewport width.

## Spacing

Use generous spacing on capture and tighter spacing on review lists.

- Screen horizontal padding: 24.
- Capture top breathing room: large enough that the input begins below the visual midpoint on common phones.
- Section gap: 16-24.
- Control gap: 10-12.
- Bottom sheet padding: 30 horizontal, 28 top.
- Button min height: 56.
- Pill min height: 50.

## Components

### Screen Shell

Capture should be full-bleed dark and mostly empty.

List screens can reuse the same dark foundation, but may use slightly raised list items. Avoid large decorative panels.

### Thought Input

The capture input should feel like a prompt, not a form field.

Rules:

- No surrounding card.
- No visible label above the input.
- Large placeholder text.
- Underline separator below the input.
- Multiline input, but visually minimal.
- Keep cursor and text high contrast enough to read comfortably.

### Space Selector

Spaces are gentle compartments, not projects.

Rules:

- Use pill controls.
- Initial spaces: Personal, Work, Family.
- Selected state should be clear but quiet.
- Do not add icons, counts, roles, or collaboration hints.

### Review Control

Review time should stay optional.

Rules:

- Use a small clock affordance plus label/value text.
- Default value: Later.
- Do not imply reminders or notifications.
- Do not ask for notification permission.

Review options for MVP:

- Tonight.
- Tomorrow.
- This Weekend.
- Later (Default).

### Primary Action

The Save action should be prominent but soft.

Rules:

- Pale filled pill.
- Label: Save.
- Optional right arrow icon.
- Disabled state should be visible but not noisy.
- Keep the button on the capture surface, not buried in a form footer.

### Bottom Sheet

The review picker uses a bottom sheet.

Rules:

- Raised navy surface.
- Top corners rounded.
- Title: Review time.
- Close affordance in the top right.
- Large touch targets.
- Selected option can use a pale filled row.
- No calendar grid in MVP.

### Thought List Items

Inbox and Upcoming should feel like calm retrieval, not a backlog.

Rules:

- Use readable thought text.
- Show space and review time metadata.
- Mark processed action should be available but quiet.
- Avoid checklists, priority markers, badges, streaks, or counts.

### Empty States

Empty states should reassure without celebrating.

Examples:

- Inbox: `Nothing waiting.`
- Upcoming: `No scheduled reviews.`
- Spaces: `Your spaces are ready.`

Avoid playful rewards or productivity scoring.

### Error States

Errors should be plain and recoverable.

Rules:

- State what failed.
- Offer Retry when useful.
- Do not use alarming colors as the dominant screen tone.

### Loading States

Loading should be quiet.

Rules:

- Small activity indicator.
- Minimal copy.
- Preserve screen structure where possible.

## Interaction Rules

- Capture must be the fastest path after authentication.
- Do not force a review time.
- Do not force users through multiple screens to save a thought.
- Do not ask users to classify beyond space.
- Do not introduce tags, projects, priority, status, estimates, or recurring settings in MVP.
- Use bottom sheets only for focused decisions.
- Keep destructive or completion actions calm and reversible only if undo is implemented.

## Copy Rules

Voice should be short, direct, and emotionally quiet.

Prefer:

- `What's on your mind?`
- `Save`
- `Review time`
- `Later`
- `Nothing waiting.`

Avoid:

- Productivity slogans.
- Coaching language.
- Gamified praise.
- AI language.
- Notification language.
- Over-explaining the app inside the UI.

## Accessibility

- All interactive controls must have minimum 44x44 touch targets.
- Text contrast must remain readable on the dark background.
- Controls must expose button roles where possible.
- Bottom sheet close and option rows must be keyboard/screen-reader navigable where supported.
- Do not rely on color alone for selected states.

## MVP Anti-Patterns

Do not add:

- AI features.
- Notifications.
- Collaboration UI.
- Analytics dashboards.
- Streaks or points.
- Priority labels.
- Project/task metaphors.
- Tag taxonomies.
- Calendar-heavy scheduling.
- Decorative gradients, orbs, or illustrations.
- Cards inside cards.
