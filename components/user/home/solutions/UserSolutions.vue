<template>
  <div class="app-solutions__items">
    <template v-if="userStore.home.solutions.length">
      <div
        v-for="item in userStore.home.solutions"
        :key="item.id"
        class="app-solutions__item"
      >
        <div class="is-flex is-justify-content-center mb-gap">
          <img
            v-if="item.icon"
            :src="getFileUrl(item.icon)"
            height="100"
            width="100"
          />
        </div>

        <h4>{{ item.title }}</h4>
        <div class="app-solutions__item_p">
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
