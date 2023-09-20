<template>
  <div class="challenge">
    <AppWebsiteChallengeCreate
      @update:model-value="openCreate = !openCreate"
      :model-value="openCreate"
    />
    <AppWebsiteChallengeList class="mt-gap" />
  </div>
</template>
<script setup lang="ts">
//
const openCreate = ref(false);
useHead({ title: "وبسایت - چالش ها" });
</script>
