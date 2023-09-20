import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { TicketModel } from "~~/types";
import { UserModel } from "~~/types/auth";

interface TicketReplyForm {
    content: string;
    ticket_status: TicketModel["ticket_status"];
    file: Blob | null;
}
interface SendTicketForm {
    title: string;
    content: string;
    receiver: string;
    file: Blob | null;
    category: TicketModel["category"];
}

export const useTicketStore = defineStore("ticket", {
    state: () => ({
        tickets: [] as TicketModel[],
        ticket: null as TicketModel | null,
        pageLimit: 0 as number,
    }),
    actions: {
        async getTickets() {
            const route = useRoute();
            const authStore = useAuthStore();
            try {
                const res = await apiFetch<{
                    data: TicketModel[];
                    new_ticket: number;
                    count: number;
                }>(
                    "ticket/ticket_list/",
                    {
                        method: "GET",
                    },
                    {
                        page: String(route.query.page ?? 1),
                    }
                );
                this.tickets = res.data;
                this.pageLimit = res.count;
                authStore.setNewTicketsCount(res.new_ticket);
                return res;
            } catch (e) {
                throw e;
            }
        },
        async getTicket() {
            const route = useRoute();
            const authStore = useAuthStore();
            try {
                const res = await apiFetch<{
                    ticket: TicketModel;
                    reply_ticket: TicketModel[];
                    new_ticket: number;
                    type: any;
                }>(`ticket/ticket_detail/${route.params.id}`, {
                    method: "GET",
                });
                this.ticket = {
                    ...res.ticket,
                    reply_ticket: res.reply_ticket.sort(
                        (a, b) =>
                            new Date(a.create_date).getTime() -
                            new Date(b.create_date).getTime()
                    ),
                    can_reply: true,
                };
                authStore.setNewTicketsCount(res.new_ticket);
                return res;
            } catch (e) {
                throw e;
            }
        },
        async sendTicketInit() {
            try {
                const res = await apiFetch<{ users: UserModel[] }>(
                    `ticket/send_ticket/`,
                    {
                        method: "GET",
                    }
                );
                return res.users;
            } catch (e) {
                throw e;
            }
        },
        async sendTicket(payload: SendTicketForm) {
            const { successToast, errorToast } = useToastNotif();
            const { createFormdata } = useFunctions();
            try {
                const formData = createFormdata(payload);
                if (!payload.file) {
                    delete payload.file;
                }
                const res = await apiFetch<TicketModel[]>(
                    `ticket/send_ticket/`,
                    {
                        method: "POST",
                        body: payload.file ? formData : { ...payload },
                    }
                );
                this.tickets = res;
                successToast("تیکت شما با موفقیت ثبت شد");
                return res;
            } catch (e) {
                throw e;
            }
        },
        async replyTicket(payload: TicketReplyForm) {
            const route = useRoute();
            const { createFormdata } = useFunctions();
            try {
                const formData = createFormdata(payload);
                const res = await apiFetch<{ ticket: TicketModel }>(
                    `ticket/ticket_detail/${route.params.id}/`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                this.ticket?.reply_ticket.push(res.ticket);
                return res;
            } catch (e) {
                throw e;
            }
        },
    },
});
