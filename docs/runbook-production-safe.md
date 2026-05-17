# Production-safe Runbook (No Preview Environment)

## 1) Pre-merge checklist (60s)
- [ ] PR scope is minimal (prefer 1 small change).
- [ ] No `<script type="module">` migration.
- [ ] No `import ... from ...` added in `index.html`.
- [ ] No API contract change (`action`, `token`, `payload`).
- [ ] Rollback path identified (which PR to revert).

## 2) Post-merge smoke test (60s)
- [ ] Hard refresh page (Ctrl+Shift+R).
- [ ] Login success.
- [ ] Open at least 1 tab (Today/Tasks).
- [ ] Perform 1 basic interaction.
- [ ] Logout/login again.
- [ ] Check browser Console for red errors.

## 3) Fast rollback
1. Open merged PR.
2. Click `Revert`.
3. Create revert PR.
4. Merge revert PR immediately.
5. Re-run post-merge smoke test.

## 4) High-risk changes (must avoid directly on production)
- Converting script runtime to ES modules in `index.html`.
- Large refactors touching many areas in one PR.
- Simultaneous API + UI architecture changes in one merge.

## 5) Incident log template
- Time:
- PR link:
- Symptom:
- Console error:
- Impact:
- Rollback PR:
- Recovery time:
- Follow-up action:
