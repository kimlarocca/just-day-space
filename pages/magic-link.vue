<template>
  <div class="magic-link container p-4">
    <h1 class="mb-3">Magic Link</h1>
    <h2 class="mb-2">Logging into your account...</h2>
    <divider class="my-6 w-2" />
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account.
      </Message>
    </template>
    <p class="mb-4">Please wait a few moments.</p>
    <p>
      <a href="/">Click here if you are not automatically logged in.</a> Your
      magic link may have expired!
    </p>
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

onMounted( () => {
  if ( currentUser.value ) {
    window.location.href = '/dashboard'
  }
} )
</script>
