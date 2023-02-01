<script lang="ts" setup>
  import type { Thread } from '@/types/homework';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import { computed, ref, nextTick } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';

  export interface Actions {
    name: string;
    handle: (() => void) | null;
    show: boolean;
  }

  export interface Props {
    originalPost: Thread;
    customActions: Actions[];
  }

  const route = useRoute();
  const router = useRouter();

  const user = useUser();
  const emit = defineEmits<{
    (e: 'update'): void;
  }>();
  const replyMode = ref(false);

  const props = withDefaults(defineProps<Props>(), {
    customActions: () => [],
  });

  const actions = computed<Actions[]>(() => {
    return [
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
      ...props.customActions,
    ];
  });

  const handleUpdate = async (slug: string) => {
    replyMode.value = false;
    emit('update');

    if (route.name) {
      router.push({ name: route.name, hash: `#${slug}` });
    }
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
            :class="{ 'cursor-auto opacity-50': !action.handle }"
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
