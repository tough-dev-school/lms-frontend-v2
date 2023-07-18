import { onMounted, ref } from 'vue';

export const useChatra = () => {
  const chatra: any = ref(undefined);

  onMounted(() => {
    chatra.value = window.Chatra;
  });

  return { chatra };
};
