import { readFileSync } from 'node:fs';
import type { ViteManifest } from '@brachkow/hono-inertia/vite';
import { manifestVersion } from '@brachkow/hono-inertia/vite';

const CLIENT_ENTRY = 'src/main.ts';

// The production server runs from dist/server, the client build sits next to it
const readManifest = (): ViteManifest =>
  JSON.parse(
    readFileSync(
      new URL('../client/.vite/manifest.json', import.meta.url),
      'utf8',
    ),
  ) as ViteManifest;

const developmentTags = [
  '<script type="module" src="/@vite/client"></script>',
  `<script type="module" src="/${CLIENT_ENTRY}"></script>`,
].join('');

const productionTags = (manifest: ViteManifest) => {
  const entry = manifest[CLIENT_ENTRY];
  const seen = new Set<string>();
  const preloads: string[] = [];
  const styles = new Set(entry.css);

  // Static imports of the entry load before it runs, preloading saves a round trip each
  const collect = (key: string) => {
    manifest[key]?.imports?.forEach((imported) => {
      if (seen.has(imported)) return;
      seen.add(imported);
      preloads.push(manifest[imported].file);
      manifest[imported].css?.forEach((file) => styles.add(file));
      collect(imported);
    });
  };
  collect(CLIENT_ENTRY);

  return [
    ...Array.from(styles, (file) => `<link rel="stylesheet" href="/${file}">`),
    ...preloads.map((file) => `<link rel="modulepreload" href="/${file}">`),
    `<script type="module" src="/${entry.file}"></script>`,
  ].join('');
};

const manifest = import.meta.env.PROD ? readManifest() : undefined;

export const assetTags = manifest ? productionTags(manifest) : developmentTags;

export const assetVersion = manifest ? manifestVersion(manifest) : 'dev';
