import { onMounted, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomWindow = typeof window & { Chatra: any };

export const useChatra = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatra: any = ref(undefined);

  onMounted(() => {
    chatra.value = (window as CustomWindow).Chatra;
  });

  return { chatra };
};
