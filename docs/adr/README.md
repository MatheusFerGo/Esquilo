# Architecture Decision Records

Format and rules: [ADR-0001](0001-record-architecture-decisions.md). Template: [0000-template.md](0000-template.md).

ADRs marked as **Planned** are decided in principle; they are written at the start of the increment that implements them.

| ADR | Title | Status |
|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted |
| [0002](0002-modular-monolith-clean-architecture.md) | Modular monolith with Clean Architecture per module | Accepted |
| [0003](0003-postgresql-as-primary-database.md) | PostgreSQL as the primary database | Accepted |
| [0004](0004-multi-tenancy-shared-schema-with-rls.md) | Multi-tenancy with shared schema, workspace isolation and RLS | Accepted |
| [0005](0005-in-house-command-handlers-instead-of-mediator-library.md) | In-house command and query handlers instead of a mediator library | Accepted |
| [0006](0006-transactional-outbox-and-service-bus-abstraction.md) | Transactional outbox with Azure Service Bus behind an abstraction | Accepted |
| [0007](0007-entra-external-id-via-standard-oidc.md) | Microsoft Entra External ID via standard OIDC | Accepted |
| [0008](0008-terraform-for-infrastructure.md) | Terraform for infrastructure as code | Accepted |
| [0009](0009-github-actions-with-azure-oidc-federation.md) | GitHub Actions with OIDC federation to Azure | Accepted |
| [0010](0010-gitops-with-argocd-and-pr-based-promotion.md) | GitOps with Argo CD and PR-based promotion | Accepted |
| [0011](0011-monorepo-trunk-based-conventional-commits-release-please.md) | Monorepo, trunk-based, Conventional Commits and release-please | Accepted |
| 0012 | Field-level envelope encryption and crypto-shredding | Planned (Phase 1) |
| 0013 | OpenTelemetry with PII redaction | Planned (increment 0.8) |
| 0014 | Expo development builds and a generated API client | Planned (increment 0.7) |
| [0015](0015-testing-stack.md) | Testing stack | Accepted |
| 0016 | API versioning and expand/contract migrations | Planned (increment 0.6) |
| 0017 | File-based statement import first, Open Finance later | Planned (Phase 1) |
