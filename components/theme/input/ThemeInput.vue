<template>
  <div
    :class="[
      inputError && 'text-error border-error',
      inputType === 'input' ? 'input' : 'textarea',
      !!readonly && 'readonly',
    ]"
    class="px-2 transition-all"
  >
    <span class="custom-textfield__prefix" v-if="prefix" v-text="prefix" />
    <div v-if="!!$slots.prepend" class="custom-textfield__prepend">
      <slot name="prepend" />
    </div>
    <ThemeIcon v-if="prependIcon" v-text="prependIcon" />
    <component
      :is="inputType"
      :class="['px-2', !!inputClass && inputClass, !!formattedValue && 'input__dirty']"
      :dir="dir"
      :placeholder="placeholder"
      :value="formattedValue"
      @input="handleInput"
      :readonly="readonly"
      :type="type === 'number' || type === 'text' ? 'text' : type"
      ref="inputRef"
      :inputMode="type === 'number' ? 'decimal' : undefined"
    />
    <slot name="append" />
    <ThemeIcon v-if="appendIcon" v-text="appendIcon" />
    <label v-if="label">{{ label }}</label>
    <Transition>
      <p v-if="inputError" class="mb-0 error-message">
        {{ inputError }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import "./index.sass";
import { useField } from "vee-validate";
import useInput from "~~/composables/input/useInput";
interface InputElementEvent extends Event {
  target: HTMLInputElement;
}
type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});
// regex for persian lang: https://github.com/mirhmousavi/Regex.Persian.Language
interface Props {
  name: string; // name of the field
  modelValue: any;
  prependIcon?: string;
  appendIcon?: string;
  prefix?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | undefined;
  label?: string;
  inputClass?: string | undefined;
  dir?: string;
  precision?: number | null;
  max?: number | null;
  valid?: boolean;
  readonly?: boolean;
  validation?: object;
  reset?: boolean;
  inputType?: "input" | "textarea";
  withComma?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  inputClass: undefined,
  precision: null,
  max: null,
  readonly: false,
  placeholder: undefined,
  type: "text",
  valid: false,
  reset: false,
  inputType: "input",
  withComma: true,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "update:valid", value: boolean): void;
}>();
//
const {
  formatNumber,
  maxNumber,
  convertToSlug,
  maxLength,
  numberic,
  convertToEnglishNumber,
  putCommaForNumber,
} = useInput();
function handleInput(e: InputElementEvent) {
  let pureInputValue = e.target.value;
  // e.target.value = e.target.value.replace(/[a-zA-Z]|[؀-ۿ]/, "");
  if (props.type === "number") {
    e.target.value = formatNumber(e.target.value) ?? "";
    if (!!props.max) {
      e.target.value = String(maxNumber(e.target.value, props.max)) ?? "";
    }
    pureInputValue = e.target.value.replace(/,/g, "");
  } else if (props.type === "mobile") {
    e.target.value = numberic(maxLength(e.target.value, 11));
    pureInputValue = e.target.value;
  } else if (props.type === "slug") {
    e.target.value = convertToSlug(e.target.value);
    pureInputValue = e.target.value;
  }
  emit("update:modelValue", convertToEnglishNumber(pureInputValue));
}
const formattedValue = computed(() => {
  if (props.type !== "number") return props.modelValue;
  else {
    return props.withComma ? putCommaForNumber(props.modelValue) : props.modelValue;
  }
});
// validation
const {
  value: input,
  errorMessage: inputError,
  meta: inputMeta,
  resetField: resetInput,
} = useField<string>(props.name, { ...props.validation });
watch(
  () => inputMeta.valid,
  () => {
    emit("update:valid", inputMeta.valid);
  }
);

// reset
watch(
  () => props.reset,
  () => {
    if (props.reset) {
      resetInput();
    }
  }
);
</script>
