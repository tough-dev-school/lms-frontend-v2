import { shallowMount } from '@vue/test-utils';
import AppUserAvatar, { AvatarColor } from '@/components/AppUserAvatar.vue';

const mount = (options) => shallowMount(AppUserAvatar, options);

const findParagraphByText = (wrapper, text) => wrapper.findAll('p').filter((node) => node.text() === text);

describe('AppUserAvatar', () => {
  let propsData;

  beforeEach(() => {
    propsData = {
      user: {
        first_name: 'Sasha',
        last_name: 'Not Sasha',
      },
      type: AvatarColor.Primary,
    };
  });

  it('Show correct abbreviation with first and lost name', () => {
    const wrapper = mount({ propsData });

    const el = findParagraphByText(wrapper, 'SN');

    expect(el.exists()).toBe(true);
  });

  it('Show correct abbreviation with only first name', () => {
    const wrapper = mount({ propsData: { user: { first_name: 'S' } } });

    const el = findParagraphByText(wrapper, 'S');

    expect(el.exists()).toBe(true);
  });

  it('Show correct abbreviation with only last name', () => {
    const wrapper = mount({ propsData: { user: { last_name: 'D' } } });

    const el = findParagraphByText(wrapper, 'D');

    expect(el.exists()).toBe(true);
  });

  it('Show correct abbreviation without first or last name', () => {
    const DEFAULT_ABBREVIATION = 'A';
    const wrapper = mount({ propsData: { user: {} } });

    const el = findParagraphByText(wrapper, DEFAULT_ABBREVIATION);

    expect(el.exists()).toBe(true);
  });
});
