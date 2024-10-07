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
const currentUser = useSupabaseUser()
const client = useSupabaseClient()
const currentUserProfile = useCurrentUserProfile()

if ( currentUser.value ) {
  const {
    data,
    error
  } = await client
    .from( 'profiles' )
    .select( '*' )
    .eq( 'id', currentUser.value.id )
    .single()
  if ( error ) {
    console.error( error )
  } else if ( data ) {
    currentUserProfile.value = data
  }
}
</script>
