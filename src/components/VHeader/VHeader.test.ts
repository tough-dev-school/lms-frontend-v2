import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VHeader from './VHeader.vue';
import { useRoute } from 'vue-router';

vi.mock('vue-router');

describe('VHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeader>>;

  const mountComponent = () => {
    wrapper = mount(VHeader, { shallow: true });
  };

  beforeEach(() => {
    (useRoute as ReturnType<typeof vi.fn>).mockReturnValue({
      meta: { isPublic: faker.datatype.boolean() },
    });

    mountComponent();
  });

  const getLogoWrapper = () => wrapper.find('[data-testid="logo"]');
  const getProfileMenuWrapper = () => wrapper.find('[data-testid="profile"]');

  test('has logo that leads to home page', () => {
    expect(getLogoWrapper().exists()).toBe(true);
    expect(getLogoWrapper().attributes('to')).toBe('/');
  });

  test('has profile menu if route is private', () => {
    (useRoute as ReturnType<typeof vi.fn>).mockReturnValue({
      meta: { isPublic: false },
    });
    mountComponent();

    expect(getProfileMenuWrapper().exists()).toBe(true);
  });

  test('has no profile menu if route is public', () => {
    (useRoute as ReturnType<typeof vi.fn>).mockReturnValue({
      meta: { isPublic: true },
    });
    mountComponent();

    expect(getProfileMenuWrapper().exists()).toBe(false);
  });
});
