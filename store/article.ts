import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ArticleModel} from "~~/types";


interface ArticleForm {
    title: string;
    content: string;
    type: string;
    file: Blob | null;
}

export const useArticleStore = defineStore("article", {
    state: () => ({
        articles: [] as ArticleModel[],
        article: null as ArticleModel | null,
        pageLimit: 0 as number,
    }),
    actions: {
        async getArticles(page = null) {
            const route = useRoute();
            const authStore = useAuthStore();
            try {
                const res = await apiFetch<{
                    data: ArticleModel[];
                    count: number;
                }>(
                    "article/article_list/",
                    {
                        method: "GET",
                    },
                    {
                        page: String(page ?? route.query.page ?? 1),
                    }
                );
                this.articles = res.data;
                this.pageLimit = res.count;
                return res.data;
            } catch (e) {
                throw e;
            }
        },
        async getPopularArticles() {
            try {
                const res = await apiFetch<{
                    data: ArticleModel[];
                    count: number;
                }>(
                    "article/popular_article_list/",
                    {
                        method: "GET",
                    }
                );
                return res.data;
            } catch (e) {
                throw e;
            }
        },
        async getRelatedArticles() {
            try {
                const res = await apiFetch<{
                    data: ArticleModel[];
                    count: number;
                }>(
                    "article/related_article_list/",
                    {
                        method: "GET",
                    }
                );
                return res.data;
            } catch (e) {
                throw e;
            }
        },
        async getArticle() {
            const route = useRoute();
            const authStore = useAuthStore();
            try {
                const res = await apiFetch<{
                    article: ArticleModel;
                    type: any;
                }>(`article/article_detail/${route.params.id}`, {
                    method: "GET",
                });
                this.article = res.article;
                return res.article;
            } catch (e) {
                throw e;
            }
        },
        async storeArticle(payload: ArticleForm) {
            const { successToast, errorToast } = useToastNotif();
            const { createFormdata } = useFunctions();
            try {
                const formData = createFormdata(payload);
                if (!payload.file) {
                    delete payload.file;
                }
                const res = await apiFetch<ArticleModel[]>(
                    `article/create_article/`,
                    {
                        method: "POST",
                        body: payload.file ? formData : { ...payload },
                    }
                );
                this.articles = res;
                successToast("مقاله شما با موفقیت ثبت شد");
                return res;
            } catch (e) {
                throw e;
            }
        },
        async updateArticle(id: number, payload: ArticleForm) {
            const { successToast, errorToast } = useToastNotif();
            const { createFormdata } = useFunctions();
            try {
                if (!payload.file) {
                    delete payload.file;
                }
                const formData = createFormdata(payload);
                const res = await apiFetch<ArticleModel[]>(
                    `article/edit_article/${id}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                successToast("مقاله شما با موفقیت ویرایش شد");
                return res;
            } catch (e) {
                throw e;
            }
        },
        async removeArticle(id: number) {
            const { successToast, errorToast } = useToastNotif();
            const { createFormdata } = useFunctions();
            try {
                const res = await apiFetch<ArticleModel[]>(
                    `article/remove_article/${id}`,
                    {
                        method: "GET",
                    }
                );
                successToast("مقاله شما با موفقیت حذف شد");
                return res;
            } catch (e) {
                throw e;
            }
        }
    },
});
