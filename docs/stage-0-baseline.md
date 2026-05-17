# Stage 0 Baseline (Frontend SPA)

## 1) Snapshot at analysis time
- Date (UTC): 2026-05-17
- Branch: `work`
- Commit: `f779706`
- App type: single-page HTML app (`index.html`) calling Google Apps Script Web App backend.

## 2) Files currently in repo root
- `index.html` (main running app)
- `backup` (older backup HTML snapshot)

## 3) Runtime architecture baseline
- Frontend state is stored in global object `S`.
- Session is restored from `localStorage` keys:
  - `fq_token`
  - `fq_user`
- API entrypoint is hard-coded Google Apps Script URL in frontend.

## 4) Known baseline constraints
- Backend Google Apps Script code is not in this repository.
- Google Sheet schema is not in this repository.
- All refactors must preserve frontend/backend action contract until backend is versioned.

## 5) Baseline risk markers (high-level)
- XSS risk due to dynamic `innerHTML` rendering with server-provided text.
- Token persisted in `localStorage`.
- Strong coupling to backend field names and statuses.
- Single-file architecture (HTML/CSS/JS mixed) makes safe incremental changes harder.
