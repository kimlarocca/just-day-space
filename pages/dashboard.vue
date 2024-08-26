<template>
  <div class="dashboard" v-if="currentUserProfile">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Dashboard</Title>
      </Head>
    </Html>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUserProfile = useCurrentUserProfile()
</script>
