import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReaction } from '.';

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

    test.todo('emit add on click if not already sent');
    test.todo('emit remove on click if already sent');
    test.todo('own avatar is always last');
    test.todo('displays correct number of avatars');
    test.todo('displays tooltip on hover');
    test.todo('displays emoji');

    mountComponent();
  });
});
