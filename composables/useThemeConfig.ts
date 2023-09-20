import { LangModel, ThemeModel } from "~~/types";
import { useI18n } from "vue-i18n";
export default function useThemeConfig() {
    const env = useRuntimeConfig();
    const { setCookies, removeCookies } = useCookies(env.public.cookies.theme, {
        maxAge: 20 * 365 * 24 * 60 * 60,
    });
    const { setCookies: setLocaleCookie, removeCookies: removeLocaleCookie } =
        useCookies(env.public.cookies.locale, {
            maxAge: 20 * 365 * 24 * 60 * 60,
        });
    // theme
    const theme = useState("AppTheme", () => "light");
    const toggleTheme = (newTheme?: ThemeModel, auto: boolean = false) => {
        if (!auto) {
            theme.value = newTheme
                ? newTheme
                : theme.value === "light"
                ? "dark"
                : "light";
            setCookies(theme.value);
            return;
        }
        removeCookies();
        const darkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        theme.value = darkMode ? "dark" : "light";
    };
    // lang:i18n
    const { locale } = useI18n();
    const toggleLang = (newLang?: LangModel) => {
        locale.value = newLang ? newLang : locale.value === "fa" ? "en" : "fa";
        setLocaleCookie(locale.value);
    };
    return { theme, toggleTheme, toggleLang };
}
