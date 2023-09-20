<template>
  <div class="custom-file-input">
    <div
      @click="handleUpload"
      ref="placeholder"
      :style="{ height }"
      class="custom-file-input__preview"
      @drop="handleDrop"
    >
      <span class="opacity-50">
        {{ label ? `${$t("action.upload")} ${label}` : $t("action.upload_your_image") }}
      </span>
    </div>
    <input
      @change="handleInput"
      :name="name"
      ref="input"
      type="file"
      style="display: none"
    />
    <p class="custom-file-input__error" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import "./index.sass";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
interface ValidationModel {
  type?: "image" | "pdf" | "excel" | "zip";
  maxSize?: number;
}
interface Props {
  modelValue: any;
  label?: string;
  name?: string;
  height?: string;
  validation?: ValidationModel;
  valid?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  height: "200px",
});
const emit = defineEmits<{
  (e: "update:modelValue", val: any): void;
  (e: "update:valid", value: boolean): void;
}>();
//
const input = ref<HTMLInputElement>();
const error = ref(); // to handle errors
const placeholder = ref<HTMLDivElement>();
function handleUpload() {
  if (input.value) input.value.click();
}
function handleInput(e: any, type = "input") {
  let file;
  const thisFile =
    type === "input" ? e.currentTarget.files[0] : (e as DragEvent).dataTransfer?.files[0];
  const objectUrl = URL.createObjectURL(thisFile);
  const fileSize = thisFile.size / 1000000;
  // validation
  if (props.validation) {
    if (props.validation.type && !thisFile.type.includes(props.validation.type)) {
      error.value = `فرمت فایل آپلود شده باید ${t(
        "error." + props.validation.type
      )} باشد`;
      emit("update:modelValue", null);
      emit("update:valid", false);
      return;
    } else if (props.validation.maxSize && fileSize > Number(props.validation.maxSize)) {
      error.value = `سایز فایل آپلود شده باید کمتر از ${props.validation.maxSize} مگابایت باشد.`;
      emit("update:modelValue", null);
      emit("update:valid", false);
      return;
    }
  }
  // show file
  if (thisFile.type.includes("image")) {
    file = `<img src="${objectUrl}" />`;
  } else {
    file = `<div class="has-text-success has-text-centered" style="height:90px;width:100%">
            <p>${thisFile.name}</p>
            <img width="70" height="70" class="mt-2" src="/img/files/${
              thisFile.type.includes("pdf") ? "pdf" : "file"
            }.svg"/>
            </div>`;
  }
  error.value = null;
  emit("update:valid", true);
  if (placeholder.value) placeholder.value.innerHTML = file;
  emit("update:modelValue", thisFile);
}
function handleDrop(e: DragEvent) {
  e.preventDefault();
  handleInput(e, "drop");
}
function preventDefault(e: DragEvent) {
  e.preventDefault();
}
onMounted(() => {
  window.addEventListener("dragover", preventDefault);
  window.addEventListener("drop", preventDefault);
});
onUnmounted(() => {
  window.removeEventListener("dragover", preventDefault);
  window.removeEventListener("drop", preventDefault);
});
//
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue && placeholder.value) {
      placeholder.value.innerHTML = `<span class="opacity-50">${t(
        "action.upload_your_image"
      )}</span>`;
    }
  }
);
</script>
