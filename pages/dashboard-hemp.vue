<template>
  <div class="dashboard-hemp">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Hemp Dashboard</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-5">
      <h2 class="mr-4">Hemp Dashboard</h2>
    </div>
    <div class="container-white p-4 mb-5">
      <h4 class="mb-4">Coming Soon</h4>
      <p>The hemp dashboard is coming soon!</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUserProfile = useCurrentUserProfile()
</script>
