import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VHeader from './VHeader.vue';

describe('VHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeader>>;

  beforeEach(() => {
    wrapper = mount(VHeader, { shallow: true });
  });
});
