import { beforeEach, describe, expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
// Plain JSON, the regular import returns messages precompiled by the i18n plugin
import ruSource from '@/locales/ru.json?raw';
import {
  OVERRIDES_STORAGE_KEY,
  clearOverride,
  flattenMessages,
  getCurrentTranslations,
  parseTranslations,
  readOverrides,
  saveOverride,
  validateTranslations,
} from './overrides';

type Translations = Record<string, Record<string, string>>;

const ru = JSON.parse(ruSource) as Translations;

const getFullTranslations = () => JSON.parse(ruSource) as Translations;

describe('parseTranslations', () => {
  test('parses a JSON object', () => {
    expect(parseTranslations('{"common":{"save":"Save"}}')).toEqual({
      common: { save: 'Save' },
    });
  });

  test('rejects broken JSON', () => {
    expect(() => parseTranslations('{"common":')).toThrow();
  });

  test.each(['[]', '"text"', 'null'])('rejects %s', (text) => {
    expect(() => parseTranslations(text)).toThrow(
      'The file must contain a JSON object',
    );
  });
});

describe('flattenMessages', () => {
  test('joins nested keys with dots', () => {
    expect(flattenMessages({ a: { b: 'x', c: { d: 'y' } } })).toEqual({
      'a.b': 'x',
      'a.c.d': 'y',
    });
  });
});

describe('validateTranslations', () => {
  test('accepts a full file', () => {
    const report = validateTranslations(getFullTranslations());

    expect(report).toMatchObject({
      missingKeys: [],
      unknownKeys: [],
      invalidMessages: [],
    });
  });

  test('counts messages', () => {
    const report = validateTranslations({ common: { save: 'Save' } });

    expect(report.keysCount).toBe(1);
  });

  test('lists missing keys', () => {
    const translations = getFullTranslations();
    delete translations.common.save;

    const report = validateTranslations(translations);

    expect(report.missingKeys).toEqual(['common.save']);
  });

  test('lists keys the app does not use', () => {
    const typo = faker.lorem.word();

    const report = validateTranslations({ common: { [typo]: 'Text' } });

    expect(report.unknownKeys).toEqual([`common.${typo}`]);
  });

  test('accepts placeholders', () => {
    const report = validateTranslations({
      mailSent: { openProvider: 'Open {provider}' },
    });

    expect(report.invalidMessages).toEqual([]);
  });

  test('rejects an unclosed placeholder', () => {
    const report = validateTranslations({
      mailSent: { openProvider: 'Open {provider' },
    });

    expect(report.invalidMessages).toEqual([
      { key: 'mailSent.openProvider', error: 'A "{" is never closed with "}"' },
    ]);
  });

  test('explains a stray "@"', () => {
    const report = validateTranslations({
      common: { emailPurchased: 'Email (like name@ example)' },
    });

    expect(report.invalidMessages).toEqual([
      {
        key: 'common.emailPurchased',
        error: 'The "@" sign has a special meaning, write it as {\'@\'}',
      },
    ]);
  });

  test('rejects HTML', () => {
    const report = validateTranslations({
      common: { save: '<b>Save</b>' },
    });

    expect(report.invalidMessages).toEqual([
      { key: 'common.save', error: 'HTML tags are not allowed' },
    ]);
  });

  test.each([42, null, true, ['Save']])('rejects %s as a message', (value) => {
    const report = validateTranslations({ common: { save: value } });

    expect(report.invalidMessages).toEqual([
      { key: 'common.save', error: 'Message must be a string' },
    ]);
  });
});

describe('overrides storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('is empty by default', () => {
    expect(readOverrides()).toEqual({});
  });

  test('keeps a saved file per language', () => {
    const tree = { common: { save: faker.lorem.word() } };

    saveOverride('en', tree);

    expect(readOverrides()).toEqual({ en: tree });
  });

  test('reset removes only that language', () => {
    const tree = { common: { save: faker.lorem.word() } };
    saveOverride('en', tree);
    saveOverride('ru', tree);

    clearOverride('en');

    expect(readOverrides()).toEqual({ ru: tree });
  });

  test('ignores broken storage', () => {
    localStorage.setItem(OVERRIDES_STORAGE_KEY, '{broken');

    expect(readOverrides()).toEqual({});
  });

  test('ignores unknown languages in storage', () => {
    localStorage.setItem(
      OVERRIDES_STORAGE_KEY,
      JSON.stringify({ de: { common: { save: 'Speichern' } } }),
    );

    expect(readOverrides()).toEqual({});
  });
});

describe('getCurrentTranslations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns the repository file without an upload', () => {
    const current = JSON.parse(getCurrentTranslations('ru'));

    expect(current).toEqual(ru);
  });

  test('puts the uploaded messages on top of the repository file', () => {
    const save = faker.lorem.word();
    saveOverride('ru', { common: { save } });

    const current = JSON.parse(getCurrentTranslations('ru'));

    expect(current).toEqual({ ...ru, common: { ...ru.common, save } });
  });
});
