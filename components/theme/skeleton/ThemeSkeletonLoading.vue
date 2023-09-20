<template>
  <div
    :style="[`height: ${height}`, `width:${width}`]"
    class="custom-skeleton-loading"
  ></div>
</template>

<script setup lang="ts">
import "./index.sass";
interface Props {
  width?: string;
  height?: string;
}
withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "100%",
});
</script>

