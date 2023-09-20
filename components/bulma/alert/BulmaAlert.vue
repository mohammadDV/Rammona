<template>
  <article
    :class="['message dir-auto', color && `is-${color}`, size && `is-${size}`]"
  >
    <div v-if="!justBody" class="message-header">
      <p>{{ title }}</p>
      <button
        @click="emit('close')"
        class="delete"
        type="button"
        aria-label="delete"
      ></button>
    </div>
    <div class="message-body">
      <slot />
    </div>
  </article>
</template>
<script setup lang="ts">
type Sizes = "small" | "normal" | "medium" | "large";
type Colors =
  | "white"
  | "light"
  | "dark"
  | "black"
  | "text"
  | "ghost"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger";
interface Props {
  title?: string;
  color?: Colors;
  justBody?: boolean;
  size?: Sizes;
}
withDefaults(defineProps<Props>(), {
  color: "info",
  justBody: true,
  size: "normal",
});
//
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>
