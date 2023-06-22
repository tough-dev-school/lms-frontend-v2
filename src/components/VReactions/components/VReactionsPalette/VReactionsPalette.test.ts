import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { VReactionsPalette } from '.';

describe('VReactionsPalette', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactionsPalette>>;

  beforeEach(() => {
    wrapper = mount(VReactionsPalette, { shallow: true });
  });

  test.todo('shows all reactions when no reactions sent', () => {});
  test.todo('excludes sent reactions', () => {});
  test.todo('becames disabled if reaches limit', () => {});
  test.todo('emits click with reaction', () => {});
  test.todo('displays emoji', () => {});
});
