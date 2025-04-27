<script lang="ts">
  import type { Thread } from '@/types/homework';
  import type { MoodHappyIcon } from 'vue-tabler-icons';

  export interface ThreadAction {
    name?: string;
    handle: (() => void) | null;
    show: boolean;
    icon: typeof MoodHappyIcon;
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
  import VNewAnswer from '@/components/VNewAnswer/VNewAnswer.vue';
  import { computed, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  import { MessageCircleIcon, MessageCircleOffIcon } from 'vue-tabler-icons';
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
        icon: MessageCircleIcon,
        show: replyMode.value === false,
      },
      {
        name: 'Не отвечать',
        handle: () => {
          replyMode.value = false;
        },
        icon: MessageCircleOffIcon,
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
    replyMode.value = false;
    emit('update', slug);

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
        @update="emit('update', originalPost.slug)"
        @mounted="scrollToComment">
        <template #footer>
          <div class="flex">
            <VButton
              v-for="(action, index) in actions.filter((action) => action.show)"
              :key="index"
              class="px-16 h-32"
              :class="{
                'cursor-auto opacity-50 w-auto': !action.handle,
              }"
              :title="action.name"
              type="inline"
              appearance="secondary"
              :disabled="action.disabled"
              @click="action.handle">
              <component :is="action.icon" />
            </VButton>
          </div>
        </template>
      </component>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VNewAnswer
          v-show="replyMode"
          :question-id="originalPost.question"
          :parent-id="originalPost.slug"
          @update="handleUpdate" />
      </div>
    </div>
    <div v-if="originalPost.descendants?.length > 0" class="thread-ruler mt-16">
      <VThread
        v-for="reply in originalPost.descendants"
        :key="reply.slug"
        :original-post="reply" />
    </div>
  </div>
</template>

<style>
  .thread-ruler {
    @apply flex flex-col gap-16 pl-8 transition-colors tablet:pl-40;
  }
</style>
