<template>
  <div class="services">
    <div class="services__container p-gap">
      <template v-if="fetchLoading">
        <ThemeSkeletonLoading v-for="i in 8" :key="i" height="400px" />
      </template>
      <template v-else>
        <BulmaCard v-for="(item, index) in websiteStore.services" :key="index">
          <div
            :style="{ backgroundImage: `url(${getFileUrl(item.image)})` }"
            class="services_card__img"
          ></div>
          <h4 class="p-gap pb-0">
            {{ item.title }}
          </h4>
          <p class="p-gap">
            {{ item.content }}
          </p>
        </BulmaCard>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";
import { ServiceModel } from "~~/types";

const websiteStore = useWebsiteStore();
const { getFileUrl } = useFunctions();
const { fetchLoading } = useStoreFetch(websiteStore.getServices);
const services = [
  {
    title: "تست",
    content: "تست",
    image:
      "/media/slideshow/1402-01-10/admin/exploding-minions_6f11bcd1-c854-4732-a580-daf5e0c86cbe.jpeg",
  },
  {
    title: "تست",
    content: "تست",
    image:
      "/media/slideshow/1402-01-10/admin/exploding-minions_6f11bcd1-c854-4732-a580-daf5e0c86cbe.jpeg",
  },
  {
    title: "تست",
    content: "تست",
    image:
      "/media/slideshow/1402-01-10/admin/exploding-minions_6f11bcd1-c854-4732-a580-daf5e0c86cbe.jpeg",
  },
  {
    title: "تست",
    content: "تست",
    image:
      "/media/slideshow/1402-01-10/admin/exploding-minions_6f11bcd1-c854-4732-a580-daf5e0c86cbe.jpeg",
  },
] as ServiceModel[];
definePageMeta({
  layout: "user",
});
useHead({
  title: "خدمات ما",
});
</script>
