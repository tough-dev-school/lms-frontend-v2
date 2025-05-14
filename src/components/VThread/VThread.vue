<script lang="ts">
  import type { Thread } from '@/types/homework';

  export interface ThreadAction {
    name?: string;
    handle: (() => void) | (() => Promise<void>) | null;
    show: boolean;
    disabled?: boolean;
  }

  export interface VThreadProps {
    originalPost: Thread;
    customActions?: ThreadAction[];
  }
</script>

<script lang="ts" setup>
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import { computed, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  import VButton from '@/components/VButton/VButton.vue';

  const route = useRoute();
  const router = useRouter();

  const user = useUser();
  const emit = defineEmits<{
    update: [slug: string];
    reply: [];
  }>();
  const replyMode = ref(false);

  const props = withDefaults(defineProps<VThreadProps>(), {
    customActions: () => [],
  });

  const actions = computed<ThreadAction[]>(() => {
    return [
      ...props.customActions,
      {
        name: 'Ответить',
        handle: () => {
          emit('reply');
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
  });

  const prepareForScroll = (slug: string) => {
    if (route.name) {
      router.push({ name: route.name, hash: `#${slug}` });
    }
  };

  const scrollToComment = (slug: string) => {
    if (route.hash === `#${slug}`) {
      if (route.name) {
        router.push({ name: route.name, hash: route.hash });
        router.push({ name: route.name });
      }
    }
  };

  const handleUpdate = async (slug: string) => {
    emit('update', slug);
    replyMode.value = false;
    prepareForScroll(slug);
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
    <div ref="target" class="group">
      <component
        :is="getRootComponent"
        v-bind="getRootComponentProps"
        :id="getRootComponentProps.answer.slug"
        @invalidate="(slug) => handleUpdate(slug)"
        @mounted="scrollToComment">
        <template #footer>
          <div class="flex gap-16">
            <VButton
              v-for="(action, index) in actions.filter((action) => action.show)"
              :key="index"
              :class="{
                'cursor-auto opacity-50 w-auto': !action.handle,
              }"
              :title="action.name"
              size="inline"
              appearance="link"
              :disabled="action.disabled"
              @click="action.handle ? action.handle() : null">
              {{ action.name }}
            </VButton>
          </div>
        </template>
      </component>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VOwnAnswer
          v-show="replyMode"
          :question-id="originalPost.question"
          :parent-id="originalPost.slug"
          @invalidate="(slug) => handleUpdate(slug)" />
      </div>
    </div>
    <div v-if="originalPost.descendants?.length > 0" class="thread-ruler mt-32">
      <VThread
        v-for="reply in originalPost.descendants"
        :key="reply.slug"
        :original-post="reply"
        @update="(slug) => handleUpdate(slug)" />
    </div>
  </div>
</template>

<style>
  .thread-ruler {
    @apply flex flex-col gap-16 pl-8 transition-colors tablet:pl-16 border-l border-gray border-opacity-20 hover:border-opacity-100;
  }
</style>
