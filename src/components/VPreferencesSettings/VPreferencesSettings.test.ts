import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VPreferencesSettings from './VPreferencesSettings.vue';

describe('VPreferencesSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VPreferencesSettings>>;

  beforeEach(() => {
    wrapper = mount(VPreferencesSettings, { shallow: true });
  });
});
