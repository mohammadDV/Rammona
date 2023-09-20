<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div
        v-if="authStore.loggedIn"
        class="is-flex is-align-items-center dir-auto mx-4"
      >
        <span class="is-flex is-align-items-center dir-auto font-sm">
          <span class="image-placeholder">
            <ThemeIcon
              v-if="!authStore.profile?.image"
              size="30px"
              solid
              color="#afacac"
              stroke-width="2.4px"
            >
              user
            </ThemeIcon>
            <img
              v-else
              width="40"
              height="40"
              :src="authStore.profile?.image"
              alt="تصویر کاربر"
            />
          </span>
          <span class="font-bold font-md mx-2 text-color">
            {{
              authStore.profile?.first_name
                ? `${authStore.profile?.first_name} ${authStore.profile?.last_name}`
                : authStore.profile?.username
            }}
          </span>
        </span>
        <!-- <BulmaDropdown hover align="right">
          <template #list>
            <div class="px-2">
              <BulmaBtn
                class="w-100 is-justify-content-start"
                color="dark"
                text
                @click="handleGoToProfile"
              >
                {{ $t("table.editProfile") }}
              </BulmaBtn>
              <hr />
              <BulmaBtn
                class="w-100 is-justify-content-start"
                color="dark"
                @click="handleLogout"
                text
                >{{ $t("action.logout") }}
              </BulmaBtn>
            </div>
          </template>
        </BulmaDropdown> -->
      </div>
    </div>
    <div class="navbar-logo d-desktop-none mr-5 h-100">
      <img src="/logo.png" class="h-100" />
    </div>
    <div class="navbar-menu">
      <div
        class="navbar-start is-align-items-center"
        :dir="locale === 'fa' ? 'rtl' : 'ltr'"
      >
        <!-- <BulmaDropdown hover align="right">
          <span>
            {{ $t("apps.project") }}
          </span>
          <template #list>
            <div class="px-2">
              <BulmaBtn
                class="w-100 is-justify-content-start"
                :color="$route.path === '/project' ? 'primary' : 'dark'"
                :text="$route.path !== '/project'"
                to="/project"
              >
                {{ $t("apps.project") }}
              </BulmaBtn>
              <hr />
              <BulmaBtn
                class="w-100 is-justify-content-start"
                :color="$route.path === '/project/create' ? 'primary' : 'dark'"
                :text="$route.path !== '/project/create'"
                to="/project/create"
              >
                {{ $t("action.create") }} {{ $t("apps.project") }}
              </BulmaBtn>
              <hr />
              <BulmaBtn
                class="w-100 is-justify-content-start"
                :loading="logout.loading"
                text
                @click="handleLogout"
              >
                {{ $t("action.logout") }}
              </BulmaBtn>
            </div>
          </template>
        </BulmaDropdown> -->
      </div>
      <div class="navbar-end is-align-items-center pl-4">
        <BulmaBtn
          class="w-100 is-justify-content-start"
          :loading="logout.loading"
          @click="handleLogout"
        >
          {{ $t("action.logout") }}
        </BulmaBtn>
        <div class="navbar-item">
          <div class="buttons" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
            <template v-if="!authStore.loggedIn">
              <a class="button is-primary">
                <strong>{{ $t("action.register") }}</strong>
              </a>
              <a class="button is-light"> {{ $t("action.login") }} </a>
            </template>
          </div>
        </div>
      </div>
    </div>
    <BulmaBtn @click="$emit('change')" class="navbar-burger" inverted>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </BulmaBtn>
  </nav>
</template>

<script setup lang="ts">
import "./index.sass";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";
const { locale } = useI18n();
interface Props {
  isOpen: boolean;
  hasLogo?: boolean;
}
withDefaults(defineProps<Props>(), {
  hasLogo: false,
});
interface NavbarItemType {
  name: string;
  link: string;
}
const navbarItems: NavbarItemType[] = [
  {
    name: "apps.project",
    link: "/project",
  },
];
// authentication
const authStore = useAuthStore();
//
const logout = reactive({
  loading: false,
});
function handleLogout() {
  logout.loading = true;
  return authStore.logout().finally(() => {
    logout.loading = false;
  });
}
//
function handleGoToProfile() {
  return navigateTo("/admin/user/profile");
}
</script>
