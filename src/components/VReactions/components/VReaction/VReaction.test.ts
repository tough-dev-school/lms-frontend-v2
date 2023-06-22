import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReaction } from '.';

describe('VReaction', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReaction>>;

  beforeEach(() => {
    wrapper = mount(VReaction, {
      shallow: true,
    });
  });

  test.todo('emit add on click if not already sent');
  test.todo('emit remove on click if already sent');
  test.todo('own avatar is always last');
  test.todo('displays correct number of avatars');
  test.todo('displays tooltip on hover');
  test.todo('displays emoji');
});
