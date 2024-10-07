<template>
  <div class="dashboard container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Manage Your Spaces</Title>
      </Head>
    </Html>
    <!-- <h1 class="mb-5">Manage Your Spaces</h1> -->
    <h1 class="mb-5">Add Your First Space</h1>
    <p>Coming soon!</p>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUserProfile = useCurrentUserProfile()
const hasSpaces = ref( false )

//check if user has completed required profile fields
if ( !currentUserProfile.value?.birthday ) {
  navigateTo( '/onboarding' )
}

// check if user has added any spaces yet
</script>
