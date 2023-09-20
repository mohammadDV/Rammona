import { useAuthStore } from "~~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const route = useRoute();
    const { getToken } = useAuth();
    const authStore = useAuthStore();
    const token = getToken();
    if (token) {
        if (route.path === "/admin/auth/login") navigateTo("/admin");
        // authStore.setLoggedIn(true);
    } else if (
        ![
            "/",
            "/blog",
            "/about-us",
            "/contact-us",
            "/admin/auth/login",
            "/admin/auth/forget-password",
        ].includes(route.path)
    ) {
        navigateTo("/admin/auth/login");
    }
});
