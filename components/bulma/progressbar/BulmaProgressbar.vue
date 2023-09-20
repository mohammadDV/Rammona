<template>
  <progress
    :style="`height: ${height}; `"
    :class="[
      'progress',
      color && `is-${color}`,
      width ? 'is-clickable' : 'is-cursor-progress',
    ]"
    :value="width"
    max="100"
    :title="`${width}%`"
  ></progress>
</template>

<script setup lang="ts">
interface Props {
  height?: string;
  width?: number; // percentage
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: "5px",
  width: 0,
  color: "primary",
});
// ref
const progress = ref<HTMLElement>();
onMounted(() => {
  if (!props.width && progress.value) {
    progress.value.removeAttribute("value");
  }
});
</script>
