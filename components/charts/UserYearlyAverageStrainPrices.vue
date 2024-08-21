<template>
  <div class="container-white border p-4">
    <ProgressSpinner v-if="loading" />
    <charts-line-chart
      v-else
      :key="key"
      :dataset="pricingData"
      :categories="categories"
      :max="max"
      :min="min"
      title="My Yearly Average Prices"
    />
  </div>
</template>

<script setup>
// get dates in yyyy-mm-dd format
const today = new Date()
const todayFormatted = today.toISOString().split( 'T' )[ 0 ]
const oneMonthAgo = new Date()
oneMonthAgo.setMonth( oneMonthAgo.getMonth() - 1 )
const oneMonthAgoFormatted = oneMonthAgo.toISOString().split( 'T' )[ 0 ]
const twoMonthsAgo = new Date()
twoMonthsAgo.setMonth( twoMonthsAgo.getMonth() - 2 )
const twoMonthsAgoFormatted = twoMonthsAgo.toISOString().split( 'T' )[ 0 ]
const threeMonthsAgo = new Date()
threeMonthsAgo.setMonth( threeMonthsAgo.getMonth() - 3 )
const threeMonthsAgoFormatted = threeMonthsAgo.toISOString().split( 'T' )[ 0 ]
const fourMonthsAgo = new Date()
fourMonthsAgo.setMonth( fourMonthsAgo.getMonth() - 4 )
const fourMonthsAgoFormatted = fourMonthsAgo.toISOString().split( 'T' )[ 0 ]
const fiveMonthsAgo = new Date()
fiveMonthsAgo.setMonth( fiveMonthsAgo.getMonth() - 5 )
const fiveMonthsAgoFormatted = fiveMonthsAgo.toISOString().split( 'T' )[ 0 ]
const sixMonthsAgo = new Date()
sixMonthsAgo.setMonth( sixMonthsAgo.getMonth() - 6 )
const sixMonthsAgoFormatted = sixMonthsAgo.toISOString().split( 'T' )[ 0 ]
const sevenMonthsAgo = new Date()
sevenMonthsAgo.setMonth( sevenMonthsAgo.getMonth() - 7 )
const sevenMonthsAgoFormatted = sevenMonthsAgo.toISOString().split( 'T' )[ 0 ]
const eightMonthsAgo = new Date()
eightMonthsAgo.setMonth( eightMonthsAgo.getMonth() - 8 )
const eightMonthsAgoFormatted = eightMonthsAgo.toISOString().split( 'T' )[ 0 ]
const nineMonthsAgo = new Date()
nineMonthsAgo.setMonth( nineMonthsAgo.getMonth() - 9 )
const nineMonthsAgoFormatted = nineMonthsAgo.toISOString().split( 'T' )[ 0 ]
const tenMonthsAgo = new Date()
tenMonthsAgo.setMonth( tenMonthsAgo.getMonth() - 10 )
const tenMonthsAgoFormatted = tenMonthsAgo.toISOString().split( 'T' )[ 0 ]
const elevenMonthsAgo = new Date()
elevenMonthsAgo.setMonth( elevenMonthsAgo.getMonth() - 11 )
const elevenMonthsAgoFormatted = elevenMonthsAgo.toISOString().split( 'T' )[ 0 ]
const twelveMonthsAgo = new Date()
twelveMonthsAgo.setMonth( twelveMonthsAgo.getMonth() - 12 )
const twelveMonthsAgoFormatted = twelveMonthsAgo.toISOString().split( 'T' )[ 0 ]
const thirteenMonthsAgo = new Date()
thirteenMonthsAgo.setMonth( thirteenMonthsAgo.getMonth() - 13 )
const thirteenMonthsAgoFormatted = thirteenMonthsAgo.toISOString().split( 'T' )[ 0 ]

const categories = [ formatDate( twelveMonthsAgoFormatted ), formatDate( elevenMonthsAgoFormatted ), formatDate( tenMonthsAgoFormatted ), formatDate( nineMonthsAgoFormatted ), formatDate( eightMonthsAgoFormatted ), formatDate( sevenMonthsAgoFormatted ), formatDate( sixMonthsAgoFormatted ), formatDate( fiveMonthsAgoFormatted ), formatDate( fourMonthsAgoFormatted ), formatDate( threeMonthsAgoFormatted ), formatDate( twoMonthsAgoFormatted ), formatDate( oneMonthAgoFormatted ), formatDate( todayFormatted ) ]
const pricingData = ref( [] )
const key = ref( 0 )
const loading = ref( true )
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// function that formats the date in mm/yyyy format
function formatDate ( date ) {
  const d = new Date( date ),
    month = '' + ( d.getMonth() + 1 ),
    year = d.getFullYear()
  return month + '/' + year
}

async function getPrices ( start, end ) {
  loading.value = true
  const data = await supabase.rpc( 'get_prices_by_user_id', {
    start_date: start,
    end_date: end,
    current_user_id: user.value.id,
  } )
  pricingData.value.push( data?.data ? data.data : 0 )
  key.value++
  loading.value = false
}

// computed property that gets the max number in the pricingData array
const max = computed( () => {
  return Math.max( ...pricingData.value )
} )

// computed property that gets the min number in the pricingData array
const min = computed( () => {
  return Math.min( ...pricingData.value )
} )

// on mounted
onMounted( () => {
  getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted )
  getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted )
  getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted )
  getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted )
  getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted )
  getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted )
  getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted )
  getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted )
  getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted )
  getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted )
  getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted )
  getPrices( oneMonthAgoFormatted, todayFormatted )
  key.value++
  loading.value = false
} )
</script>
