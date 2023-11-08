import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCover from './VCover.vue';
import { faker } from '@faker-js/faker';

const studyName = faker.commerce.productName();
const studyAdditionalInfo = faker.commerce.productAdjective();

const name = `${studyName} (${studyAdditionalInfo})`;

const defaultProps = {
  name,
};

describe('VCover', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCover>>;

  beforeEach(() => {
    wrapper = mount(VCover, {
      shallow: true,
      props: defaultProps,
      global: { stubs: { VHeading: false } },
    });
  });

  const getAutoCoverWrapper = () => {
    return wrapper.find('[data-testid="auto-cover"]');
  };
  const getImageCoverWrapper = () => {
    return wrapper.find('[data-testid="image-cover"]');
  };

  test('auto cover has name without additional info', () => {
    expect(getAutoCoverWrapper().text()).toBe(studyName);
  });

  test('has real cover if defined', () => {
    wrapper = mount(VCover, {
      shallow: true,
      props: { ...defaultProps, image: 'image' },
    });

    expect(getImageCoverWrapper().exists()).toBe(true);
  });
});
