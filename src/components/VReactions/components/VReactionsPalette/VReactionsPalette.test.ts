import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReactionsPalette } from './VReactionsPalette.vue';

describe('VReactionsPalette', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactionsPalette>>;
  let options: MountingOptions<any, {}>;
  const mountComponent = () => {
    wrapper = mount(VReactionsPalette, options);
  };

  beforeEach(() => {
    options = {
      shallow: true,
    };

    mountComponent();
  });
});
