<template>
  <footer class="p-4 px-6 pt-6">
    <Logo class="mb-2" />
    <div class="flex justify-content-between flex-column lg:flex-row">
      <p class="mb-2 hidden">
        <nuxt-link to="/" class="mr-4"> Privacy Policy </nuxt-link>
        <nuxt-link to="/" class="mr-4"> Terms </nuxt-link>
        <nuxt-link to="/"> Help Center </nuxt-link>
      </p>
      <p>Copyright © {{ currentYear }} Just Day Space. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
footer p {
  font-size: var(--font-size-5);
}
</style>
