import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCrossChecks from './VCrossChecks.vue';
import { mockCrossCheck } from '../../mocks/mockCrossCheck';

const defaultProps = {
  crosschecks: [
    mockCrossCheck(),
    mockCrossCheck({ is_checked: true }),
    mockCrossCheck({ is_checked: true }),
  ],
};

describe('VCrossChecks', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCrossChecks>>;

  beforeEach(() => {
    wrapper = mount(VCrossChecks, { shallow: true, props: defaultProps });
  });

  test('Redenders only unchecked crosschecks', () => {
    expect(wrapper.findAll('[data-testid="crosscheck"]').length).toBe(1);
  });
});
