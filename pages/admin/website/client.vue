<template>
  <div class="challenge">
    <AppWebsiteClientCreate
      @update:model-value="openCreate = !openCreate"
      :model-value="openCreate" />
    <AppWebsiteClientList class="mt-gap" />
  </div>
</template>
<script setup lang="ts">
//
const openCreate = ref(false);
useHead({ title: "وبسایت - کاربران" });
</script>
