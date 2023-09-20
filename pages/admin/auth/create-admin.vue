<template>
  <div
    class="w-100 is-center dir-auto"
    style="height: calc(100vh - var(--navbar-height))"
  >
    <BulmaCard class="pt-3" height="700px" min-width="350px">
      <div class="auth-login__form">
        <div class="auth-title py-5">
          <div>
            <h2 class="font-20 has-text-centered">
              {{ $t("action.create") }} {{ $t("table.user") }}
            </h2>
          </div>
        </div>
        <form @submit.prevent="handleCreateAdmin">
          <div class="py-3 px-3 mt-4 is-grid" style="gap: 35px">
            <div>
              <ThemeInput
                name="first_name"
                v-model="form.first_name"
                v-model:valid="formValid.first_name"
                :reset="resetForm"
                :validation="{ required: true }"
                :label="$t('table.first_name')"
              />
            </div>
            <div>
              <ThemeInput
                name="last_name"
                v-model="form.last_name"
                v-model:valid="formValid.last_name"
                :reset="resetForm"
                :validation="{ required: true }"
                :label="$t('table.last_name')"
              />
            </div>
            <div>
              <ThemeInput
                name="username"
                v-model="form.username"
                v-model:valid="formValid.username"
                :reset="resetForm"
                :validation="{ required: true }"
                :label="$t('table.username')"
              />
            </div>
            <div>
              <ThemeInput
                name="email"
                v-model="form.email"
                v-model:valid="formValid.email"
                :reset="resetForm"
                :validation="{ required: true, email: true }"
                :label="$t('table.email')"
              />
            </div>
            <div>
              <ThemeInput
                name="phone"
                v-model="form.phone"
                :reset="resetForm"
                type="mobile"
                v-model:valid="formValid.phone"
                :validation="{ required: true, numeric: true, length: 11 }"
                :label="$t('table.mobile')"
              />
            </div>
            <div>
              <ThemeAutocomplete
                :items="rolesList"
                v-model="form.role"
                :label="$t('table.role')"
              />
            </div>
            <div style="margin-bottom: 35px">
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
          <div class="w-100 position-absolute bottom-0 px-3 pb-3">
            <BulmaBtn
              :disabled="!isValid"
              :loading="loading"
              type="submit"
              color="success"
              block
              >{{ $t("action.submit") }}
            </BulmaBtn>
          </div>
        </form>
      </div>
    </BulmaCard>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";
import { USERS_ROLES } from "~/const";
// import authorizePages from "~~/utils/authorization";
const resetForm = ref(false);
const form = reactive({
  username: "",
  role: "مشاور",
  password: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
});
const formValid = reactive({
  username: false,
  role: false,
  password: false,
  first_name: false,
  last_name: false,
  phone: false,
  email: false,
});
const isValid = computed(
  () => !!form.username && !!form.role && !!formValid.email
);
// admin roles
const rolesList = computed(() =>
  USERS_ROLES.map((r) => ({ title: r, value: r }))
);
//
const authStore = useAuthStore();
const loading = ref(false);
function handleCreateAdmin() {
  loading.value = true;
  return authStore
    .createAdmin({ ...form })
    .then(() => {
      navigateTo("/admin");
    })
    .finally(() => {
      loading.value = false;
    });
}
//
useHead({
  title: "ایجاد کاربر جدید",
});

// authorization
// definePageMeta({
//   validate: async (route) => {
//     const { getProfile, getPermissions } = useAuth();
//     const profile = getProfile();
//     const permissions = getPermissions();
//     return authorizePages(route, profile, permissions);
//   },
// });
</script>
