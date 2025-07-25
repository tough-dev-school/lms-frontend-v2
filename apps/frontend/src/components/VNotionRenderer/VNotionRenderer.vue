<script lang="ts">
  import type { BlockMap } from '@/query/types/materials';

  export interface VNotionViewProps {
    blockMap: BlockMap;
    materialId: string;
  }
</script>

<script lang="ts" setup>
  /* eslint-disable import-x/first */
  // @ts-nocheck
  import { NotionRenderer } from 'vue-notion';
  import { onMounted } from 'vue';
  import { useEventListener } from '@vueuse/core';

  const props = defineProps<VNotionViewProps>();

  const mapPageUrl = (materialId: string) => `/materials/${materialId}`;
  const mapBlockId = (id: string) => `${props.materialId}-${id}}`;

  onMounted(() => {
    /**
     * This is fucking hack to be able to check checkboxes and save state to localStorage that rendered via NotionRenderer
     */

    document
      .querySelectorAll('.notion-checkbox-wrapper input')
      .forEach((checkbox) => {
        // All checkboxes are disabled by default
        checkbox.disabled = false;

        // set checked state from localStorage
        const id = checkbox.parentElement.parentElement.id;
        checkbox.checked = !!localStorage.getItem(mapBlockId(id));
      });

    useEventListener(document, 'change', (e) => {
      if (
        e.target.parentElement.classList.contains('notion-checkbox-wrapper')
      ) {
        // label element id
        const id = e.target.parentElement.parentElement.id;

        // Save state to localStorage
        if (e.target.checked) {
          localStorage.setItem(mapBlockId(id), '1');
        } else {
          localStorage.removeItem(mapBlockId(id));
        }
      }
    });
  });
</script>

<template>
  <NotionRenderer
    :block-map="blockMap"
    :map-page-url="mapPageUrl"
    :page-link-options="{
      component: 'RouterLink',
      href: 'to',
    }"
    :full-page="true" />
</template>

<style>
  .notion {
    line-height: 1.5;
    caret-color: rgb(55, 53, 47);
  }

  .notion > *,
  .notion-page > *,
  .notion-column > * {
    padding: 3px 0px;
  }

  .notion * {
    box-sizing: border-box;
    margin-block-start: 0px;
    margin-block-end: 0px;
  }
  .notion-red {
    color: rgb(224, 62, 62);
  }
  .notion-pink {
    color: rgb(173, 26, 114);
  }
  .dark .notion-pink {
    color: rgb(255, 192, 203);
  }
  .notion-blue {
    color: rgb(11, 110, 153);
  }
  .dark .notion-blue {
    color: rgb(191, 219, 255);
  }
  .notion-purple {
    color: rgb(105, 64, 165);
  }
  .dark .notion-purple {
    color: rgb(213, 210, 255);
  }
  .notion-teal {
    color: rgb(15, 123, 108);
  }
  .dark .notion-teal {
    color: rgb(191, 219, 255);
  }
  .notion-yellow {
    color: rgb(223, 171, 1);
  }
  .dark .notion-yellow {
    color: rgb(255, 229, 100);
  }
  .notion-orange {
    color: rgb(217, 115, 13);
  }
  .dark .notion-orange {
    color: rgb(255, 183, 77);
  }
  .notion-brown {
    color: rgb(100, 71, 58);
  }
  .dark .notion-brown {
    color: rgb(209, 198, 185);
  }
  .notion-gray {
    color: rgb(155, 154, 151);
  }
  .dark .notion-gray {
    color: rgb(191, 191, 191);
  }
  .notion-red_background,
  .notion-red_background_co {
    background-color: rgba(224, 62, 62, 0.25);
  }
  .notion-pink_background,
  .notion-pink_background_co {
    background-color: rgba(173, 26, 114, 0.25);
  }
  .notion-blue_background,
  .notion-blue_background_co {
    background-color: rgba(11, 110, 153, 0.25);
  }
  .notion-purple_background,
  .notion-purple_background_co {
    background-color: rgba(105, 64, 165, 0.25);
  }
  .notion-teal_background,
  .notion-teal_background_co {
    background-color: rgba(15, 123, 108, 0.25);
  }
  .notion-yellow_background,
  .notion-yellow_background_co {
    background-color: rgba(223, 171, 1, 0.25);
  }
  .notion-orange_background,
  .notion-orange_background_co {
    background-color: rgba(217, 115, 13, 0.25);
  }
  .notion-brown_background,
  .notion-brown_background_co {
    background-color: rgba(100, 71, 58, 0.25);
  }
  .notion-gray_background,
  .notion-gray_background_co {
    background-color: rgba(155, 154, 151, 0.25);
  }

  .dark .notion-callout {
    background-color: #282828;
  }

  .notion b {
    font-weight: 600;
  }

  .notion-title {
    font-size: 2.5em;
    font-weight: 700;
    margin-top: 0.75em;
    margin-bottom: 0.25em;
  }

  .notion-h1,
  .notion-h2,
  .notion-h3 {
    font-weight: 600;
    line-height: 1.3;
    padding: 3px 2px;
  }

  .notion-h1 {
    font-size: 1.875em;
    margin-top: 1.4em;
  }
  .notion-h1:first-child {
    margin-top: 0;
  }
  .notion-h2 {
    font-size: 1.5em;
    margin-top: 1.1em;
  }
  .notion-h3 {
    font-size: 1.25em;
    margin-top: 1em;
  }
  .notion-emoji {
    font-family:
      'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }
  .notion-page-cover {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 30vh;
    min-height: 30vh;
    padding: 0;
  }

  .notion-page {
    padding: 0;
    margin: 0 auto;
    max-width: 708px;
    width: 100%;
  }

  @media only screen and (max-width: 730px) {
    .notion-page {
      padding: 0 2vw;
    }
  }

  .notion-page-offset {
    margin-top: 96px;
  }

  span.notion-page-icon-cover {
    height: 78px;
    width: 78px;
    font-size: 78px;
    display: inline-block;
    line-height: 1.1;
    margin-left: 0px;
  }

  span.notion-page-icon-offset {
    margin-top: -42px;
  }

  img.notion-page-icon-cover {
    border-radius: 3px;
    width: 124px;
    height: 124px;
    margin: 8px;
  }

  img.notion-page-icon-offset {
    margin-top: -80px;
  }

  .notion-full-width {
    padding: 0 40px;
    max-width: 100%;
  }

  .notion-small-text {
    font-size: 14px;
  }
  .notion-quote {
    white-space: pre-wrap;
    word-break: break-word;
    border-left: 3px solid currentcolor;
    padding: 0.2em 0.9em;
    margin: 0;
    font-size: 1.2em;
  }
  .notion-hr {
    margin: 6px 0px;
    padding: 0;
    border-top-width: 1px;
    border-bottom-width: 0;
    border-color: rgba(55, 53, 47, 0.09);

    @apply dark:border-darkmode-border;
  }
  .notion-link {
    color: inherit;
    word-break: break-word;
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-size: 100% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: opacity 0.3s;
    position: relative;
    opacity: 0.7;
    transition: opacity 100ms ease-in;
  }
  .notion-link:has(> span),
  .notion-link:has(> b) {
    background-image: none;
  }
  .notion-link > span,
  .notion-link > b span {
    opacity: inherit;
    background-image: linear-gradient(currentColor, currentColor);
    background-size: 100% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
  .notion-link:hover,
  .notion-link:hover > span {
    opacity: 100%;
  }
  .notion-blank {
    min-height: 1rem;
    padding: 3px 2px;
    margin-top: 1px;
    margin-bottom: 1px;
  }
  .notion-page-link {
    display: flex;
    color: rgb(55, 53, 47);
    text-decoration: none;
    height: 30px;
    margin: 1px 0px;
    transition: background 120ms ease-in 0s;
    @apply dark:text-white;
  }
  .notion-page-link:hover {
    background: rgba(55, 53, 47, 0.08);
  }
  .dark .notion-page-link:hover {
    @apply bg-darkmode-layer3;
  }
  .notion-page-icon {
    line-height: 1.4;
    margin-right: 4px;
    margin-left: 2px;
  }
  img.notion-page-icon {
    display: block;
    object-fit: cover;
    border-radius: 3px;
    width: 20px;
    height: 20px;
  }

  .notion-icon {
    display: block;
    width: 18px;
    height: 18px;
    color: rgba(55, 53, 47, 0.4);
  }

  .notion-page-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    line-height: 1.3;
    border-bottom: 1px solid rgba(55, 53, 47, 0.16);
    margin: 1px 0px;

    @apply dark:border-b-darkmode-border;
  }

  .notion-inline-code {
    color: #eb5757;
    padding: 0.2em 0.4em;
    background: rgba(135, 131, 120, 0.15);
    border-radius: 3px;
    font-size: 85%;
    font-family:
      'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }

  .notion-list {
    margin: 0;
    margin-block-start: 0.6em;
    margin-block-end: 0.6em;
  }

  .notion-list-disc {
    list-style-type: disc;
    padding-left: 1.6em; /* edit: changed logical propterties default to left */
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .notion-list-numbered {
    list-style-type: decimal;
    padding-left: 1.6em; /* edit: changed logical propterties default to left */
    margin-top: 0px;
    margin-bottom: 0px;
  }

  /* edit start: added rtl override */
  [dir='rtl'] .notion-list-disc {
    padding-right: 1.7em;
  }
  [dir='rtl'] .notion-list-numbered {
    padding-right: 1.6em;
  }
  /* edit end */

  .notion-list-disc li {
    padding-left: 0.1em;
  }

  .notion-list-numbered li {
    padding-left: 0.2em;
  }

  .notion-list li {
    padding: 4px 0px;
    white-space: pre-wrap;
  }

  .notion-list > .notion-text {
    margin-left: -1.6em;
    padding-left: 0px;
  }

  .notion-asset-wrapper {
    margin: 0.5rem 0;
    margin-bottom: 0.8rem;
    max-width: 100vw;
    min-width: 100%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .notion-asset-wrapper-full {
    max-width: 100vw;
  }

  .notion-asset-wrapper img,
  .notion-asset-wrapper div {
    width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  .notion-asset-wrapper iframe {
    border: none;
    background: rgb(247, 246, 245);
  }

  @media only screen and (max-width: 730px) {
    .notion-asset-wrapper {
      max-width: 100%;
    }

    .notion-asset-wrapper-full {
      max-width: 100vw;
    }
  }

  .notion-text {
    white-space: pre-wrap;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
  }
  .notion-block {
    padding: 3px 2px;
  }

  .notion .notion-code {
    font-size: 85%;
  }

  .notion-code {
    padding: 30px 16px 30px 20px;
    margin: 4px 0;
    border-radius: 3px;
    tab-size: 2;
    display: block;
    box-sizing: border-box;
    overflow-x: auto; /* edit: changed from `scroll` */
    background: rgb(247, 246, 243);
    font-family:
      SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }

  .notion-column {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .notion-column > *:first-child {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .notion-column > *:last-child {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }

  .notion-row {
    display: flex;
    overflow: hidden;
  }

  .notion-bookmark {
    margin: 4px 0;
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
    border: 1px solid rgba(55, 53, 47, 0.16);
    border-radius: 3px;
    display: flex;
    overflow: hidden;
    user-select: none;

    @apply dark:border-darkmode-border;
  }

  .notion-bookmark > div:first-child {
    flex: 4 1 180px;
    padding: 12px 14px 14px;
    overflow: hidden;
    text-align: left;
    color: inherit;
  }

  .notion-bookmark-title {
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 24px;
    margin-bottom: 2px;
  }

  .notion-bookmark-description {
    font-size: 12px;
    line-height: 16px;
    opacity: 0.6;
    height: 32px;
    overflow: hidden;
  }

  .notion-bookmark-link {
    display: flex;
    margin-top: 6px;
  }

  .notion-bookmark-link > img {
    width: 16px;
    height: 16px;
    min-width: 16px;
    margin-right: 6px;
  }

  .notion-bookmark-link > div {
    font-size: 12px;
    line-height: 16px;
    color: rgb(55, 53, 47);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notion-bookmark-image {
    flex: 1 1 180px;
    position: relative;
  }

  .notion-bookmark-image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .notion-column .notion-bookmark-image {
    display: none;
  }

  @media (max-width: 640px) {
    .notion-bookmark-image {
      display: none;
    }

    .notion-row {
      flex-direction: column;
    }

    .notion-row > *,
    .notion-column > * {
      width: 100% !important;
    }
  }

  .notion-spacer:last-child {
    display: none;
  }

  .notion-image-inset {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 1px;
  }

  .notion-image-caption {
    padding: 6px 0px;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    font-size: 14px;
    line-height: 1.4;
    color: rgba(55, 53, 47, 0.6);
  }

  .notion-callout {
    padding: 16px 16px 16px 12px;
    display: inline-flex;
    width: 100%;
    border-radius: 3px;
    align-items: center;
    box-sizing: border-box;
    margin: 4px 0;
    align-items: flex-start;
  }

  .notion-callout .notion-page-icon {
    align-self: flex-start;
    width: 24px;
    height: 24px;
    font-size: 1.3em;
    line-height: 1em;
  }

  .notion-callout-text {
    margin-left: 8px;
    white-space: pre-wrap;
    word-break: break-word;
    width: calc(100% - 16px - 24px);
  }

  .notion-toggle {
    padding: 3px 2px;
  }
  .notion-toggle > summary {
    cursor: pointer;
    outline: none;
  }
  .notion-toggle > div {
    margin-left: 1.1em;
  }

  .notion-table,
  .notion-th,
  .notion-td {
    border: 1px solid rgba(55, 53, 47, 0.09);
    border-collapse: collapse;
  }

  .notion-table {
    width: 100%;
    border-left: none;
    border-right: none;
    border-spacing: 0px;
    white-space: nowrap;
  }

  .notion-th,
  .notion-td {
    font-weight: normal;
    padding: 0.25em 0.5em;
    line-height: 1.5;
    min-height: 1.5em;
    text-align: left;
    font-size: 14px;
  }

  .notion-td.notion-bold {
    font-weight: 500;
  }

  .notion-th {
    color: rgba(55, 53, 47, 0.6);
    font-size: 14px;
  }

  .notion-td:first-child,
  .notion-th:first-child {
    border-left: 0;
  }

  .notion-td:last-child,
  .notion-th:last-child {
    border-right: 0;
  }

  .notion-gallery {
    display: grid;
    position: relative;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-auto-rows: 1fr;
    gap: 16px;
    border-top: 1px solid rgba(55, 53, 47, 0.16);
    padding-top: 16px;
    padding-bottom: 4px;
  }
  .notion-gallery-card {
    display: block;
    color: inherit;
    text-decoration: none;
    box-shadow:
      rgba(15, 15, 15, 0.1) 0px 0px 0px 1px,
      rgba(15, 15, 15, 0.1) 0px 2px 4px;
    border-radius: 3px;
    background: white;
    overflow: hidden;
    transition: background 100ms ease-out 0s;
    position: static;
    height: 100%;
  }

  .notion-gallery-content {
    padding: 8px 10px 6px;
    font-size: 12px;
    white-space: nowrap;
  }

  .notion-gallery-data.is-first {
    white-space: nowrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    font-size: 14px;
    line-height: 1.5;
    min-height: 21px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notion-page-header {
    position: sticky;
    top: 0;
    width: 100%;
    max-width: 100vw;
    height: 45px;
    min-height: 45px;
    display: flex;
    background: #fff;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    text-size-adjust: 100%;
    line-height: 1.5;
    line-height: 1.2;
    font-size: 14px;
  }

  .notion-nav-breadcrumbs {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    flex-grow: 0;
    min-width: 0;
    margin-right: 8px;
  }

  .notion-nav-breadcrumb {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    color: rgb(55, 53, 47);
    text-decoration: none;
    margin: 1px 0px;
    padding: 4px 6px;
    border-radius: 3px;
    transition: background 120ms ease-in 0s;
    user-select: none;
    background: transparent;
    cursor: pointer;
  }

  img.notion-nav-icon {
    width: 18px !important;
    height: 18px !important;
  }

  .notion-nav-icon {
    font-size: 18px;
    margin-right: 6px;
    line-height: 1.1;
    color: #000;
  }

  .notion-nav-breadcrumb:not(.notion-nav-breadcrumb-active):hover {
    background: rgba(55, 53, 47, 0.08);
  }

  .notion-nav-breadcrumb:not(.notion-nav-breadcrumb-active):active {
    background: rgba(55, 53, 47, 0.16);
  }

  .notion-nav-breadcrumb.notion-nav-breadcrumb-active {
    cursor: default;
  }

  .notion-nav-spacer {
    margin: 0 2px;
    color: rgba(55, 53, 47, 0.4);
  }

  .notion-simple-table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .notion-simple-table-data {
    color: inherit;
    fill: inherit;
    border: 1px solid rgb(233, 233, 231);
    position: relative;
    vertical-align: top;
    min-width: 178px;
    max-width: 178px;
    min-height: 32px;
  }

  .notion-simple-table-cell-text {
    max-width: 100%;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: transparent;
    padding: 7px 9px;
    background-color: transparent;
    font-size: 14px;
    line-height: 20px;
  }

  .notion-simple-table-header {
    font-weight: 500;
  }

  .notion-table-of-contents,
  .notion-table-of-contents ul {
    list-style: none;
  }

  .notion-to-do-item {
    width: 100%;
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding-left: 2px;
    min-height: calc(1.5em + 3px + 3px);
    position: relative;
  }

  .notion-to-do-item .notion-to-do-checked {
    text-decoration: line-through;
    text-decoration-color: #b9747459;
    opacity: 0.5;
  }

  .notion-to-do-body {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .notion-to-do-item .notion-checkbox-wrapper {
    margin-right: 8px;
  }

  .notion-to-do-item input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 2px solid rgba(71, 71, 71, 0.918);
    outline: none;
    transition-duration: 0.3s;
    cursor: pointer;
    min-width: 1em;
    min-height: 1em;
    vertical-align: sub;
  }

  .notion-to-do-item input[type='checkbox']:checked {
    border: 2px solid rgb(46, 170, 220);
    background-color: rgb(46, 170, 220);
    background: rgb(46, 170, 220)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' class='check' style='width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;'%3E%3Cpolygon points='5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039'%3E%3C/polygon%3E%3C/svg%3E");
  }

  .dark .notion-to-do-item input[type='checkbox'] {
    @apply border-darkmode-border;
  }

  .dark .notion-to-do-item input[type='checkbox']:checked {
    @apply border-darkmode-blue bg-darkmode-blue;
  }
  .table-of-contents-item.table-of-contents-item.table-of-contents-item {
    display: grid;
    place-items: start;
    gap: 8px;
  }
</style>
