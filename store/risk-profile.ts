import { defineStore } from "pinia";
import { ScenarioModel } from "~~/types";

interface RiskProfileChartData {
    bar_labels: [];
    highData: [];
    labels_line: [];
    lowData: [];
    pie_data: [];
    pie_label: [];
    scenarios: ScenarioModel[];
    values_3: [];
    values_10: [];
}

export const useRiskProfileStore = defineStore("risk-profile", {
    state: () => ({
        defaultScenarios: [] as ScenarioModel[],
        scenarios: [] as ScenarioModel[],
        pieChart: {} as { values: number[]; label: string[] },
        barChart: {} as {
            series: { name: string; data: any[] }[];
            label: string[];
        },
        lineChart: {} as {
            series: { name: string; data: any[] }[];
            label: string[];
        },
    }),
    actions: {
        async getScenarioByProjectId() {
            const route = useRoute();
            try {
                const res = await apiFetch<{
                    risk_profile: { risk_profile_scenario: ScenarioModel[] };
                }>(`riskprofile/update_scenario/${route.params.id}/`, {
                    method: "GET",
                });
                this.scenarios = res.risk_profile?.risk_profile_scenario ?? [];
                this.defaultScenarios =
                    res.risk_profile?.risk_profile_scenario ?? [];
                return res;
            } catch (e) {
                throw e;
            }
        },
        async createScenario(payload: any) {
            const route = useRoute(); // id is project_id
            try {
                const res = await apiFetch<ScenarioModel>(
                    `riskprofile/create_scenario/${route.params.id}/`,
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                this.scenarios.push(res);
                return res;
            } catch (e) {
                throw e;
            }
        },
        async deleteScenario(senarioId: number) {
            const route = useRoute();
            try {
                const res = await apiFetch<ScenarioModel>(
                    `riskprofile/update_scenario/${senarioId}/`,
                    {
                        method: "DELETE",
                    }
                );
                this.scenarios = this.scenarios.filter(
                    (i) => i.id !== senarioId
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        async updateScenario(payload: any, id: number) {
            try {
                const res = await apiFetch<ScenarioModel>(
                    `riskprofile/update_scenario/${id}/`,
                    {
                        method: "PATCH",
                        body: payload,
                    }
                );
                const index = this.scenarios.findIndex(
                    (scenario: ScenarioModel) => scenario.id === id
                );
                this.scenarios[index] = res;
                return res;
            } catch (e) {
                throw e;
            }
        },
        // risk profile
        async getRiskProfileChart() {
            const route = useRoute();
            const { errorToast } = useToastNotif();
            try {
                const res = await apiFetch<RiskProfileChartData>(
                    `riskprofile/profile_chart/${route.params.id}/`,
                    {
                        method: "GET",
                    }
                );
                this.scenarios = res.scenarios;
                this.barChart = {
                    series: [
                        {
                            name: "low data",
                            data: res.lowData,
                        },
                        {
                            name: "high data",
                            data: res.highData,
                        },
                    ],
                    labels: res.bar_labels,
                };
                this.lineChart = {
                    series: [
                        {
                            name: "value 3",
                            data: res.values_3,
                        },
                        {
                            name: "value 10",
                            data: res.values_10,
                        },
                    ],
                    labels: res.bar_labels,
                };
                this.pieChart = { values: res.pie_data, label: res.pie_label };
                return res;
            } catch (e) {
                if ([404, 500].includes(e.response.status)) {
                    errorToast(
                        "پروفایل ریسکی برای پروژه مورد نظر ساخته نشده است."
                    );
                    navigateTo("/admin/project");
                }
                throw e;
            }
        },
        async createRiskProfile(is_update: boolean = false) {
            const route = useRoute();
            try {
                const res = await apiFetch(
                    `riskprofile/${
                        is_update
                            ? "update_risk_profile"
                            : "create_risk_profile"
                    }/${route.params.id}/`,
                    {
                        method: is_update ? "PATCH" : "POST",
                        body: {
                            risk_profile_scenario: this.scenarios.map(
                                (i) => i.id
                            ),
                        },
                    }
                );
                navigateTo("/admin/project");
                return res;
            } catch (e) {
                throw e;
            }
        },
        async filterRiskProfileChart(form: any) {
            const route = useRoute();
            try {
                const res = await apiFetch<{
                    scenarios: ScenarioModel[];
                    pie_data: number[];
                    pie_label: string[];
                }>(`riskprofile/profile_chart/${route.params.id}/`, {
                    method: "POST",
                    body: form,
                });
                this.pieChart = { values: res.pie_data, label: res.pie_label };
                this.scenarios = res.scenarios;
                return res;
            } catch (e) {
                throw e;
            }
        },
    },
});
