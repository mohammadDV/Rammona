<template>
  <div class="list">
    <BulmaTable
      :length="list.length"
      :headers="['text', 'clause_template', 'action']"
    >
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.text }}</td>
        <td>
          {{ item.clause.title }}
        </td>
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
import { useProjectStore } from "~~/store/project";
import { ClauseModel } from "~~/types";

defineProps<{
  list: ClauseModel[];
}>();
const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();
const projectStore = useProjectStore();
</script>
