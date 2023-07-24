import type { Thread } from '@/types/homework';
import type { MoodHappyIcon } from 'vue-tabler-icons';

import VThread from './VThread.vue';

interface ThreadAction {
  disabled?: boolean;
  handle: (() => void) | null;
  icon: typeof MoodHappyIcon;
  name?: string;
  show: boolean;
}

interface VThreadProps {
  customActions: ThreadAction[];
  originalPost: Thread;
}

export { type ThreadAction, VThread, type VThreadProps };
