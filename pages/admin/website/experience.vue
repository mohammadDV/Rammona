<template>
  <div class="challenge">
    <AppWebsiteExperienceCreate 
      @update:model-value="openCreate = !openCreate"
      :model-value="openCreate"/>
    <AppWebsiteExperienceList class="mt-gap" />
  </div>
</template>
<script setup lang="ts">
//
const openCreate = ref(false);
useHead({ title: "وبسایت - تجربیات" });
</script>
