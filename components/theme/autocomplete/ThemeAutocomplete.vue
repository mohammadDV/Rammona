<template>
  <div
    v-click-outside="handleClickOutside"
    :class="['autocomplete', containerClass && containerClass, !!readonly && 'readonly']"
  >
    <div @click="handleFocus" class="autocomplete_input">
      <span class="autocomplete__prefix" v-if="prefix">{{ prefix }}</span>
      <transition name="autocomplete-fade">
        <button
          v-if="modelValue && clearable"
          @click="handleItemClick({ title: '', value: '' })"
          class="autocomplete__close_btn"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </transition>
      <input
        v-bind="$attrs"
        :placeholder="placeholder"
        :disabled="loading"
        :value="inputValue"
        @focus="handleInputFocus(true)"
        @blur="handleInputFocus(false)"
        @input="handleInput"
        :readonly="readonly"
        autocomplete="off"
        :class="[
          'input',
          errorMessage && 'custom-input__error',
          !modelValue || modelValue.length === 0 ? '' : 'input__dirty',
        ]"
      />
      <label v-if="label">{{ label }}</label>
      <transition name="autocomplete-fade">
        <p v-if="errorMessage" class="mb-0 error-message">
          {{ errorMessage }}
        </p>
      </transition>
      <transition name="autocomplete-fade">
        <div v-if="loading" class="loading-container">
          <div class="loader__element"></div>
        </div>
      </transition>
      <span :class="['autocomplete_input_icon', openMenu && 'open']">
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 10px; height: 10px"
        >
          <path
            d="M13.466 8.7335C13.3729 8.60931 13.2521 8.50851 13.1132 8.43908C12.9744 8.36965 12.8213 8.3335 12.666 8.3335C12.5108 8.3335 12.3577 8.36965 12.2188 8.43908C12.0799 8.50851 11.9592 8.60931 11.866 8.7335L7.86602 14.0665C7.75459 14.2151 7.68673 14.3917 7.67006 14.5767C7.65338 14.7617 7.68854 14.9476 7.77159 15.1137C7.85464 15.2798 7.98231 15.4195 8.14028 15.5172C8.29826 15.6148 8.4803 15.6665 8.66602 15.6665H16.666C16.8517 15.6665 17.0338 15.6148 17.1917 15.5172C17.3497 15.4195 17.4774 15.2798 17.5604 15.1137C17.6435 14.9476 17.6787 14.7617 17.662 14.5767C17.6453 14.3917 17.5774 14.2151 17.466 14.0665L13.466 8.7335Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <transition name="autocomplete-fade">
      <div
        :class="[
          'autocomplete__menu',
          !!menuClass ? menuClass : '',
          multiChoice ? 'autocomplete__menu_multi' : '',
        ]"
        v-if="openMenu"
      >
        <ul :style="[`max-height:${listHeight}`, 'overflow:auto']">
          <template v-if="filteredList.length > 0">
            <transition-group name="autocomplete-fade">
              <li
                v-for="(item, key) in filteredList"
                :key="key"
                @click="handleItemClick(item)"
              >
                <div v-if="multiChoice">
                  <input
                    type="checkbox"
                    :checked="modelValue.length ? modelValue.includes(item.value) : false"
                  />
                </div>
                <template v-if="!!$slots.list">
                  <slot name="list" :item="item" />
                </template>
                <template v-else>
                  {{ item.title }}
                </template>
              </li>
            </transition-group>
          </template>
          <li v-else>موردی یافت نشد!</li>
        </ul>
      </div>
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
interface Item {
  title: string;
  value: string;
  [arg: string]: string;
}
interface Props {
  modelValue: any;
  items: Item[];
  menuClass?: string;
  searchList?: string[];
  listHeight?: string;
  errorMessage?: string | null;
  loading?: boolean;
  autoSelectFirst?: boolean;
  clearable?: boolean;
  prefix?: string | null;
  readonly?: boolean;
  containerClass?: string | null;
  placeholder?: string | undefined;
  reset?: boolean;
  label?: string;
  multiChoice?: boolean;
  enableSearch?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  menuClass: undefined,
  searchList: () => ["title"],
  listHeight: "200px",
  errorMessage: null,
  loading: false,
  autoSelectFirst: false,
  clearable: false,
  prefix: null,
  readonly: false,
  containerClass: null,
  placeholder: undefined,
  reset: false,
  label: "",
  multiChoice: false,
  enableSearch: false,
});
// v-model
const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void;
}>();
// check object with search list
const checkObjWithSearchList = (obj: any, value: string) => {
  return props.searchList?.map((j) => obj[j].includes(value)).some((z) => !!z);
};
//
const input = reactive({
  focused: false,
  value: "",
});
const inputValue = computed(() => {
  if (!props.multiChoice) {
    return input.value;
  }
  const arr = [...props.items];
  if (!props.modelValue || props.modelValue.length === 0) return "";
  props.modelValue?.map((i: { title: any }) => i.title).join(", ") ?? "";
  return arr
    .filter((i) => props.modelValue.includes(i.value))
    .map((i) => i.title)
    .join(" - ");
});
//
function handleInputFocus(status: boolean) {
  if (input.focused !== status) input.focused = status;
}
const handleInput = (e: Event) => {
  if (!props.multiChoice && props.enableSearch) {
    input.value = (e.target as HTMLInputElement).value;
  } else {
    (e.target as HTMLInputElement).value = "";
  }
};
const filteredList = computed(() => {
  const all = [...props.items];
  if (!props.multiChoice) {
    const isExist = props.items.some((i) => i.value === props.modelValue);
    if (props.modelValue && input.focused && !isExist) {
      return all.filter((i) => {
        return checkObjWithSearchList(i, input.value);
      });
    }
  }
  return all;
});
//
const openMenu = ref(false);
function handleFocus() {
  if (!props.readonly) {
    openMenu.value = true;
  }
}
//
function handleClickOutside() {
  if (openMenu.value) {
    if (!props.multiChoice) {
      input.focused = false;
      if (!input.value) return emit("update:modelValue", "");
      const selected = props.items.find((i) => {
        return checkObjWithSearchList(i, input.value);
      });
      if (!selected) {
        input.value = "";
        emit("update:modelValue", "");
      } else {
        emit("update:modelValue", selected.value);
        input.value = selected.value;
      }
    }
    openMenu.value = false;
  }
}
// mounted
onMounted(() => {
  if (props.autoSelectFirst) {
    handleItemClick(props.items[0]);
  }
  setTimeout(() => {
    if (props.modelValue) {
      input.value = filteredList.value.find((i) => i.value === props.modelValue)?.title;
    }
  }, 500);
});
// handle if modelValue is empty
watchEffect(() => {
  if (props.reset) {
    input.value = "";
    emit("update:modelValue", "");
  }
  if (!props.loading) {
    input.value = props.modelValue;
  }
});
//
function handleItemClick(item: Item) {
  let data = null;
  if (props.multiChoice) {
    data = [];
    if (props.modelValue) data = props.modelValue;
    if (props.modelValue && props.modelValue.includes(item.value)) {
      data = data.filter((i: string) => i !== item.value);
    } else {
      data.push(item.value);
    }
  } else {
    openMenu.value = false;
    input.focused = false;
    input.value = item.title;
    data = item.value;
  }

  emit("update:modelValue", data);
}
// directive
const vClickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: any) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: any) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
</script>
