<template>
  <div class="sign-in">
    <header class="flex align-items-center justify-content-between">
      <nuxt-link to="/" class="plain"><cuetip-logo /></nuxt-link>
      <div class="text-right">
        <p class="small">Don't have an account?</p>
        <p class="small">
          <nuxt-link
            to="https://cuetip.com/request-an-invitation/"
            target="_blank"
            class="like-h6"
          >
            Request Access
          </nuxt-link>
        </p>
      </div>
    </header>
    <Divider class="mb-6" />
    <h1 class="mb-3 flex align-items-center">
      Welcome To Cuetip's Benchmark
      <div class="ml-2 tag">BETA</div>
    </h1>
    <p class="mb-4 lg:mb-6">Enter your credentials to access your account.</p>
    <supabase-login-with-email class="mb-4" />
    <p class="like-h6">
      <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
    </p>
    <Divider class="mb-2 pt-6 w-4 lg:w-2" />
    <p class="mb-3">Or sign in with social:</p>
    <supabase-login-with-google />
    <Divider class="mb-4 pt-6 w-4 lg:w-2" />
    <p class="mb-3">Or sign in with a magic link:</p>
    <supabase-login-with-magic-link />
  </div>
</template>

<script setup>
definePageMeta( {
  layout: 'blank',
} )

import { useCurrentUser } from '~/composables/states'

const currentUser = useCurrentUser()
const client = useSupabaseClient()
const user = await client.auth.getUser()
const session = await client.auth.getSession()

// check supabase session for logged in user
if ( user?.data?.user ) {
  currentUser.value = user?.data?.user
} else if ( session?.data?.session?.user ) {
  currentUser.value = session?.data?.session?.user
}

onMounted( () => {
  if ( currentUser.value ) {
    window.location.href = '/dashboard'
  }
} )
</script>
