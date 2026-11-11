# ADR-0008: Terraform for infrastructure as code

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

All infrastructure must be reproducible and reviewed through pull requests. The project wants to avoid unnecessary coupling to Azure, and some resources live outside Azure Resource Manager (GitHub settings, Entra applications, DNS).

Terraform has been distributed under the Business Source License (BUSL 1.1) since 2023. The license allows production use, except offering Terraform to third parties as a hosted or embedded product that competes with HashiCorp's paid offerings. Esquilo uses Terraform only as an internal tool, so the restriction does not apply.

## Options considered

1. Bicep — first-class Azure support and no state file, but Azure-only.
2. Terraform — multi-provider, largest ecosystem, BUSL license, requires state management.
3. OpenTofu — open-source fork (MPL 2.0, Linux Foundation) with the same language and native state encryption, but a smaller ecosystem.

## Decision

Use **Terraform** with the `azurerm`, `azuread` and `github` providers.

- Remote state in an Azure Storage Account with blob lease locking, one state per environment. The account is encrypted at rest, has no public access and is reachable only by the pipeline identity and the maintainer.
- Secrets are kept out of state whenever possible (generated in Key Vault, not passed through Terraform).
- Layout: reusable modules in `infra/terraform/modules`, one root per environment in `infra/terraform/envs/{dev,staging,prod}`.
- `terraform fmt`, `validate`, `plan` and a security scan run in CI; `apply` only through the pipeline with environment approval.
- The Terraform version is pinned (`required_version` and the dependency lock file).
- Configuration stays within the feature set shared with OpenTofu when a common alternative exists, keeping OpenTofu as the exit route.
- Primary region: **Brazil South**.

## Consequences

**Positive:** one tool for Azure, identity and GitHub; the largest ecosystem and learning material; skills transfer to other clouds.

**Negative:** the license is controlled by a single vendor and may change for future versions; state must be protected because it can contain secrets; provider updates sometimes lag new Azure features.

**Revisit when:** the license terms change in a way that affects internal use, or a required Azure feature is unavailable in the provider for longer than an increment.
