<template>
  <header class="p-4">
    <div class="flex align-items-center justify-content-between">
      <nuxt-link to="/dashboard" class="plain">
        <logo />
      </nuxt-link>
      <div class="flex align-items-center">
        <i
          class="pi pi-bars text-xl p-1 cursor-pointer mr-1"
          @click="visible = true"
        />
        <nuxt-link
          to="/settings"
          class="plain white clickable"
          aria-label="manage profile"
        >
          <Avatar
            v-if="currentUserProfile && currentUserProfile.avatar_url"
            :image="currentUserProfile.avatar_url"
            shape="circle"
            aria-label="user avatar image"
          />
          <Avatar
            v-else
            shape="circle"
            icon="pi pi-user"
            aria-label="user avatar image"
          />
        </nuxt-link>
      </div>
    </div>
    <Sidebar v-model:visible="visible" :baseZIndex="10000" position="right">
      <the-menu @menu-clicked="visible = false" />
    </Sidebar>
  </header>
</template>

<script setup>
const currentUserProfile = useCurrentUserProfile()
const visible = ref( false )
</script>

<style lang="scss" scoped>
header .logo {
  margin-bottom: -5px;
}
</style>