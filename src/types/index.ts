import type { AnswerDetailed } from '@/api/generated-api';

export type BlockMap = {
  [key: string]: any;
};

export type AuthToken = string;

export interface Answer extends Omit<AnswerDetailed, 'had_descendants'> {
  descendants: string[];
}
