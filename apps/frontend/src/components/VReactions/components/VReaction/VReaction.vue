<script lang="ts">
  import type { ReactionDetailed } from '@/api/generated/generated-api';
  import { ReactionEmoji } from '@/components/VReactions/VReactions.vue';

  export interface VReactionProps {
    userId: string;
    emoji: ReactionEmoji;
    reactions?: ReactionDetailed[];
    disabled: boolean;
  }
</script>

<script lang="ts" setup>
  /* eslint-disable import-x/first */
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { computed } from 'vue';
  import { getName } from '@/utils/getName';
  import VButton from '@/components/VButton/VButton.vue';

  const props = withDefaults(defineProps<VReactionProps>(), {
    reactions: () => [],
  });

  const emit = defineEmits<{
    add: [reaction: ReactionEmoji];
    remove: [reactionId: string];
  }>();

  const ownReaction = computed(() => {
    return props.reactions.find(
      (reaction) => reaction.author.uuid === props.userId,
    );
  });

  const handleClick = () => {
    if (props.disabled) return;
    if (ownReaction.value) {
      emit('remove', ownReaction.value.slug);
    } else {
      emit('add', props.emoji);
    }
  };

  const orderedAuthors = computed(() => {
    return props.reactions
      .map((reaction) => reaction.author)
      .sort((a, b) => {
        if (a.uuid === props.userId) return 1;
        if (b.uuid === props.userId) return -1;
        return 0;
      });
  });
</script>

<template>
  <VButton
    size="inline"
    appearance="secondary"
    class="inline-flex h-32 min-w-[64px] flex-row items-center gap-16 text-[1.25rem]"
    :class="{
      'cursor-not-allowed': disabled,
      '!border !border-gray dark:!border-darkmode-border': ownReaction,
      'pl-8 pr-4': reactions.length !== 0,
      'justify-center px-16': reactions.length === 0,
    }"
    @click="handleClick"
  >
    <div
      class="flex h-24 w-24 items-center justify-center leading-none"
      data-testid="emoji"
    >
      {{ emoji }}
    </div>
    <div
      v-if="reactions.length > 0"
      class="flex items-center pr-16"
    >
      <abbr
        v-for="author in orderedAuthors"
        :key="author.uuid"
        class="relative -mr-[12px] transition-all hover:z-50 hover:scale-125"
        data-testid="author"
        :title="getName(author.first_name, author.last_name)"
      >
        <VAvatar
          class="!h-24 !w-24"
          :user-id="author.uuid"
          :image="author.avatar"
          data-testid="avatar"
        />
      </abbr>
    </div>
  </VButton>
</template>
