# Stage 1 / Step 1.4 — Error Handling Policy (Post apiClient integration)

## Goal
Keep runtime behavior stable while making API failures easier to diagnose.

## Rules
1. Do not change backend contract (`action`, `token`, `payload`).
2. Do not change role/permission behavior in UI.
3. Keep existing user-facing toast messages unless message is empty.
4. Classify API failures into:
   - network
   - http
   - auth
   - business
   - parse
   - unknown
5. Always log action + error_type + duration when request fails.

## UI Behavior
- Existing `try/catch` blocks in `index.html` remain valid.
- On failure, continue showing current toast strings.
- No blocking modal added in this step.

## Rollback
If unexpected issues occur:
1. Revert latest commit touching `index.html` api wrapper integration.
2. Keep docs and apiClient foundation file.
