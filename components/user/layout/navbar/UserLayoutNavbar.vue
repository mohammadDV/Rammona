<template>
  <div class="app-navbar">
    <div class="container">
      <div class="app-navbar__logo">
        <img src="/logo.png" alt="irisk" />
        <div class="app-navbar__extend">
          <!-- <ThemeInput placeholder="جستجو" name="search" v-model="form.search" /> -->
        </div>
      </div>
      <hr />
      <nav class="app-navbar__nav">
        <ul>
          <li
            v-for="(item, id) in navItem"
            :key="id"
            :class="{ active: $route.path === item.link }"
          >
            <BulmaBtn text class="text-color" :to="item.link">
              {{ $t(item.name) }}
            </BulmaBtn>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  navItem: { name: string; link: string }[];
}>();
//
const form = reactive({
  search: null,
});
</script>
