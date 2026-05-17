/**
 * apiClient.js
 * Stage 1 / Step 1.2
 * Safe wrapper foundation - no contract change.
 */

/**
 * Normalize known error types for consistent handling.
 * @param {object} params
 * @param {any} params.error
 * @param {number|null} [params.httpStatus]
 * @param {string} [params.action]
 * @returns {'network'|'http'|'auth'|'business'|'parse'|'unknown'}
 */
export function classifyError({ error, httpStatus = null, action = '' } = {}) {
  if (httpStatus && Number.isFinite(httpStatus)) return 'http';

  const msg = String(error?.message || '').toLowerCase();

  // Typical fetch/network errors
  if (
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('load failed') ||
    msg.includes('network')
  ) {
    return 'network';
  }

  // Action-scoped auth hints
  if (action === 'login' || action === 'validateSession') {
    return 'auth';
  }

  // JSON parse or malformed response hints
  if (msg.includes('json') || msg.includes('parse')) {
    return 'parse';
  }

  return 'unknown';
}

/**
 * Basic envelope check. We keep this permissive to avoid runtime regression.
 * @param {any} data
 * @returns {boolean}
 */
export function isValidEnvelope(data) {
  return data !== null && typeof data === 'object';
}

/**
 * Optional logging hook (console only for now).
 * Keeps user-visible behavior unchanged.
 * @param {object} event
 */
export function logEvent(event = {}) {
  try {
    const payload = {
      ts: new Date().toISOString(),
      layer: event.layer || 'api',
      action: event.action || '',
      severity: event.severity || 'info',
      error_type: event.error_type || null,
      http_status: event.http_status ?? null,
      message: event.message || '',
      meta: event.meta || {}
    };
    // Can be replaced later with remote logging.
    console.log('[apiClient]', payload);
  } catch (_e) {
    // intentionally swallow to avoid breaking app flow
  }
}

/**
 * Core request wrapper preserving current transport contract.
 * @param {object} params
 * @param {string} params.apiUrl
 * @param {string} params.action
 * @param {any} [params.token]
 * @param {object} [params.payload]
 * @returns {Promise<any>}
 */
export async function request({ apiUrl, action, token = null, payload = {} }) {
  const startedAt = Date.now();

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ action, token, payload })
    });

    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}`);
      const errorType = classifyError({ error: err, httpStatus: res.status, action });
      logEvent({
        action,
        severity: 'error',
        error_type: errorType,
        http_status: res.status,
        message: err.message,
        meta: { duration_ms: Date.now() - startedAt }
      });
      throw err;
    }

    const data = await res.json();

    if (!isValidEnvelope(data)) {
      const err = new Error('Invalid response envelope');
      const errorType = classifyError({ error: err, action });
      logEvent({
        action,
        severity: 'error',
        error_type: errorType,
        message: err.message,
        meta: { duration_ms: Date.now() - startedAt }
      });
      throw err;
    }

    logEvent({
      action,
      severity: 'info',
      message: 'request_success',
      meta: { duration_ms: Date.now() - startedAt }
    });

    return data;
  } catch (error) {
    const errorType = classifyError({ error, action });
    logEvent({
      action,
      severity: 'error',
      error_type: errorType,
      message: String(error?.message || error),
      meta: { duration_ms: Date.now() - startedAt }
    });
    throw error;
  }
}
