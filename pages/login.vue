<template>
  <div class="sign-in">
    <h1 class="mb-3 flex align-items-center">
      Connecting empty spaces with people who need them.
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
</script>
