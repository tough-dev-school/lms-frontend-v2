import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VRadioSwitch from './VRadioSwitch.vue';

describe('VRadioSwitch', () => {
  let wrapper: VueWrapper<InstanceType<typeof VRadioSwitch>>;

  beforeEach(() => {
    wrapper = mount(VRadioSwitch, { shallow: true });
  });
});
