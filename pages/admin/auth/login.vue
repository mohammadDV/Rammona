<template>
  <div class="auth-login h-100vh w-100 is-center dir-auto">
    <BulmaCard class="pt-3">
      <div class="auth-login__form">
        <div class="logo is-flex is-justify-content-center">
          <img alt="irisk" src="/logo.png" width="100" height="100" class="mx-auto" />
        </div>
        <div class="auth-title mb-6">
          <div>
            <h2 class="font-20 has-text-centered">{{ $t("action.login") }}</h2>
          </div>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="auth-login__input py-3 px-md-3 mt-4">
            <div>
              <ThemeInput
                name="username"
                v-model="form.username"
                :reset="resetForm"
                v-model:valid="formValid.username"
                :validation="{ required: true }"
                :label="$t('action.mobile')"
              />
            </div>
            <div>
              <ThemeInput
                type="password"
                name="password"
                v-model="form.password"
                :reset="resetForm"
                v-model:valid="formValid.password"
                :validation="{ required: true }"
                :label="$t('action.password')"
              />
            </div>
          </div>
          <div class="w-100 position-absolute bottom-0 px-3 pt-3">
            <BulmaBtn :disabled="!isValid" :loading="loading" type="submit" block
              >{{ $t("action.login") }}
            </BulmaBtn>
            <BulmaBtn
              type="button"
              text
              class="font-12"
              to="/auth/forget-password"
              style="height: 20px; left: 0"
            >
              {{ $t("action.forgetPassword") }}
            </BulmaBtn>
          </div>
        </form>
      </div>
    </BulmaCard>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";
const { theme, toggleLang } = useThemeConfig();
const { locale } = useI18n();
const resetForm = ref(false);
const form = reactive({
  username: "",
  password: "",
});
const formValid = reactive({
  username: false,
  password: false,
});
const isValid = computed(() => !!formValid.username && !!formValid.password);
//
const authStore = useAuthStore();
const loading = ref(false);
function handleLogin() {
  loading.value = true;
  return authStore
    .login({ ...form })
    .then(() => {
      navigateTo("/admin");
    })
    .finally(() => {
      loading.value = false;
    });
}
//
onMounted(() => {
  if (authStore.loggedIn) {
    navigateTo("/admin");
  }
});
//
definePageMeta({
  layout: "auth",
});
useHead({
  title: "ورود/عضویت",
});
</script>
