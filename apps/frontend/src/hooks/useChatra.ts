import { onMounted, ref } from 'vue';

type CustomWindow = typeof window & { Chatra: any };

export const useChatra = () => {
  const chatra: any = ref(undefined);

  onMounted(() => {
    chatra.value = (window as CustomWindow).Chatra;
  });

  return { chatra };
};
