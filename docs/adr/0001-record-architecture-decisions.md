# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

Esquilo is built by a single maintainer over a long horizon and handles regulated, sensitive data (LGPD). Decisions made today must be understandable months later, including by future contributors and auditors.

## Decision

Record every architecturally significant decision as a Markdown ADR in `docs/adr`, using the template in `0000-template.md` (a lightweight MADR variant).

- Files are numbered sequentially and never renumbered.
- An accepted ADR is not rewritten. A change of direction creates a new ADR that supersedes it, and the old one is marked `Superseded by ADR-XXXX`.
- ADRs are written in English and merged through a pull request like any code change (`docs(adr): ...`).
- Each ADR states a concrete **Revisit when** trigger.

## Consequences

**Positive:** decisions and their trade-offs are traceable; the history shows when and why they changed.

**Negative:** small writing overhead per decision.

**Revisit when:** the team grows beyond one maintainer and needs a formal review process for ADRs.
