# Esquilo

Personal finance app for the Brazilian market: automatic expense categorization, cash-flow forecasting, subscription and anomaly detection, and savings insights. Built with LGPD compliance from day one.

> **Status:** Phase 0 — Foundation. Repository conventions are being set up.

## Repository layout

| Path | Contents |
|---|---|
| `backend/` | ASP.NET Core (.NET 10 LTS) modular monolith, workers and tests *(planned)* |
| `mobile/` | React Native + Expo + TypeScript app for iOS and Android *(planned)* |
| `infra/` | Terraform, Helm charts and Argo CD manifests *(planned)* |
| `docs/` | Architecture decision records, runbooks and C4 diagrams *(planned)* |

## Conventions

- Line endings are normalized to LF by `.gitattributes` (Windows scripts keep CRLF).
- Code style and analyzer rules live in `.editorconfig` and are enforced at build time.
- Real bank statements and personal data must never be committed. Use `samples/real/` folders, which are git-ignored, for local experiments only.
