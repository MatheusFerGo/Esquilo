# ADR-0005: In-house command and query handlers instead of a mediator library

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

The architecture calls for lightweight CQRS with MediatR "or equivalent". Since 2025, new MediatR versions are distributed under a commercial license. A license change is not retroactive, but it leaves a project frozen on an unmaintained version or forced into a migration.

The dispatching mechanism sits at the center of every use case, so a forced migration there would touch the whole application. The code needed to replace a mediator library is small.

## Options considered

1. MediatR (commercial license) — familiar API, recurring cost.
2. `Mediator` (martinothamar, MIT) — source-generated and free, but a single-maintainer dependency at the core of the application.
3. In-house dispatcher (`sender.Send(command)`) — no dependency, but needs reflection to locate handlers.
4. No dispatcher: handlers injected directly, cross-cutting concerns as decorators — no dependency, explicit flow.

## Decision

Use **option 4**. The application owns its CQRS abstractions and has no mediator library.

- `ICommand<TResult>`, `IQuery<TResult>`, `ICommandHandler<TCommand, TResult>` and `IQueryHandler<TQuery, TResult>` live in the building blocks.
- Endpoints and workers receive the specific handler interface through dependency injection and call `HandleAsync` directly.
- Cross-cutting concerns (validation, logging, transactions) are **decorators** around handlers, registered once in a fixed, documented order.
- A registration helper scans module assemblies at startup, registers every handler and applies the decorators.
- Domain events, which have many listeners per event, use a small in-house `IDomainEventDispatcher`.
- A test builds the dependency injection container with scope and build validation enabled, so a missing or misconfigured handler fails CI.

Dependency rule of thumb, applied to future choices: **write it in-house when the code is small and central to the application; depend on a library when the problem is large and hard, and isolate it behind our own interface.**

## Consequences

**Positive:** no license or maintenance risk at the core; the flow from endpoint to handler is explicit and navigable; the pattern is fully understood by the maintainer.

**Negative:** about 100 lines of infrastructure code to own and test; handler signatures in endpoints are more verbose; registration errors surface at startup instead of compile time; new capabilities (for example, streaming) must be written by us.

**Revisit when:** the in-house code grows beyond a few hundred lines or needs features that a well-maintained, permissively licensed library already provides.
