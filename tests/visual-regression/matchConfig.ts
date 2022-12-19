import type { MatchImageSnapshotOptions } from 'jest-image-snapshot';

const matchConfig: MatchImageSnapshotOptions = {
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: Math.pow(16, 2),
  failureThresholdType: 'pixel',
};

export default matchConfig;
