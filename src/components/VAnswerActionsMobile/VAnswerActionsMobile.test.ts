import type { VueWrapper } from '@vue/test-utils';

import { VCard } from '@/components/VCard';
import { mount } from '@vue/test-utils';

import { VAnswerActionsMobile } from '.';

describe('VAnswerActionsMobile', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswerActionsMobile>>;

  beforeEach(() => {
    wrapper = mount(VAnswerActionsMobile, {
      global: {
        stubs: {
          VFloat: VCard,
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
