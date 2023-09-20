<template>
  <div class="list">
    <BulmaTable
      :length="list.length"
      :headers="['title', 'capacity', 'capacity_currency', 'action']"
    >
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.capacity }}</td>
        <td>{{ item.capacity_currency }}</td>
        <td>
          <BulmaBtn color="danger" @click="emit('delete', item.id)">
            <ThemeIcon color="white">delete</ThemeIcon>
          </BulmaBtn>
        </td>
      </tr>
    </BulmaTable>
  </div>
</template>
<script setup lang="ts">
import { ProductModel } from "~~/types";

defineProps<{
  list: ProductModel[];
}>();
const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();
</script>
