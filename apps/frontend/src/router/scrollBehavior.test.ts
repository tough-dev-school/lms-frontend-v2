import { describe, expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import type { RouteLocationNormalized } from 'vue-router';
import { scrollBehavior } from './scrollBehavior';

const createRoute = (
  route: Partial<RouteLocationNormalized> = {},
): RouteLocationNormalized =>
  ({
    path: `/${faker.lorem.slug()}`,
    hash: '',
    meta: {},
    ...route,
  }) as RouteLocationNormalized;

describe('scrollBehavior', () => {
  test('scrolls to top when moving to another page', () => {
    const result = scrollBehavior(createRoute(), createRoute(), null);

    expect(result).toEqual({ top: 0 });
  });

  test('keeps scroll when only query changes', () => {
    const from = createRoute();
    const to = createRoute({ path: from.path });

    const result = scrollBehavior(to, from, null);

    expect(result).toBeUndefined();
  });

  test('scrolls to anchor from hash', () => {
    const hash = `#${faker.string.alphanumeric(8)}`;

    const result = scrollBehavior(createRoute({ hash }), createRoute(), null);

    expect(result).toEqual({ el: hash, top: 32 });
  });

  test('restores saved position on back and forward', () => {
    const savedPosition = { left: 0, top: faker.number.int({ max: 5000 }) };

    const result = scrollBehavior(createRoute(), createRoute(), savedPosition);

    expect(result).toEqual(savedPosition);
  });

  test('leaves scroll to pages that restore it themselves', () => {
    const to = createRoute({ meta: { handlesScroll: true } });

    const result = scrollBehavior(to, createRoute(), null);

    expect(result).toBeUndefined();
  });
});
