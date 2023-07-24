import type { BlockMap } from '@/types/materials';

import { getMaterial } from '@/api/materials';
import { defineStore } from 'pinia';

interface State {
  material?: BlockMap;
}

const useMaterials = defineStore('materials', {
  actions: {
    async getData(materialId: string) {
      try {
        this.material = await getMaterial(materialId);
      } catch (error: any) {}
    },
  },
  state: (): State => {
    return {
      material: undefined,
    };
  },
});

export default useMaterials;
