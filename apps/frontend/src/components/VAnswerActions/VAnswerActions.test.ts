import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VAnswerActions from './VAnswerActions.vue';

describe('VAnswerActions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActions>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActions, {
      shallow: true,
    });
  });

  const getDeleteWrapper = () => {
    return wrapper.find('[data-testid="delete"]');
  };

  const getEditWrapper = () => {
    return wrapper.find('[data-testid="edit"]');
  };

  test('delete emits delete on click', async () => {
    await getDeleteWrapper().trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  test('edit emits edit on click', async () => {
    await getEditWrapper().trigger('click');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });
});
