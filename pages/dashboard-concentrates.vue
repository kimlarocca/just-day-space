<template>
  <div class="dashboard-concentrates">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Concentrates Dashboard</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-5">
      <h2 class="mr-4">Concentrates Dashboard</h2>
    </div>
    <div class="container-white p-4 mb-5">
      <h4 class="mb-4">Coming Soon</h4>
      <p>The concentrates dashboard is coming soon!</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUserProfile = useCurrentUserProfile()
</script>
