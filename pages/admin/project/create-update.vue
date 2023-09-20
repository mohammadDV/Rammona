<template>
  <div class="project-create">
    <template v-if="step === 0">
      <form @submit.prevent="handleSubmit">
        <BulmaCard class="p-gap form">
          <h1 class="pt-gap pr-gap">
            {{ $t("action.create") }} {{ $t("apps.project") }}
          </h1>
          <hr />
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_TYPE as typeof constList.PROJECT_TYPE[number])"
                v-model="form.project_type"
                :label="`* ${$t('table.project_type')}`"
                name="projectType"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_CATEGORY as typeof constList.PROJECT_CATEGORY[number])"
                v-model="form.category"
                :label="`* ${$t('table.project_category')}`"
                name="projectCategory"
              />
            </div>
          </div>
          <div class="input-container">
            <ThemeInput
              v-model="form.title"
              :label="`* ${$t('table.project_title')}`"
              name="project_title"
            />
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeInput
                v-model="form.duration"
                type="number"
                :label="`* ${$t('table.duration')}`"
                name="duration"
              />
            </div>
            <div class="input-container">
              <ThemeInput
                v-model="form.insured"
                :label="$t('table.insured')"
                name="insured"
              />
            </div>
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_INSURER as typeof constList.PROJECT_INSURER[number] )"
                v-model="form.insurer"
                :label="$t('table.insurer')"
                name="insurer"
              />
            </div>
            <div class="input-container">
              <ThemeInput
                v-model="form.insurer_branch"
                :label="$t('table.insurer_branch')"
                name="insurerBranch"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_POLICY as typeof constList.PROJECT_POLICY[number])"
                v-model="form.policy"
                :label="$t('table.project_policy')"
                name="policy"
              />
            </div>
            <div class="input-container">
              <ThemeInput
                v-model="form.sum_insured"
                :label="$t('table.sum_insured')"
                name="sumInsured"
                type="number"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_CURRENCY as typeof constList.PROJECT_CURRENCY[number])"
                v-model="form.sum_insured_currency"
                :label="$t('table.sum_insured_currency')"
                name="sumInsuredCurrency"
              />
            </div>
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeInput
                v-model="form.under_insurance"
                :label="$t('table.under_insurance')"
                name="underInsurance"
                type="number"
              />
            </div>
            <div class="input-container">
              <ThemeInput
                v-model="form.over_insurance"
                :label="$t('table.over_insurance')"
                name="overInsurance"
                type="number"
              />
            </div>
            <div class="input-container">
              <ThemeInput
                :readonly="form.policy === 'CMI'"
                v-model="form.main_coverage"
                :label="$t('table.main_coverage')"
                name="mainCoverage"
              />
            </div>
          </div>
          <!-- cmi_coverage_project -->
          <template v-if="form.policy !== 'CMI'">
            <hr />
            <h3 class="is-flex is-align-items-center gap">
              {{ $t("apps.cmi_coverage") }}
              <BulmaBtn
                @click="
                  dialog.show = true;
                  dialog.type = 'cmi_coverage_project-create';
                "
              >
                {{ $t("action.create") }}
              </BulmaBtn>
            </h3>
            <div v-if="form.cmi_coverage_project.length > 0">
              <h4>{{ $t("table.added_list") }}</h4>
              <div class="list mt-gap">
                <BulmaTag v-for="(item, index) in form.cmi_coverage_project" :key="index">
                  <span class="ml-gap">{{ item.main_coverage_cmi }}</span>
                  <BulmaBtn
                    is-close-btn
                    @click="
                      () => {
                        dialog.show = true;
                        dialog.id = item.id;
                        dialog.type = 'cmi_coverage';
                      }
                    "
                  ></BulmaBtn>
                </BulmaTag>
              </div>
            </div>
            <AppEmpty v-else />
            <hr />
          </template>
          <!-- end cmi_coverage_project -->
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeInput
                v-model="form.premium"
                :label="$t('table.premium')"
                name="premium"
                type="number"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_CURRENCY as typeof constList.PROJECT_CURRENCY[number])"
                v-model="form.premium_currency"
                :label="$t('table.premium_currency')"
                name="premiumCurrency"
              />
            </div>
          </div>
          <!-- clause  -->
          <hr />
          <h3 class="is-align-items-center is-flex gap">
            {{ $t("apps.clauses") }}
            <BulmaBtn
              @click="
                dialog.show = true;
                dialog.type = 'clause-create';
              "
            >
              {{ $t("action.create") }}
            </BulmaBtn>
          </h3>
          <AppProjectListClause
            :list="form.clause_project"
            @delete="
              (id) => {
                dialog.show = true;
                dialog.id = id;
                dialog.type = 'clause';
              }
            "
          />
          <hr />
          <!-- end clause  -->
          <div class="grid-1-2">
            <div class="input-container">
              <Vue3PersianDatetimePicker
                color="var(--primary)"
                v-model="form.survey_start_date"
                :placeholder="$t('table.survey_start_date')"
                name="surveyStartDate"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
              />
            </div>
            <div class="input-container">
              <Vue3PersianDatetimePicker
                color="var(--primary)"
                v-model="form.survey_end_date"
                :placeholder="$t('table.survey_end_date')"
                name="surveyEndDate"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
              />
            </div>
          </div>
          <div class="input-container">
            <ThemeAutocomplete
              :items="userList"
              v-model="form.project_manager"
              :label="$t('table.project_manager')"
              name="projectManager"
            />
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeAutocomplete
                :items="userList"
                v-model="form.risk_surveyor"
                :label="$t('table.risk_surveyor')"
                name="riskSurveyor"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="userList"
                v-model="form.project_manager"
                :label="$t('table.project_manager')"
                name="projectManager"
              />
            </div>
          </div>
          <h3>
            {{ $t("table.eml") }}
          </h3>
          <div class="input-container">
            <ThemeInput
              v-model="form.eml_percentage"
              :label="$t('table.eml_percentage')"
              type="number"
              name="emlPercentage"
            />
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeInput
                v-model="form.eml"
                :label="$t('table.eml')"
                name="eml"
                type="number"
              />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_CURRENCY as typeof constList.PROJECT_CURRENCY[number])"
                v-model="form.eml_currency"
                :label="$t('table.eml_currency')"
                name="emlCurrency"
              />
            </div>
          </div>
          <h3>
            {{ $t("table.mpl") }}
          </h3>
          <div class="input-container">
            <ThemeInput
              v-model="form.mpl_percentage"
              :label="$t('table.mpl_percentage')"
              name="mplPercentage"
              type="number"
            />
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <ThemeInput v-model="form.mpl" :label="$t('table.mpl')" name="mpl" />
            </div>
            <div class="input-container">
              <ThemeAutocomplete
                :items="createSelectList(constList.PROJECT_CURRENCY as typeof constList.PROJECT_CURRENCY[number])"
                v-model="form.mpl_currency"
                :label="$t('table.mpl_currency')"
                name="mplCurrency"
              />
            </div>
          </div>
          <div class="input-container">
            <ThemeInput
              inputType="textarea"
              v-model="form.insured_specification"
              :label="$t('table.insured_specification')"
              name="insuredSpecification"
            />
          </div>
          <div
            v-if="['نیروگاه', 'پتروشیمی', 'پالایشگاه'].includes(form.category.trim())"
            class="input-container"
          >
            <ThemeAutocomplete
              :items="createSelectList(['F', 'E'])"
              v-model="form.power_plant_efficiency"
              :label="$t('table.power_plant_efficiency')"
              name="powerPlantEfficiency"
            />
          </div>
          <div class="input-container">
            <ThemeInput
              v-model="form.constructors"
              :label="$t('table.constructor')"
              name="constructor"
            />
          </div>
          <div class="input-container">
            <ThemeAutocomplete
              v-model="form.specialist"
              :label="$t('table.specialist')"
              name="specialist"
              :items="[...userList]"
              multi-choice
              :loading="fetchLoading"
            />
          </div>
          <div class="grid-1-2">
            <div class="input-container">
              <Vue3PersianDatetimePicker
                color="var(--primary)"
                v-model="form.construct_year"
                :placeholder="$t('table.construct_year')"
                name="constructYear"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
              />
            </div>
            <div class="input-container">
              <Vue3PersianDatetimePicker
                color="var(--primary)"
                v-model="form.operate_year"
                :placeholder="$t('table.operate_year')"
                name="operateYear"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
              />
            </div>
          </div>
          <!-- turbine  -->
          <hr />
          <template
            v-if="['نیروگاه', 'پتروشیمی', 'پالایشگاه'].includes(form.category.trim())"
          >
            <h3 class="is-flex is-align-items-center gap">
              {{ $t("apps.turbines") }}
              <BulmaBtn
                @click="
                  dialog.show = true;
                  dialog.type = 'turbine-create';
                "
              >
                {{ $t("action.create") }}
              </BulmaBtn>
            </h3>
            <AppProjectListTurbine
              :list="form.turbine_project"
              @delete="
                (id) => {
                  dialog.show = true;
                  dialog.id = id;
                  dialog.type = 'turbine';
                }
              "
            />
            <hr />
          </template>
          <!-- end turbine  -->
          <!-- product  -->
          <h3 class="is-flex is-align-items-center gap">
            {{ $t("apps.products") }}
            <BulmaBtn
              @click="
                dialog.show = true;
                dialog.type = 'product-create';
              "
            >
              {{ $t("action.create") }}
            </BulmaBtn>
          </h3>
          <AppProjectListProduct
            :list="form.project_product"
            @delete="
              (id) => {
                dialog.show = true;
                dialog.id = id;
                dialog.type = 'product';
              }
            "
          />
          <hr />
          <!-- product  -->
          <div class="input-container">
            <BulmaCheckbox
              :label="$t('table.send_to_manager')"
              v-model="form.send_to_manager"
            />
          </div>
          <div class="action">
            <BulmaBtn :disabled="!isValid" block color="success" type="submit">{{
              $t("action.next")
            }}</BulmaBtn>
          </div>
        </BulmaCard>
      </form>
    </template>
    <template v-else>
      <form @submit.prevent="handleSendFiles">
        <BulmaCard class="p-gap form">
          <div>
            <h2>{{ $t("action.upload") }}</h2>
            <hr class="my-gap" />
          </div>
          <p class="font-sm">
            * آپلود فایل ها الزامی نمی باشد. برای ثبت اطلاعات پروژه میتوانید بر روی دکمه
            ایجاد پروژه کلیک نمایید
          </p>
          <div class="input-container">
            <ThemeFileInput
              height="100px"
              v-model="form.policy_file"
              :label="$t('table.policy_file')"
              name="policy_file"
            />
          </div>
          <div class="input-container">
            <ThemeFileInput
              height="100px"
              v-model="form.sum_insured_file"
              :label="$t('table.sum_insured_file')"
              name="sumInsuredFile"
            />
          </div>
          <div class="input-container">
            <ThemeFileInput
              height="100px"
              v-model="form.main_coverage_file"
              :label="$t('table.main_coverage_file')"
              name="mainCoverageFile"
            />
          </div>
          <div class="action">
            <BulmaBtn :disabled="!isValid" block color="success" type="submit"
              >{{ $t("action.create") }} {{ $t("apps.project") }}
            </BulmaBtn>
          </div>
        </BulmaCard>
      </form>
    </template>
    <BulmaDialog width="300px" v-model="dialog.show">
      <AppProjectCreateProduct
        v-if="dialog.type === 'product-create'"
        @submit="handleCreatedProduct"
      />
      <AppProjectCreateClause
        v-else-if="dialog.type === 'clause-create'"
        @submit="handleCreatedClause"
      />
      <AppProjectCreateTurbine
        v-else-if="dialog.type === 'turbine-create'"
        @submit="handleCreatedTurbine"
        :turbine_project="form.turbine_project"
      />
      <AppProjectCreateCmi
        v-else-if="dialog.type === 'cmi_coverage_project-create'"
        @submit="handleCreatedCmi"
      />
      <AppProjectDeleteConfirm
        style="direction: rtl"
        v-else-if="dialog.id !== null"
        :title="$t(`apps.${dialog.type}`)"
        :id="dialog.id"
        @delete="handleDelete"
        @close="resetDialog"
      />
    </BulmaDialog>
  </div>
</template>
<script setup lang="ts">
import * as constList from "~~/const";
import { useProjectStore } from "~~/store/project";
import { ClauseModel, CmiModel, ProductModel, TurbineModel } from "~~/types";
const route = useRoute();
const projectStore = useProjectStore();
const form = reactive({
  // select
  category: "",
  project_type: "",
  insurer: "",
  policy: "",
  sum_insured_currency: "",
  premium_currency: "",
  project_manager: "",
  risk_surveyor: "",
  eml_currency: "",
  power_plant_efficiency: "",
  model_brand: "",
  mpl_currency: "",
  main_coverage_CMI: "",
  // input
  title: "",
  insured: "",
  insurer_branch: "",
  policy_file: "",
  sum_insured: "",
  sum_insured_file: "",
  over_insurance: "",
  under_insurance: "",
  main_coverage_file: "",
  main_coverage: "",
  premium: "",
  survey_end_date: "",
  survey_start_date: "",
  eml_percentage: "",
  eml: "",
  mpl_percentage: "",
  mpl: "",
  constructors: "",
  operate_year: "",
  construct_year: "",
  add_btn_2: "",
  count_2: "",
  add_btn: "",
  count: "",
  duration: "",
  // relations
  specialist: [],
  project_product: [] as ProductModel[] | number[],
  turbine_project: [] as string[],
  clause_project: [] as ClauseModel[],
  cmi_coverage_project: [] as CmiModel[],
  // textarea
  insured_specification: "",
  // checkbox
  send_to_manager: false,
});
// select lists
const { createSelectList, removeObjEmpty, createFormdata } = useFunctions();
// action dialog
const dialog = reactive({ show: false, type: "", id: null });
function resetDialog() {
  dialog.show = false;
  dialog.type = "";
  dialog.id = null;
}
function handleDelete(id: number) {
  if (dialog.type === "product") {
    handleDeleteProduct(id);
  } else if (dialog.type === "clause") {
    handleDeleteClause(id);
  } else if (dialog.type === "turbine") {
    handleDeleteTurbine(id);
  } else if (dialog.type === "cmi_coverage") {
    handleDeleteCmi(id);
  }
}
// products
function handleCreatedProduct(data: ProductModel) {
  form.project_product.push(data);
  resetDialog();
}
function handleDeleteProduct(id: number) {
  projectStore.deleteProduct(id).then(() => {
    form.project_product = form.project_product.filter((item) => item.id !== id);
    resetDialog();
  });
}
// clause
function handleCreatedClause(data: ClauseModel) {
  form.clause_project.push(data);
  resetDialog();
}
function handleDeleteClause(id: number) {
  projectStore.deleteClause(id).then(() => {
    form.clause_project = form.clause_project.filter((item) => item.id !== id);
    resetDialog();
  });
}
// turbine
function handleCreatedTurbine(data: TurbineModel) {
  form.turbine_project.push(data);
  resetDialog();
}
function handleDeleteTurbine(id: number) {
  projectStore.deleteTurbine(id).then(() => {
    form.turbine_project = form.turbine_project.filter((item) => item.id !== id);
    resetDialog();
  });
}
// cmi
function handleCreatedCmi(data: TurbineModel) {
  form.cmi_coverage_project.push(data);
  resetDialog();
}
function handleDeleteCmi(id: number) {
  projectStore.deleteCmi(id).then(() => {
    form.cmi_coverage_project = form.cmi_coverage_project.filter(
      (item) => item.id !== id
    );
    resetDialog();
  });
}
// creating project
const step = ref(0);
const isValid = computed(() => {
  return !!(form.title && form.project_type && form.category && form.duration);
});
const loading = ref(false);
function handleSubmit() {
  if (isValid.value) {
    loading.value = true;
    const nForm = removeObjEmpty({ ...form });
    const convertedForm = {} as typeof nForm;
    let i: keyof typeof nForm;
    for (i in nForm) {
      if (Array.isArray(nForm[i]) && i !== "specialist") {
        convertedForm[i] = (nForm[i] as any[]).map((item) => item.id);
      } else {
        convertedForm[i] = nForm[i];
      }
    }
    projectStore[route.query.id ? "updateProject" : "createProject"](convertedForm)
      .then(() => {
        step.value = 1;
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
//
function handleSendFiles() {
  let nForm = {
    policy_file: form.policy_file,
    sum_insured_file: form.sum_insured_file,
    main_coverage_file: form.main_coverage_file,
  };
  nForm = removeObjEmpty({ ...nForm });
  loading.value = true;
  return projectStore
    .updateProject(nForm, true)
    .then(() => {
      navigateTo(`/admin/project/${route.params.id ?? projectStore.project.id}`);
    })
    .finally(() => {
      loading.value = false;
    });
}
//
const userList = computed(() =>
  projectStore.users.map((i) => ({
    title: i.first_name ? `${i.first_name} ${i.last_name}` : i.username,
    value: i.id,
  }))
);
// fetch data
const { fetchLoading, handleFetchData } = useStoreFetch(
  route.query.id ? projectStore.getProject : projectStore.initCreateProject
);
watch(fetchLoading, () => {
  for (const i in form) {
    if (i in projectStore.project && projectStore.project[i]) {
      if (!i.includes("file")) {
        if (typeof projectStore.project[i] === "number") {
          form[i] = String(projectStore.project[i]);
        } else {
          form[i] = projectStore.project[i];
        }
      }
    }
  }
});
</script>
