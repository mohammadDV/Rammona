<template>
  <div>
    <template v-if="!fetchLoading && userStore.home">
      <!-- slider  -->
      <section class="app-slider" v-if="!fetchLoading">
        <SwiperSliders :breakpoints="false" :list="userStore.home?.slides">
          <template #slide="props">
            <div
              class="app-slider__item"
              :style="{
                backgroundImage: `url(${getFileUrl(props.item.image)})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            ></div>
          </template>
        </SwiperSliders>
      </section>
      <!-- end slider  -->
      <!-- challenges -->
      <template v-if="!fetchLoading">
        <section class="app-challenges">
          <div class="container">
            <h3>{{ $t("apps.challenge") }}</h3>
            <UserChallenges />
          </div>
        </section>
        <!-- challenges -->
        <!-- solutions  -->
        <section class="app-solutions test">
          <div class="container">
            <h3>{{ $t("apps.solution") }}</h3>
            <UserSolutions />
          </div>
        </section>
        <!-- end solutions  -->
        <!-- clients  -->
        <section class="app-clients test">
          <div class="container">
            <h3>{{ $t("apps.client") }}</h3>
            <UserClients />
          </div>
        </section>
      </template>
      <!-- end clients  -->
    </template>
    <AppLoading v-else />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";

const userStore = useUserStore();
const { fetchLoading, handleFetchData } = useStoreFetch(userStore.getHome);
const { getFileUrl } = useFunctions();
//
definePageMeta({
  layout: "user",
});
useHead({
  title: "صفحه اصلی",
});
</script>
