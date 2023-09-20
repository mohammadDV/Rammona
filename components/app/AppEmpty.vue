<template>
  <BulmaCard class="is-center is-bordered" :style="{ height }">
    <div class="has-text-centered">
      <ThemeIcon stroke-width="1px" size="50px">empty</ThemeIcon>
      <p>
        {{ title ? title : $t("table.empty") }}
      </p>
    </div>
  </BulmaCard>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    height?: string;
  }>(),
  {
    height: "200px",
  }
);
</script>
