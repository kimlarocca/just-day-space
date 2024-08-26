<template>
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
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
