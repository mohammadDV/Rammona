<template>
  <div class="challenge">
    <AppWebsiteServiceCreate 
      @update:model-value="openCreate = !openCreate"
      :model-value="openCreate"/>
    <AppWebsiteServiceList class="mt-gap" />
  </div>
</template>
<script setup lang="ts">
//
const openCreate = ref(false);
useHead({ title: "وبسایت - خدمات" });
</script>
