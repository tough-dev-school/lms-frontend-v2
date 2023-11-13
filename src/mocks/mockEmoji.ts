import { ALLOWED_REACTIONS } from '@/components/VReactions/VReactions.vue';
import { faker } from '@faker-js/faker';

export const mockEmoji = () => faker.helpers.arrayElement(ALLOWED_REACTIONS);
