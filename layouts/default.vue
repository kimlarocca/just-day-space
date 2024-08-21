<template>
  <div class="p-4 container">
    <the-header class="mb-5" />
    <main>
      <router-view />
    </main>
    <the-footer />
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'default',
  },
})
</script>

<style lang="scss">
.default {
  background: var(--background-color);
}
</style>
