<template>
  <div class="challenge">
    <AppWebsiteSolutionCreate 
      @update:model-value="openCreate = !openCreate"
      :model-value="openCreate"/>
    <AppWebsiteSolutionList class="mt-gap" />
  </div>
</template>
<script setup lang="ts">
const openCreate = ref(false);
useHead({ title: "وبسایت - روش ها" });
</script>
