import type { VueWrapper } from '@vue/test-utils';

import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';

import { VHtmlContent } from '.';

const defaultProps = {
  content: `<p>${faker.lorem.words(10)}</p>`,
};

describe('VHtmlContent', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHtmlContent>>;

  beforeEach(() => {
    wrapper = mount(VHtmlContent, { props: defaultProps, shallow: true });
  });

  test('renders html from props', () => {
    expect(wrapper.html()).toContain(defaultProps.content);
  });
});
