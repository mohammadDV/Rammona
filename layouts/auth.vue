<template>
  <div class="auth">
    <main>
      <BulmaContainer class="p-5">
        <slot />
      </BulmaContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { LangModel } from "~~/types";
const { theme, toggleLang } = useThemeConfig();
const { locale } = useI18n();
useHead({
  htmlAttrs: {
    class: `is-${locale.value === "fa" ? "rtl" : "ltr"} theme-${theme.value}`,
    lang: locale.value,
  },
});
// theme config
// language
const env = useRuntimeConfig();
toggleLang((useCookie(env.public.cookies.locale).value as LangModel) ?? "fa");
</script>
