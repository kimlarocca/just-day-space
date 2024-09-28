<template>
  <div class="logout container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | You've Been Logged Out</Title>
      </Head>
    </Html>
    <h1 class="mb-4">You've Been Logged Out</h1>
    <p><a href="/">Click here</a> to return to the home page.</p>
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
