<template>
  <div class="sign-up">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Sign Up</Title>
      </Head>
    </Html>
    <header class="flex align-items-end justify-content-between">
      <nuxt-link to="/" class="plain"><cuetip-logo /></nuxt-link>
      <p class="small">
        Already have an account?
        <nuxt-link to="/sign-in" class="like-h6">Sign In</nuxt-link>
      </p>
    </header>
    <divider class="mb-6" />
    <h1 class="mb-3">Welcome To Cuetip</h1>
    <h2 class="mb-2">Tech and data provider in the cannabis space</h2>
    <p>
      Cuetip is a Tech and Data provider of premium technology and services to
      the entire supply chain in the cannabis space. cuetip provides exclusive
      insights into the rapidly evolving cannabis market and captures current
      data.
    </p>
    <divider class="my-6 w-2" />
    <h4 class="mb-4">Fill out the form below to register</h4>
    <supabase-signup-with-email />
    <divider class="mt-5 mb-4 w-2" />
    <p class="mb-3">Or sign in with social:</p>
    <supabase-login-with-google />
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
