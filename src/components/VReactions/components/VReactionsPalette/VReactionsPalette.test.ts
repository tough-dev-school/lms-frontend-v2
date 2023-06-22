import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type MountingOptions, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReactionsPalette } from '.';

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

  test.todo('shows all reactions when no reactions sent', () => {});
  test.todo('excludes sent reactions', () => {});
  test.todo('becames disabled if reaches limit', () => {});
  test.todo('emits click with reaction', () => {});
  test.todo('displays emoji', () => {});
});
