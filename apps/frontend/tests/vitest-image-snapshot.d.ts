import type { MatchImageSnapshotOptions } from '@brachkow/vitest-image-snapshot';

// Vitest 5 declaration, see the package README
declare module 'vitest' {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- merging requires Vitest's exact type parameters
    T = unknown,
  > {
    toMatchImageSnapshot: (options?: MatchImageSnapshotOptions) => R;
  }
}
