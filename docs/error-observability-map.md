# Error & Observability Map (Stage 0)

## 1) Current user-visible error behavior
- Login/connectivity failure: toast "Không kết nối được server".
- Most mutation failures: toast backend `message` or generic "Lỗi kết nối".
- Data load failure: toast "Không tải được dữ liệu" / connectivity warning.

## 2) Current developer-visible logs
- `fetchData` catch: `console.error('fetchData error:', e)`.
- Session validation catch: `console.error('validateSession error:', e)`.
- Tab switching/render debug logs are present via `console.log` and `console.warn`.

## 3) Gaps
- No request correlation id.
- No standardized log shape for action, payload size, latency, response code.
- No centralized error classifier (network/auth/business/unknown).

## 4) Proposed log schema (for next phase, no behavior change)
Recommended normalized client log payload:
```json
{
  "ts": "ISO timestamp",
  "layer": "api|ui",
  "action": "getInitialData",
  "severity": "info|warn|error",
  "error_type": "network|http|auth|business|parse|unknown",
  "http_status": 0,
  "message": "human-readable",
  "meta": { "activeTab": "tasks" }
}
```

## 5) Proposed error classification rules
- `network`: fetch throws TypeError or connectivity issue.
- `http`: `!res.ok` with numeric status.
- `auth`: backend returns unsuccessful for validate/login/session actions.
- `business`: backend returns `success=false` with domain message.
- `parse`: JSON parse/date parse incompatibility.
- `unknown`: fallback bucket.

## 6) Minimal safe additions in phase 1
- Wrap all API calls in one place with:
  - start/end timestamps
  - action name
  - normalized error classification
- Keep current user toast strings unchanged to avoid UX regression.
