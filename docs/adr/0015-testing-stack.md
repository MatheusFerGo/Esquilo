# ADR-0015: Testing stack

- **Status:** Accepted
- **Date:** 2026-11-17
- **Deciders:** Matheus Fernandes Gomes

## Context

The Definition of Done requires TDD in the financial domain, integration tests without infrastructure mocks, architecture tests and mutation testing. FluentAssertions moved to a commercial license from version 8, and ADR-0005 established that dependencies must be permissively licensed and replaceable.

## Decision

| Concern | Tool | License |
|---|---|---|
| Unit tests | xUnit v3 | Apache 2.0 |
| Assertions | AwesomeAssertions (community fork of FluentAssertions 7) | Apache 2.0 |
| Test doubles | NSubstitute | BSD-3-Clause |
| Integration | `WebApplicationFactory` + Testcontainers (PostgreSQL, Redis, Service Bus emulator) | MIT |
| Architecture | NetArchTest | MIT |
| Mutation | Stryker.NET on modules with critical financial rules | Apache 2.0 |
| Contract | OpenAPI as source of truth; Pact between API and app | MIT |
| Mobile E2E | Maestro | Apache 2.0 |
| Performance | k6 (read endpoints p95 < 300 ms) | AGPL-3.0, used only as an unmodified CLI tool |
| Security | CodeQL (SAST), OWASP ZAP (DAST, from staging), authorization tests | Free for public repositories / Apache 2.0 |

Rules:

- Test names follow `Method_Scenario_ExpectedResult`.
- Unit tests never touch the network, the file system or the clock; time comes from `TimeProvider`.
- Integration tests run against real infrastructure in containers; infrastructure is never mocked.
- Coverage gate: 80% line coverage on Domain and Application projects, enforced in CI.

## Consequences

**Positive:** no license costs; tests run against real infrastructure; boundaries and money rules are guarded by automation.

**Negative:** integration tests need Docker locally and in CI and are slower; mutation tests are run selectively to keep CI time acceptable.

**Revisit when:** CI time exceeds about 10 minutes per pull request, or a tool changes its license terms.
