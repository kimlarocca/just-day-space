<template>
  <div class="hemp">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Success!</Title>
      </Head>
    </Html>
    <h2 class="mb-4">Success!</h2>
    <div class="container-white p-4">
      <icons-large-check class="mb-4" />
      <h4 class="mb-4">Your account setup is complete!</h4>
      <p class="mb-4">What's next?</p>
      <nuxt-link
        v-if="currentUserProfile.farm_owner"
        to="/cannabis"
        class="plain"
      >
        <Button
          label="add your strains"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
        />
      </nuxt-link>
      <nuxt-link
        v-if="currentUserProfile.hemp_farm_owner"
        to="/hemp"
        class="plain"
      >
        <Button
          label="add your hemp strains"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
        />
      </nuxt-link>
      <nuxt-link
        v-if="currentUserProfile.lab_owner"
        to="/concentrates"
        class="plain"
      >
        <Button
          label="add your concentrates"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
        />
      </nuxt-link>
      <Divider class="mb-2 pt-6 w-4 lg:w-2" />
      <p class="mb-4">Or</p>
      <nuxt-link to="/dashboard" class="plain">
        <Button
          label="check out your dashboard"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block p-button-outlined w-full md:w-fit"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

// set onboarded to true in the profiles table for the current user
await supabase
  .from( 'profiles' )
  .update( {
    onboarded: true,
  } )
  .eq( 'id', currentUser.value.id )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value.id )
  .limit( 1 )
if ( data ) {
  // update the state
  currentUserProfile.value.farm_owner = data[ 0 ]?.farm_owner
  currentUserProfile.value.hemp_farm_owner = data[ 0 ]?.hemp_farm_owner
  currentUserProfile.value.lab_owner = data[ 0 ]?.lab_owner
  currentUserProfile.value.full_name = data[ 0 ]?.full_name
  currentUserProfile.value.phone = data[ 0 ]?.phone
  currentUserProfile.value.number_of_workers = data[ 0 ]?.number_of_workers
  currentUserProfile.value.onboarded = data[ 0 ]?.onboarded
}
</script>
