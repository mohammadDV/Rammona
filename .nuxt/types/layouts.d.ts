import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "auth" | "default" | "user"
declare module "/Users/mohammaddv/Downloads/Rammona/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}