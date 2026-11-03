/**
 * Collect the releases of both build lines into data.json.
 *
 * The page reads that file instead of calling the GitHub API, so visitors never run
 * into the unauthenticated rate limit, and the page still renders when the API is
 * unreachable.
 */

import { writeFile } from 'node:fs/promises';

const LINES = [
  { key: 'rc', label: 'RC 稳定线', repo: 'zq0929/dsh-rc' },
  { key: 'alpha', label: 'Alpha 尝鲜线', repo: 'zq0929/dsh-alpha' },
];

const token = process.env.GH_TOKEN;
const headers = {
  accept: 'application/vnd.github+json',
  'user-agent': 'dsh-downloads-refresh',
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

const lines = [];
for (const line of LINES) {
  const res = await fetch(`https://api.github.com/repos/${line.repo}/releases?per_page=20`, { headers });
  if (!res.ok) {
    console.error(`${line.repo}: HTTP ${res.status}`);
    lines.push({ ...line, releases: [] });
    continue;
  }
  const raw = await res.json();
  lines.push({
    ...line,
    releases: raw.map(release => ({
      tag: release.tag_name,
      version: String(release.tag_name ?? '').replace(/^dsh-v/, ''),
      title: release.name,
      published: release.published_at,
      prerelease: release.prerelease,
      url: release.html_url,
      assets: (release.assets ?? []).map(asset => ({
        name: asset.name,
        url: asset.browser_download_url,
        size: asset.size,
        digest: asset.digest ?? null,
      })),
    })),
  });
}

const out = { generatedAt: new Date().toISOString(), lines };
await writeFile('data.json', JSON.stringify(out, null, 2) + '\n');
console.log('wrote data.json:', lines.map(line => `${line.key}=${line.releases.length}`).join(' '));
