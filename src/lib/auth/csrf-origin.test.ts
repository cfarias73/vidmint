import { describe, expect, it } from 'vitest';
import { isAllowedCsrfFetchSite } from './csrf-origin';

function request(origin?: string): Request {
  return new Request('https://openstory.example.workers.dev/_serverFn', {
    method: 'POST',
    headers: origin ? { Origin: origin } : undefined,
  });
}

describe('isAllowedCsrfFetchSite', () => {
  it('allows same-origin fetches', () => {
    expect(isAllowedCsrfFetchSite('same-origin', request())).toBe(true);
  });

  it('allows a same-site classification only with an exact Origin match', () => {
    expect(
      isAllowedCsrfFetchSite(
        'same-site',
        request('https://openstory.example.workers.dev')
      )
    ).toBe(true);
    expect(
      isAllowedCsrfFetchSite(
        'same-site',
        request('https://example.workers.dev')
      )
    ).toBe(false);
    expect(isAllowedCsrfFetchSite('same-site', request())).toBe(false);
  });

  it('rejects cross-site and missing fetch-site values', () => {
    expect(isAllowedCsrfFetchSite('cross-site', request())).toBe(false);
    expect(isAllowedCsrfFetchSite('none', request())).toBe(false);
  });
});
