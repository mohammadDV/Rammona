// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            title: "irisk",
            htmlAttrs: {
                lang: "fa",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
        },
    },
    css: ["~/assets/style/main.sass", "~/assets/fonts/index.css"],
    modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxtjs/i18n"],
    i18n: {
        vueI18n: "./i18n.config.ts",
    },
    runtimeConfig: {
        public: {
            cookies: {
                theme: "theme",
                locale: "language",
                token: "token",
                refreshToken: "refresh_token",
                profile: "profile",
                permission: "permission",
            },
            baseUrl: process.env.BASE_URL,
            token: {
                maxAge: 60 * 60 * 10,
                refreshMaxAge: 60 * 60 * 24 * 7,
            },
        },
    },
    typescript: {
        shim: false,
    },
});
