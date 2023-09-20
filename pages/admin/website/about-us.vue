<template>
  <div class="about-us">
    <BulmaCard
      class="is-flex is-justify-content-space-between is-align-items-center p-gap mb-gap"
    >
      <h2>{{ $t("apps.about_us") }}</h2>
      <BulmaBtn @click="isCreating = !isCreating">{{
        isCreating ? $t("action.list") : $t("action.add")
      }}</BulmaBtn>
    </BulmaCard>
    <template v-if="!fetchLoading">
      <template v-if="isCreating">
        <BulmaCard>
          <h3 class="p-gap">{{ $t("table.content") }} {{ $t("apps.about_us") }}</h3>
          <hr />
          <UserAboutUsContentCreate class="px-gap py-5" />
        </BulmaCard>
        <BulmaCard class="my-gap">
          <h3 class="p-gap">{{ $t("table.annual") }} {{ $t("apps.about_us") }}</h3>
          <hr />
          <UserAboutUsAnnualCreate class="px-gap py-5" />
        </BulmaCard>
        <BulmaCard>
          <h3 class="p-gap">{{ $t("table.partner") }} {{ $t("apps.about_us") }}</h3>
          <hr />
          <UserAboutUsPartnerCreate class="px-gap py-5" />
        </BulmaCard>
      </template>
      <template v-else>
        <UserAboutUsContent />
        <UserAboutUsAnnual class="my-gap" />
        <UserAboutUsPartner />
      </template>
    </template>
    <template v-else>
      <BulmaCard v-for="i in 3" :key="i" class="p-gap">
        <ThemeSkeletonLoading />
      </BulmaCard>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";

const isCreating = ref(false);
const userStore = useUserStore();
const { fetchLoading, handleFetchData } = useStoreFetch(userStore.getAboutus);
</script>
