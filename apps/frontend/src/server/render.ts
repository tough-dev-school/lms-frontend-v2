import type { RenderFunction } from '@brachkow/hono-inertia';
import { escapeHtml, serializePage } from '@brachkow/hono-inertia';
import { themeBootScript } from '@/preferences';
import { assetTags } from './assets';
import type { AppEnv } from './types';
import type { Context } from 'hono';

const analytics = `<script async src="https://a.tough-dev.school/a.js" data-ackee-server="https://a.tough-dev.school" data-ackee-domain-id="b8c21ed5-0a3d-41f0-ac0b-99d5c41d3bdd" data-ackee-opts='{"detailed": true}'></script>
<script>
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  ym(98613748, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
</script>`;

const metrikaPixel = `<noscript><div><img src="https://mc.yandex.ru/watch/98613748" style="position: absolute; left: -9999px" alt="" /></div></noscript>`;

export const render: RenderFunction = (page, _viewData, ssr, context) => {
  const c = context as Context<AppEnv>;
  const { locale, theme } = c.var;
  // Without SSR the client mounts from the page object instead of hydrating
  const body =
    ssr?.body ??
    `<script data-page="app" type="application/json">${serializePage(page)}</script><div id="app"></div>`;

  return `<!doctype html>
<html lang="${escapeHtml(locale)}" data-theme="${escapeHtml(theme)}"${theme === 'dark' ? ' class="dark"' : ''}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
    <script>${themeBootScript}</script>
    ${ssr?.head ?? ''}
    ${assetTags}
    ${import.meta.env.PROD ? analytics : ''}
  </head>
  <body>
    ${import.meta.env.PROD ? metrikaPixel : ''}
    ${body}
  </body>
</html>`;
};
