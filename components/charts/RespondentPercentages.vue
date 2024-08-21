<template>
  <div class="respondent-percentages">
    <ProgressSpinner v-if="loading" />
    <div class="grid">
      <div class="col col-12 lg:col-6 mb-5">
        <div v-if="hasLineageData" class="container-white border p-4">
          <h4 class="text-center black">{{ timeFrame }}'s Submissions</h4>
          <charts-pie-chart
            title="by Lineage"
            type="donut"
            :keys="Object.keys(lineage)"
            :values="Object.values(lineage)"
          />
        </div>
        <div v-else class="container-white border p-4 pb-2 h-full">
          <h4 class="text-center mb-2">{{ timeFrame }}'s Submissions</h4>
          <h4 class="text-center mb-2">by Lineage</h4>
          <p class="text-center red mb-4">Data for this is coming soon.</p>
        </div>
      </div>
      <div class="col col-12 lg:col-6 md:mb-5">
        <div v-if="hasGrowingMethodData" class="container-white border p-4">
          <h4 class="text-center black">{{ timeFrame }}'s Submissions</h4>
          <charts-pie-chart
            title="by Growing Method"
            type="donut"
            :keys="Object.keys(growingMethod)"
            :values="Object.values(growingMethod)"
          />
        </div>
        <div v-else class="container-white border p-4 pb-2 h-full">
          <h4 class="text-center mb-2">{{ timeFrame }}'s Submissions</h4>
          <h4 class="text-center mb-2">by Growing Method</h4>
          <p class="text-center red mb-4">Data for this is coming soon.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref( true )
const respondentData = ref( null )
const supabase = useSupabaseClient()

const props = defineProps( {
  timeFrame: {
    type: String,
    default: 'This Week',
    required: true,
  },
} )

const title = computed( () => {
  if ( props.timeFrame ) {
    if ( props.timeFrame === 'All Time' ) return `${ props.timeFrame } Submissions`
    return `${ props.timeFrame }'s Submissions`
  }
  else {
    return 'Submissions'
  }
} )

// get the respondent percentages from the database
const fetchRespondentData = async () => {
  if ( props.timeFrame === 'This Week' ) {
    let { data } = await supabase
      .from( 'respondent_percentages' )
      .select( '*' )
      .eq( 'id', 3 )
    if ( data ) {
      respondentData.value = data
    }
  }
  else if ( props.timeFrame === 'This Month' ) {
    let { data } = await supabase
      .from( 'respondent_percentages' )
      .select( '*' )
      .eq( 'id', 2 )
    if ( data ) {
      respondentData.value = data
    }
  } else { // Yearly
    let { data } = await supabase
      .from( 'respondent_percentages' )
      .select( '*' )
      .eq( 'id', 1 )
    if ( data ) {
      respondentData.value = data
    }
  }
}

const lineage = computed( () => {
  if ( respondentData.value && respondentData.value.length > 0 ) {
    return {
      Indica: respondentData.value[ 0 ].indica,
      Sativa: respondentData.value[ 0 ].sativa,
      Hybrid: respondentData.value[ 0 ].hybrid,
    }
  }
  else {
    return null
  }
} )

const growingMethod = computed( () => {
  if ( respondentData.value && respondentData.value.length > 0 ) {
    return {
      Outdoor: respondentData.value[ 0 ].outdoor,
      Indoor: respondentData.value[ 0 ].indoor,
      Greenhouse: respondentData.value[ 0 ].greenhouse
    }
  }
  else {
    return null
  }
} )

// computed property that returns true if any object in the lineage object has a value greater than 0
const hasLineageData = computed( () => {
  if ( lineage.value ) {
    return Object.values( lineage.value ).some( value => value > 0 )
  }
  else {
    return false
  }
} )

// computed property that returns true if any object in the growingMethod object has a value greater than 0
const hasGrowingMethodData = computed( () => {
  if ( growingMethod.value ) {
    return Object.values( growingMethod.value ).some( value => value > 0 )
  }
  else {
    return false
  }
} )

onMounted( () => {
  fetchRespondentData()
  loading.value = false
} )
</script>