import { createInertiaApp } from '@inertiajs/vue3';
import type { Page } from '@inertiajs/core';
import type { PageObject } from '@brachkow/hono-inertia';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createAppI18n } from '@/i18n';
import type { Locale } from '@/i18n';
import { resolvePage } from '@/pages';

// The server passes this to the adapter as ssr.render, so pages render in its own process
export const renderPage = (page: PageObject) =>
  createInertiaApp({
    // Inertia's Page type also requires client-only state (rememberedState) that no server sends
    page: page as Page,
    render: renderToString,
    resolve: resolvePage,
    setup: ({ App, props, plugin }) =>
      createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(createAppI18n((page as Page).props.locale as Locale)),
  });
