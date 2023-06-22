import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReactions } from '.';

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

  test.todo('passes props to VReactionsPalette', () => {});
  test.todo('passes props to VReaction', () => {});
  test.todo('displays correct number of reactions', () => {});
  test.todo('calls addReaction on VReactionsPalette click', () => {});
  test.todo('emits update on VReactionsPalette click', () => {});
  test.todo('calls removeReaction on VReaction remove', () => {});
  test.todo('emits update on VReaction remove', () => {});
  test.todo('calls removeReaction on VReaction add', () => {});
  test.todo('emits update on VReaction add', () => {});
});
