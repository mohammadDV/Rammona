<template>
  <div :class="['layout', sidebarMini && 'mini-sidebar']">
    <AppLoading v-if="loading" />
    <main>
      <ThemeNavbar
        @change="handleSidebarMini"
        @open="handleOpenMobileSidebar"
        :isOpen="openMobileSidebar"
      />
      <ThemeSidebar
        :items="sidebarItems"
        :class="sidebarMini ? 'is-open' : ''"
        v-model="sidebarMini"
        logoSrc="/logo.png"
      />
      <BulmaContainer :class="`p-gap ${route.name as string}-page dir-auto`">
        <slot />
      </BulmaContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { LangModel } from "~~/types";
import { useAuthStore } from "~~/store/auth";
const { theme, toggleLang } = useThemeConfig();
const { locale } = useI18n();
useHead({
  htmlAttrs: {
    class: `is-${locale.value === "fa" ? "rtl" : "ltr"} theme-${theme.value}`,
    lang: locale.value,
  },
});
// sidebar minimise
const sidebarMini = ref(false);
function handleSidebarMini() {
  sidebarMini.value = !sidebarMini.value;
}
// mobile sidebar
const openMobileSidebar = ref(false);
function handleOpenMobileSidebar() {
  openMobileSidebar.value = !openMobileSidebar.value;
  if (openMobileSidebar.value && sidebarMini.value) sidebarMini.value = false;
}

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
// sidebar
const activeSidebar = ref(false);
interface Item {
  name: string; // complete name i.e app.project
  icon: string;
  link: string;
  tag?: number;
  child?: { name: string; link: string; tag?: number }[];
  isAllowed?: boolean;
}
const sidebarItems = computed<Item[]>(() => [
  {
    name: "apps.showWebsite",
    icon: "dashboard",
    link: "/",
    isAllowed: true,
  },
  {
    name: "apps.project",
    icon: "slides",
    link: "project",
    isAllowed: true,
    child: [
      { name: "action.create", link: "/admin/project/create-update" },
      { name: "action.list", link: "/admin/project" },
    ],
  },
  {
    name: "table.ticket",
    icon: "ticket",
    link: "ticket",
    isAllowed: true,
    child: [{ name: "action.list", link: "/admin/ticket" }],
  },
  {
    name: "table.article",
    icon: "article",
    link: "article",
    isAllowed: true,
    child: [
      { name: "action.list", link: "/admin/article" },
      { name: "apps.comment_list", link: "/admin/comment" }
    ],
  },
  {
    name: "table.user",
    icon: "security",
    link: "/admin/auth/create-admin",
    isAllowed: true,
    child: [{ name: "action.create", link: "/admin/auth/create-admin" }],
  },
  {
    name: "apps.website",
    icon: "dashboard",
    link: "website",
    isAllowed: true,
    child: [
      { name: "apps.slideshow", link: "/admin/website/slideshow" },
      { name: "apps.challenge", link: "/admin/website/challenge" },
      { name: "apps.experience", link: "/admin/website/experience" },
      { name: "apps.solution", link: "/admin/website/solution" },
      // { name: "apps.client", link: "/admin/website/client" },
      { name: "apps.services", link: "/admin/website/services" },
      { name: "apps.about_us", link: "/admin/website/about-us" },
    ],
  },
]);
</script>
