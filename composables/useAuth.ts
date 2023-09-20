import { PermissionModel, ProfileModel } from "~~/types/auth";
import { useAuthStore } from "~~/store/auth";

export default function useAuth() {
    const env = useRuntimeConfig();
    const authStore = useAuthStore();
    const { setCookies, removeCookies } = useCookies(env.public.cookies.token, {
        maxAge: env.public.token.maxAge,
    });
    const { setCookies: setRefreshCookies, removeCookies: removeRefreshToken } =
        useCookies(env.public.cookies.refreshToken, {
            maxAge: env.public.token.refreshMaxAge,
        });
    const {
        setCookies: setProfileCookies,
        removeCookies: removeProfileCookies,
    } = useCookies(env.public.cookies.profile, {
        maxAge: env.public.token.maxAge,
    });
    const {
        setCookies: setPermissionCookies,
        removeCookies: removePermissionCookies,
    } = useCookies(env.public.cookies.permission, {
        maxAge: env.public.token.maxAge,
    });
    // token
    const setToken = (token: string) => {
        setCookies("Bearer " + token);
    };
    const getToken = () => {
        const cookie = useCookie(env.public.cookies.token);
        return cookie.value;
    };
    // refresh
    const setRefreshToken = (token: string) => {
        setRefreshCookies(token);
    };
    const getRefreshToken = () => {
        const cookie = useCookie(env.public.cookies.refreshToken);
        return cookie.value;
    };
    // profile
    const getProfile = () => {
        return useCookie<ProfileModel>(env.public.cookies.profile).value;
    };
    const setProfile = (profile: ProfileModel) => {
        authStore.setStoreProfile(profile);
        return setProfileCookies(profile);
    };
    //
    const getPermissions = () => {
        return useCookie<PermissionModel>(env.public.cookies.permission).value;
    };
    const setPermissions = (permissions: PermissionModel) => {
        authStore.setStorePermissions(permissions);
        return setPermissionCookies(permissions);
    };
    //
    const resetAuth = () => {
        removeRefreshToken();
        authStore.setLoggedIn(false);
        removeProfileCookies();
        return removeCookies();
    };
    return {
        setToken,
        getToken,
        getRefreshToken,
        setRefreshToken,
        getProfile,
        setProfile,
        getPermissions,
        setPermissions,
        resetAuth,
    };
}
