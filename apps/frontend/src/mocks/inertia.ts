import { defineComponent, h, reactive } from 'vue';
import type { SharedPageProps } from '@inertiajs/core';
import { STUDENT } from '@/mocks/users';

// Stand-in for @inertiajs/vue3 in unit tests and Storybook, where there is no server to talk to.
// It has no test library inside, so both can use it. Tests spy on `router` with vi.spyOn.

type MockPageProps = SharedPageProps & {
  errors: Record<string, string>;
  [key: string]: unknown;
};

const createPageState = () => ({
  url: '/',
  component: 'Mock',
  flash: {} as Record<string, unknown>,
  props: {
    user: STUDENT,
    locale: 'ru',
    theme: 'auto',
    timezone: 'Europe/Moscow',
    origin: 'https://lms.tough-dev.school',
    errors: {},
  } as MockPageProps,
});

export interface InertiaParameters {
  url?: string;
  props?: Partial<MockPageProps>;
  flash?: Record<string, unknown>;
}

const pageState = reactive(createPageState());

export const setPage = ({ url, props, flash }: InertiaParameters) => {
  if (url) pageState.url = url;
  if (props) Object.assign(pageState.props, props);
  if (flash) pageState.flash = flash;
};

export const resetPage = () => {
  const fresh = createPageState();
  pageState.url = fresh.url;
  pageState.flash = fresh.flash;
  Object.keys(pageState.props).forEach((key) => {
    delete pageState.props[key];
  });
  Object.assign(pageState.props, fresh.props);
  forms.length = 0;
};

export const usePage = () => pageState;

const noop: (...args: unknown[]) => void = () => {};

export const router = {
  visit: noop,
  get: noop,
  post: noop,
  put: noop,
  patch: noop,
  delete: noop,
  reload: noop,
  on: () => noop,
};

export const Link = defineComponent({
  name: 'InertiaLink',
  props: {
    href: { type: String, default: '#' },
    as: { type: String, default: 'a' },
    method: { type: String, default: 'get' },
    preserveScroll: { type: Boolean, default: false },
    preserveState: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () => h('a', { href: props.href }, slots.default?.());
  },
});

export const Head = defineComponent({
  name: 'InertiaHead',
  props: { title: { type: String, default: undefined } },
  setup: () => () => null,
});

export interface FormSubmission {
  method: 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data: Record<string, unknown>;
}

interface SubmitOptions {
  onSuccess?: (page: unknown) => void;
  onFinish?: () => void;
}

type Submit = (url: string, options?: SubmitOptions) => void;

export interface MockForm {
  processing: boolean;
  errors: Record<string, string>;
  hasErrors: boolean;
  isDirty: boolean;
  submissions: FormSubmission[];
  data: () => Record<string, unknown>;
  transform: (
    callback: (data: Record<string, unknown>) => Record<string, unknown>,
  ) => MockForm;
  reset: (...fields: string[]) => void;
  clearErrors: () => void;
  setError: (field: string, message: string) => void;
  submit: (
    method: FormSubmission['method'],
    url: string,
    options?: SubmitOptions,
  ) => void;
  post: Submit;
  put: Submit;
  patch: Submit;
  delete: Submit;
}

// Every form a component creates, so tests can check what it submitted
export const forms: MockForm[] = [];

export const useForm = <T extends Record<string, unknown>>(
  initialData: T,
): MockForm & T => {
  let transform = (data: Record<string, unknown>) => data;
  const fields = () => form as unknown as Record<string, unknown>;

  const form: MockForm & T = reactive({
    ...initialData,
    processing: false,
    errors: {},
    hasErrors: false,
    isDirty: false,
    submissions: [],
    data: () =>
      Object.fromEntries(
        Object.keys(initialData).map((key) => [key, fields()[key]]),
      ),
    transform: (callback) => {
      transform = callback;
      return form;
    },
    reset: (...names) => {
      const keys = names.length > 0 ? names : Object.keys(initialData);
      keys.forEach((key) => {
        fields()[key] = initialData[key];
      });
    },
    clearErrors: () => {
      form.errors = {};
      form.hasErrors = false;
    },
    setError: (field, message) => {
      form.errors = { ...form.errors, [field]: message };
      form.hasErrors = true;
    },
    // Takes the success path right away, so multi-step flows advance in stories
    submit: (method, url, options) => {
      form.submissions.push({ method, url, data: transform(form.data()) });
      options?.onSuccess?.(pageState);
      options?.onFinish?.();
    },
    post: (url, options) => form.submit('post', url, options),
    put: (url, options) => form.submit('put', url, options),
    patch: (url, options) => form.submit('patch', url, options),
    delete: (url, options) => form.submit('delete', url, options),
  }) as MockForm & T;

  forms.push(form);

  return form;
};
