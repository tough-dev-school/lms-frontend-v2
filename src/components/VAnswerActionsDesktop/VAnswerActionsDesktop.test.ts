import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VAnswerActionsDesktop } from '.';
import { faker } from '@faker-js/faker';
import { nextTick } from 'vue';

const defaultProps = {
  allowDelete: true,
  allowEdit: true,
  deleteTime: Number(faker.random.numeric()),
  editTime: Number(faker.random.numeric()),
};

describe('VAnswerActionsDesktop', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActionsDesktop>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActionsDesktop, {
      shallow: true,
      props: defaultProps,
      global: {
        stubs: {
          VFloat: false,
        },
      },
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

  test('delete has deleteTime printed', () => {
    expect(getDeleteWrapper().text()).toContain(defaultProps.deleteTime);
  });

  test('delete is hidden when delete is not allowed', async () => {
    wrapper.setProps({ allowDelete: false });

    await nextTick();

    expect(getDeleteWrapper().exists()).toBe(false);
  });

  test('delete is shown when delete is allowed', () => {
    wrapper.setProps({ allowDelete: true });

    expect(getDeleteWrapper().exists()).toBe(true);
  });

  test('edit emits edit on click', async () => {
    await getEditWrapper().trigger('click');

    expect(wrapper.emitted('edit')).toBeTruthy();
  });

  test('edit has editTime printed', () => {
    expect(getEditWrapper().text()).toContain(defaultProps.editTime);
  });

  test('edit is hidden when edit is not allowed', async () => {
    wrapper.setProps({ allowEdit: false });

    await nextTick();

    expect(getEditWrapper().exists()).toBe(false);
  });

  test('edit is shown when edit is allowed', () => {
    wrapper.setProps({ allowEdit: true });

    expect(getEditWrapper().exists()).toBe(true);
  });
});
