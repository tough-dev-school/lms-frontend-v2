import { defineStore } from 'pinia';
import { getMaterial } from '@/api/materials';
import type { BlockMap } from '@/types/materials';

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
