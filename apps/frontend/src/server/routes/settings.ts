import { Hono } from 'hono';
import {
  authPasswordChangeCreate,
  usersMePartialUpdate,
} from '@/api/generated';
import type { PatchedUserSelfUpdate } from '@/api/generated';
import client from '@/api/client';
import { readBody, readString } from '../body';
import { redirectBack, setFlash, submitForm } from '../forms';
import type { AppEnv } from '../types';

// Fields a student may change about themselves, everything else in the body is ignored
const PROFILE_FIELDS = [
  'first_name',
  'last_name',
  'first_name_en',
  'last_name_en',
  'gender',
  'github_username',
  'linkedin_username',
  'telegram_username',
] as const satisfies (keyof PatchedUserSelfUpdate)[];

const pickProfile = (body: Record<string, unknown>) =>
  Object.fromEntries(
    PROFILE_FIELDS.filter((field) => field in body).map((field) => [
      field,
      readString(body, field),
    ]),
  ) as PatchedUserSelfUpdate;

export const settings = new Hono<AppEnv>()
  .get('/settings', (c) => c.var.inertia.render('VSettingsView'))
  .post('/settings/password', async (c) => {
    const body = await readBody(c);

    return submitForm(c, async () => {
      await authPasswordChangeCreate({
        new_password1: readString(body, 'new_password1'),
        new_password2: readString(body, 'new_password2'),
      });
      setFlash(c, { saved: 'password' });
      return redirectBack(c);
    });
  })
  .patch('/settings/profile', async (c) => {
    const body = await readBody(c);

    return submitForm(c, async () => {
      await usersMePartialUpdate(pickProfile(body));
      return redirectBack(c);
    });
  })
  .post('/settings/avatar', async (c) => {
    const { avatar } = await c.req.parseBody();
    const data = new FormData();
    // An empty value removes the avatar
    data.append('avatar', avatar instanceof File ? avatar : '');

    return submitForm(c, async () => {
      // The generated client sends JSON, the avatar has to go as multipart
      await client({ method: 'PATCH', url: '/api/v2/users/me/', data });
      return redirectBack(c);
    });
  });
