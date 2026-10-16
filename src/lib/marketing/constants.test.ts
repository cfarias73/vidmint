import { describe, expect, it } from 'vitest';
import { FAQ_ITEMS, SITE_CONFIG } from './constants';
import { buildLlmsTxt } from './llms';

describe('Vidmint messaging', () => {
  it('explains cinematic films and visual consistency', () => {
    expect(SITE_CONFIG.description).toMatch(/cinematic AI films/i);
    expect(SITE_CONFIG.description).toMatch(/consistent characters/i);
    expect(SITE_CONFIG.taglineSub).toMatch(/multi-scene AI films/i);
    expect(SITE_CONFIG.taglineSub).toMatch(/synchronized sound/i);
  });

  it('answers “What is Vidmint?” with the same two points', () => {
    const what = FAQ_ITEMS.find((item) => item.question === 'What is Vidmint?');
    expect(what?.answer).toMatch(/multi-scene film/i);
    expect(what?.answer).toMatch(/consistent characters/i);
    expect(what?.answer).toMatch(/production platform/i);
  });

  it('puts the same pitch in llms.txt', () => {
    const text = buildLlmsTxt();
    expect(text).toContain(SITE_CONFIG.description);
    expect(text).toMatch(/multi-scene film with consistent characters/i);
  });
});
