import VDefaultLayout from '@/layouts/VDefaultLayout.vue';

const layoutDecorator = (story, layout) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
});

const defaultLayoutDecorator = (story) =>
  layoutDecorator(story, VDefaultLayout);

export { defaultLayoutDecorator };
