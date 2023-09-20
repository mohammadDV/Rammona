<template>
  <BulmaCard style="height: 220px" class="is-center">
    <div class="has-text-centered">
      <ThemeIcon stroke-width="1px" size="50px">{{ icon }}</ThemeIcon>
      <p>
        {{ title ? title : $t("table.empty") }}
      </p>
    </div>
  </BulmaCard>
</template>
<script setup lang="ts">
interface Props {
  icon?: string;
  title?: string;
}
withDefaults(defineProps<Props>(), {
  icon: "empty",
  title: "",
});
</script>
