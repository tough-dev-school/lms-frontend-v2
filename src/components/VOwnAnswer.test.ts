import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VOwnAnswer from './VOwnAnswer.vue';

const defaultProps = {};

describe('VOwnAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VOwnAnswer>>;

  beforeEach(() => {
    wrapper = mount(VOwnAnswer, { shallow: true, props: defaultProps });
  });

  // pass props to VAnswer

  // pass props to VAnswer actions
  // set text on edit event
  // turn on edit mode on edit event
  // call deleteAnswer on delete event
  // emit update on delete event

  // Show view by default

  // Show editor in edit mode

  // pass props to VTextEditor
  // react to VTexEditor update

  // call updateAnswer on save
  // emit update on save
  // turn off edit mode on save
  // disable button when empty

  // dissalow empty paragraphs!!!!!!
});
