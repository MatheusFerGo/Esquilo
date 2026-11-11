# ADR-0004: Multi-tenancy with shared schema, workspace isolation and RLS

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

Couples and family mode arrive only in Phase 4, but retrofitting multi-user isolation into financial data is expensive and risky. A single authorization bug that exposes one user's finances to another is the worst possible incident for this product.

## Decision

Model tenancy from day one around **workspaces**:

- `User` has an internal id and an `ExternalSubject` (the identity provider's `sub`). Provider identifiers are never domain keys.
- `Workspace` has a type (`Personal` or `Shared`). Every user gets a personal workspace on first sign-in.
- `WorkspaceMember` links a user to a workspace with a role: `Owner`, `Admin`, `Member` or `Viewer`.
- Every financial entity implements `IWorkspaceOwned` with `WorkspaceId`, `OwnerMemberId` and `Visibility` (`Private` or `Shared`), enabling per-item privacy later.

Isolation has two independent layers:

1. EF Core global query filters by the current `WorkspaceId`.
2. PostgreSQL **row-level security** policies keyed on a session setting (`app.workspace_id`) set per connection, so a missing filter still cannot leak rows.

## Consequences

**Positive:** Phase 4 is a feature, not a migration; defense in depth against the most damaging bug class.

**Negative:** every query and connection must carry workspace context; background workers must set it explicitly. RLS adds testing effort.

**Revisit when:** a single tenant's data volume justifies sharding or dedicated databases.
