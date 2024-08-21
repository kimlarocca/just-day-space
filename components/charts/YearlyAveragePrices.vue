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
    <div class="text-center">
      <InlineMessage severity="info">
        This chart shows the data for the last 12 months (not including the
        current month).
      </InlineMessage>
    </div>
  </div>
</template>

<script setup>
const categories = ref( [] )
const hybrid = ref( [] )
const hybridIndica = ref( [] )
const hybridSativa = ref( [] )
const indica = ref( [] )
const key = ref( 0 )
const loading = ref( true )
const sativa = ref( [] )
const supabase = useSupabaseClient()

async function getPrices () {
  const { data } = await supabase
    .from( 'historical_averages' )
    .select( '*' )
    .order( 'id', { ascending: false } )
    .limit( 13 )
  if ( data ) {
    // reverse the array so the chart shows the oldest data first
    data.reverse()
    data.forEach(
      ( item ) => {
        categories.value.push( item.description )
        hybridIndica.value.push( item.hybrid_indica )
        hybridSativa.value.push( item.hybrid_sativa )
        hybrid.value.push( item.hybrid )
        indica.value.push( item.indica )
        sativa.value.push( item.sativa )
      }
    )
  }
  key.value++
}

onMounted( async () => {
  await getPrices()
  loading.value = false
} )
</script>
