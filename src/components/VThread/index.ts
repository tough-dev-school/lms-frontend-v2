import type { Thread } from '@/types/homework';
import VThread from './VThread.vue';
import type { MoodHappyIcon } from 'vue-tabler-icons';

interface ThreadAction {
  name?: string;
  handle: (() => void) | null;
  show: boolean;
  icon: typeof MoodHappyIcon;
  disabled?: boolean;
}

interface VThreadProps {
  originalPost: Thread;
  customActions: ThreadAction[];
}

export { VThread, type ThreadAction as Actions, type VThreadProps };
