<template>
  <Message
    v-if="user && strainData?.length === 0"
    severity="warn"
    class="mt-4 mb-6"
  >
    You have not added any strains yet.
    <nuxt-link to="/cannabis">Click here to do it now!</nuxt-link>
  </Message>
  <Message
    v-if="user && strainData?.length > 0 && pricingData?.length === 0"
    severity="warn"
    class="mt-4 mb-6"
  >
    You have not added your weekly pricing yet.
    <nuxt-link to="/weekly-pricing">Click here to enter it now!</nuxt-link>
  </Message>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const pricingData = ref( null )
const strainData = ref( null )

// get the date for 7 days ago in yyyy-mm-dd format
const startDate = new Date()
startDate.setDate( startDate.getDate() - 7 )
const startDateString = startDate.toISOString().split( 'T' )[ 0 ]

// get the pricing history data for the logged in user
let { data: userPricing } = await supabase
  .from( 'pricing' )
  .select( 'user_id, created_at' ).gte( 'created_at', startDateString )
  .eq( 'user_id', user.value.id )
  .limit( 1 )
if ( userPricing ) {
  pricingData.value = userPricing
}

// get the user's strains
let { data: userStrains } = await supabase
  .from( 'user_strains' )
  .select( 'user_id' )
  .eq( 'user_id', user.value.id )
  .limit( 1 )
if ( userStrains ) {
  strainData.value = userStrains
}
</script>
