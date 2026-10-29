<script lang="ts" setup>
  import { RouterLink, useRouter } from 'vue-router';
  import { IconChevronDown } from '@tabler/icons-vue';
  import { useI18n } from 'vue-i18n';

  export interface Breadcrumb {
    name: string;
    // #FIXME
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to?: any;
    // Short visible text, name stays as the accessible name
    label?: string;
    // Pages on the same level, shown in a select next to the crumb
    siblings?: Breadcrumb[];
  }

  interface Props {
    items: Breadcrumb[];
  }

  const props = defineProps<Props>();

  const router = useRouter();
  const { t } = useI18n();

  const getPath = (to: Breadcrumb['to']) => router.resolve(to).fullPath;

  // Without the current page among siblings the select would show a wrong option as selected
  const getSiblingOptions = (item: Breadcrumb) => {
    if (!item.to || !item.siblings || item.siblings.length < 2) return [];

    const options = item.siblings.flatMap((sibling) =>
      sibling.to ? [{ name: sibling.name, path: getPath(sibling.to) }] : [],
    );
    const hasCurrent = options.some(
      (option) => option.path === getPath(item.to),
    );
    return hasCurrent ? options : [];
  };

  const navigate = (event: Event) => {
    router.push((event.target as HTMLSelectElement).value);
  };
</script>

<template>
  <nav class="text-sub">
    <ol class="flex flex-wrap items-center gap-x-8 gap-y-4">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="flex items-center gap-8"
      >
        <span
          v-if="index > 0"
          class="text-gray"
          aria-hidden="true"
        >
          /
        </span>
        <RouterLink
          v-if="item.to && index < props.items.length - 1"
          class="text-gray transition-colors hover:text-black dark:hover:text-white"
          :to="item.to"
          :aria-label="item.label ? item.name : undefined"
        >
          {{ item.label ?? item.name }}
        </RouterLink>
        <RouterLink
          v-if="item.to && index === props.items.length - 1"
          aria-current="page"
          :to="item.to"
          :aria-label="item.label ? item.name : undefined"
        >
          {{ item.label ?? item.name }}
        </RouterLink>
        <!-- Native select over the chevron keeps keyboard, screen reader and phone picker support -->
        <span
          v-if="getSiblingOptions(item).length"
          class="relative -ml-4 flex text-gray transition-colors hover:text-black dark:hover:text-white"
        >
          <IconChevronDown
            :size="16"
            aria-hidden="true"
          />
          <select
            class="absolute inset-0 cursor-pointer opacity-0"
            :aria-label="t('common.switchSibling')"
            :value="getPath(item.to)"
            @change="navigate"
          >
            <option
              v-for="option in getSiblingOptions(item)"
              :key="option.path"
              :value="option.path"
            >
              {{ option.name }}
            </option>
          </select>
        </span>
      </li>
    </ol>
  </nav>
</template>
