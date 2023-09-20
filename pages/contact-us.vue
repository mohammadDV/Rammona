<template>
  <div class="contact-us">
    <section class="contact-us__info">
      <div class="container">
        <h1>{{ $t("apps.contact_us") }}</h1>
        <div class="contact-us__info_items">
          <div class="contact-us__info_item">
            <span class="is-flex gap">
              <ThemeIcon>phone</ThemeIcon> {{ $t("table.phone") }}
            </span>
            <span>{{ WEBSITE_INFO.phone }}</span>
          </div>
          <div class="contact-us__info_item">
            <span class="is-flex gap">
              <ThemeIcon>email</ThemeIcon> {{ $t("table.fax") }}
            </span>
            <span>{{ WEBSITE_INFO.fax }}</span>
          </div>
          <div class="contact-us__info_item">
            <span class="is-flex gap">
              <ThemeIcon>map</ThemeIcon> {{ $t("table.address") }}
            </span>
            <span>{{ WEBSITE_INFO.addr }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="contact-us__location">
      <div id="map"></div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { WEBSITE_INFO } from "~/const";
import "leaflet/dist/leaflet.css";
const email = "example@example.com";
const coordinate = ref([35.745457, 51.451679]);
onMounted(() => {
  import("leaflet/dist/leaflet-src.esm").then((L) => {
    var map = L.map("map").setView(coordinate.value, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker(coordinate.value).addTo(map);
  });
});

definePageMeta({
  layout: "user",
});
useHead({
  title: "تماس با ما",
});
</script>
