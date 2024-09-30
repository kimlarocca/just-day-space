<template>
  <TheHeader />
  <main>
    <NuxtPage />
  </main>
  <TheFooter />
</template>

<script setup>
useHead( {
  bodyAttrs: {
    class: 'default',
  },
} )
</script>

<style lang="scss">
.default {
  background: var(--background-color);
}
</style>
