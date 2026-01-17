<!-- Generated from .github/PR_BODY_templates/feat-autosave.template.md -->

# feat(autosave): add autosave service and tests

## Summary

Adds a small autosave service for the editor and accompanying unit tests. The service exposes start/stop and an `immediateSave` helper and is test-covered to validate periodic saves and manual flush.

## What this PR contains

- Scope: Frontend autosave implementation and tests
- Files changed (high level):
  - `frontend/src/services/autoSave.ts`
  - `frontend/src/services/autoSave.test.ts`

## Tests

- Unit tests: autosave unit tests added and passing locally
- Integration/e2e: none in this PR

## How to run locally

```bash
# run frontend unit tests (autosave file)
npm --prefix frontend test -- --testPathPattern="services/autoSave.test.ts" --runInBand
```

## Notes

- This PR is intentionally scoped to the autosave service (T023). No UI changes or backend changes included.

## Suggested PR title

feat(autosave): add autosave service and unit tests

## Suggested reviewers

- Frontend: @frontend-owner
