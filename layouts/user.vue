<template>
  <Html :class="`is-${locale === 'fa' ? 'rtl' : 'ltr'} theme-${theme}`" :lang="locale">
    <Body class="pb-0">
      <div :class="['user-layout']">
        <AppLoading v-if="loading" />
        <main>
          <div class="app-container dir-auto">
            <BulmaContainer fluid class="px-0">
              <UserLayoutNavbar :nav-item="navItem" />
              <slot />
              <UserLayoutFooter />
            </BulmaContainer>
          </div>
        </main>
      </div>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { LangModel } from "~~/types";
import { useAuthStore } from "~~/store/auth";
const { theme, toggleLang } = useThemeConfig();
const { locale } = useI18n();
//
const route = useRoute();
// theme config
// language
const env = useRuntimeConfig();
//
const authStore = useAuthStore();
const loading = ref(true);
onMounted(() => {
  toggleLang((useCookie(env.public.cookies.locale).value as LangModel) ?? "fa");
  setTimeout(() => {
    loading.value = false;
  }, 100);
  // if (!authStore.profile) {
  //   authStore.getProfile();
  // }
});
// nav
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
