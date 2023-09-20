import { defineStore } from "pinia";
import apiFetch from "~~/utils/apiFetch";
import { PermissionModel, ProfileModel } from "~~/types/auth";
import { UsernameModel } from "~~/types/auth";
import { USERS_ROLES } from "~/const";

interface LoginForm extends UsernameModel {
    password: string;
}

interface CreateAdminForm extends UsernameModel {
    role: typeof USERS_ROLES[number];
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
}

const error = {
    general: "مشکلی پیش آمده است، مجددا تلاش کنید.",
    banned: "اکانت شما مسدود است.",
    captcha: "کپچا منقضی شده است.",
    offline: "اتصال به اینترنت قطع شده است!",
};

export const useAuthStore = defineStore("auth", {
    state: () => ({
        loggedIn: false,
        profile: null as ProfileModel | null,
        permissions: null as PermissionModel | null,
        newTicketsCount: null as number | null,
        role: "superuser" as "superuser" | "admin",
    }),
    actions: {
        async login(payload: LoginForm) {
            const { errorToast } = useToastNotif();
            const { setToken, setProfile, setRefreshToken } = useAuth();
            try {
                const res = await apiFetch<{ access: string; refresh: string }>(
                    "user/login/",
                    {
                        method: "POST",
                        body: {
                            ...payload,
                        },
                    }
                );
                setToken(res.access);
                setRefreshToken(res.refresh);
                // setProfile(res.user);
                this.loggedIn = true;
                return res;
            } catch (err) {
                throw err;
            }
        },
        async logout() {
            const { resetAuth, getRefreshToken } = useAuth();
            const { successToast } = useToastNotif();
            try {
                const res = await apiFetch("user/logout/", {
                    method: "POST",
                    body: {
                        refresh_token: getRefreshToken(),
                    },
                });
                this.loggedIn = false;
                this.profile = null;
                resetAuth();
                successToast("با موفقیت از حساب کاربری خود خارج شدید!");
                navigateTo("/admin/auth/login");
                return true;
            } catch (err) {
                throw err;
            }
        },
        // forget password
        async sendMobileForgetPassword(mobile: string) {
            const { errorToast } = useToastNotif();
            try {
                const res = await apiFetch(`user/forget_password/`, {
                    method: "POST",
                    body: { phone: mobile },
                });
                return res;
            } catch (e) {
                if (e.response?._data?.error) {
                    errorToast(e.response._data.error);
                }
                throw e;
            }
        },
        async sendCodeForgetPassword(code: string, mobile: string) {
            try {
                const res = await apiFetch(`user/check_otp/${mobile}/`, {
                    method: "POST",
                    body: { code },
                });
                return res;
            } catch (e) {
                throw e;
            }
        },
        async sendPassForgetPassword(
            payload: {
                password: string;
                confirm_password: string;
            },
            mobile: string
        ) {
            try {
                const res = await apiFetch(`user/change_password/${mobile}/`, {
                    method: "POST",
                    body: payload,
                });
                return res;
            } catch (e) {
                throw e;
            }
        },
        // admin
        async createAdmin(form: CreateAdminForm) {
            const { successToast, errorToast } = useToastNotif();
            try {
                const res = await apiFetch(`user/create_user/`, {
                    method: "POST",
                    body: form,
                });
                successToast("کاربر با موفقیت ایجاد شد");
                navigateTo("/admin");
                return res;
            } catch (e) {
                throw e;
            }
        },
        //
        setNewTicketsCount(count: number) {
            this.newTicketsCount = count;
        },
        updateProfileScore(score: number) {
            if (this.profile) this.profile.score = score;
        },
        setStoreProfile(profile: ProfileModel) {
            this.profile = profile;
        },
        setStorePermissions(permissions: PermissionModel) {
            this.permissions = permissions;
        },
        setLoggedIn(bool: boolean) {
            this.loggedIn = bool;
        },
    },
});
