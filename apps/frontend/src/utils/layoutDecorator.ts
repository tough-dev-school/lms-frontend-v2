import type { Component } from 'vue';

// The signed-in user now comes from the shared props of the Inertia mock, so the decorator only renders the story
const defaultLayoutDecorator = (story: Component) => ({
  components: { story },
  template: '<story />',
});

export { defaultLayoutDecorator };
