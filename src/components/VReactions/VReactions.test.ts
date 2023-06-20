import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReactions } from './VReactions.vue';

describe('VReactions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactions>>;
  let options: MountingOptions<any, {}>;
  const mountComponent = () => {
    wrapper = mount(VReactions, options);
  };

  beforeEach(() => {
    options = {
      shallow: true,
    };

    mountComponent();
  });
});
