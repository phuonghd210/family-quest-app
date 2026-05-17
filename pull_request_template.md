## Summary
- What changed? (1-3 bullets)
- Why this change?

## Scope check
- [ ] This PR is small and focused (single objective).
- [ ] No unrelated files changed.

## Production safety (required)
- [ ] No `<script type="module">` migration in `index.html`.
- [ ] No `import ... from ...` added to runtime script path.
- [ ] No frontend-backend contract change (`action`, `token`, `payload`) unless explicitly planned.

## Risk level
- [ ] Low
- [ ] Medium
- [ ] High

If Medium/High, explain:
- Risk:
- Mitigation:
- Rollback plan:

## Manual smoke test (required after merge)
- [ ] Hard refresh (`Ctrl+Shift+R`)
- [ ] Login success
- [ ] Open at least 1-2 tabs
- [ ] Perform 1 basic interaction
- [ ] Logout/login again
- [ ] Browser Console has no red runtime error

## Evidence
- Screenshots / notes:
- Console output (if relevant):

## Rollback
- Revert PR strategy:
- Link to PR to revert (after merge):
