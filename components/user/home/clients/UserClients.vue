<template>
  <div class="app-clients__items">
    <template v-if="userStore.home.experiences.length">
      <div
        v-for="i in userStore.home.experiences"
        :key="i.id"
        class="app-clients__item"
      >
        <h4 dir="ltr">{{ i.feature_text }}</h4>
        <h5>{{ i.title }}</h5>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";

const userStore = useUserStore();
</script>
