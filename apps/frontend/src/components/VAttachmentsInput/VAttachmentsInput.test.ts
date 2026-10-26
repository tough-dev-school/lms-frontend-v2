import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VAttachmentsInput from './VAttachmentsInput.vue';

const createFile = (name: string) =>
  new File(['%PDF-1.4'], name, { type: 'application/pdf' });

const createPdf = () => createFile(`${faker.system.fileName()}.pdf`);

const mountComponent = (files: File[] = []) =>
  mount(VAttachmentsInput, {
    props: {
      modelValue: files,
    },
  });

type Wrapper = ReturnType<typeof mountComponent>;

const getInput = (wrapper: Wrapper) => wrapper.find('[data-testid="input"]');
const getFiles = (wrapper: Wrapper) => wrapper.findAll('[data-testid="file"]');
const getNames = (wrapper: Wrapper) =>
  wrapper.findAll('[data-testid="name"]').map((name) => name.text());
const getDownloadLinks = (wrapper: Wrapper) =>
  wrapper.findAll('[data-testid="download"]');
const getRemoveButtons = (wrapper: Wrapper) =>
  wrapper.findAll('[data-testid="remove"]');
const getEmittedFiles = (wrapper: Wrapper) =>
  wrapper.emitted('update:modelValue')?.at(-1)?.[0] as File[] | undefined;

const selectFiles = async (wrapper: Wrapper, files: File[]) => {
  const input = getInput(wrapper);
  Object.defineProperty(input.element, 'files', {
    value: files,
    configurable: true,
  });
  await input.trigger('change');
};

describe('VAttachmentsInput', () => {
  beforeEach(() => {
    // jsdom does not implement blob URLs
    let counter = 0;
    URL.createObjectURL = vi.fn(() => `blob:file-${counter++}`);
    URL.revokeObjectURL = vi.fn();
  });

  test('links every picked file to its blob for download', () => {
    const wrapper = mountComponent([createPdf(), createPdf()]);

    expect(
      getDownloadLinks(wrapper).map((link) => link.attributes('href')),
    ).toEqual(['blob:file-0', 'blob:file-1']);
  });

  test('downloads a picked file under its original name', () => {
    const file = createPdf();

    const wrapper = mountComponent([file]);

    expect(getDownloadLinks(wrapper)[0].attributes('download')).toBe(file.name);
  });

  test('revokes blob URLs on unmount', () => {
    const wrapper = mountComponent([createPdf()]);

    wrapper.unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:file-0');
  });

  test('renders a chip for every picked file', () => {
    const files = [createPdf(), createPdf()];

    const wrapper = mountComponent(files);

    expect(getNames(wrapper)).toEqual(files.map((file) => file.name));
  });

  test('renders no chips without files', () => {
    const wrapper = mountComponent();

    expect(getFiles(wrapper)).toHaveLength(0);
  });

  test('appends selected files to already picked ones', async () => {
    const picked = createPdf();
    const selected = createPdf();
    const wrapper = mountComponent([picked]);

    await selectFiles(wrapper, [selected]);

    expect(getEmittedFiles(wrapper)).toEqual([picked, selected]);
  });

  test('skips files that are not PDF', async () => {
    const pdf = createPdf();
    const wrapper = mountComponent();

    await selectFiles(wrapper, [createFile('photo.png'), pdf]);

    expect(getEmittedFiles(wrapper)).toEqual([pdf]);
  });

  test('accepts PDF with uppercase extension', async () => {
    const pdf = createFile('SCAN.PDF');
    const wrapper = mountComponent();

    await selectFiles(wrapper, [pdf]);

    expect(getEmittedFiles(wrapper)).toEqual([pdf]);
  });

  test('removes only the clicked file', async () => {
    const files = [createPdf(), createPdf(), createPdf()];
    const wrapper = mountComponent(files);

    await getRemoveButtons(wrapper)[1].trigger('click');

    expect(getEmittedFiles(wrapper)).toEqual([files[0], files[2]]);
  });
});
