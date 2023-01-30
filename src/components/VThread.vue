<script lang="ts" setup>
  import type { Thread } from '@/types/homework';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import { computed, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';

  export interface Actions {
    name: string;
    handle: () => void;
    show: boolean;
  }

  export interface Props {
    originalPost: Thread;
    defaultActions: boolean;
    customActions: Actions[];
  }

  const user = useUser();
  const emit = defineEmits<{
    (e: 'update'): void;
  }>();
  const replyMode = ref(false);

  const props = withDefaults(defineProps<Props>(), {
    defaultActions: true,
    customActions: () => [],
  });

  const actions = computed<Actions[]>(() => {
    const defaultActions = [
      {
        name: 'Ответить',
        handle: () => {
          replyMode.value = true;
        },
        show: replyMode.value === false,
      },
      {
        name: 'Не отвечать',
        handle: () => {
          replyMode.value = false;
        },
        show: replyMode.value === true,
      },
    ];

    return [...defaultActions, ...props.customActions];
  });

  const handleUpdate = () => {
    replyMode.value = false;
    emit('update');
  };

  const target = ref(null);

  onClickOutside(target, () => {
    replyMode.value = false;
  });

  const getRootComponent = computed(() => {
    const rootComponent =
      props.originalPost.author.uuid !== user.uuid ? VAnswer : VOwnAnswer;

    return rootComponent;
  });

  const getRootComponentProps = computed(() => {
    const rootComponentProps: any = { answer: props.originalPost };

    rootComponentProps.questionId = props.originalPost.question;

    return rootComponentProps;
  });
</script>

<template>
  <div>
    <div class="group" ref="target">
      <component
        :is="getRootComponent"
        v-bind="getRootComponentProps"
        :id="getRootComponentProps.answer.slug"
        @update="emit('update')">
        <template #footer>
          <button
            v-for="(action, index) in actions.filter((action) => action.show)"
            :key="index"
            @click="action.handle">
            {{ action.name }}
          </button>
        </template>
      </component>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VNewAnswer
          v-if="replyMode"
          :questionId="originalPost.question"
          :parentId="originalPost.slug"
          @update="handleUpdate" />
      </div>
    </div>
    <div class="thread-ruler mt-16" v-if="originalPost.descendants.length > 0">
      <VThread
        v-for="reply in originalPost.descendants"
        :originalPost="reply"
        @update="emit('update')"
        :key="reply.slug" />
    </div>
  </div>
</template>

<style scoped>
  .thread-ruler {
    @apply flex flex-col gap-16 border-l border-gray border-opacity-10 pl-8 transition-colors hover:border-opacity-25 tablet:pl-16;
  }
</style>
