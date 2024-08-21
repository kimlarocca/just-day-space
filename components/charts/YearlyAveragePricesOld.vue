<template>
  <div class="container-white border p-4">
    <ProgressSpinner v-if="loading" />
    <charts-multi-line-chart
      v-else
      :sativa="sativa"
      :indica="indica"
      :hybrid="hybrid"
      :hybrid-sativa="hybridSativa"
      :hybrid-indica="hybridIndica"
      :categories="categories"
      :key="key"
      :loading="loading"
      title="Yearly Average Prices"
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
const hybridIndica = ref( [] )
const hybridSativa = ref( [] )
const hybrid = ref( [] )
const indica = ref( [] )
const key = ref( 0 )
const sativa = ref( [] )
const supabase = useSupabaseClient()
const loading = ref( true )

// function that formats the date in mm/yyyy format
function formatDate ( date ) {
  const d = new Date( date ),
    month = '' + ( d.getMonth() + 1 ),
    year = d.getFullYear()
  return month + '/' + year
}

async function getPrices ( start, end, category ) {
  const data = await supabase.rpc( 'get_prices_in_date_range', {
    start_date: start,
    end_date: end,
    category_name: category
  } )
  if ( category === 'Sativa' ) {
    sativa.value.push( data?.data ? data.data : 0 )
  }
  if ( category === 'Indica' ) {
    indica.value.push( data?.data ? data.data : 0 )
  }
  if ( category === 'Hybrid' ) {
    hybrid.value.push( data?.data ? data.data : 0 )
  }
  if ( category === 'Hybrid Sativa' ) {
    hybridSativa.value.push( data?.data ? data.data : 0 )
  }
  if ( category === 'Hybrid Indica' ) {
    hybridIndica.value.push( data?.data ? data.data : 0 )
  }
  key.value++
}

onMounted( async () => {
  await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Sativa' )
  await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted, 'Sativa' )
  await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted, 'Sativa' )
  await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted, 'Sativa' )
  await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted, 'Sativa' )
  await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted, 'Sativa' )
  await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted, 'Sativa' )
  await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted, 'Sativa' )
  await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted, 'Sativa' )
  await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted, 'Sativa' )
  await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted, 'Sativa' )
  await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted, 'Sativa' )
  await getPrices( oneMonthAgoFormatted, todayFormatted, 'Sativa' )

  await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Indica' )
  await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted, 'Indica' )
  await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted, 'Indica' )
  await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted, 'Indica' )
  await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted, 'Indica' )
  await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted, 'Indica' )
  await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted, 'Indica' )
  await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted, 'Indica' )
  await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted, 'Indica' )
  await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted, 'Indica' )
  await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted, 'Indica' )
  await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted, 'Indica' )
  await getPrices( oneMonthAgoFormatted, todayFormatted, 'Indica' )

  await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid' )
  await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted, 'Hybrid' )
  await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted, 'Hybrid' )
  await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid' )
  await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted, 'Hybrid' )
  await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted, 'Hybrid' )
  await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid' )
  await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted, 'Hybrid' )
  await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted, 'Hybrid' )
  await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid' )
  await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted, 'Hybrid' )
  await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted, 'Hybrid' )
  await getPrices( oneMonthAgoFormatted, todayFormatted, 'Hybrid' )

  await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted, 'Hybrid Sativa' )
  await getPrices( oneMonthAgoFormatted, todayFormatted, 'Hybrid Sativa' )

  await getPrices( thirteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( twelveMonthsAgoFormatted, elevenMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( elevenMonthsAgoFormatted, tenMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( tenMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( nineMonthsAgoFormatted, eightMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( eightMonthsAgoFormatted, sevenMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( sevenMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( sixMonthsAgoFormatted, fiveMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( fiveMonthsAgoFormatted, fourMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( fourMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( threeMonthsAgoFormatted, twoMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( twoMonthsAgoFormatted, oneMonthAgoFormatted, 'Hybrid Indica' )
  await getPrices( oneMonthAgoFormatted, todayFormatted, 'Hybrid Indica' )

  loading.value = false
} )
</script>
