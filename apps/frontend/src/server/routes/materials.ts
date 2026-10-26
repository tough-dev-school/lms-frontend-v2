import { Hono } from 'hono';
import type { Context } from 'hono';
import { materialsRetrieve, materialsStatusRetrieve } from '@/api/generated';
import { isApiError } from '@/api/client';
import { getMe } from '../auth';
import type { AppEnv } from '../types';

const findMaterial = async (materialId: string) => {
  try {
    return await materialsRetrieve(materialId);
  } catch (error) {
    // The page explains a missing material and links to support
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
};

// Only staff see the update panel, students don't pay for the extra request
const findStatus = async (c: Context<AppEnv>, materialId: string) => {
  const me = await getMe(c);
  return me.is_staff ? materialsStatusRetrieve(materialId) : null;
};

export const materials = new Hono<AppEnv>().get(
  '/materials/:materialId',
  async (c) => {
    const materialId = c.req.param('materialId');
    const [material, materialStatus] = await Promise.all([
      findMaterial(materialId),
      findStatus(c, materialId),
    ]);

    return c.var.inertia.render('VMaterialView', {
      materialId,
      material,
      materialStatus,
    });
  },
);
