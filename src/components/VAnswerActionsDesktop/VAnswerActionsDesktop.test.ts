import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';

import { VAnswerActionsDesktop } from '.';

describe('VAnswerActionsDesktop', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActionsDesktop>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActionsDesktop, {
      global: {
        stubs: {
          VFloat: false,
        },
      },
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
