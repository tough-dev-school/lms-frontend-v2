import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import {
  ALLOWED_REACTIONS,
  MAX_REACTIONS,
  VReactionsPalette,
  type VReactionsPaletteProps,
} from '.';
import { nextTick } from 'vue';
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

  const getOpenWrapper = () => wrapper.find('[data-testid="open"]');
  const getPaletteWrapper = () => wrapper.find('[data-testid="palette"]');
  const getReactionWrappers = () => wrapper.findAll('[data-testid="reaction"]');

  const openPalette = async () => {
    getOpenWrapper().trigger('click');

    await nextTick();
  };

  test('is not disabled by default', () => {
    expect(getOpenWrapper().attributes('disabled')).toBe(undefined);
  });

  test('becames disabled if reaches limit', () => {
    wrapper = mountComponent({ usedReactions: ALLOWED_REACTIONS });

    expect(getOpenWrapper().attributes('disabled')).toBe('');
  });

  test('closed by default', () => {
    expect(getPaletteWrapper().exists()).toBe(false);
  });

  test('opens on click', async () => {
    await openPalette();

    expect(getPaletteWrapper().exists()).toBe(true);
  });

  test('shows all reactions when no reactions sent', async () => {
    await openPalette();

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
    await openPalette();

    expect(getPaletteWrapper().text()).toBe(
      without(ALLOWED_REACTIONS, ...usedReactions).join(''),
    );
  });

  test('emits click with reaction', async () => {
    await openPalette();
    getReactionWrappers()[0].trigger('click');

    expect(wrapper.emitted('click')).toStrictEqual([[ALLOWED_REACTIONS[0]]]);
  });

  test('closes on click', async () => {
    await openPalette();
    getReactionWrappers()[0].trigger('click');
    await nextTick();

    expect(getPaletteWrapper().exists()).toBe(false);
  });

  test('displays emoji', async () => {
    await openPalette();

    expect(getPaletteWrapper().text()).toBe(ALLOWED_REACTIONS.join(''));
  });
});
