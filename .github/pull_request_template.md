## What and why

<!-- One or two sentences. Link the ADR or issue if relevant. -->

## How to validate

<!-- Commands, endpoints or screens that prove this works. -->

## Definition of Done (self-review)

- [ ] PR title follows Conventional Commits and the branch is at most 2 days old
- [ ] Builds with zero warnings (analyzers as errors, nullable enabled / TS strict)
- [ ] Tests written with the code; Domain/Application coverage stays >= 80%
- [ ] Money uses `decimal` with explicit currency; dates stored in UTC
- [ ] No personal or financial data in logs, fixtures or commits
- [ ] Authorization checked: a user cannot reach another workspace's data
- [ ] Integrations and handlers are idempotent
- [ ] Unfinished functionality is behind a feature flag
- [ ] Docs updated (README, ADR, OpenAPI, runbook) where applicable
- [ ] Touches financial rules, authorization or personal data? Re-read the diff the next day before merging

## Risks and rollback

<!-- What could break and how to revert. "None" is a valid answer for docs-only changes. -->
