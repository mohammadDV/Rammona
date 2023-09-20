<template>
  <div class="double-datepicker transition-all">
    <div class="double-datepicker-inputs">
      <ThemeInput
        readonly
        :model-value="form.start_date ? toDateLabel(form.start_date) : ''"
        name="start_date"
        :class="inputClass"
        :label="$t('table.start_date')"
        @click="handleInputClick"
        :dir="dir"
      >
        <template #prepend>
          <transition name="autocomplete-fade">
            <button
              v-if="form.start_date && clearable"
              @click="handleClearInput"
              class="double-datepicker-inputs__close_btn"
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
        </template>
      </ThemeInput>
      <ThemeInput
        :dir="dir"
        readonly
        :class="inputClass"
        :model-value="form.end_date ? toDateLabel(form.end_date) : ''"
        name="end_date"
        @click="handleInputClick"
        :label="$t('table.end_date')"
      >
        <template #prepend>
          <transition name="autocomplete-fade">
            <button
              v-if="form.end_date && clearable"
              @click="handleClearInput"
              class="double-datepicker-inputs__close_btn"
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
        </template>
      </ThemeInput>
    </div>
    <BulmaDialog v-model="dialog" @update:modelValue="handleCloseDialog">
      <BulmaCard
        :class="[
          'double-datepicker-dialog dir-auto',
          form.start_date ? 'show-end-date' : '',
        ]"
      >
        <div class="double-datepicker-dialog_box start-date">
          <p>
            <ThemeIcon>calendar</ThemeIcon>
            {{ $t("table.start_date") }}
          </p>
          <div class="double-datepicker-dialog_date">
            <ClientOnly>
              <Vue3PersianDatetimePicker
                @update:modelValue="handleFirstDateClick"
                color="var(--primary)"
                v-model="form.start_date"
                :placeholder="$t('table.startDate')"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
                inline
              />
            </ClientOnly>
          </div>
        </div>
        <div class="double-datepicker-dialog_box end-date">
          <p><ThemeIcon>calendar</ThemeIcon>{{ $t("table.end_date") }}</p>
          <div class="double-datepicker-dialog_date">
            <ClientOnly>
              <Vue3PersianDatetimePicker
                color="var(--primary)"
                v-model="form.end_date"
                @update:modelValue="handleDialog"
                :placeholder="$t('table.endDate')"
                format="YYYY-MM-DD"
                display-format="jDD jMMMM jYYYY"
                inline
                :class="{ deactive: !form.start_date }"
                :min="form.start_date"
              />
            </ClientOnly>
          </div>
        </div>
        <div v-if="form.start_date" class="double-datepicker-dialog_action">
          <BulmaBtn @click="form.start_date = null">{{
            $t("action.back")
          }}</BulmaBtn>
        </div>
      </BulmaCard>
    </BulmaDialog>
  </div>
</template>

<script setup lang="ts">
import { DateFilter } from "~~/types";
import "./index.sass";
interface Props {
  name: string; // name of the field
  modelValue: any;
  prependIcon?: string;
  inputClass?: string | null;
  dir?: string;
  valid?: boolean;
  readonly?: boolean;
  reset: boolean;
  clearable?: boolean;
  required?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  inputClass: null,
  readonly: false,
  placeholder: null,
  valid: false,
  reset: false,
  clearable: true,
  required: false,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: DateFilter): void;
  (e: "update:valid", value: boolean): void;
}>();
//
const { toDateLabel } = useMomentJalaali();
// reset
watch(
  () => props.reset,
  () => {
    if (props.reset) {
      form.end_date = null;
      form.start_date = null;
    }
  }
);
//
const isClearing = ref<boolean>(false);
function handleInputClick() {
  if (!props.readonly && !isClearing.value) {
    dialog.value = !dialog.value;
  }
}
// calendars
const dialog = ref(false);
const form = reactive({
  start_date: null,
  end_date: null,
});
function handleDialog() {
  if (form.start_date && form.end_date) {
    dialog.value = false;
    emit("update:modelValue", {
      start_date: form.start_date,
      end_date: form.end_date,
    });
    clearError();
  }
}
function handleCloseDialog(e: boolean) {
  if (!e && (!form.end_date || !form.start_date)) {
    form.start_date = null;
    form.end_date = null;
    emit("update:modelValue", {
      start_date: "",
      end_date: "",
    });
    handleRequire();
  }
}
// init modelValue
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.start_date) {
      form.start_date = props.modelValue.start_date;
      form.end_date = props.modelValue.end_date;
    }
  }
);
// clear
function handleClearInput() {
  form.start_date = null;
  form.end_date = null;
  emit("update:modelValue", {
    start_date: "",
    end_date: "",
  });
  handleRequire();
  isClearing.value = true;
  const t = setTimeout(() => {
    isClearing.value = false;
    clearTimeout(t);
  }, 0);
}
// error handling
const errorMessage = ref("");
function handleRequire() {
  emit("update:valid", false);
  if (props.required) {
    errorMessage.value = "required";
  }
}
function clearError() {
  emit("update:valid", true);
  errorMessage.value = "";
}
//
function handleFirstDateClick() {
  form.end_date = null;
}
</script>
