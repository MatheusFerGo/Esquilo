# ADR-0009: GitHub Actions with OIDC federation to Azure

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

The repository is on GitHub. The pipeline must build, test, scan, push images and deploy with approvals, without long-lived cloud secrets.

## Options considered

1. Azure DevOps Pipelines — rich approvals, but a second platform to maintain.
2. GitHub Actions — native path filters, Dependabot, CodeQL and release-please in one place.

## Decision

Use **GitHub Actions**.

- One workflow per component with path filters: `backend.yml`, `mobile.yml`, `infra.yml`.
- Authentication to Azure through **OpenID Connect workload identity federation**; no client secrets stored in GitHub.
- GitHub Environments (`dev`, `staging`, `prod`) hold approval rules; `staging` and `prod` require manual approval.
- Third-party actions are pinned to a full commit SHA once CI goes live in increment 0.4, and updated by Dependabot.
- The repository is **public**. No secrets, state files or environment-specific values are committed, and detection thresholds (rate limits, fraud and anomaly rules) live in external configuration.
- Workflows triggered by pull requests from forks never receive secrets or cloud credentials; the OIDC trust is restricted to this repository and its protected environments.

## Consequences

**Positive:** code, reviews, scans and releases in one platform; no secrets to rotate for Azure access.

**Negative:** environment approval features are simpler than Azure DevOps; a public repository exposes the architecture to anyone, so security cannot rely on obscurity.

**Revisit when:** compliance requires audit features only available elsewhere, or minutes become a cost issue.
