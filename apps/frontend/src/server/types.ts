import type { InertiaEnv } from '@brachkow/hono-inertia';
import type { UserSelf } from '@/api/generated';
import type { Locale } from '@/i18n';
import type { Theme } from '@/preferences';

export interface AppEnv {
  Variables: InertiaEnv['Variables'] & {
    token: string | undefined;
    locale: Locale;
    theme: Theme;
    timezone: string;
    // Memoized per request, the layout and the page controller both need the current user
    me: Promise<UserSelf> | undefined;
  };
}
