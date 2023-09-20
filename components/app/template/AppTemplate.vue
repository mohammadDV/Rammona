<template>
  <div>
    <BulmaCard class="mb-gap p-3 app-template__title z-index-1">
      <div
        class="is-flex is-align-items-center is-justify-content-space-between"
      >
        <span class="is-flex is-align-items-center">
          <ThemeIcon class="rotate-180-rtl mx-3">{{ icon }}</ThemeIcon>
          {{ hasTranslation ? $t(title) : title }}
        </span>
        <slot name="header-left" />
      </div>
    </BulmaCard>
    <BulmaCard
      :height="height"
      min-height="150px"
      :class="[
        hasOverflow ? 'overflow-y-auto' : 'overflow-y-hidden',
        'app-template__body',
      ]"
    >
      <slot />
    </BulmaCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  height?: string;
  hasTranslation?: boolean;
  hasOverflow?: boolean;
}
withDefaults(defineProps<Props>(), {
  height: "auto",
  hasTranslation: true,
  hasOverflow: true,
});
</script>
