<template>
  <div class="app-challenges__items">
    <template v-if="userStore.home.challenges.length">
      <div
        v-for="item in userStore.home.challenges"
        :key="item.id"
        class="app-challenges__item"
      >
        <img v-if="item.icon" :src="getFileUrl(item.icon)" height="100" width="100" />
        <h4>{{ item.title }}</h4>

        <div class="app-challenges__item_p">
          <p>
            {{ item.content }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";

const userStore = useUserStore();
const { getFileUrl } = useFunctions();
</script>
