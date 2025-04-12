import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VAnswerActions from './VAnswerActions.vue';
import type VAnswerActionsDesktop from '@/components/VAnswerActionsDesktop/VAnswerActionsDesktop.vue';
import type VAnswerActionsMobile from '@/components/VAnswerActionsMobile/VAnswerActionsMobile.vue';

describe('VAnswerActions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActions>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActions, { shallow: true });
  });

  const getMobileActions = () => {
    return wrapper.findComponent<typeof VAnswerActionsMobile>(
      '[data-testid="mobile"]',
    );
  };
  const getDesktopActions = () => {
    return wrapper.findComponent<typeof VAnswerActionsDesktop>(
      '[data-testid="desktop"]',
    );
  };

  test('mobile actions emit edit on edit', () => {
    getMobileActions().vm.$emit('edit');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });

  test('mobile actions emit delete on delete', () => {
    getMobileActions().vm.$emit('delete');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  test('desktop actions emit edit on edit', () => {
    getDesktopActions().vm.$emit('edit');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });

  test('desktop actions emit delete on delete', () => {
    getDesktopActions().vm.$emit('delete');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });
});
