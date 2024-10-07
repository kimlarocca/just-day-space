<template>
  <header class="p-4">
    <div class="flex align-items-center justify-content-between">
      <nuxt-link to="/" class="plain">
        <logo />
      </nuxt-link>
      <div class="flex align-items-center">
        <p class="mr-3">
          <nuxt-link v-if="currentUser" to="/dashboard">
            Manage Your Spaces
          </nuxt-link>
          <nuxt-link v-else to="/signup">Rent Your Space</nuxt-link>
        </p>
        <i
          class="pi pi-bars text-xl p-1 cursor-pointer mr-1"
          @click="visible = true"
        />
      </div>
    </div>
    <Sidebar
      v-model:visible="visible"
      :baseZIndex="10000"
      position="right"
      class="w-full md:w-25rem"
    >
      <the-menu @menu-clicked="visible = false" />
    </Sidebar>
  </header>
</template>

<script setup>
const currentUser = useSupabaseUser()
const visible = ref( false )
</script>

<style lang="scss" scoped>
header .logo {
  margin-bottom: -5px;
}
</style>