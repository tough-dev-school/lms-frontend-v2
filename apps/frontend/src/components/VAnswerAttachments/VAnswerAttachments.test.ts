import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { createAnswerAttachment } from '@/api/generated';
import VAnswerAttachments from './VAnswerAttachments.vue';

const createAttachments = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    createAnswerAttachment({ id: index, file: faker.internet.url() }),
  );

const mountComponent = (attachments = createAttachments(2)) =>
  mount(VAnswerAttachments, {
    props: { attachments },
  });

type Wrapper = ReturnType<typeof mountComponent>;

const getLinks = (wrapper: Wrapper) =>
  wrapper.findAll('[data-testid="attachment"]');

describe('VAnswerAttachments', () => {
  test('links every attachment to its file', () => {
    const attachments = createAttachments(2);

    const wrapper = mountComponent(attachments);

    expect(getLinks(wrapper).map((link) => link.attributes('href'))).toEqual(
      attachments.map((attachment) => attachment.file),
    );
  });

  test('opens attachments in a new tab', () => {
    const wrapper = mountComponent();

    expect(getLinks(wrapper)[0].attributes('target')).toBe('_blank');
  });

  test('marks attachments as downloadable', () => {
    const wrapper = mountComponent();

    expect(getLinks(wrapper)[0].attributes()).toHaveProperty('download');
  });

  test('numbers attachments starting from one', () => {
    const wrapper = mountComponent();

    expect(getLinks(wrapper).map((link) => link.text())).toEqual([
      'Файл 1.pdf',
      'Файл 2.pdf',
    ]);
  });

  test('renders nothing without attachments', () => {
    const wrapper = mountComponent([]);

    expect(wrapper.find('ul').exists()).toBe(false);
  });
});
