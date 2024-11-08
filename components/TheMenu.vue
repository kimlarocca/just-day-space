<template>
  <nav>
    <div class="mx-3">
      <div class="flex align-items-start">
        <div class="mr-3">
          <nuxt-link
            to="/settings"
            class="plain white clickable ml-2"
            aria-label="manage profile"
            @click="emit('menuClicked', true)"
          >
            <Avatar
              v-if="currentUserProfile?.avatar_url"
              :image="currentUserProfile?.avatar_url"
              shape="circle"
              size="large"
              aria-label="user avatar image"
            />
            <Avatar
              v-else
              shape="circle"
              size="large"
              icon="pi pi-user"
              aria-label="user avatar image"
            />
          </nuxt-link>
        </div>
        <div v-if="currentUser">
          <p class="mb-2 font-bold">
            Welcome back<template v-if="currentUserProfile?.full_name"
              >, {{ currentUserProfile?.full_name }}</template
            >!
          </p>
          <p class="small">{{ currentUser?.email }}</p>
        </div>
        <div v-else>
          <p class="mb-2 font-bold">You are logged out.</p>
          <Button @click="showLogin = true" label="log in" class="mb-3" />
          <p class="small mb-6">
            Don't have an account yet?<br />
            <nuxt-link
              to="https://amyinfinity.com/justdayspace-signup"
              @click="emit('closePanel')"
            >
              Request early access.
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
    <Divider class="my-5" />
    <div class="mx-4">
      <p class="small mb-3">
        <nuxt-link to="/" @click="emit('menuClicked', true)">
          Find A Space
        </nuxt-link>
      </p>
      <p v-if="currentUser" class="small mb-3">
        <nuxt-link to="/dashboard" @click="emit('menuClicked', true)">
          Manage Your Spaces
        </nuxt-link>
      </p>
      <p v-if="currentUser" class="small mb-3">
        <nuxt-link to="/settings" @click="emit('menuClicked', true)">
          Account Settings
        </nuxt-link>
      </p>
    </div>
    <Divider class="my-5" />
    <div class="mx-4">
      <p class="small mb-3">
        <nuxt-link to="/help" @click="emit('menuClicked', true)">
          Help
        </nuxt-link>
      </p>
      <p v-if="currentUser" class="small mb-3">
        <nuxt-link to="/logout" @click="emit('menuClicked', true)">
          Log Out
        </nuxt-link>
      </p>
    </div>
  </nav>
  <Sidebar
    v-model:visible="showLogin"
    :baseZIndex="10000"
    position="right"
    class="w-full md:w-25rem"
  >
    <Login @close-panel="emit('menuClicked', true)" class="mx-4" />
  </Sidebar>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const emit = defineEmits(['menuClicked'])
const showLogin = ref(false)
</script>

<style lang="scss" scoped>
.p-avatar.p-avatar-circle {
  width: 60px;
  height: 60px;
}
</style>
