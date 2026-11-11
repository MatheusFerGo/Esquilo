# ADR-0002: Modular monolith with Clean Architecture per module

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

The product has several bounded contexts (identity, imports, transactions, categorization, forecasting, alerts). There is one maintainer and no proven load profile. Microservices would multiply deployment, observability and consistency costs before they bring any benefit.

## Options considered

1. Microservices from day one — independent scaling, but very high operational cost for one person.
2. Layered monolith — cheap, but boundaries erode and later extraction is painful.
3. Modular monolith with enforced boundaries — single deployable, extraction-ready.

## Decision

Build a **modular monolith**. Each module follows Clean Architecture with these projects:

- `Esquilo.Modules.<Name>.Domain` — entities, value objects, domain events. No framework dependencies.
- `Esquilo.Modules.<Name>.Application` — commands, queries, handlers, ports.
- `Esquilo.Modules.<Name>.Infrastructure` — EF Core, external adapters.
- `Esquilo.Modules.<Name>.Api` — endpoints.
- `Esquilo.Modules.<Name>.Contracts` — the **only** project other modules may reference (integration events and public queries).

Rules:

- Each module owns its own database schema; no cross-schema joins or foreign keys.
- Modules communicate through `Contracts` (in-process queries) or integration events via the outbox (ADR-0006).
- Heavy and asynchronous work runs in a separate `Esquilo.Workers` host (`BackgroundService`), sharing the same modules.
- Boundaries are enforced by NetArchTest in `Esquilo.ArchitectureTests`; a violation fails CI.

## Consequences

**Positive:** one deployable and one pipeline; a module can be extracted later because it already has its own schema, contracts and events.

**Negative:** discipline is required; shared-kernel creep must be watched. Two hosts (API and workers) from day one.

**Revisit when:** a module needs independent scaling or release cadence, or a second team owns part of the system.
