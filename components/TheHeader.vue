<template>
  <header class="container-white no-border p-3 mb-4">
    <div class="flex align-items-center justify-content-between">
      <i
        class="pi pi-bars text-xl p-1 cursor-pointer"
        @click="visible = true"
      />
      <nuxt-link to="/dashboard" class="plain flex align-items-center">
        <cuetip-logo-minimal class="mr-1" />
        <h3 class="black flex align-items-center">
          Cuetip <span class="green hidden md:inline">Benchmark</span>
          <div class="ml-2 tag">BETA</div>
        </h3>
      </nuxt-link>
      <nuxt-link
        to="/settings"
        class="plain clickable"
        aria-label="manage profile"
      >
        <Avatar
          v-if="currentUserProfile && currentUserProfile.avatar_url"
          :image="currentUserProfile.avatar_url"
          size="large"
          shape="circle"
          aria-label="user avatar image"
        />
        <Avatar
          v-else
          size="large"
          shape="circle"
          icon="pi pi-user"
          aria-label="user avatar image"
        />
      </nuxt-link>
    </div>
    <Sidebar v-model:visible="visible" :baseZIndex="10000" position="left">
      <the-menu @menu-clicked="visible = false" />
    </Sidebar>
  </header>
  <alert-banners />
</template>

<script setup>
const currentUserProfile = useCurrentUserProfile()
const visible = ref( false )
</script>

<style lang="scss">
header .p-inputgroup.searchbar {
  line-height: 35px;
  height: 35px;
  max-width: 460px;
  input,
  button {
    line-height: 35px;
    height: 35px;
  }
}

header h4 {
  font-size: var(--font-size-7);
}
</style>
