<template>
  <div>
    <aside class="sidebar" v-bind="$attrs">
      <BulmaBtn text class="sidebar-logo mx-auto my-5 px-2 w-100" to="/admin">
        <img :src="logoSrc" />
        <!-- :style="{ width: '50px' }" -->
      </BulmaBtn>
      <template v-for="(item, key) in items" :key="key">
        <template v-if="item.isAllowed">
          <BulmaBtn
            v-if="!item.child"
            :text="$route.path !== item.link"
            :class="['sidebar_btn', $route.path === item.link && 'is-active']"
            @click="handleClick(item)"
          >
            <div class="sidebar_btn__group d-flex is-flex is-align-items-center">
              <ThemeIcon size="20px">
                {{ item.icon }}
              </ThemeIcon>
              <span class="sidebar_btn__title mx-4">
                {{ $t(item.name) }}
              </span>
              <div v-if="item.tag" class="tag mr-auto is-warning">
                {{ item.tag }}
              </div>
            </div>
          </BulmaBtn>
          <ThemeExpandMenu
            v-else
            :title="$t(item.name)"
            :icon="item.icon"
            :btn-props="{
              class: ['sidebar_btn', checkIsActive(item.link) && 'is-active'],
              text: !checkIsActive(item.link),
            }"
            :model-value="activeExpandMenu === item.name"
            @update:model-value="(e) => handleAutoClose(e, item)"
          >
            <template #btn>
              <div v-if="item.tag" class="tag">
                {{ item.tag }}
              </div>
            </template>
            <li v-for="child in item.child" :key="child.name">
              <BulmaBtn
                :text="
                  !(
                    $route.path === child.link ||
                    (item.name === 'report' && $route.query.app === child.name.trim())
                  )
                "
                :class="[
                  'sidebar_btn my-1 sidebar_btn_child',
                  $route.path === child.link && 'is-active',
                  item.name === 'report' && $route.query.app === child.name.trim()
                    ? 'is-active'
                    : '',
                ]"
                :color="
                  $route.path === child.link ||
                  (item.name === 'report' && $route.query.app === child.name.trim())
                    ? 'primary'
                    : 'dark'
                "
                @click="handleClick(child)"
              >
                {{ item.name === "report" ? $t(child.name) : $t(child.name) }}
                <span v-if="child.tag" style="width: 15px; height: 15px" class="tag">
                  {{ child.tag }}
                </span>
              </BulmaBtn>
            </li>
          </ThemeExpandMenu>
        </template>
      </template>
    </aside>
    <transition name="fade">
      <div
        @click="$emit('update:modelValue', false)"
        v-if="modelValue"
        class="overlay"
      ></div>
    </transition>
  </div>
</template>
<script lang="ts">
import "./index.sass";
export default defineComponent({
  inheritAttrs: false,
});
</script>
<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";
const authStore = useAuthStore();
interface Item {
  name: string; // complete name i.e app.project
  icon: string;
  link: string;
  tag?: number;
  child?: { name: string; link: string; tag?: number }[];
  isAllowed?: boolean;
}
interface Props {
  modelValue?: boolean;
  items: Item[];
  logoSrc: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const router = useRouter();
const handleClick = (item: { name: string; link: string }) => {
  router.push(item.link);
  emit("update:modelValue", false);
};
//
const activeExpandMenu = ref("");
function handleAutoClose(e: boolean, item: typeof props.items[0]) {
  if (!!e) activeExpandMenu.value = item.name;
  else activeExpandMenu.value = "";
}
//
const route = useRoute();
const checkIsActive = (path: string) => {
  const matched = route.path.match(/\/[a-z]*/);
  return matched ? matched[0].includes(path) : false;
};
//
onMounted(() => {
  const matched = route.path.match(/\/[a-z]*/);
  for (const i of props.items) {
    if (matched && matched[0].includes(i.name)) {
      activeExpandMenu.value = i.name;
    }
  }
});
</script>
