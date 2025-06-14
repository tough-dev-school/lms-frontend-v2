import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VHtmlContent from './VHtmlContent.vue';
import { faker } from '@faker-js/faker';

const defaultProps = {
  content: `<p>${faker.lorem.words(10)}</p>`,
};

describe('VHtmlContent', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHtmlContent>>;

  beforeEach(() => {
    wrapper = mount(VHtmlContent, { shallow: true, props: defaultProps });
  });

  test('renders html from props', () => {
    expect(wrapper.html()).toContain(defaultProps.content);
  });
});
