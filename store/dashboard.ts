import { defineStore } from "pinia";

interface DashboardModel {
  ticket_new: number;
  ticket_pending: number;
  in_progress_projects: number;
  finished_projects: number;
  all_projects: number;
  profile: any;
}

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboard: {} as DashboardModel,
  }),
  actions: {
    async initDashbaord() {
      const { setProfile } = useAuth();
      try {
        const { data } = await apiFetch<{ data: DashboardModel }>(
          "user/admin_home/",
          {
            method: "GET",
          }
        );
        setProfile(data.profile);
        const d = { ...data };
        delete d.profile;
        this.dashboard = d;
        return data;
      } catch (e) {
        throw e;
      }
    },
  },
});
