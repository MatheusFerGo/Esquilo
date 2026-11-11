# ADR-0007: Microsoft Entra External ID as identity provider, consumed via standard OIDC

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

We need consumer sign-up and sign-in with MFA, and a mobile app that unlocks with biometrics. Building identity in-house is a security liability; self-hosting Keycloak adds operational load for a single maintainer.

## Options considered

1. In-house identity (ASP.NET Core Identity) — full control, but we would store credentials and own every attack surface.
2. Self-hosted Keycloak — open source and portable, but one more critical system to patch and operate.
3. Microsoft Entra External ID — managed, integrates with the Azure stack, proprietary.

## Decision

- Use **Microsoft Entra External ID** (external tenant) as the identity provider.
- The mobile app uses **Authorization Code + PKCE**; tokens are stored in Keychain/Keystore via secure storage.
- The API only validates JWT access tokens (issuer, audience, signature, lifetime) using standard OpenID Connect discovery. No provider SDK in the domain or application layers.
- MFA starts with email OTP or authenticator app; SMS is avoided initially because of per-message cost.
- Biometrics are a **local unlock** of the stored session, not an authentication factor towards the server.
- The tenant's data location is chosen to keep data in, or as close as possible to, Brazil, and is recorded in the LGPD processing register.

## Consequences

**Positive:** managed MFA, account recovery and compliance features; switching providers becomes configuration plus a user migration.

**Negative:** dependency on Microsoft's CIAM roadmap and pricing; customization of hosted pages is limited.

**Revisit when:** cost per monthly active user becomes significant or a required flow is not supported.
