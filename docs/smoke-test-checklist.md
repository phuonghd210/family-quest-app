# Smoke Test Checklist (Manual, Non-Technical Friendly)

> Goal: Verify app still works after each safe refactor step.
> Run this checklist in order.

## Pre-test setup
1. Open app URL in browser.
2. Prepare 3 accounts (if available):
   - admin
   - scorer
   - viewer (mapped to one child)
3. Have at least:
   - 2 active children
   - several tasks in multiple categories
   - at least 1 reward

Expected output:
- You can log in with each account and see tabs.

---
## Case 1 — Login / Session restore

### 1A. Login success
Steps:
1. Enter valid username/password.
2. Click login.
Expected:
- App main screen appears.
- Current user badge shows display name + role.

### 1B. Login invalid
Steps:
1. Enter wrong password.
2. Click login.
Expected:
- Stay on login screen.
- Error feedback shown (inline or toast).

### 1C. Reload session
Steps:
1. Login successfully.
2. Refresh browser page.
Expected:
- Session auto-restored (no forced login again) if token valid.

---
## Case 2 — Today tab
Steps:
1. Open tab “Hôm Nay”.
2. Check leader cards and each child score card.
Expected:
- Scores and progress bars render without broken layout.
- Date label appears.

---
## Case 3 — Tasks tab (admin/scorer)
Steps:
1. Open “Nhiệm Vụ”.
2. Switch category filters.
3. Tick one task for one child.
4. Untick same task.
Expected:
- Filter updates immediately.
- Tick/untick succeeds and score updates after refresh.
- No frozen loading overlay.

---
## Case 4 — Tasks tab (viewer)
Steps:
1. Login as viewer.
2. Open “Nhiệm Vụ”.
3. Try tapping task checks.
Expected:
- Viewer cannot change task completion.
- No unexpected API mutation should happen.

---
## Case 5 — Points tab
Steps:
1. Login admin/scorer.
2. Open “Thưởng/Phạt”.
3. Submit one bonus (+).
4. Submit one penalty (- via type=penalty with positive points input).
Expected:
- Success toast appears.
- Recent transactions list updates.

---
## Case 6 — Rewards tab
Steps:
1. Open “Phần Thưởng”.
2. Select child and redeem one reward.
3. Confirm in modal.
Expected:
- Redemption success message.
- Redemption history shows new record.

---
## Case 7 — Rankings & History
Steps:
1. Open “Xếp hạng”.
2. Open “Lịch sử”.
Expected:
- No blank/broken sections.
- Chart and recent logs render.

---
## Case 8 — Settings permissions

### 8A. admin/scorer
Steps:
1. Open “Cài đặt”.
2. Add one task (valid data).
3. Add one reward (valid data).
Expected:
- New entities appear after refresh.

### 8B. viewer
Steps:
1. Login as viewer.
2. Confirm settings tab hidden or blocked.
Expected:
- Viewer cannot access admin/scorer settings actions.

---
## Case 9 — Logout
Steps:
1. Click logout button.
2. Refresh page.
Expected:
- Returned to login screen.
- No authenticated screen until login again.

---
## Bug report template (copy/paste)
- Time:
- Account role:
- Tab:
- Action performed:
- Expected:
- Actual:
- Screenshot attached: Yes/No
- Console error text (if any):
