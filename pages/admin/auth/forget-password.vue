<template>
  <div class="auth-login h-100vh w-100 is-center dir-auto">
    <BulmaCard height="370px" class="pt-3">
      <div class="auth-login__form">
        <div class="logo is-flex is-justify-content-center">
          <img
            alt="irisk"
            src="/logo.png"
            width="100"
            height="100"
            class="mx-auto"
          />
        </div>
        <div class="auth-title mb-5">
          <div>
            <h2 class="font-20 has-text-centered">
              {{ $t("action.forgetPassword") }}
            </h2>
            <p
              class="auth-title_caption mt-3 has-text-centered opacity-50 line-height-25"
            >
              کد بازیابی رمز از طریق SMS <br />
              به شماره همراه شما ارسال خواهد شد.
            </p>
          </div>
        </div>
        <form @submit.prevent="handleSubmitOne" v-if="step === 0">
          <div class="auth-login__input py-3 px-md-3 mt-4">
            <div style="margin-bottom: 35px">
              <ThemeInput
                name="mobile"
                type="mobile"
                v-model="form.mobile"
                :reset="resetForm"
                v-model:valid="formValid.mobile"
                :validation="{ required: true }"
                :label="$t('action.mobile')"
              />
            </div>
          </div>
          <div class="w-100 position-absolute bottom-0 px-3 pb-3">
            <BulmaBtn type="submit" :disabled="!formValid.mobile" block>{{
              $t("action.forgetPassword")
            }}</BulmaBtn>
          </div>
        </form>
        <form @submit.prevent="handleSubmitTwo" v-else-if="step === 1">
          <div class="auth-login__input py-3 px-md-3 mt-4">
            <div style="margin-bottom: 35px">
              <ThemeInput
                name="code"
                v-model="form.code"
                :reset="resetForm"
                v-model:valid="formValid.code"
                :validation="{ required: true }"
                :label="$t('action.code')"
              />
            </div>
          </div>
          <div class="w-100 position-absolute bottom-0 px-3 pb-3">
            <BulmaBtn type="submit" :disabled="!formValid.code" block>{{
              $t("action.login")
            }}</BulmaBtn>
          </div>
        </form>
        <form @submit.prevent="handleSubmitThird" v-else-if="step === 2">
          <div class="auth-login__input py-3 px-md-3 mt-4">
            <div style="margin-bottom: 35px">
              <ThemeInput
                type="text"
                name="password"
                v-model="form.password"
                :reset="resetForm"
                v-model:valid="formValid.password"
                :validation="{ required: true }"
                :label="$t('action.password')"
              />
            </div>
            <div class="mb-5">
              <ThemeInput
                type="text"
                name="confirmPass"
                v-model="form.confirmPass"
                :reset="resetForm"
                v-model:valid="formValid.confirmPass"
                :validation="{}"
                :label="$t('action.confirmPass')"
              />
            </div>
          </div>
          <div class="w-100 position-absolute bottom-0 px-3 pb-3">
            <BulmaBtn
              type="submit"
              :disabled="!formValid.password || !formValid.confirmPass"
              block
              >{{ $t("action.login") }}
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
const authStore = useAuthStore();
const { successToast } = useToastNotif();
const resetForm = ref(false);
const step = ref(0);
const form = reactive({
  mobile: null,
  code: null,
  password: null,
  confirmPass: null,
});
const formValid = reactive({
  mobile: false,
  code: false,
  password: false,
  confirmPass: false,
});
function handleSubmitOne() {
  if (form.mobile && formValid.mobile) {
    authStore.sendMobileForgetPassword(form.mobile).then(() => {
      step.value = 1;
      successToast("کد برای شما ارسال شد.");
    });
  }
}
function handleSubmitTwo() {
  if (formValid.code) {
    authStore.sendCodeForgetPassword(form.code, form.mobile).then(() => {
      step.value = 2;
      successToast("کد وارد شده با موفقیت ارسال شد.");
    });
  }
}
function handleSubmitThird() {
  if (formValid.password && formValid.confirmPass) {
    authStore
      .sendPassForgetPassword(
        {
          password: form.password,
          confirm_pass: form.confirmPass,
        },
        form.mobile
      )
      .then(() => {
        navigateTo("/admin/auth/login");
        successToast("رمز عبور جدید شما با موفقیت ثبت شد");
      });
  }
}
watch(
  () => form.confirmPass,
  () => {
    formValid.confirmPass = form.confirmPass === form.password;
  }
);
// configs
definePageMeta({
  layout: "auth",
});
useHead({
  title: "بازیابی رمز عبور",
});
</script>
