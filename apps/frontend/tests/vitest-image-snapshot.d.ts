import type { MatchImageSnapshotOptions } from '@brachkow/vitest-image-snapshot';

declare module 'vitest' {
  interface Matchers<R = unknown> {
    toMatchImageSnapshot: (options?: MatchImageSnapshotOptions) => R;
  }
}
