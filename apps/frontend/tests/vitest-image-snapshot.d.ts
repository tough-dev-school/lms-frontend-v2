import type { MatchImageSnapshotOptions } from '@brachkow/vitest-image-snapshot';

// Vitest 3 picks up custom matchers through Assertion, see the package README
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars -- must match Vitest's own declaration
  interface Assertion<T = any> {
    toMatchImageSnapshot: (options?: MatchImageSnapshotOptions) => void;
    toMatchImageSnapshotAsync: (
      options?: MatchImageSnapshotOptions,
    ) => Promise<void>;
  }
}
