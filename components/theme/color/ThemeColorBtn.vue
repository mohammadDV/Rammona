<template>
  <BulmaBtn @click="toggleTheme()">
    <ThemeIcon v-if="theme === 'dark'">lightTheme</ThemeIcon>
    <ThemeIcon v-else>darkTheme</ThemeIcon>
  </BulmaBtn>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useThemeConfig();
</script>