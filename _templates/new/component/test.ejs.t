---
to: src/<%= folder %>/<%= name %>/<%= name %>.test.ts
---

import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { <%= name %> } from '.';

describe('<%= name %>', () => {
  let wrapper: VueWrapper<InstanceType<typeof <%= name %>>>;

  beforeEach(() => {
    wrapper = mount(<%= name %>, { shallow: true });
  });
});
