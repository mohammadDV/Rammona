<template>
  <span
    :class="[
      'tag',
      color && `is-${color}`,
      light && 'is-light',
      rounded && 'is-rounded',
      isDelete && `is-delete`,
      size && `is-${size}`,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type Color =
  | "black"
  | "dark"
  | "light"
  | "white"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "danger";
type Size = "normal" | "medium" | "large";
interface Props {
  color?: Color;
  light?: boolean;
  size?: Size;
  isDelete?: boolean;
  rounded?: boolean;
}
withDefaults(defineProps<Props>(), {
  light: false,
  color: "primary",
  size: "normal",
  isDelete: false,
  rounded: false,
});
</script>
