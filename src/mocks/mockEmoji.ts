import { ALLOWED_REACTIONS } from '@/components/VReactions/components/VReactionsPalette';
import { faker } from '@faker-js/faker';

export const mockEmoji = () => faker.helpers.arrayElement(ALLOWED_REACTIONS);
