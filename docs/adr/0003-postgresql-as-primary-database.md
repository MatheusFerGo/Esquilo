# ADR-0003: PostgreSQL as the primary database

- **Status:** Accepted
- **Date:** 2026-11-11
- **Deciders:** Matheus Fernandes Gomes

## Context

We need a relational store for financial data with strong consistency, multi-user isolation and good local/test ergonomics. A guiding constraint is to avoid unnecessary coupling to proprietary cloud services.

## Options considered

1. Azure SQL Database — mature, Always Encrypted, but SQL Server–specific and costlier to replicate locally and in tests.
2. Azure Database for PostgreSQL Flexible Server — open engine, portable across clouds.

## Decision

Use **PostgreSQL** (Azure Database for PostgreSQL Flexible Server in the cloud, the official image in Testcontainers and local development), accessed through EF Core with the Npgsql provider.

- Native **row-level security** is used as a second isolation layer (ADR-0004).
- `jsonb` is available for semi-structured import metadata.
- `pgvector` is available later for embedding-based categorization without a new datastore.
- Monetary columns use `numeric(19,4)`; never floating point.
- Timestamps use `timestamptz` and are stored in UTC.

## Consequences

**Positive:** portability, cheap and faithful integration tests, RLS and extensions without extra services.

**Negative:** no Always Encrypted; sensitive fields are encrypted in the application instead (ADR-0012), which we need anyway for crypto-shredding.

**Revisit when:** a managed-service requirement appears that only Azure SQL fulfills, or PostgreSQL operations become a bottleneck.
