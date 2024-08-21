<template>
  <div class="container-white border p-4">
    <ProgressSpinner v-if="loading" />
    <h4 class="text-center">{{ growingMethod }}</h4>
    <charts-line-chart
      :key="key"
      :dataset="pricingData"
      :categories="categories"
      :max="max"
      :min="min"
      title="Yearly Average Prices"
    />
  </div>
</template>

<script setup>
const props = defineProps( {
  stateName: {
    type: String,
    default: null,
    required: true,
  },
  growingMethod: {
    type: String,
    default: 'All',
    required: true,
  },
} )

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

// function that formats the date in mm/yyyy format
function formatDate ( date ) {
  const d = new Date( date ),
    month = '' + ( d.getMonth() + 1 ),
    year = d.getFullYear()
  return month + '/' + year
}

async function getPrices ( start, end ) {
  loading.value = true
  let data
  if ( props.growingMethod === 'All' ) {
    data = await supabase.rpc( 'get_prices_by_state', {
      start_date: start,
      end_date: end,
      state_name: props.stateName,
    } )
  } else {
    data = await supabase.rpc( 'get_prices_by_state_for_growing_method', {
      start_date: start,
      end_date: end,
      state_name: props.stateName,
      growing_method_name: props.growingMethod,
    } )
  }
  pricingData.value.push( data?.data ? data.data : 0 )
  key.value++
  loading.value = false
}

await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted )
await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted )
await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted )
await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted )
await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted )
await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted )
await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted )
await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted )
await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted )
await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted )
await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted )
await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted )
await getPrices( oneMonthAgoFormatted, todayFormatted )

// computed property that gets the max number in the pricingData array
const max = computed( () => {
  return Math.max( ...pricingData.value )
} )

// computed property that gets the min number in the pricingData array
const min = computed( () => {
  return Math.min( ...pricingData.value )
} )

key.value++
loading.value = false
</script>
