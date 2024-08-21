<template>
  <div class="hemp">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Pricing History</Title>
      </Head>
    </Html>
    <h2 class="mb-4">
      My Pricing History
      <i
        class="pi pi-download cursor-pointer green"
        @click="downloadCSV"
        v-tooltip="'Download CSV of Your Pricing History'"
      />
    </h2>
    <charts-user-yearly-average-strain-prices class="mb-5" />
    <div class="container-white history-table p-4">
      <table v-if="pricingData">
        <tr>
          <td class="font-bold">Date</td>
          <td class="font-bold">Strain</td>
          <td class="font-bold text-center" style="width: 120px">Your Price</td>
          <td class="font-bold text-center" style="width: 170px">
            Average Price
            <i
              class="pi pi-info-circle cursor-pointer text-xs"
              v-tooltip.right="
                'The average price for the growing method for the week.'
              "
            />
          </td>
          <td class="font-bold text-center" style="width: 150px">
            Variance
            <i
              class="pi pi-info-circle cursor-pointer text-xs"
              v-tooltip.right="
                'The difference between the average price for the growing method and your price.'
              "
            />
          </td>
        </tr>
        <tr v-for="(item, index) in pricingData" :key="index">
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ item.name }}</td>
          <td class="text-center">
            {{ item.price ? formatCurrency(item.price) : item.price }}
          </td>
          <td class="text-center">
            {{ item.average ? formatCurrency(item.average) : '' }}
          </td>
          <td
            class="text-center"
            :class="item.price - item.average > 0 ? 'green' : 'red'"
          >
            {{ item.average ? formatCurrency(item.price - item.average) : '' }}
          </td>
        </tr>
      </table>
      <ProgressSpinner v-else />
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref( true )
const pricingData = ref( null )

async function getGrowingMethodAverage ( start, category ) {
  // set endDate as the start date plus 7 days
  const endDate = new Date( start )
  endDate.setDate( endDate.getDate() + 7 )
  const data = await supabase.rpc( 'get_average_prices_by_growing_method', {
    start_date: start,
    end_date: endDate,
    growing_method_name: category
  } )
  return data?.data
}

// function that lets the user download a csv file of the pricing data
function downloadCSV () {
  const items = pricingData.value
  const replacer = ( key, value ) => ( value === null ? '' : value )
  const header = Object.keys( items[ 0 ] )
  let csv = items.map( row =>
    header
      .map( fieldName => JSON.stringify( row[ fieldName ], replacer ) )
      .join( ',' )
  )
  csv.unshift( header.join( ',' ) )
  csv = csv.join( '\r\n' )
  const blob = new Blob( [ csv ], { type: 'text/csv' } )
  const url = window.URL.createObjectURL( blob )
  const a = document.createElement( 'a' )
  a.setAttribute( 'href', url )
  a.setAttribute( 'download', 'pricing_history.csv' )
  a.click()
}

onMounted( async () => {
  // get the pricing history data for the logged in user
  let { data } = await supabase
    .from( 'pricing' )
    .select( '*' )
    .eq( 'user_id', user.value.id )
    .order( 'created_at', { ascending: false } )
  if ( data ) {
    pricingData.value = data
    // for each item in pricingData, get the average price for the growing method
    for ( let i = 0; i < pricingData.value.length; i++ ) {
      pricingData.value[ i ].average = await getGrowingMethodAverage(
        pricingData.value[ i ].created_at,
        pricingData.value[ i ].growing_method
      )
    }
  }
  loading.value = false
} )
</script>

<style lang="scss" scoped>
.history-table {
  // enable horizontal scrolling
  overflow-x: auto;
  table {
    min-width: 700px;
  }
}
</style>