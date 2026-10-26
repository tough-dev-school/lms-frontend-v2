import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { useQueryClient } from '@tanstack/vue-query';
import {
  homeworkAnswersRetrieveQueryKey,
  useHomeworkAnswersAttachmentCreate,
} from '@/api/generated';
import { useAnswerAttachmentsUpload } from './useAnswerAttachmentsUpload';

vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    useHomeworkAnswersAttachmentCreate: vi.fn(),
  };
});
vi.mock('@tanstack/vue-query');

const createPdf = () =>
  new File(['%PDF-1.4'], `${faker.system.fileName()}.pdf`, {
    type: 'application/pdf',
  });

describe('useAnswerAttachmentsUpload', () => {
  const mutateAsync = vi.fn();
  const invalidateQueries = vi.fn();
  const answerSlug = faker.string.uuid();

  beforeEach(() => {
    vi.mocked(useHomeworkAnswersAttachmentCreate).mockReturnValue({
      mutateAsync,
      isPending: ref(false),
      error: ref(null),
    } as unknown as ReturnType<typeof useHomeworkAnswersAttachmentCreate>);
    vi.mocked(useQueryClient).mockReturnValue({
      invalidateQueries,
    } as unknown as ReturnType<typeof useQueryClient>);
  });

  test('uploads files in the picked order', async () => {
    const files = [createPdf(), createPdf()];
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, ref([...files]));

    expect(mutateAsync.mock.calls.map(([{ data }]) => data.file)).toEqual(
      files,
    );
  });

  test('uploads to the given answer', async () => {
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, ref([createPdf()]));

    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ answer_slug: answerSlug }),
    );
  });

  test('empties the list after a successful upload', async () => {
    const files = ref([createPdf(), createPdf()]);
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, files);

    expect(files.value).toEqual([]);
  });

  test('keeps only not uploaded files after a failure', async () => {
    const files = [createPdf(), createPdf(), createPdf()];
    const list = ref([...files]);
    mutateAsync
      .mockResolvedValueOnce({})
      .mockRejectedValueOnce(new Error('Upload failed'));
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, list).catch(() => {});

    expect(list.value).toEqual([files[1], files[2]]);
  });

  test('refetches the answer after a failure', async () => {
    mutateAsync.mockRejectedValueOnce(new Error('Upload failed'));
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, ref([createPdf()])).catch(() => {});

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: homeworkAnswersRetrieveQueryKey(answerSlug),
    });
  });

  test('does nothing without files', async () => {
    const { upload } = useAnswerAttachmentsUpload();

    await upload(answerSlug, ref([]));

    expect(mutateAsync).not.toHaveBeenCalled();
    expect(invalidateQueries).not.toHaveBeenCalled();
  });
});
