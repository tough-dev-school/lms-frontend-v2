import proxyflare from '@flaregun-net/proxyflare-for-pages';

export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: true },
        routes: [
          {
            from: {
              pattern: 'lms-frontend-v2.pages.dev',
              alsoMatchWWWSubdomain: true,
            },
            to: { url: 'https://app.tough-dev.school/api/' },
          },
        ],
      },
    })(context),
];
