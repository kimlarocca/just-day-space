<template>
  <nav class="mx-4">
    <div class="flex align-items-start">
      <div class="mr-3">
        <nuxt-link
          v-if="currentUserProfile?.avatar_url"
          to="/settings"
          class="plain white clickable ml-2"
          aria-label="manage profile"
        >
          <Avatar
            :image="currentUserProfile?.avatar_url"
            shape="circle"
            size="large"
            aria-label="user avatar image"
          />
        </nuxt-link>
        <nuxt-link
          to="/settings"
          class="plain white clickable ml-2"
          aria-label="manage profile"
        >
          <Avatar
            shape="circle"
            size="large"
            icon="pi pi-user"
            aria-label="user avatar image"
          />
        </nuxt-link>
      </div>
      <div v-if="currentUser">
        <p class="mb-2 font-bold">
          Welcome back, {{ currentUserProfile.full_name }}
        </p>
        <p class="small mb-6">
          <nuxt-link to="/logout" @click="emit('menuClicked', true)">
            Log out
          </nuxt-link>
        </p>
      </div>
      <div v-else>
        <p class="mb-2 font-bold">You are logged out.</p>
        <Button @click="showLogin = true" label="log in" class="mb-2" />
        <p class="small mb-6">
          Don't have an account yet?
          <nuxt-link to="/signup" @click="emit('menuClicked', true)">
            Sign up
          </nuxt-link>
        </p>
      </div>
    </div>
    <p class="mb-2">
      <nuxt-link to="/" @click="emit('menuClicked', true)">
        Help center
      </nuxt-link>
    </p>
    <p>
      <nuxt-link to="/" @click="emit('menuClicked', true)"> Logout </nuxt-link>
    </p>
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
const emit = defineEmits( [ 'menuClicked' ] )
const showLogin = ref( false )
</script>
