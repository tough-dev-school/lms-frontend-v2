import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VAnswerActions from './VAnswerActions';
import type VAnswerActionsDesktop from '@/components/VAnswerActionsDesktop';
import type VAnswerActionsMobile from '@/components/VAnswerActionsMobile';
import dayjs from 'dayjs';
import { nextTick } from 'vue';
import { faker } from '@faker-js/faker';

const defaultProps = {
  created: dayjs().toString(),
  deleteTime: 10,
  editTime: 10,
};

describe('VAnswerActions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActions>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActions, { shallow: true, props: defaultProps });
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

  test('passes correct props to mobile actions', () => {
    expect(getMobileActions().props()).toMatchObject({
      deleteTime: defaultProps.deleteTime,
      editTime: defaultProps.editTime,
      allowDelete: true,
      allowEdit: true,
    });
  });

  test('mobile actions emit edit on edit', () => {
    getMobileActions().vm.$emit('edit');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });

  test('mobile actions emit delete on delete', () => {
    getMobileActions().vm.$emit('delete');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  test('passes correct props to desktop actions', () => {
    expect(getDesktopActions().props()).toMatchObject({
      deleteTime: defaultProps.deleteTime,
      editTime: defaultProps.editTime,
      allowDelete: true,
      allowEdit: true,
    });
  });

  test('desktop actions emit edit on edit', () => {
    getDesktopActions().vm.$emit('edit');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });

  test('desktop actions emit delete on delete', () => {
    getDesktopActions().vm.$emit('delete');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  test('disable delete if no time left', async () => {
    const delay = Number(faker.random.numeric());

    wrapper.setProps({
      deleteTime: delay,
      created: dayjs().subtract(delay, 'minutes').toString(),
    });

    await nextTick();

    expect(getMobileActions().props('allowDelete')).toBe(false);
    expect(getDesktopActions().props('allowDelete')).toBe(false);
  });

  test('disable edit if no time left', async () => {
    const delay = Number(faker.random.numeric());

    wrapper.setProps({
      editTime: delay,
      created: dayjs().subtract(delay, 'minutes').toString(),
    });

    await nextTick();

    expect(getMobileActions().props('allowEdit')).toBe(false);
    expect(getDesktopActions().props('allowEdit')).toBe(false);
  });
});
