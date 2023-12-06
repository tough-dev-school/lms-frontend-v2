import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VNotionRenderer from './VNotionRenderer.vue';

describe('VNotionRenderer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VNotionRenderer>>;

  beforeEach(() => {
    wrapper = mount(VNotionRenderer, { shallow: true });
  });
});
