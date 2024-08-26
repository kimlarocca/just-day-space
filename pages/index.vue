<template>
  <div class="index">
    <Hero class="mb-3" />
    <div class="p-4">
      <h2 class="mb-4">Popular Places</h2>
      <div class="grid mb-6">
        <div class="col col-4"><Sample-Card /></div>
        <div class="col col-4"><Sample-Card /></div>
        <div class="col col-4"><Sample-Card /></div>
      </div>
      <h2 class="mb-3">Quiet Places</h2>
    </div>
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
