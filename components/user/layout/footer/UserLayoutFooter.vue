<template>
  <footer>
    <div class="container">
      <div class="app-footer__logo">
        <div class="is-flex is-justify-content-start has-text-right">
          <div class="footer-links">
            <h4 class="mb-gap mr-gap dot-before dot-before__dark">
              {{ $t("table.links") }}
            </h4>
            <template v-for="item in navItem">
              <BulmaBtn
                color="secondary"
                block
                text
                class="is-justify-content-start"
                :to="item.link"
              >
                {{ $t(item.name) }}
              </BulmaBtn>
            </template>
          </div>
        </div>
        <div class="footer__info_items is-grid gap">
          <h4 class="mb-gap dot-before dot-before__dark">{{ $t("table.contact_us") }}</h4>
          <div class="contact-us__info_item">
            <span class="is-flex gap font-sm">
              <ThemeIcon>phone</ThemeIcon> {{ $t("table.phone") }}
            </span>
            <span>{{ WEBSITE_INFO.phone }}</span>
          </div>
          <div class="contact-us__info_item">
            <span class="is-flex gap font-sm">
              <ThemeIcon>fax</ThemeIcon> {{ $t("table.fax") }}
            </span>
            <span>{{ WEBSITE_INFO.fax }}</span>
          </div>
          <div class="contact-us__info_item">
            <span class="is-flex gap font-sm">
              <ThemeIcon>map</ThemeIcon> {{ $t("table.address") }}
            </span>
            <span>{{ WEBSITE_INFO.addr }} </span>
          </div>
        </div>
        <div class="mt-5 has-text-centered">
          <img src="/logo.png" width="200" height="80" />
        </div>
      </div>
    </div>
    <div class="app-footer__copywrite">@copywrite {{ new Date().getFullYear() }}</div>
  </footer>
</template>
<script setup lang="ts">
import { WEBSITE_INFO } from "~/const";
const navItem = [
  {
    name: "apps.home",
    link: "/",
  },
  {
    name: "apps.blog",
    link: "/blog",
  },
  {
    name: "apps.about_us",
    link: "/about-us",
  },
  {
    name: "apps.contact_us",
    link: "/contact-us",
  },
  {
    name: "apps.login",
    link: "/admin/auth/login",
  },
];
</script>
