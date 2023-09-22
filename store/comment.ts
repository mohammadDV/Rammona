import { defineStore } from "pinia";
import { CommentModel} from "~~/types";


interface CommentForm {
    name: string;
    email: string;
    content: string;
    article_comment: Number;
}

export const useCommentStore = defineStore("comment", {
    state: () => ({
        comments: [] as CommentModel[],
        comment: null as CommentModel | null,
        pageLimit: 0 as number,
    }),
    actions: {
        async getComments() {
            try {
                const route = useRoute();
                const res = await apiFetch<{
                    data: CommentModel[];
                    count: number;
                }>(
                    `article/comment_list/${route.params.id}/`,
                    {
                        method: "GET",
                    },
                    {
                        page: String(route.query.page ?? 1),
                    }
                );
                this.comments = res.data;
                this.pageLimit = res.count;
                return res.data;
            } catch (e) {
                throw e;
            }
        },
        async getComment() {
            const route = useRoute();
            try {
                const res = await apiFetch<{
                    comment: CommentModel;
                    type: any;
                }>(`article/comment_detail/${route.params.id}/`, {
                    method: "GET",
                });
                this.comment = res.comment;
                return res.comment;
            } catch (e) {
                throw e;
            }
        },
        async storeComment(payload: CommentForm) {
            const { successToast } = useToastNotif();
            const { createFormdata } = useFunctions();
            try {
                const formData = createFormdata(payload);
                const res = await apiFetch<CommentModel[]>(
                    `article/create_comment/`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                successToast("پیام شما با موفقیت ثبت شد");
                return res;
            } catch (e) {
                throw e;
            }
        },
        async removeComment(id: number) {
            const { successToast } = useToastNotif();
            try {
                const res = await apiFetch<CommentModel[]>(
                    `article/remove_comment/${id}/`,
                    {
                        method: "GET",
                    }
                );
                successToast("پیام موردنظر با موفقیت حذف شد");
                return res;
            } catch (e) {
                throw e;
            }
        }
    },
});
