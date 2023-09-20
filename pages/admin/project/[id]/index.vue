<template>
  <div class="project-detail">
    <BulmaCard>
      <div class="is-flex is-justify-content-space-between p-gap">
        <h1 class="is-flex gap is-align-items-center">
          <ThemeIcon>slides</ThemeIcon>
          {{ $t("apps.project") }}
          {{ $route.params.id }}
        </h1>
        <BulmaBtn
          color="info"
          light
          :to="`/admin/project/create-update?id=${$route.params.id}`"
          >{{ $t("action.edit") }}</BulmaBtn
        >
      </div>
      <hr />
      <div class="card-body__container p-gap" v-if="projectStore.project">
        <div class="card-body" id="project_title">
          <h5 class="card-title">{{ $t("table.project_title") }}</h5>
          <p class="card-text">
            {{ projectStore.project.title ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="project_type">
          <h5 class="card-title">{{ $t("table.project_type") }}</h5>
          <p class="card-text">
            {{ projectStore.project.project_type ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="project_category">
          <h5 class="card-title">{{ $t("table.project_category") }}</h5>
          <p class="card-text">
            {{ projectStore.project.category ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="insured">
          <h5 class="card-title">{{ $t("table.insured") }}</h5>
          <p class="card-text">
            {{ projectStore.project.insured ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="insurer">
          <h5 class="card-title">{{ $t("table.insurer") }}</h5>
          <p class="card-text">
            {{ projectStore.project.insurer ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="insurer_branch">
          <h5 class="card-title">{{ $t("table.insurer_branch") }}</h5>
          <p class="card-text">
            {{ projectStore.project.insurer_branch ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="project_policy">
          <h5 class="card-title">{{ $t("table.project_policy") }}</h5>
          <p class="card-text">
            {{ projectStore.project.policy ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="policy_file">
          <h5 class="card-title">{{ $t("table.policy_file") }}</h5>
          <div class="card-text">
            <a
              v-if="projectStore.project.policy_file"
              class="is-flex button is-small is-light is-info"
              style="width: 150px; gap: 5px"
              :href="getFileUrl(projectStore.project.policy_file)"
              target="_blank"
            >
              <ThemeIcon color="inherit">download</ThemeIcon>
              {{ $t("action.download") }} {{ $t("table.file") }}
            </a>
            <template v-else>{{ $t("table.empty") }}</template>
          </div>
        </div>
        <div class="card-body" id="sum_insured">
          <h5 class="card-title">{{ $t("table.sum_insured") }}</h5>
          <p class="card-text">
            {{ projectStore.project.sum_insured
            }}{{
              projectStore.project.sum_insured_currency ?? $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="sum_insured_file">
          <h5 class="card-title">{{ $t("table.sum_insured_file") }}</h5>
          <div class="card-text">
            <a
              v-if="projectStore.project.sum_insured_file"
              class="is-flex button is-small is-light is-info"
              style="width: 150px; gap: 5px"
              :href="getFileUrl(projectStore.project.sum_insured_file)"
              target="_blank"
            >
              <ThemeIcon color="inherit">download</ThemeIcon>
              {{ $t("action.download") }} {{ $t("table.file") }}
            </a>
            <template v-else>{{ $t("table.empty") }}</template>
          </div>
        </div>
        <div class="card-body" id="over_insurance">
          <h5 class="card-title">{{ $t("table.over_insurance") }}</h5>
          <p class="card-text">
            {{ projectStore.project.over_insurance ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="under_insurance">
          <h5 class="card-title">{{ $t("table.under_insurance") }}</h5>
          <p class="card-text">
            {{ projectStore.project.under_insurance ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="main_coverage">
          <h5 class="card-title">{{ $t("table.main_coverage") }}</h5>
          <p class="card-text">
            {{ projectStore.project.main_coverage ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="main_coverage_file">
          <h5 class="card-title">{{ $t("table.main_coverage_file") }}</h5>
          <div class="card-text">
            <a
              v-if="projectStore.project.main_coverage_file"
              class="is-flex button is-small is-light is-info"
              style="width: 150px; gap: 5px"
              :href="getFileUrl(projectStore.project.main_coverage_file)"
              target="_blank"
            >
              <ThemeIcon color="inherit">download</ThemeIcon>
              {{ $t("action.download") }} {{ $t("table.file") }}
            </a>
            <template v-else>{{ $t("table.empty") }}</template>
          </div>
        </div>
        <div class="card-body" id="cmi_coverage_project">
          <h5 class="card-title">{{ $t("apps.cmi_coverage") }}</h5>
          <div
            v-if="projectStore.project.coverages?.length > 0"
            class="card-text"
          >
            <p
              v-for="(cmi, index) in projectStore.project.coverages"
              :key="index"
            >
              {{ cmi.main_coverage_cmi }}
            </p>
          </div>
          <div v-else class="card-text">{{ $t("table.empty") }}</div>
        </div>
        <div class="card-body" id="premium">
          <h5 class="card-title">{{ $t("table.premium") }}</h5>
          <p class="card-text">
            {{ projectStore.project.premium }}
            {{ projectStore.project.premium_currency ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="clauses">
          <h5 class="card-title">{{ $t("apps.clauses") }}</h5>
          <div
            class="card-text"
            v-if="projectStore.project.clause_project?.length > 0"
          >
            <p
              v-for="(clause, index) in projectStore.project.clause_project"
              :key="index"
              class="card-text__item dir-auto"
            >
              <span class="mx-gap" :aria-label="$t('table.title')">{{
                clause.text
              }}</span>
              -
              <span class="mx-gap" :aria-label="$t('table.clause_template')">{{
                clause.clause.title
              }}</span>
            </p>
          </div>
          <div class="card-text" v-else>{{ $t("table.empty") }}</div>
        </div>
        <div class="card-body" id="survey_start_date">
          <h5 class="card-title">{{ $t("table.survey_start_date") }}</h5>
          <p class="card-text">
            {{
              toDate(projectStore.project.survey_start_date) ??
              $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="survey_end_date">
          <h5 class="card-title">{{ $t("table.survey_end_date") }}</h5>
          <p class="card-text">
            {{
              toDate(projectStore.project.survey_end_date) ?? $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="project_manager">
          <h5 class="card-title">{{ $t("table.project_manager") }}</h5>
          <p class="card-text">
            {{
              projectStore.project.project_manager?.username ??
              $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="risk_surveyor">
          <h5 class="card-title">{{ $t("table.risk_surveyor") }}</h5>
          <p class="card-text">
            {{
              projectStore.project.risk_surveyor?.username ?? $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="specialist">
          <h5 class="card-title">{{ $t("table.specialist") }}</h5>
          <div
            class="card-text"
            v-if="projectStore.project.specialists?.length > 0"
          >
            <p
              v-for="(specialist, index) in projectStore.project.specialists"
              :key="index"
              class="card-text__item"
            >
              {{ specialist?.username }}
            </p>
          </div>
          <div class="card-text" v-else>{{ $t("table.empty") }}</div>
        </div>
        <div class="card-body" id="eml">
          <h5 class="card-title">{{ $t("table.eml") }}</h5>
          <p class="card-text">
            {{ projectStore.project.eml }}
            {{ projectStore.project.eml_currency ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="mpl_percentage">
          <h5 class="card-title">{{ $t("table.mpl_percentage") }}</h5>
          <p class="card-text">
            {{ projectStore.project.mpl_percentage ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="mpl">
          <h5 class="card-title">{{ $t("table.mpl") }}</h5>
          <p class="card-text">
            {{ projectStore.project.mpl }}
            {{ projectStore.project.mpl_currency ?? $t("table.empty") }}
          </p>
        </div>
        <div class="card-body" id="insured_specification">
          <h5 class="card-title">{{ $t("table.insured_specification") }}</h5>
          <p class="card-text">
            {{
              projectStore.project.insured_specification ?? $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="power_plant_efficiency">
          <h5 class="card-title">{{ $t("table.power_plant_efficiency") }}</h5>
          <p class="card-text">
            {{
              projectStore.project.power_plant_efficiency ?? $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="construct_year">
          <h5 class="card-title">{{ $t("table.construct_year") }}</h5>
          <p class="card-text">
            {{
              toDate(projectStore.project.construct_year, "year") ??
              $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="operate_year">
          <h5 class="card-title">{{ $t("table.operate_year") }}</h5>
          <p class="card-text">
            {{
              toDate(projectStore.project.operate_year, "year") ??
              $t("table.empty")
            }}
          </p>
        </div>
        <div class="card-body" id="turbines">
          <h5 class="card-title">{{ $t("apps.turbines") }}</h5>
          <div
            v-if="projectStore.project.turbine_project?.length > 0"
            class="card-text"
          >
            <p
              v-for="(turbine, index) in projectStore.project.turbine_project"
              :key="index"
              class="card-text__item"
            >
              {{
                `${turbine.model_brand} - ${$t("table.count")} ${turbine.count}`
              }}
            </p>
          </div>
          <div class="card-text" v-else>{{ $t("table.empty") }}</div>
        </div>
        <div class="card-body" id="products">
          <h5 class="card-title">{{ $t("apps.products") }}</h5>
          <div
            class="card-text"
            v-if="projectStore.project.project_product?.length > 0"
          >
            <div
              v-for="(product, index) in projectStore.project.project_product"
              :key="index"
              class="card-text__item"
            >
              {{ product.name }}
            </div>
          </div>
          <div class="card-text" v-else>{{ $t("table.empty") }}</div>
        </div>
        <div class="card-body" id="send_to_manager">
          <h5 class="card-title mb-0">
            {{ $t("table.send_to_manager") }}
            <BulmaCheckbox
              class="mx-gap is-cursor-auto"
              :model-value="projectStore.project.send_to_manager"
            />
          </h5>
        </div>
      </div>
    </BulmaCard>
  </div>
</template>
<script setup lang="ts">
import { useProjectStore } from "~~/store/project";

const projectStore = useProjectStore();
const { fetchLoading } = useStoreFetch(projectStore.getProject);
const { toDate } = useMomentJalaali();
const { getFileUrl } = useFunctions();
</script>
