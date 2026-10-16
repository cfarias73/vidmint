/**
 * Browsers normally report `same-origin` for same-origin RPCs. If an
 * intermediary reports `same-site`, require the exact Origin to match the
 * request URL before allowing it; sibling subdomains remain rejected.
 */
export function isAllowedCsrfFetchSite(
  fetchSite: string,
  request: Request
): boolean {
  if (fetchSite === 'same-origin') return true;
  if (fetchSite !== 'same-site') return false;

  return request.headers.get('Origin') === new URL(request.url).origin;
}
