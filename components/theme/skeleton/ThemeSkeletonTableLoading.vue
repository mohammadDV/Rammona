<template>
  <BulmaCard class="p-1">
    <ThemeSkeletonLoading
      v-for="i in rows"
      :key="i"
      height="45px"
      :class="{ 'my-1': i !== 1 && i !== rows }"
    />
  </BulmaCard>
</template>

<script setup lang="ts">
interface Props {
  rows?: number;
}
withDefaults(defineProps<Props>(), {
  rows: 10,
});
</script>

