<template>
  <transition name="slide-fade" mode="out-in">
    <ProgressSpinner v-if="loading" />
  </transition>
  <transition name="slide-fade" mode="out-in">
    <div v-if="!loading" class="container-white border p-4">
      <h4 class="text-center">{{ growingMethod }}</h4>
      <charts-multi-line-chart
        :sativa="sativa"
        :indica="indica"
        :hybrid="hybrid"
        :hybrid-sativa="hybridSativa"
        :hybrid-indica="hybridIndica"
        :categories="categories"
        :key="key"
        :loading="loading"
        title="Avg Prices Over Time"
      />
      <div class="text-center">
        <div
          class="md:ml-3 mb-2 md:mb-0 tag small inline-block blue cursor-pointer"
          @click="getData('All')"
          :class="growingMethod === 'All' ? 'active' : ''"
        >
          All
        </div>
        <div
          class="ml-2 mb-2 md:mb-0 tag small inline-block blue cursor-pointer"
          @click="getData('Outdoor')"
          :class="growingMethod === 'Outdoor' ? 'active' : ''"
        >
          Outdoor
        </div>
        <div
          class="ml-2 mb-2 md:mb-0 tag small inline-block blue cursor-pointer"
          @click="getData('Indoor')"
          :class="growingMethod === 'Indoor' ? 'active' : ''"
        >
          Indoor
        </div>
        <div
          class="ml-2 mb-2 md:mb-0 tag small inline-block blue cursor-pointer"
          @click="getData('Greenhouse')"
          :class="growingMethod === 'Greenhouse' ? 'active' : ''"
        >
          Greenhouse
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const growingMethod = ref( 'All' )
// get dates in yyyy-mm-dd format
const today = new Date()
const todayFormatted = today.toISOString().split( 'T' )[ 0 ]

const threeMonthsAgo = new Date()
threeMonthsAgo.setMonth( threeMonthsAgo.getMonth() - 3 )
const threeMonthsAgoFormatted = threeMonthsAgo.toISOString().split( 'T' )[ 0 ]

const sixMonthsAgo = new Date()
sixMonthsAgo.setMonth( sixMonthsAgo.getMonth() - 6 )
const sixMonthsAgoFormatted = sixMonthsAgo.toISOString().split( 'T' )[ 0 ]

const nineMonthsAgo = new Date()
nineMonthsAgo.setMonth( nineMonthsAgo.getMonth() - 9 )
const nineMonthsAgoFormatted = nineMonthsAgo.toISOString().split( 'T' )[ 0 ]

const twelveMonthsAgo = new Date()
twelveMonthsAgo.setMonth( twelveMonthsAgo.getMonth() - 12 )
const twelveMonthsAgoFormatted = twelveMonthsAgo.toISOString().split( 'T' )[ 0 ]

const fifteenMonthsAgo = new Date()
fifteenMonthsAgo.setMonth( fifteenMonthsAgo.getMonth() - 15 )
const fifteenMonthsAgoFormatted = fifteenMonthsAgo.toISOString().split( 'T' )[ 0 ]

const eighteenMonthsAgo = new Date()
eighteenMonthsAgo.setMonth( eighteenMonthsAgo.getMonth() - 18 )
const eighteenMonthsAgoFormatted = eighteenMonthsAgo.toISOString().split( 'T' )[ 0 ]

const twentyOneMonthsAgo = new Date()
twentyOneMonthsAgo.setMonth( twentyOneMonthsAgo.getMonth() - 21 )
const twentyOneMonthsAgoFormatted = twentyOneMonthsAgo.toISOString().split( 'T' )[ 0 ]

const twentyFourMonthsAgo = new Date()
twentyFourMonthsAgo.setMonth( twentyFourMonthsAgo.getMonth() - 24 )
const twentyFourMonthsAgoFormatted = twentyFourMonthsAgo.toISOString().split( 'T' )[ 0 ]

const twentySevenMonthsAgo = new Date()
twentySevenMonthsAgo.setMonth( twentySevenMonthsAgo.getMonth() - 27 )
const twentySevenMonthsAgoFormatted = twentySevenMonthsAgo.toISOString().split( 'T' )[ 0 ]

const categories = [ formatDate( twentyFourMonthsAgoFormatted ), formatDate( twentyOneMonthsAgoFormatted ), formatDate( eighteenMonthsAgoFormatted ), formatDate( fifteenMonthsAgoFormatted ), formatDate( twelveMonthsAgoFormatted ), formatDate( nineMonthsAgoFormatted ), formatDate( sixMonthsAgoFormatted ), formatDate( threeMonthsAgoFormatted ), formatDate( todayFormatted ) ]
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
  let data = null
  if ( growingMethod.value === 'All' ) {
    data = await supabase.rpc( 'get_prices_in_date_range', {
      start_date: start,
      end_date: end,
      category_name: category,
    } )
  } else {
    data = await supabase.rpc( 'get_prices_in_date_range_for_growing_method', {
      start_date: start,
      end_date: end,
      category_name: category,
      growing_method_name: growingMethod.value,
    } )
  }
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

async function getData ( method ) {
  loading.value = true
  sativa.value = []
  indica.value = []
  hybrid.value = []
  hybridSativa.value = []
  hybridIndica.value = []
  growingMethod.value = method

  await getPrices( twentySevenMonthsAgoFormatted, twentyFourMonthsAgoFormatted, 'Sativa' )
  await getPrices( twentyFourMonthsAgoFormatted, twentyOneMonthsAgoFormatted, 'Sativa' )
  await getPrices( twentyOneMonthsAgoFormatted, eighteenMonthsAgoFormatted, 'Sativa' )
  await getPrices( eighteenMonthsAgoFormatted, fifteenMonthsAgoFormatted, 'Sativa' )
  await getPrices( fifteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Sativa' )
  await getPrices( twelveMonthsAgoFormatted, nineMonthsAgoFormatted, 'Sativa' )
  await getPrices( nineMonthsAgoFormatted, sixMonthsAgoFormatted, 'Sativa' )
  await getPrices( sixMonthsAgoFormatted, threeMonthsAgoFormatted, 'Sativa' )
  await getPrices( threeMonthsAgoFormatted, todayFormatted, 'Sativa' )

  await getPrices( twentySevenMonthsAgoFormatted, twentyFourMonthsAgoFormatted, 'Indica' )
  await getPrices( twentyFourMonthsAgoFormatted, twentyOneMonthsAgoFormatted, 'Indica' )
  await getPrices( twentyOneMonthsAgoFormatted, eighteenMonthsAgoFormatted, 'Indica' )
  await getPrices( eighteenMonthsAgoFormatted, fifteenMonthsAgoFormatted, 'Indica' )
  await getPrices( fifteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Indica' )
  await getPrices( twelveMonthsAgoFormatted, nineMonthsAgoFormatted, 'Indica' )
  await getPrices( nineMonthsAgoFormatted, sixMonthsAgoFormatted, 'Indica' )
  await getPrices( sixMonthsAgoFormatted, threeMonthsAgoFormatted, 'Indica' )
  await getPrices( threeMonthsAgoFormatted, todayFormatted, 'Indica' )

  await getPrices( twentySevenMonthsAgoFormatted, twentyFourMonthsAgoFormatted, 'Hybrid' )
  await getPrices( twentyFourMonthsAgoFormatted, twentyOneMonthsAgoFormatted, 'Hybrid' )
  await getPrices( twentyOneMonthsAgoFormatted, eighteenMonthsAgoFormatted, 'Hybrid' )
  await getPrices( eighteenMonthsAgoFormatted, fifteenMonthsAgoFormatted, 'Hybrid' )
  await getPrices( fifteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid' )
  await getPrices( twelveMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid' )
  await getPrices( nineMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid' )
  await getPrices( sixMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid' )
  await getPrices( threeMonthsAgoFormatted, todayFormatted, 'Hybrid' )

  await getPrices( twentySevenMonthsAgoFormatted, twentyFourMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( twentyFourMonthsAgoFormatted, twentyOneMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( twentyOneMonthsAgoFormatted, eighteenMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( eighteenMonthsAgoFormatted, fifteenMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( fifteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( twelveMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( nineMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( sixMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid Sativa' )
  await getPrices( threeMonthsAgoFormatted, todayFormatted, 'Hybrid Sativa' )

  await getPrices( twentySevenMonthsAgoFormatted, twentyFourMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( twentyFourMonthsAgoFormatted, twentyOneMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( twentyOneMonthsAgoFormatted, eighteenMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( eighteenMonthsAgoFormatted, fifteenMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( fifteenMonthsAgoFormatted, twelveMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( twelveMonthsAgoFormatted, nineMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( nineMonthsAgoFormatted, sixMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( sixMonthsAgoFormatted, threeMonthsAgoFormatted, 'Hybrid Indica' )
  await getPrices( threeMonthsAgoFormatted, todayFormatted, 'Hybrid Indica' )
  loading.value = false
}

onMounted( async () => {
  getData( 'All' )
} )
</script>
