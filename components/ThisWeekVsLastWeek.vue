<template>
  <div
    class="flex flex-column md:flex-row align-items-center mt-6 lg:mt-0 mb-4"
  >
    <h4 class="mb-2 lg:mb-0">This Week vs. Last Week</h4>
    <div class="mb-2 lg:mb-0">
      <div
        class="md:ml-3 tag small inline-block blue cursor-pointer"
        @click="growingMethod = 'All'"
        :class="growingMethod === 'All' ? 'active' : ''"
      >
        All
      </div>
      <div
        class="ml-2 tag small inline-block blue cursor-pointer"
        @click="growingMethod = 'Outdoor'"
        :class="growingMethod === 'Outdoor' ? 'active' : ''"
      >
        Outdoor
      </div>
      <div
        class="ml-2 tag small inline-block blue cursor-pointer"
        @click="growingMethod = 'Indoor'"
        :class="growingMethod === 'Indoor' ? 'active' : ''"
      >
        Indoor
      </div>
      <div
        class="ml-2 tag small inline-block blue cursor-pointer"
        @click="growingMethod = 'Greenhouse'"
        :class="growingMethod === 'Greenhouse' ? 'active' : ''"
      >
        Greenhouse
      </div>
    </div>
  </div>
  <template v-if="averageBenchmarkData?.length > 1">
    <div class="this-week-vs-last-week grid">
      <div class="col col-6 xl:col-3 mb-5">
        <div class="container-green-gradient text-center p-4 h-full">
          <icons-cannabis-leaf class="dark-green" />
          <p class="like-h4 mb-2">This Week's Price</p>
          <p class="like-h1 mb-1">${{ pricingData.thisWeekPrice }}</p>
        </div>
      </div>
      <div class="col col-6 xl:col-3 mb-5">
        <div class="container-green-gradient text-center p-4 h-full">
          <icons-cannabis-leaf class="dark-green" />
          <p class="like-h4 mb-2">Last Week's Price</p>
          <p class="like-h1 mb-1">${{ pricingData.lastWeekPrice }}</p>
        </div>
      </div>
      <div class="col col-6 xl:col-3 mb-5">
        <div class="container-green-gradient text-center p-4 h-full">
          <icons-cannabis-leaf class="dark-green" />
          <p class="like-h4 mb-2">Change In Price</p>
          <p
            class="like-h1 mb-1"
            :class="pricingData.changeInPrice > 0 ? 'red' : 'neon-green'"
          >
            <i
              v-if="pricingData.changeInPrice > 0"
              class="pi pi-arrow-down text-xl"
            />
            <i v-else class="pi pi-arrow-up text-xl" />
            ${{ Math.abs(pricingData.changeInPrice) }}
          </p>
        </div>
      </div>
      <div class="col col-6 xl:col-3 mb-5">
        <div class="container-green-gradient text-center p-4 h-full">
          <icons-cannabis-leaf class="dark-green" />
          <p class="like-h4 mb-2">% Change In Price</p>
          <p
            class="like-h1 mb-1"
            :class="pricingData.changeInPrice > 0 ? 'red' : 'neon-green'"
          >
            <i
              v-if="pricingData.changeInPrice > 0"
              class="pi pi-arrow-down text-xl"
            />
            <i v-else class="pi pi-arrow-up text-xl" />
            <span
              v-if="pricingData.thisWeekPrice === pricingData.lastWeekPrice"
            >
              0%
            </span>
            <span v-else-if="pricingData.percentChangeInPrice === 0">
              100%
            </span>
            <span
              v-else-if="
                pricingData.thisWeekPrice === 0 ||
                pricingData.lastWeekPrice === 0
              "
            >
              100%
            </span>
            <span v-else> {{ pricingData.percentChangeInPrice }}% </span>
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
const averageBenchmarkData = ref( null )
const growingMethod = ref( 'All' )
const loading = ref( true )
const supabase = useSupabaseClient()

// get this week and last week average benchmark data from the database
const { data } = await supabase
  .from( 'benchmarks' )
  .select( '*' )
  .or( 'id.eq.16, id.eq.17' )
if ( data ) {
  averageBenchmarkData.value = data
}

const pricingData = computed( () => {
  let thisWeekPrice = averageBenchmarkData.value[ 0 ].all_average
  let lastWeekPrice = averageBenchmarkData.value[ 1 ].all_average
  let changeInPrice = lastWeekPrice - thisWeekPrice
  let percentChangeInPrice = Math.abs(
    ( ( lastWeekPrice - thisWeekPrice ) / thisWeekPrice ) * 100
  ).toFixed( 0 )
  if ( growingMethod.value === 'Indoor' ) {
    thisWeekPrice = averageBenchmarkData.value[ 0 ].indoor_average
    lastWeekPrice = averageBenchmarkData.value[ 1 ].indoor_average
    changeInPrice = thisWeekPrice - lastWeekPrice
    percentChangeInPrice = Math.abs(
      ( ( lastWeekPrice - thisWeekPrice ) / thisWeekPrice ) * 100
    ).toFixed( 0 )
  } else if ( growingMethod.value === 'Outdoor' ) {
    thisWeekPrice = averageBenchmarkData.value[ 0 ].outdoor_average
    lastWeekPrice = averageBenchmarkData.value[ 1 ].outdoor_average
    changeInPrice = thisWeekPrice - lastWeekPrice
    percentChangeInPrice = Math.abs(
      ( ( lastWeekPrice - thisWeekPrice ) / thisWeekPrice ) * 100
    ).toFixed( 0 )
  } else if ( growingMethod.value === 'Greenhouse' ) {
    thisWeekPrice = averageBenchmarkData.value[ 0 ].greenhouse_average
    lastWeekPrice = averageBenchmarkData.value[ 1 ].greenhouse_average
    changeInPrice = thisWeekPrice - lastWeekPrice
    percentChangeInPrice = Math.abs(
      ( ( lastWeekPrice - thisWeekPrice ) / thisWeekPrice ) * 100
    ).toFixed( 0 )
  }
  return {
    thisWeekPrice,
    lastWeekPrice,
    changeInPrice,
    percentChangeInPrice
  }
} )

loading.value = false
</script>

<style lang="scss">
.this-week-vs-last-week {
  .container-green-gradient {
    position: relative;
    overflow: hidden;
  }
  .cannabis-leaf {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    z-index: 0;
  }
  .like-h1,
  .like-h4 {
    position: relative;
    z-index: 10;
    color: var(--white);
  }
}
</style>