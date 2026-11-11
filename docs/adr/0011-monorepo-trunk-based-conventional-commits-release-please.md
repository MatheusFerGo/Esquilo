# ADR-0011: Monorepo, trunk-based development, Conventional Commits and release-please

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

Backend, mobile and infrastructure evolve together and share contracts (OpenAPI). The project has a single maintainer, so the process must be strict enough to protect quality yet light enough to sustain.

## Decision

- **Monorepo** with `backend/`, `mobile/`, `infra/` and `docs/`; CI uses path filters per component.
- **Trunk-based**: `main` is protected; short-lived `feature/*`, `fix/*`, `chore/*` branches (1–2 days); incomplete work ships behind feature flags.
- **Conventional Commits** enforced locally by commitlint (husky `commit-msg` hook) and on the PR title in CI, because **squash merge** turns the PR title into the commit on `main`.
- **release-please** in manifest mode creates one release PR per component. Tags: `api-vX.Y.Z`, `mobile-vX.Y.Z`, `infra-vX.Y.Z`. Pre-1.0, `feat` bumps the minor version.
- **Single-maintainer review policy**: zero required approvals, but required status checks, resolved conversations, a Definition of Done checklist in the PR template and a next-day re-read for changes to financial rules, authorization or personal data.

Known limitation: pull requests opened by the default `GITHUB_TOKEN` do not trigger other workflows. When CI becomes a required check (increment 0.4), release-please will use a GitHub App token.

## Consequences

**Positive:** automatic SemVer and changelogs; history on `main` is linear and meaningful; one place for cross-cutting changes.

**Negative:** the review is not independent; automation must compensate. Monorepo CI needs careful path filters to stay fast.

**Revisit when:** a second contributor joins (require one approval) or a component needs an independent repository.
