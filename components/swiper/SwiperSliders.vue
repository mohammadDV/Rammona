<template>
  <Swiper
    :modules="[Navigation, Pagination]"
    effect="fade"
    centeredSlides
    :breakpoints="!breakpoints ? undefined : breakpoint"
    :navigation="true"
    :pagination="
      hasPagination
        ? {
            clickable: true,
          }
        : false
    "
    :dir="locale === 'fa' ? 'rtl' : ''"
  >
    <template v-for="(item, key) in list" :key="key">
      <SwiperSlide>
        <slot name="slide" :item="item" />
      </SwiperSlide>
    </template>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.sass";
import { useI18n } from "vue-i18n";
const breakpoint = {
  "640": {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  "900": {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  "1200": {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
};
//
interface Props {
  list: any[];
  hasPagination?: boolean;
  breakpoints: boolean;
}
withDefaults(defineProps<Props>(), {
  hasPagination: false,
  breakpoints: true,
});
const { locale } = useI18n();
</script>
