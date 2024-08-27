<template>
  <div class="index">
    <Hero class="mb-6" />
    <div class="container-gray">
      <p>filtering icons go here</p>
    </div>
    <div class="p-4">
      <Collection title="Popular Places" class="mb-6" />
      <Collection title="Quiet Places" class="mb-6" />
      <Collection title="Places To Work" class="mb-6" />
    </div>
    <div class="container-gray">
      <p>CTA for hosting a space goes here</p>
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
