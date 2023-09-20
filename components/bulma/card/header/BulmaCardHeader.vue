<template>
  <div class="card">
    <header @click="show = !show" class="card-header is-clickable no-select">
      <p class="card-header-title">
        {{ title }}
      </p>
      <span class="card-header-icon">
        <ThemeIcon type="solid">{{ show ? "menu" : "menu-down" }}</ThemeIcon>
      </span>
    </header>
    <templte v-if="show">
      <transition name="fadeIn">
        <slot />
      </transition>
    </templte>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();
// show slot
const show = ref(false);
</script>