# Decision

## Context

Composure needs every thought to belong somewhere meaningful so users can defer thoughts without losing context.

The MVP starts with personal, work, and family spaces. Future versions may support shared spaces, but collaboration is not part of the MVP.

## Decision

Thoughts belong to spaces.

Spaces are first-class records with an owner and memberships. In the MVP, each space has one owner membership and no collaboration UI.

Authorization should be based on space membership where practical, even though MVP spaces behave like single-user spaces.

## Consequences

- The thought table keeps a stable `space_id` relationship.
- Future shared spaces can be added without reshaping the thought table.
- MVP implementation must avoid exposing invites, roles, shared activity, comments, or presence.
- Agents should not replace spaces with a simple category enum.
