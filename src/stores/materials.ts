// @ts-ignore
import type { BlockMap } from 'vue3-notion/src/lib/types';
import { defineStore } from 'pinia';
import { getMaterial } from '@/api/materials';

interface State {
  material?: BlockMap;
}

const useMaterials = defineStore('materials', {
  state: (): State => {
    return {
      material: undefined,
    };
  },
  actions: {
    async getData(materialId: string) {
      try {
        this.material = await getMaterial(materialId);
      } catch (error: any) {}
    },
  },
});

export default useMaterials;
