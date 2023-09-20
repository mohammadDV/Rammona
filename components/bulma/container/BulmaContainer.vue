<template>
  <div :class="['container', fluid && 'is-fluid']">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  fluid?: boolean;
}
withDefaults(defineProps<Props>(), {
  fluid: false,
});
</script>