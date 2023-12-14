<script lang="ts">
  export interface VNotionViewProps {
    forceNew?: boolean;
    id: string;
    rendererProps: any;
  }
</script>

<script lang="ts" setup>
  import VNewNotionRenderer from './VNewNotionRenderer.vue';
  import VOldNotionRenderer from './VOldNotionRenderer.vue';
  import { computed } from 'vue';
  import 'prismjs';
  import 'prismjs/themes/prism.css';
  import 'prismjs/components/prism-typescript.js';
  import 'prismjs/components/prism-ruby.js';
  import 'prismjs/components/prism-python.js';
  import 'prismjs/components/prism-bash.js';
  import 'prismjs/components/prism-c.js';
  import 'prismjs/components/prism-cpp.js';

  const props = withDefaults(defineProps<VNotionViewProps>(), {
    forceNew: false,
  });

  const isNewRender = computed(() => {
    const MATERIALS_WHITELIST: string[] = [
      '2b333be410e64c178ef46fc1d24bc3ae',
      '3ec0494719004d709f70081fcd0040d8',
      'bff4654a65054375a6f9caaf574c3a75',
      '05797ac75d614b66895b5c7fb5bfa019',
      '67104a06964f40818ff88fe25d7dc20d',
      'a3cca3c25f934817a9500d39c5aeb81a',
      'cf1379bfbf5a41f9942f31dd4253c178',
      //
      '922cc9d830aa465899a13786fbde858d',
      '50307c832c8d434ea1a344d712ef778b',
      '25b863c29412462283885e7de472e693',
      'cdc6bdc24ca34a2aa5ae7b050569e643',
      '66093a675f9d480c9319bfb094c3eab6',
      '7000d817ec4a41a387b88458a400f51c',
      '90102c1b44a64f02a6c29898c94ed637',
      '79549e84155c492ca0870baaa5c9f4bb',
      'd83471818c144241a9185d153bcbfb34',
      '590258df2a8d422e8d880819bfcd9441',
      'bae831c535704b07b34f157e8ef83327',
      '494d03a75e444352bc896adc2f438544',
      'e6959706033742aba9ccc7849d52298a',
      'a3a52209eb2746c2964eccf61e2fb729',
      '6020131011324a3294dcd781514bde28',
      '5a8b0e1cebd84de2b4f256909ad37b0d',
      '6c700e09edae41a08f739c85c1b4544a',
      'ebd49abc6e5a4d60b417cea0b0972223',
      'bc4e44ccb0244fee96faf3519528ab35',
      'f804ba3b4b224f248e5dc8ff9814ca72',
      'a097d3001de740ce8bf958d158f2ac8a',
      '89ff3f8d066a401590b86ae7ad6eeac7',
      '4683806dc3e74831b59ca7d5c4393fc5',
      '5d8a45620adf4781b948d4408f31323a',
    ];

    return props.forceNew || MATERIALS_WHITELIST.includes(props.id);
  });
</script>

<template>
  <div class="dete">
    <component
      :is="isNewRender ? VNewNotionRenderer : VOldNotionRenderer"
      v-bind="rendererProps"
      prism />
  </div>
</template>
