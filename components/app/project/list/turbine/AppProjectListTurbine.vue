<template>
  <BulmaTable :length="list.length" :headers="['model_brand', 'count', 'action']">
    <tr v-for="(item, index) in list" :key="index">
      <td>{{ item.model_brand }}</td>
      <td>
        {{ item.count }}
      </td>
      <td>
        <BulmaBtn color="danger" @click="emit('delete', item.id)">
          <ThemeIcon color="white">delete</ThemeIcon>
        </BulmaBtn>
      </td>
    </tr>
  </BulmaTable>
</template>
<script setup lang="ts">
import { TurbineModel } from "~~/types";

defineProps<{
  list: TurbineModel[];
}>();
const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();
</script>
