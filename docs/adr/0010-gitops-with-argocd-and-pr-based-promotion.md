# ADR-0010: GitOps with Argo CD and PR-based promotion

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

Deployments must be auditable, reproducible and easy to roll back. The cluster state should be declared in Git rather than pushed imperatively by CI.

## Options considered

1. Push-based deploys from CI (`helm upgrade`) — simple, but drift is invisible and CI needs cluster credentials.
2. Flux — lightweight, available as an AKS extension.
3. Argo CD — clear UI for sync status, drift and history.

## Decision

Use **Argo CD** with Helm charts in `infra/helm` and per-environment values in `infra/argocd/envs/{dev,staging,prod}`.

- CI builds and pushes an image tagged with the commit SHA (and the SemVer tag on releases). Images are **immutable**; `latest` is never deployed.
- **dev**: CI commits the new tag to the dev values file; Argo CD syncs automatically.
- **staging/prod**: promotion is a pull request that copies the tag to the next environment's values file, merged only after approval.
- **Rollback**: revert the promotion commit; Argo CD syncs the previous tag. The procedure lives in `docs/runbooks/rollback.md`.

Cost note: dev and staging share one AKS cluster in separate namespaces until the MVP; prod gets its own cluster.

## Consequences

**Positive:** Git is the source of truth; every deploy and rollback is a reviewed commit; CI never holds cluster-admin credentials.

**Negative:** one more component to operate; promotion PRs add a step to each release.

**Revisit when:** the number of environments or services makes PR-based promotion noisy (consider Argo CD Image Updater or Kargo).
