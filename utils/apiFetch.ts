// import { useToast } from "vue-toastification";

import fa from "~/locales/fa";

// import useAuth from "~~/composables/useAuth"
type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface Request {
    method: Methods;
    body?: object;
}

interface ErrorModel {
    response: {
        status: number;
        error: { non_field_errors?: string[] };
        url: string;
        _data: string;
    };
}

let lastMessage: string | null = null;
let lastRequestUrl: string | null = null;
//
export const paramsHandler = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map((i) => `${i}=${params[i]}`)
        .join("&");
};
// validation error handling
const errorFormat = (error: { non_field_errors?: string[] }) => {
    if (error.non_field_errors) return error.non_field_errors[0];
    const errors = Object.keys(error);
    return (
        errors.map((i) => fa.table[i as keyof typeof fa.table]).join(" , ") +
        " را مجددا وارد نمایید!"
    );
};
//
const apiFetch = async <T>(
    url: string,
    req: Request,
    query: { [key: string]: string } | null = null
): Promise<T> => {
    const { resetAuth, getToken } = useAuth();
    const { errorToast } = useToastNotif();
    const env = useRuntimeConfig();
    const router = useRouter();
    const route = useRoute();
    const headers = {} as { Authorization: string };
    const token = getToken();
    if (token) headers["Authorization"] = token;
    let endpoint = `${env.public.baseUrl}${url}`;

    if(url.includes('article')) {
        endpoint = `${'http://127.0.0.1:8000/'}${url}`;
    }


    if (query) {
        endpoint += `?${paramsHandler(query)}`;
    }
    try {
        const data = await $fetch<T>(endpoint, {
            ...req,
            // headers,
        });
        if (data && data.error) {
            throw { response: { status: 400, error: data.error as string } };
        }
        return data;
    } catch (err) {
        const error = err as ErrorModel;
        let message = null;
        if (!error.response) {
            message = "اتصال شما به اینترنت قطع شده است";
        }

        if (
            error.response?.status === 503 &&
            route.fullPath.includes("maintenance")
        ) {
            navigateTo("/maintenance");
        }
        if (error.response?.status === 401) {
            if (endpoint.includes("login"))
                message = "شماره همراه و رمز عبور مطابقت ندارند";
            else {
                message = "لطفا مجددا وارد شوید!";
                resetAuth();
                setTimeout(() => {
                    navigateTo("/admin/auth/login");
                }, 100);
            }
        }
        if (error.response?.status === 414) message = null;
        if (error.response?.status === 400 && "error" in error.response) {
            message = errorFormat(error.response.error);
        }
        if (error.response?.status === 500) {
            if (error.response._data.includes("DoesNotExist")) {
                message = "موردی یافت نشد";
            } else {
                message = "مشکلی در برقراری ارتباط رخ داده است";
            }
        }
        if (
            message &&
            (lastMessage !== message || lastRequestUrl !== error.response?.url)
        ) {
            lastMessage = message;
            lastRequestUrl = error.response?.url;
            errorToast(message);
        }
        throw error;
    }
};

export default apiFetch;
