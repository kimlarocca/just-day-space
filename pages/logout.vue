<template>
  <div class="logout">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Logout</Title>
      </Head>
    </Html>
    <header class="flex align-items-end justify-content-between">
      <nuxt-link to="/" class="plain"><cuetip-logo /></nuxt-link>
      <p class="small">
        <nuxt-link to="/" class="like-h6">Sign In</nuxt-link>
      </p>
    </header>
    <divider class="mb-7" />
    <h1 class="mb-3">Logout</h1>
    <h2 class="mb-3">You have been logged out</h2>
    <p><a href="/">Click here</a> to return to the sign in page.</p>
  </div>
</template>

<script setup>
// sign out from supabase
const client = useSupabaseClient()
const { error } = await client.auth.signOut()
if ( error ) {
  console.log( 'error' )
}

// set the currentUser composable to null
const currentUser = useState( useCurrentUser )
currentUser.value = null

// set the currentUserProfile composable to null
const currentUserProfile = useCurrentUserProfile()
currentUserProfile.value = null

onMounted( () => {
  // check local storage for the auth token
  if ( process.client ) {
    // clear localStorage
    localStorage.clear()
  }
} )
</script>
