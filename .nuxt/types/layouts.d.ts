import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "blank" | "default"
declare module "/Users/kimlarocca/Websites/just-day-space/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}