<template>
  <div class="strain-dashboard">
    <ProgressSpinner v-if="loading" />
    <template v-else-if="strainData">
      <Html lang="en">
        <Head>
          <Title>
            Cuetip Benchmark | Strain Dashboard | {{ strainData.name }}
          </Title>
        </Head>
      </Html>
      <div class="flex align-items-center justify-content-between mb-5">
        <h2>
          {{ strainData.name }}
          <i
            class="pi pi-info-circle cursor-pointer"
            v-tooltip.right="'This dashboard shows data for ALL cuetip users'"
          />
        </h2>
        <cannabis-search-bar @item-selected="updateData($event)" />
      </div>
      <div class="mb-3">
        <div
          class="tag small inline-block blue cursor-pointer"
          @click="fetchPricingData('')"
          :class="growingMethod === '' ? 'active' : ''"
        >
          All
        </div>
        <div
          class="ml-2 tag small inline-block blue cursor-pointer"
          @click="fetchPricingData('Outdoor')"
          :class="growingMethod === 'Outdoor' ? 'active' : ''"
        >
          Outdoor
        </div>
        <div
          class="ml-2 tag small inline-block blue cursor-pointer"
          @click="fetchPricingData('Indoor')"
          :class="growingMethod === 'Indoor' ? 'active' : ''"
        >
          Indoor
        </div>
        <div
          class="ml-2 tag small inline-block blue cursor-pointer"
          @click="fetchPricingData('Greenhouse')"
          :class="growingMethod === 'Greenhouse' ? 'active' : ''"
        >
          Greenhouse
        </div>
      </div>
      <div class="grid">
        <div class="col col-12 lg:col-3">
          <div
            class="container-white border p-4 flex justify-content-center align-items-center h-full"
          >
            <div class="text-center">
              <img
                v-if="strainData.image_url"
                :src="strainData.image_url"
                :alt="strainData.name"
              />
              <icons-cannabis-leaf
                v-else
                :class="
                  strainData.category.includes('Sativa') ? 'green' : 'blue'
                "
              />
              <h4>{{ strainData.name }} ({{ strainData.category }})</h4>
              <p v-if="strainData.subtitle">{{ strainData.subtitle }}</p>
            </div>
          </div>
        </div>
        <div class="col col-12 lg:col-5 mb-5">
          <div class="container-white border p-4 pb-2 h-full">
            <charts-bar-chart
              v-if="
                pricingData?.length > 0 &&
                pricePerformanceCategories &&
                pricePerformanceValues
              "
              :keys="pricePerformanceCategories"
              :values="pricePerformanceValues"
              :horizontal="false"
              :max="pricePerformanceMax"
              :key="key"
              title="Price Performance"
            />
            <template v-else>
              <h4 class="text-center mb-2">Price Performance</h4>
              <p class="text-center red">
                Pricing data for this strain is coming soon!
              </p>
            </template>
          </div>
        </div>
        <div class="col col-12 lg:col-4 mb-5">
          <div class="container-white border p-4 pb-2 h-full">
            <h4 v-if="growingMethod" class="text-center">
              {{ growingMethod }} Submissions
            </h4>
            <h4 v-else class="text-center">Submissions</h4>
            <charts-pie-chart
              v-if="pricingData?.length > 0 && growingMethodData"
              title="by Growing Method"
              type="donut"
              :keys="Object.keys(growingMethodData)"
              :values="Object.values(growingMethodData)"
            />
            <template v-else>
              <h4 class="text-center mb-2">by Growing Method</h4>
              <p class="text-center red">
                Pricing data for this strain is coming soon!
              </p>
            </template>
          </div>
        </div>
      </div>
      <charts-yearly-average-strain-prices
        v-if="pricingData?.length > 0"
        :strain-id="parseInt(strainId)"
        :growing-method="growingMethod === '' ? 'All' : growingMethod"
      />
      <div v-else class="container-white border p-4 pb-2 h-full">
        <h4 class="text-center mb-2">Yearly Average Prices</h4>
        <p class="text-center red mb-4">
          Pricing data for this strain is coming soon!
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const growingMethod = ref( '' )
const key = ref( 0 )
const loading = ref( true )
const pricingData = ref( null )
const pricePerformanceCategories = ref( [
  'Outdoor',
  'Indoor',
  'Greenhouse',
] )

const route = useRouter().currentRoute.value
const strainId = ref( route.params.id )
const strainData = ref( null )
const supabase = useSupabaseClient()

// get the strain data
const fetchStrainData = async () => {
  const { data, error } = await supabase
    .from( 'strains' )
    .select( '*' )
    .eq( 'id', strainId.value )
    .single()

  if ( error ) {
    console.error( error )
  } else {
    strainData.value = data
  }
}

// get the pricing data for this strain
const fetchPricingData = async ( method ) => {
  loading.value = true
  growingMethod.value = method ? method : ''
  const { data } = await supabase
    .from( 'pricing' )
    .select( '*' )
    .eq( 'strain_id', strainId.value )
    .ilike( 'growing_method', `%${ growingMethod.value }%` )
  if ( data ) {
    pricingData.value = data
  }
  loading.value = false
}

const growingMethodData = computed( () => {
  if ( pricingData.value && pricingData.value.length > 0 ) {
    // loop through pricingData and count the number of each growing method
    const growingMethodData = {}
    pricingData.value.forEach( ( item ) => {
      if ( growingMethodData[ item.growing_method ] ) {
        growingMethodData[ item.growing_method ]++
      } else {
        growingMethodData[ item.growing_method ] = 1
      }
    } )
    return growingMethodData
  }
  else {
    return null
  }
} )

const pricePerformanceValues = computed( () => {
  const array = []
  const outdoor = []
  const indoor = []
  const greenhouse = []
  if ( pricingData.value && pricingData.value.length > 0 ) {
    // loop through pricingData and average in the price for each growing method
    pricingData.value.forEach( ( item ) => {
      if ( item.growing_method === 'Outdoor' ) {
        outdoor.push( item.price )
      }
      if ( item.growing_method === 'Indoor' ) {
        indoor.push( item.price )
      }
      if ( item.growing_method === 'Greenhouse' ) {
        greenhouse.push( item.price )
      }
    } )
  }
  // push the average of the outdoor array to the array
  array.push( parseInt( outdoor.reduce( ( a, b ) => a + b, 0 ) / outdoor.length ) )
  // push the average of the indoor array to the array
  array.push( parseInt( indoor.reduce( ( a, b ) => a + b, 0 ) / indoor.length ) )
  // push the average of the greenhouse array to the array
  array.push( parseInt( greenhouse.reduce( ( a, b ) => a + b, 0 ) / greenhouse.length ) )
  return array
} )

// computed property to get the max of the pricePerformanceValues
const pricePerformanceMax = computed( () => {
  if ( pricePerformanceValues.value ) {
    return Math.max( ...pricePerformanceValues.value )
  }
  return 0
} )

// function that initializes the data
const updateData = async ( newStrainId ) => {
  strainId.value = newStrainId
  fetchStrainData()
  fetchPricingData()
}

onMounted( () => {
  fetchStrainData()
  fetchPricingData()
  loading.value = false
} )
</script>

<style lang="scss">
.strain-dashboard img,
.strain-dashboard .cannabis-leaf {
  width: 100%;
  height: auto;
  max-width: 200px;
}
</style>