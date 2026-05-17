# Frontend API Contract Map (Stage 0)

> Scope: Document what `index.html` currently sends and expects.
> Important: This is **observed contract from frontend usage**, not authoritative backend schema.

## A. Transport contract (common to all actions)
- Endpoint: `POST` to GAS Web App URL.
- Body shape:
```json
{
  "action": "<string>",
  "token": "<string|null>",
  "payload": { "...": "..." }
}
```
- Generic response expectation from frontend:
  - `success: boolean`
  - `message?: string`

## B. Action-by-action map

## 1) `login`
- Sent payload:
  - `username: string`
  - `password: string`
- Frontend expects on success:
  - `token`
  - `user_id`
  - `username`
  - `display_name`
  - `role`
  - `child_id` (optional)
- Frontend behavior:
  - Save token/user to localStorage.
  - Switch to app screen and fetch initial data.

## 2) `validateSession`
- Sent payload: `{}`
- Uses existing `token` from localStorage.
- Frontend expects on success:
  - `user_id`, `username`, `display_name`, `role`, `child_id`
- Frontend behavior:
  - Refresh local user profile.
  - If fail -> clear localStorage and show login.

## 3) `getInitialData`
- Sent payload: `{}`
- Frontend expects fields:
  - `children[]`
  - `tasks[]`
  - `rewards[]`
  - `transactions[]`
  - `dailyStatus[]`
  - `redemptions[]`
  - `today`
  - `week_start`
- Frontend filter assumptions:
  - children: `status === 'active'` or missing status
  - tasks: `status === 'active'`
  - rewards: `status === 'active'`

## 4) `completeTask`
- Sent payload:
  - `child_id`
  - `task_id`
- Frontend expects:
  - `success`, `message`

## 5) `undoTask`
- Sent payload:
  - `child_id`
  - `task_id`
- Frontend expects:
  - `success`, `message`

## 6) `addBonusPenalty`
- Sent payload:
  - `child_id`
  - `type` (`bonus` | `penalty`)
  - `note`
  - `points` (> 0 from UI validation)
- Frontend expects:
  - `success`, `message`

## 7) `redeemReward`
- Sent payload:
  - `child_id`
  - `reward_id`
- Frontend expects:
  - `success`, `message`

## 8) `addTask`
- Sent payload:
  - `task_name`
  - `category`
  - `points`
  - `assigned_to` (`both` or child key/id)
- Frontend expects:
  - `success`, `message`

## 9) `addReward`
- Sent payload:
  - `reward_name`
  - `icon`
  - `required_points`
- Frontend expects:
  - `success`, `message`

## 10) `resetToday`
- Sent payload: `{}`
- Frontend expects:
  - `success`, `message`

## 11) `resetWeek`
- Sent payload: `{}`
- Frontend expects:
  - `success`, `message`

## C. Data fields observed in rendering logic

## children[] fields used
- `child_id`, `child_key`, `child_name`, `avatar_icon`, `avatar_name`, `status`
- score fields: `today_score`, `week_score`, `total_score`, `earned_score`, `daily_target`

## tasks[] fields used
- `task_id`, `task_name`, `points`, `category`, `assigned_to`, `status`

## rewards[] fields used
- `reward_id`, `reward_name`, `icon`, `required_points`, `status`

## transactions[] fields used
- `child_id`, `child_name`, `type`, `note`, `task_name`, `points`
- `date`, `created_at`, `created_by_name`

## dailyStatus[] fields used
- `child_id`, `task_id`, `status` (done/completed)

## redemptions[] fields used
- `child_name`, `reward_name`, `date`, `status`, `points_spent`

## D. Compatibility risk flags
- High risk if backend renames:
  - ids: `child_id`, `task_id`, `reward_id`
  - status fields (`status`, `done/completed` semantics)
  - score fields (`today_score`, `week_score`, `total_score`)
- Medium risk if backend changes timestamp format consumed by JS Date parsing.
- High risk if backend starts returning unsanitized HTML/script strings.

## E. Safe refactor rule for next phases
- Do not change action names or payload keys.
- Do not change expected response field names without adapter layer.
- Introduce adapters/wrappers before any schema normalization.
