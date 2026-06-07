# Design System

## Purpose

This document defines the visual and interaction direction for Composure's MVP UI surfaces.

The system is anchored in emotional headroom. Composure should feel like a quiet room for mental unloading, not a busy workshop for task management.

Product principle:

Capture fast. Decide later. Return now.

## Tokens

The tokens below are the source of truth for implementation. Use numeric React Native values in code, not CSS units.

### Colors

```yaml
surface: '#0b1326'
surface-dim: '#0b1326'
surface-bright: '#31394d'
surface-container-lowest: '#060e20'
surface-container-low: '#131b2e'
surface-container: '#171f33'
surface-container-high: '#222a3d'
surface-container-highest: '#2d3449'
on-surface: '#dae2fd'
on-surface-variant: '#c4c7cc'
inverse-surface: '#dae2fd'
inverse-on-surface: '#283044'
outline: '#8e9196'
outline-variant: '#43474c'
surface-tint: '#b8c8da'
primary: '#b8c8da'
on-primary: '#223240'
primary-container: '#8292a3'
on-primary-container: '#1c2b39'
inverse-primary: '#50606f'
secondary: '#bcc7de'
on-secondary: '#263143'
secondary-container: '#3e495d'
on-secondary-container: '#aeb9d0'
tertiary: '#b9c7df'
on-tertiary: '#233144'
tertiary-container: '#8392a8'
on-tertiary-container: '#1c2a3d'
error: '#ffb4ab'
on-error: '#690005'
error-container: '#93000a'
on-error-container: '#ffdad6'
primary-fixed: '#d4e4f6'
primary-fixed-dim: '#b8c8da'
on-primary-fixed: '#0d1d2a'
on-primary-fixed-variant: '#394857'
secondary-fixed: '#d8e3fb'
secondary-fixed-dim: '#bcc7de'
on-secondary-fixed: '#111c2d'
on-secondary-fixed-variant: '#3c475a'
tertiary-fixed: '#d5e3fc'
tertiary-fixed-dim: '#b9c7df'
on-tertiary-fixed: '#0d1c2e'
on-tertiary-fixed-variant: '#3a485b'
background: '#0b1326'
on-background: '#dae2fd'
surface-variant: '#2d3449'
```

The palette is monochromatic and deep. Use the slate-blue range to keep one emotional temperature, but avoid adding new decorative gradients or glows.

### Typography

Use the platform default font for MVP. Inter is the reference typeface, but do not add font-loading work unless a future decision calls for it.

```yaml
headline-lg:
  fontSize: 24
  fontWeight: '600'
  lineHeight: 32
  letterSpacing: 0
headline-md:
  fontSize: 20
  fontWeight: '500'
  lineHeight: 28
  letterSpacing: 0
body-lg:
  fontSize: 17
  fontWeight: '400'
  lineHeight: 24
  letterSpacing: 0
body-md:
  fontSize: 15
  fontWeight: '400'
  lineHeight: 22
  letterSpacing: 0
label-sm:
  fontSize: 13
  fontWeight: '500'
  lineHeight: 18
  letterSpacing: 0
label-xs:
  fontSize: 11
  fontWeight: '600'
  lineHeight: 16
  letterSpacing: 0
```

Use `allowFontScaling={true}` unless there is a specific layout reason not to. Do not use negative letter spacing. Do not scale font size with viewport width.

### Radius

```yaml
sm: 4
default: 8
md: 12
lg: 16
xl: 24
full: 9999
```

Shapes are rounded, but structured. Avoid softening everything into decorative blobs.

### Spacing

```yaml
base: 4
xs: 4
sm: 8
md: 16
lg: 24
xl: 32
gutter: 16
margin-edge: 20
```

Use an 8px rhythm with a 4px sub-grid for fine alignment.

## Brand And Style

The aesthetic is refined minimalism.

- Low friction: UI elements appear only when needed.
- Intentionality: Every tap has a clear purpose.
- Calmness: Deep surfaces and open space lower visual pressure.
- Fast capture: The path from thought to storage is short.
- Privacy: The app should feel personal and contained.

## Experience Principles

1. Capture fast: the thought input is the most accessible element.
2. Process later: the app accepts raw thoughts without demanding task metadata.
3. Space lightly: every thought still belongs to exactly one space, but space selection should feel like a gentle compartment choice.
4. Return now: after save, the UI should recede and encourage the user to leave the app.

## Landing Capture Surface

The primary app surface is Capture.

The landing capture screen should use a dark, quiet full-screen composition:

- Deep slate background.
- Large empty breathing room above the input.
- Thought input as the dominant first action.
- Placeholder: `What's on your mind?`
- Minimal underline below the input instead of a boxed field.
- Space selector directly below the input.
- Review time control below the spaces.
- Save action on the same horizontal plane as review control.
- Review time picker presented as a bottom sheet.

The capture surface should communicate: write it down, choose where it belongs, decide when to see it again, and leave.

## Layout

### Screen Shell

Use an edge-to-edge container with `margin-edge` horizontal padding. Respect safe areas.

Mobile is single-column. On tablet, content width should cap near 600 and center to preserve a focused sheet-like feeling.

### Capture Positioning

The capture input should sit below the visual midpoint on common phones, with enough empty space above it to feel quiet. Avoid a conventional top-heavy form layout.

## Elevation And Depth

Avoid shadows. Communicate depth through tonal layers and subtle opacity.

- Level 0: `background` as the canvas.
- Level 1: `surface-container-low` for controls.
- Level 2: `surface-container-high` for bottom sheets and raised surfaces.
- Active: `primary` or a subtle surface tint.

Transitions should be simple: opacity changes or vertical translations around 200ms. Avoid bouncy animations.

## Components

### Thought Input

The capture input should feel like a prompt, not a form field.

Rules:

- No surrounding card.
- No visible label above the input.
- Large placeholder text.
- Underline separator below the input.
- Multiline input, visually minimal.
- Text and cursor must remain readable on the dark surface.

### Space Selector

Spaces are gentle compartments, not projects.

Rules:

- Use pill controls for Personal, Work, and Family.
- Selected state should be clear but quiet.
- Do not add icons, counts, roles, sharing, or collaboration hints.

### Review Control

Review time stays optional.

Rules:

- Default value: Later.
- Do not imply reminders or notifications.
- Do not ask for notification permission.
- Present review choices in a bottom sheet.

MVP choices:

- Tonight.
- Tomorrow.
- This Weekend.
- Later (Default).

### Primary Button

The Save action should be prominent but soft.

Rules:

- Pale filled pill.
- Label: Save.
- Optional right arrow if it can be implemented without a new icon dependency.
- Disabled state should be visible but quiet.
- Keep the button on the capture surface, not buried in a form footer.

### Bottom Sheet

The review picker uses a bottom sheet.

Rules:

- Raised slate surface.
- Top corners rounded.
- Title: Review time.
- Close affordance in the top right.
- Large touch targets.
- Selected option uses a pale filled row.
- No calendar grid in MVP.

### Thought List Items

Inbox and Upcoming should feel like calm retrieval, not a backlog.

Rules:

- Use readable thought text.
- Show space and review time metadata.
- Mark processed action should be available but quiet.
- Avoid checklists, priority markers, badges, streaks, or counts.
- Do not add delete, move, edit, long-press menus, or archive actions in MVP.

### Segmented Choices

Use segmented choices only for small, immediate decisions.

Rules:

- Prefer a quiet track and tonal active state.
- Avoid border-heavy segmented controls.
- Do not use segments for task status or priority.

### Empty States

Empty states should reassure without celebrating.

Examples:

- Inbox: `The mind is clear.`
- Upcoming: `No scheduled reviews.`
- Spaces: `Your spaces are ready.`

Avoid playful rewards or productivity scoring.

### Error States

Errors should be plain and recoverable.

Preferred copy:

- `Something went wrong. Let's try again.`

Avoid technical error codes in UI copy unless needed for debugging.

### Loading States

Loading should be quiet.

Rules:

- Small activity indicator.
- Minimal copy.
- Preserve screen structure where possible.
- Avoid language like `Thinking` or AI-like processing states.

## Interaction Rules

- Capture must be the fastest path after authentication.
- Do not force a review time.
- Do not force users through multiple screens to save a thought.
- Do not ask users to classify beyond space.
- Do not introduce tags, projects, priority, status, estimates, or recurring settings in MVP.
- Use bottom sheets only for focused decisions.
- Haptics are future polish and should not be added until explicitly decided.

## Copy Rules

Voice should be short, direct, and emotionally quiet.

Prefer:

- `What's on your mind?`
- `Save`
- `Review time`
- `Later`
- `The mind is clear.`

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
- Bottom sheet close and option rows must be screen-reader accessible where supported.
- Do not rely on color alone for selected states.
- Use system font scaling by default.

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
