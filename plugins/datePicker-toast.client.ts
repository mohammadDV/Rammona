import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useI18n } from "vue-i18n";
import "vue-toast-notification/dist/theme-bootstrap.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component(
        "Vue3PersianDatetimePicker",
        Vue3PersianDatetimePicker
    );
});
