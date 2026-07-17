import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('standard XML sitemap', () => {
  it('builds /sitemap.xml and advertises it in robots.txt', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const robots = readFileSync('public/robots.txt', 'utf8');
    expect(packageJson.scripts.build).toContain('scripts/create-sitemap-alias.mjs');
    expect(existsSync('scripts/create-sitemap-alias.mjs')).toBe(true);
    expect(readFileSync('scripts/create-sitemap-alias.mjs','utf8')).toMatch(/^import /);
    expect(robots).toContain('Sitemap: https://zhiqun17.com/sitemap.xml');
  });
});
