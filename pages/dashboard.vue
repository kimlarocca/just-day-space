<template>
  <div class="dashboard" v-if="currentUserProfile">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Cannabis Dashboard</Title>
      </Head>
    </Html>
    <h2 v-if="!hasOnboarded" class="mb-4">Let's Get Started!</h2>
    <new-user-onboarding v-if="!hasOnboarded" />
    <template v-else>
      <div
        class="flex flex-column lg:flex-row align-items-center justify-content-between mb-4"
      >
        <h2 class="mb-4 lg:mr-4 lg:mb-0">
          Cannabis Dashboard
          <i
            class="pi pi-info-circle cursor-pointer"
            v-tooltip.right="'This dashboard shows data for ALL cuetip users'"
          />
        </h2>
        <div
          class="flex flex-column sm:flex-row align-items-center w-full sm:w-auto"
        >
          <state-search-bar class="mb-3 sm:mr-3 sm:mb-0" />
          <cannabis-search-bar class="sm:mb-0 w-full sm:w-auto" />
        </div>
      </div>
      <ProgressSpinner v-if="loading" />
      <template v-else>
        <this-week-vs-last-week />
        <Divider class="mb-6 mt-2" />
        <div class="container-white md:p-5 mb-5">
          <div class="flex align-items-center mb-3">
            <p class="mr-2 hidden md:block">Filter Charts:</p>
            <Dropdown
              v-if="timeFrame && timeFrameOptions"
              v-model="timeFrame"
              :options="timeFrameOptions"
              @change="updateCharts"
              aria-label="time frame select menu"
              placeholder="Time Frame"
              class="w-fit"
            />
            <div v-if="timeFrame === 'This Week'" class="ml-2 tag large">
              {{ thisWeekFormattedDateRange }}
            </div>
            <div v-if="timeFrame === 'This Month'" class="ml-2 tag large">
              {{ thisMonthFormattedDateRange }}
            </div>
            <div v-if="timeFrame === 'This Year'" class="ml-2 tag large">
              {{ thisYearFormattedDateRange }}
            </div>
            <div v-if="timeFrame === 'All Time'" class="ml-2 tag large">
              All Data Through {{ today.toLocaleDateString() }}
            </div>
          </div>
          <charts-price-performance
            v-if="timeFrame"
            :keys="pricePerformanceCategories"
            :values="pricePerformanceValues"
            :horizontal="false"
            :time-frame="timeFrame"
            :key="key"
            class="mb-5"
          />
          <charts-respondent-percentages
            v-if="timeFrame"
            :time-frame="timeFrame"
            :key="key"
          />
        </div>
        <Divider class="my-6" />
        <charts-yearly-average-prices
          v-if="timeFrame"
          :time-frame="timeFrame"
          :key="key"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const benchmarkData = ref( null )
const currentUserProfile = useCurrentUserProfile()
const key = ref( 0 )
const loading = ref( true )
const supabase = useSupabaseClient()

const pricePerformanceCategories = ref( [
  'Sativa',
  'Indica',
  'Hybrid',
] )

const pricePerformanceValues = computed( () => {
  let outdoorData = [ 0, 0, 0, 0 ]
  if ( benchmarkData.value && benchmarkData.value.length > 3 ) {
    outdoorData = [ benchmarkData.value[ 0 ].outdoor_average, benchmarkData.value[ 1 ].outdoor_average, benchmarkData.value[ 2 ].outdoor_average ]
  }
  let indoorData = [ 0, 0, 0, 0 ]
  if ( benchmarkData.value && benchmarkData.value.length > 3 ) {
    indoorData = [ benchmarkData.value[ 0 ].indoor_average, benchmarkData.value[ 1 ].indoor_average, benchmarkData.value[ 2 ].indoor_average ]
  }
  let greenhouseData = [ 0, 0, 0, 0 ]
  if ( benchmarkData.value && benchmarkData.value.length > 3 ) {
    greenhouseData = [ benchmarkData.value[ 0 ].greenhouse_average, benchmarkData.value[ 1 ].greenhouse_average, benchmarkData.value[ 2 ].greenhouse_average ]
  }
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

const today = new Date()
const lastWeek = new Date( today.getFullYear(), today.getMonth(), today.getDate() - 7 )
const lastMonth = new Date( today.getFullYear(), today.getMonth() - 1, today.getDate() )
const lastYear = new Date( today.getFullYear() - 1, today.getMonth(), today.getDate() )
const thisWeekFormattedDateRange = `${ lastWeek.toLocaleDateString() } - ${ today.toLocaleDateString() }`
const thisMonthFormattedDateRange = `${ lastMonth.toLocaleDateString() } - ${ today.toLocaleDateString() }`
const thisYearFormattedDateRange = `${ lastYear.toLocaleDateString() } - ${ today.toLocaleDateString() }`

const timeFrame = ref( 'This Week' )
const timeFrameOptions = ref( [
  'This Week',
  'This Month',
  'This Year',
  'All Time',
] )

const hasOnboarded = computed( () => {
  return (
    currentUserProfile.value?.onboarded === true
  )
} )

// get the benchmark data from the database
const fetchBenchmarkData = async () => {
  loading.value = true
  let ids = 'id.eq.1, id.eq.2, id.eq.3, id.eq.4, id.eq.5'
  if ( timeFrame.value === 'This Month' ) {
    ids = 'id.eq.6, id.eq.7, id.eq.8, id.eq.9, id.eq.10'
  }
  if ( timeFrame.value === 'This Week' ) {
    ids = 'id.eq.11, id.eq.12, id.eq.13, id.eq.14, id.eq.15'
  }
  if ( timeFrame.value === 'All Time' ) {
    ids = 'id.eq.18, id.eq.19, id.eq.20, id.eq.21, id.eq.22'
  }
  const { data } = await supabase
    .from( 'benchmarks' )
    .select( '*' )
    .or( ids )
  if ( data ) {
    benchmarkData.value = data
  }
  loading.value = false
}

const updateCharts = () => {
  fetchBenchmarkData()
  key.value++
}

onMounted( () => {
  fetchBenchmarkData()
} )

loading.value = false
</script>
