<template>
  <div class="state-dashboard">
    <ProgressSpinner v-if="loading" />
    <template v-else>
      <Html lang="en">
        <Head>
          <Title>
            Cuetip Benchmark | State Dashboard | {{ stateName }}
            {{ regionName }}
          </Title>
        </Head>
      </Html>
      <div
        class="flex flex-column md:flex-row align-items-center justify-content-between mb-5"
      >
        <div v-if="regionName">
          <h2 class="mb-4 md:mb-0 capitalize">{{ regionName }} Dashboard</h2>
          <p
            @click="showAllRegions"
            class="green cursor-pointer text-center mb-4 md:text-left md:mb-0"
          >
            <i class="pi pi-angle-double-left text-xs" />
            back to {{ stateName }} dashboard
          </p>
        </div>
        <h2 v-else class="mb-4 md:mb-0">
          {{ stateName }} Dashboard
          <i
            class="pi pi-info-circle cursor-pointer"
            v-tooltip.right="'This dashboard shows data for ALL cuetip users'"
          />
        </h2>
        <div class="flex align-items-center">
          <p class="mr-2 ml-4 hidden md:block">Filter By Region:</p>
          <region-search-bar
            :state-name="stateName"
            :region-name="regionName"
            class="w-fit"
            @region-selected="updateData($event)"
          />
        </div>
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
        <div class="col col-12 mb-5">
          <charts-price-performance
            v-if="
              stateName &&
              pricingData?.length > 0 &&
              pricePerformanceCategories &&
              pricePerformanceValues
            "
            :keys="pricePerformanceCategories"
            :values="pricePerformanceValues"
            :horizontal="false"
            :max="pricePerformanceMax"
            :key="key"
            :time-frame="regionName ? regionName : stateName"
          />
          <div v-else class="container-white border p-4 pb-2 h-full">
            <h4 class="text-center mb-2">Price Performance</h4>
            <p class="text-center red">
              Pricing data for this state/region is coming soon!
            </p>
          </div>
        </div>
        <div class="col col-12 lg:col-6 mb-5">
          <div class="container-white border p-4 pb-2 h-full">
            <h4 v-if="growingMethod" class="text-center">
              {{ growingMethod }} Submissions
            </h4>
            <h4 v-else class="text-center">Submissions</h4>
            <charts-pie-chart
              v-if="pricingData?.length > 0 && lineage"
              title="by Lineage"
              type="donut"
              :keys="Object.keys(lineage)"
              :values="Object.values(lineage)"
            />
            <template v-else>
              <h4 class="text-center mb-2">by Lineage</h4>
              <p class="text-center red">
                Pricing data for this state/region is coming soon!
              </p>
            </template>
          </div>
        </div>
        <div class="col col-12 lg:col-6 mb-5">
          <div class="container-white border p-4 pb-2 h-full">
            <h4 class="text-center">Submissions</h4>
            <charts-pie-chart
              v-if="pricingData?.length > 0 && growingMethodData"
              title="by Growing Method"
              type="donut"
              :keys="Object.keys(growingMethodData)"
              :values="Object.values(growingMethodData)"
            />
            <template v-else>
              <h4 class="text-center mb-2">Submissions by Growing Method</h4>
              <p class="text-center red">
                Pricing data for this state/region is coming soon!
              </p>
            </template>
          </div>
        </div>
      </div>
      <charts-yearly-average-state-prices
        v-if="pricingData?.length > 0"
        :state-name="stateName"
        :growing-method="growingMethod === '' ? 'All' : growingMethod"
      />
      <div v-else class="container-white border p-4 pb-2 h-full">
        <h4 class="text-center mb-2">Yearly Average Prices</h4>
        <p class="text-center red mb-4">
          Pricing data for this state/region is coming soon!
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
  'Sativa',
  'Indica',
  'Hybrid',
  'Hybrid Sativa',
  'Hybrid Indica',
] )
const regionName = ref( '' )
const route = useRouter().currentRoute.value
const stateName = ref( route.params.id )
const supabase = useSupabaseClient()

// get the pricing data for this strain
const fetchPricingData = async ( method ) => {
  loading.value = true
  growingMethod.value = method ? method : ''
  if ( regionName.value ) {
    const { data } = await supabase
      .from( 'pricing' )
      .select( '*' )
      .eq( 'state', stateName.value )
      .ilike( 'region', `%${ regionName.value }%` )
      .ilike( 'growing_method', `%${ growingMethod.value }%` )
    if ( data ) {
      pricingData.value = data
    }
  } else {
    const { data } = await supabase
      .from( 'pricing' )
      .select( '*' )
      .eq( 'state', stateName.value )
      .ilike( 'growing_method', `%${ growingMethod.value }%` )
    if ( data ) {
      pricingData.value = data
    }
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

const lineage = computed( () => {
  if ( pricingData.value && pricingData.value.length > 0 ) {
    // loop through pricingData and count the number of each lineage
    const lineage = {}
    pricingData.value.forEach( ( item ) => {
      if ( lineage[ item.category ] ) {
        lineage[ item.category ]++
      } else {
        lineage[ item.category ] = 1
      }
    } )
    return lineage
  }
  else {
    return null
  }
} )

const pricePerformanceValues = computed( () => {
  const outdoorSativa = []
  const outdoorIndica = []
  const outdoorHybrid = []
  const outdoorHybridSativa = []
  const outdoorHybridIndica = []
  const indoorSativa = []
  const indoorIndica = []
  const indoorHybrid = []
  const indoorHybridSativa = []
  const indoorHybridIndica = []
  const greenhouseSativa = []
  const greenhouseIndica = []
  const greenhouseHybrid = []
  const greenhouseHybridSativa = []
  const greenhouseHybridIndica = []
  if ( pricingData.value && pricingData.value.length > 0 ) {
    // loop through pricingData and add the price for each lineage and growing method
    pricingData.value.forEach( ( item ) => {
      if ( item.category === 'Sativa' ) {
        if ( item.growing_method === 'Outdoor' ) {
          outdoorSativa.push( item.price )
        } else if ( item.growing_method === 'Indoor' ) {
          indoorSativa.push( item.price )
        } else if ( item.growing_method === 'Greenhouse' ) {
          greenhouseSativa.push( item.price )
        }
      } else if ( item.category === 'Indica' ) {
        if ( item.growing_method === 'Outdoor' ) {
          outdoorIndica.push( item.price )
        } else if ( item.growing_method === 'Indoor' ) {
          indoorIndica.push( item.price )
        } else if ( item.growing_method === 'Greenhouse' ) {
          greenhouseIndica.push( item.price )
        }
      } else if ( item.category === 'Hybrid' ) {
        if ( item.growing_method === 'Outdoor' ) {
          outdoorHybrid.push( item.price )
        } else if ( item.growing_method === 'Indoor' ) {
          indoorHybrid.push( item.price )
        } else if ( item.growing_method === 'Greenhouse' ) {
          greenhouseHybrid.push( item.price )
        }
      } else if ( item.category === 'Hybrid Sativa' ) {
        if ( item.growing_method === 'Outdoor' ) {
          outdoorHybridSativa.push( item.price )
        } else if ( item.growing_method === 'Indoor' ) {
          indoorHybridSativa.push( item.price )
        } else if ( item.growing_method === 'Greenhouse' ) {
          greenhouseHybridSativa.push( item.price )
        }
      } else if ( item.category === 'Hybrid Indica' ) {
        if ( item.growing_method === 'Outdoor' ) {
          outdoorHybridIndica.push( item.price )
        } else if ( item.growing_method === 'Indoor' ) {
          indoorHybridIndica.push( item.price )
        } else if ( item.growing_method === 'Greenhouse' ) {
          greenhouseHybridIndica.push( item.price )
        }
      }
    } )
  }
  // set outdoorData to the average of each lineage and growing method
  const outdoorData = [
    outdoorSativa.reduce( ( a, b ) => a + b, 0 ) / outdoorSativa.length,
    outdoorIndica.reduce( ( a, b ) => a + b, 0 ) / outdoorIndica.length,
    outdoorHybrid.reduce( ( a, b ) => a + b, 0 ) / outdoorHybrid.length,
    outdoorHybridSativa.reduce( ( a, b ) => a + b, 0 ) / outdoorHybridSativa.length,
    outdoorHybridIndica.reduce( ( a, b ) => a + b, 0 ) / outdoorHybridIndica.length,
  ]
  // set indoorData to the average of each lineage and growing method
  const indoorData = [
    indoorSativa.reduce( ( a, b ) => a + b, 0 ) / indoorSativa.length,
    indoorIndica.reduce( ( a, b ) => a + b, 0 ) / indoorIndica.length,
    indoorHybrid.reduce( ( a, b ) => a + b, 0 ) / indoorHybrid.length,
    indoorHybridSativa.reduce( ( a, b ) => a + b, 0 ) / indoorHybridSativa.length,
    indoorHybridIndica.reduce( ( a, b ) => a + b, 0 ) / indoorHybridIndica.length,
  ]
  // set greenhouseData to the average of each lineage and growing method
  const greenhouseData = [
    greenhouseSativa.reduce( ( a, b ) => a + b, 0 ) / greenhouseSativa.length,
    greenhouseIndica.reduce( ( a, b ) => a + b, 0 ) / greenhouseIndica.length,
    greenhouseHybrid.reduce( ( a, b ) => a + b, 0 ) / greenhouseHybrid.length,
    greenhouseHybridSativa.reduce( ( a, b ) => a + b, 0 ) / greenhouseHybridSativa.length,
    greenhouseHybridIndica.reduce( ( a, b ) => a + b, 0 ) / greenhouseHybridIndica.length,
  ]
  return [
    {
      name: 'Outdoor',
      data: outdoorData,
    },
    {
      name: 'Indoor',
      data: indoorData,
    },
    {
      name: 'Greenhouse',
      data: greenhouseData,
    },
  ]
} )

// computed property to get the max of the pricePerformanceValues
const pricePerformanceMax = computed( () => {
  if ( pricePerformanceValues.value ) {
    return Math.max( ...pricePerformanceValues.value )
  }
  return 0
} )

// function that initializes the data
const updateData = async ( newRegionName ) => {
  regionName.value = newRegionName
  fetchPricingData()
}

// function that resets the dashboard to show all regions
const showAllRegions = async () => {
  regionName.value = ''
  fetchPricingData()
}

onMounted( () => {
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