import { baseCompile, CompileErrorCodes } from '@intlify/message-compiler';
import { merge } from 'lodash-es';
import { i18n, messages, LOCALES } from '@/i18n';
import type { Locale } from '@/i18n';
// Raw sources, because the bundled messages are precompiled and can't be turned back into JSON
import ruSource from '@/locales/ru.json?raw';
import enSource from '@/locales/en.json?raw';

// Lets translators try their own message files in Storybook without touching the repo

export type MessageTree = Record<string, unknown>;

export interface InvalidMessage {
  key: string;
  error: string;
}

export interface TranslationReport {
  keysCount: number;
  missingKeys: string[];
  unknownKeys: string[];
  invalidMessages: InvalidMessage[];
}

export const OVERRIDES_STORAGE_KEY = 'translationOverrides';

const sources: Record<Locale, string> = { ru: ruSource, en: enSource };

const isMessageTree = (value: unknown): value is MessageTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const flattenMessages = (
  tree: MessageTree,
  prefix = '',
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(tree).flatMap(([key, value]) =>
      isMessageTree(value)
        ? Object.entries(flattenMessages(value, `${prefix}${key}.`))
        : [[`${prefix}${key}`, value]],
    ),
  );

// Production builds of the compiler only report error codes, and its texts are meant for developers anyway
const COMPILE_ERROR_EXPLANATIONS: Partial<Record<number, string>> = {
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]:
    'A "{" is never closed with "}"',
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]:
    'There is a "}" without a matching "{"',
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: 'There is an empty placeholder "{}"',
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]:
    'A placeholder must be a single name, like "{email}"',
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]:
    'A placeholder must be a single name, like "{email}"',
  [CompileErrorCodes.INVALID_LINKED_FORMAT]:
    'The "@" sign has a special meaning, write it as {\'@\'}',
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]:
    'The "@" sign has a special meaning, write it as {\'@\'}',
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]:
    'The "@" sign has a special meaning, write it as {\'@\'}',
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]:
    'Every form separated by "|" must have text',
};

const DEFAULT_COMPILE_ERROR =
  "The message can't be read. Check the special characters { } @ |";

const getCompileError = (message: string) => {
  let code: number | undefined;
  baseCompile(message, {
    onError: (compileError) => {
      code ??= compileError.code;
    },
  });
  if (code === undefined) return undefined;
  return COMPILE_ERROR_EXPLANATIONS[code] ?? DEFAULT_COMPILE_ERROR;
};

const getMessageError = (value: unknown) => {
  if (typeof value !== 'string') return 'Message must be a string';
  if (/<[/a-z]/i.test(value)) return 'HTML tags are not allowed';
  return getCompileError(value);
};

// Russian is the source language, so its keys are the full list
const REFERENCE_KEYS = Object.keys(
  flattenMessages(JSON.parse(ruSource) as MessageTree),
);

export const parseTranslations = (text: string): MessageTree => {
  const parsed: unknown = JSON.parse(text);
  if (!isMessageTree(parsed)) {
    throw new Error('The file must contain a JSON object');
  }
  return parsed;
};

export const validateTranslations = (tree: MessageTree): TranslationReport => {
  const flat = flattenMessages(tree);
  const keys = Object.keys(flat);

  return {
    keysCount: keys.length,
    missingKeys: REFERENCE_KEYS.filter((key) => !(key in flat)),
    unknownKeys: keys.filter((key) => !REFERENCE_KEYS.includes(key)),
    invalidMessages: keys
      .map((key) => ({ key, error: getMessageError(flat[key]) }))
      .filter((item): item is InvalidMessage => item.error !== undefined),
  };
};

export const readOverrides = (): Partial<Record<Locale, MessageTree>> => {
  try {
    const stored = localStorage.getItem(OVERRIDES_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    return isMessageTree(parsed)
      ? Object.fromEntries(
          LOCALES.filter((locale) => isMessageTree(parsed[locale])).map(
            (locale) => [locale, parsed[locale]],
          ),
        )
      : {};
  } catch {
    return {};
  }
};

const writeOverrides = (overrides: Partial<Record<Locale, MessageTree>>) => {
  localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
};

// Merges into a fresh object each time: mergeLocaleMessage would mutate the bundled messages,
// and keys from a previous upload would stick around after a reset
export const applyOverrides = () => {
  const overrides = readOverrides();

  LOCALES.forEach((locale) => {
    i18n.global.setLocaleMessage(
      locale,
      merge({}, messages[locale], overrides[locale]),
    );
  });
};

export const saveOverride = (locale: Locale, tree: MessageTree) => {
  writeOverrides({ ...readOverrides(), [locale]: tree });
  applyOverrides();
};

export const clearOverride = (locale: Locale) => {
  const overrides = readOverrides();
  delete overrides[locale];
  writeOverrides(overrides);
  applyOverrides();
};

// The file a translator would continue editing: bundled messages with their upload on top
export const getCurrentTranslations = (locale: Locale) =>
  JSON.stringify(
    merge(JSON.parse(sources[locale]), readOverrides()[locale]),
    null,
    2,
  );
