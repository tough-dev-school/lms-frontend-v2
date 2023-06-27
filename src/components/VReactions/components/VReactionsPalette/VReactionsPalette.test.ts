import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import {
  ALLOWED_REACTIONS,
  MAX_REACTIONS,
  VReactionsPalette,
  type VReactionsPaletteProps,
} from '.';
import without from 'lodash/without';
import { faker } from '@faker-js/faker';

const defaultProps = {
  usedReactions: [],
};

const mountComponent = (props: VReactionsPaletteProps) => {
  return mount(VReactionsPalette, { props, shallow: true });
};

describe('VReactionsPalette', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactionsPalette>>;

  beforeEach(() => {
    wrapper = mountComponent(defaultProps);
  });

  const getReactionWrappers = () => wrapper.findAll('[data-testid="reaction"]');

  test('shows all reactions when no reactions sent', async () => {
    expect(getReactionWrappers().length).toBe(ALLOWED_REACTIONS.length);
  });

  test('excludes sent reactions', async () => {
    const usedReactions = faker.helpers.arrayElements(
      ALLOWED_REACTIONS,
      MAX_REACTIONS - 1,
    );

    wrapper = mountComponent({
      usedReactions,
    });

    expect(wrapper.text()).toBe(
      without(ALLOWED_REACTIONS, ...usedReactions).join(''),
    );
  });

  test('emits click with reaction', async () => {
    getReactionWrappers()[0].trigger('click');

    expect(wrapper.emitted('click')).toStrictEqual([[ALLOWED_REACTIONS[0]]]);
  });

  test('emits close on click', async () => {
    getReactionWrappers()[0].trigger('click');

    expect(wrapper.emitted('close')).toStrictEqual([[]]);
  });

  test('displays emoji', async () => {
    expect(wrapper.text()).toBe(ALLOWED_REACTIONS.join(''));
  });
});
