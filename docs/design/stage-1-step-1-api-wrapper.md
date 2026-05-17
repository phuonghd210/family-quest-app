# Stage 1 / Step 1.1 — API Client Wrapper Design (No Runtime Change)

## 1) Scope
This step is design-only.  
No runtime behavior change in `index.html` yet.

## 2) Goals
- Keep current frontend↔backend contract unchanged.
- Centralize API transport logic in one wrapper.
- Standardize error classification for future observability.
- Prepare safe migration from inline API function.

## 3) Non-goals (for this step)
- No action name changes.
- No payload key changes.
- No response schema changes.
- No UI/toast behavior change.
- No role/permission behavior change.

## 4) Current Baseline (from index.html)
Current call pattern:
- `fetch(API_URL, { method: 'POST', body: JSON.stringify({ action, token, payload }) })`
- Throw on `!res.ok`
- Return `res.json()`

## 5) Proposed Wrapper Responsibilities
A new `apiClient` layer will own:

1. `request({ action, payload, token })`
   - Send POST in exactly current transport shape.
   - Return parsed JSON response.
   - Keep behavior compatible with current callers.

2. `classifyError(err, context)`
   - Normalize error types:
     - `network`
     - `http`
     - `auth`
     - `business`
     - `parse`
     - `unknown`

3. `logEvent(event)`
   - Optional centralized logging hook (console-based first).
   - No user-visible behavior change in this step.

4. `validateEnvelope(res)`
   - Ensure minimum response envelope shape exists.
   - If not, classify as `parse` or `unknown`.

## 6) Request/Response Compatibility Rules
Must preserve:
- Request body keys: `action`, `token`, `payload`
- Existing action strings (`login`, `getInitialData`, ...)
- Existing success/error handling expectations in UI

## 7) Proposed API Shape (for implementation step)
Example interface:

```js
apiClient.request({
  action: 'getInitialData',
  token: S.token,
  payload: {}
});
Possible return shape (unchanged passthrough):
{
  success: true,
  ...backendFields
}

## 8) Error Classification Draft
network: fetch throws (connection/timeouts/CORS-like)
http: response not ok (status exists)
auth: session/login invalid patterns from backend
business: backend returns success === false
parse: malformed JSON / invalid envelope
unknown: fallback

## 9) Migration Plan (next step, not now)
Add apiClient file.
Switch current api() function internals to call wrapper.
Keep all call sites unchanged.
Run smoke tests from docs/smoke-test-checklist.md.

## 10) Acceptance Criteria for Step 1.1
A design doc exists and is reviewable.
No runtime code changed.
Contract preservation rules clearly documented.
