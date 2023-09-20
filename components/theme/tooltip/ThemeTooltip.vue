<template>
  <div class="tooltip">
    <div
      class="tooltip__title"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      <slot />
    </div>
    <Transition name="fade">
      <div v-if="show" class="tooltip__body">
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import "./index.sass";
const show = ref(false);
</script>
