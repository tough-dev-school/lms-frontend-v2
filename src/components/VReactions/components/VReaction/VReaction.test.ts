import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReaction } from './VReaction.vue';

describe('VReaction', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReaction>>;
  let options: MountingOptions<any, {}>;
  const mountComponent = () => {
    wrapper = mount(VReaction, options);
  };

  beforeEach(() => {
    options = {
      shallow: true,
    };

    mountComponent();
  });
});
