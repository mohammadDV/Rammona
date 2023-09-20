<template>
  <div class="about-us">
    <template v-if="!fetchLoading">
      <div class="about-us__clients">
        <div class="container" v-if="userStore.aboutus.partner.length > 0">
          <BulmaBtn
            v-for="item in userStore.aboutus.partner"
            text
            :to="item.link"
          >
            <img :src="getFileUrl(item.logo)" :alt="item.link" />
          </BulmaBtn>
        </div>
      </div>
      <div
        v-if="userStore.aboutus.content.length > 0"
        class="about-us__content"
      >
        <div class="container">
          <h2>{{ $t("apps.about_us") }}</h2>
          <p>{{ userStore.aboutus.content[0].content }}</p>
        </div>
      </div>
      <div class="about-us__summary" v-if="userStore.aboutus.annual.length > 0">
        <div class="slider">
          <div class="line"></div>
          <SwiperSliders :list="userStore.aboutus.annual">
            <template #slide="{ item }">
              <div class="slide">
                <div class="slide__card">
                  <p class="date">{{ item.year }}</p>
                  <p class="content">{{ item.content }}</p>
                </div>
              </div>
            </template>
          </SwiperSliders>
        </div>
      </div>
    </template>
    <AppLoading v-else />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";
const { getFileUrl } = useFunctions();
const userStore = useUserStore();
const { fetchLoading, handleFetchData } = useStoreFetch(userStore.getAboutus);
//
definePageMeta({
  layout: "user",
});
useHead({
  title: "درباره ما",
});
</script>
