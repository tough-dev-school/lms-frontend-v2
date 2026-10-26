import type { UserSelf } from '@/api/generated';
import type { Locale } from '@/i18n';
import type { Theme } from '@/preferences';

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    // DRF returns a list of messages per field, the server joins them into one string
    errorValueType: string;
    sharedPageProps: {
      user: UserSelf | null;
      locale: Locale;
      theme: Theme;
      timezone: string;
      origin: string;
    };
  }
}
