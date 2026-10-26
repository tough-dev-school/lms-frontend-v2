import type { DefineComponent } from 'vue';

// A page name is the view file name, wherever it sits under views/
const views = import.meta.glob<DefineComponent>('./views/**/V*View.vue', {
  import: 'default',
});

export const resolvePage = async (name: string) => {
  const path = Object.keys(views).find((key) => key.endsWith(`/${name}.vue`));
  if (!path) throw new Error(`Page not found: ${name}`);
  return views[path]();
};
