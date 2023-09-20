import { defineStore } from "pinia";
import { CMI_COVERAGE, PROJECT_STATUS } from "~~/const";
import {
    ClauseModel,
    ClauseTemplateModel,
    CmiModel,
    ProductModel,
    ProjectModel,
    TurbineModel,
} from "~~/types";
import { UserModel } from "~~/types/auth";

export const useProjectStore = defineStore("project", {
    state: () => ({
        projects: [] as ProjectModel[],
        project: {} as ProjectModel,
        //
        turbines: [],
        products: [],
        specialists: [],
        coverages: [],
        //
        clauseTemplates: [] as ClauseTemplateModel[],
        users: [] as UserModel[],
        pageLimit: 0 as number,
    }),
    actions: {
        async getProjects(filter?: {
            status: "" | "";
            send_to_manager: boolean;
        }) {
            const route = useRoute();
            try {
                const res = await apiFetch<{
                    projects: ProjectModel[];
                    count: number;
                }>(
                    "project/filter_project/",
                    {
                        method: !filter ? "GET" : "POST",
                        body: filter,
                    },
                    {
                        page: String(route.query.page ?? 1),
                    }
                );
                this.projects = res.projects;
                this.pageLimit = res.count;
                return res;
            } catch (e) {
                throw e;
            }
        },
        async getProject() {
            const route = useRoute();
            try {
                const res = await apiFetch<{
                    project: ProjectModel;
                    users: UserModel[];
                    clause_templates: ClauseTemplateModel[];
                }>(
                    `project/project_detail/${
                        route.params.id ?? route.query.id
                    }`,
                    {
                        method: "GET",
                    }
                );
                this.project = res.project;
                this.clauseTemplates = res.clause_templates;
                this.users = res.users;
                return res;
            } catch (e) {
                throw e;
            }
        },
        async initCreateProject() {
            try {
                this.project = {};
                const res = await apiFetch<{
                    users: UserModel[];
                    clause_templates: ClauseTemplateModel[];
                }>("project/create_project/", {
                    method: "GET",
                });
                this.users = res.users;
                this.clauseTemplates = res.clause_templates;
                return res;
            } catch (e) {
                throw e;
            }
        },
        async createProject(payload: any) {
            try {
                const res = await apiFetch<ProjectModel>(
                    "project/create_project/",
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                this.project = res;
                return res;
            } catch (e) {
                throw e;
            }
        },
        // product
        async createProduct(payload: any) {
            try {

                const res = await apiFetch<ProductModel>(
                    "project/create_product/",
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        async deleteProduct(id: number) {
            try {
                const res = await apiFetch<ProductModel[]>(
                    `project/update_project_product/${id}/`,
                    {
                        method: "DELETE",
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        // turbines
        async createTurbine(payload: any) {
            try {
                const res = await apiFetch<TurbineModel>(
                    "project/create_turbine/",
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        async deleteTurbine(id: number) {
            try {
                const res = await apiFetch(
                    `project/update_project_turbine/${id}/`,
                    {
                        method: "DELETE",
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        // clause
        async createClause(payload: any) {
            try {
                const res = await apiFetch<ClauseModel>(
                    "project/create_clause/",
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        async deleteClause(id: number) {
            try {
                const res = await apiFetch<ClauseModel[]>(
                    `project/update_project_clause/${id}/`,
                    {
                        method: "DELETE",
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        // clause
        async createCmi(payload: {
            main_coverage_cmi: typeof CMI_COVERAGE[number];
        }) {
            try {
                const res = await apiFetch<ClauseModel>(
                    "project/create_cmi_coverage/",
                    {
                        method: "POST",
                        body: payload,
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        async deleteCmi(id: number) {
            try {
                const res = await apiFetch<CmiModel[]>(
                    `project/update_project_cmi_coverage/${id}/`,
                    {
                        method: "DELETE",
                    }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        // cmi coverage
        async createCmiCoverage(payload: any) {
            try {
                const res = await apiFetch("project/create_cmi_coverage/", {
                    method: "POST",
                    body: payload,
                });
                return res;
            } catch (e) {
                throw e;
            }
        },
        //
        async updateProject(form: any, is_multipart_formdata = false) {
            const route = useRoute();
            const { createFormdata } = useFunctions();
            try {
                let nForm = { ...form };
                if (is_multipart_formdata) {
                    nForm = createFormdata(form);
                }
                const res = await apiFetch(
                    `project/update_project/${
                        route.params.id ?? route.query.id
                    }/`,
                    { method: "PATCH", body: nForm }
                );
                return res;
            } catch (e) {
                throw e;
            }
        },
        //
        async downloadScenarioReport(projectId: number) {
            const { downloadReport } = useFunctions();
            const { errorToast, successToast } = useToastNotif();
            try {
                downloadReport(`riskprofile/scenario_report/${projectId}/`);
            } catch (e) {
                if (e.response.status === 404) {
                    errorToast("سناریویی برای این پروژه ثبت نشده است");
                }
                throw e;
            }
        },
    },
});
