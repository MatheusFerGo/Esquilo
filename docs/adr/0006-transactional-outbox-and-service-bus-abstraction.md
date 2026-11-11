# ADR-0006: Transactional outbox with Azure Service Bus behind an abstraction

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

Modules react to each other's events (for example, a statement upload triggers parsing, which triggers categorization). Publishing to a broker in the same request as a database write risks lost or phantom events. We also want to avoid hard coupling to Azure Service Bus.

## Decision

- Each module writes integration events to its own **outbox table** in the same database transaction as the state change.
- A relay in `Esquilo.Workers` reads the outbox and publishes to the broker through `IEventBus`.
- The production adapter uses **Azure Service Bus** (Standard tier, topics and subscriptions). Tests use the Service Bus emulator via Testcontainers.
- Consumers are **idempotent**: each module keeps an inbox table of processed message ids.
- Messages carry ids and references only; they never carry personal or financial payloads.

## Consequences

**Positive:** at-least-once delivery without dual-write inconsistency; broker replaceable by implementing `IEventBus`.

**Negative:** eventual consistency between modules; outbox and inbox tables need cleanup jobs.

**Revisit when:** throughput or ordering needs exceed what Service Bus Standard offers.
