<template>
  <div class="state-search-bar w-full sm:w-auto">
    <Dropdown
      aria-label="search states by name"
      v-model="stateName"
      :options="stateSuggestions"
      placeholder="Search States"
      optionLabel="state"
      optionValue="state"
      @change="updateStateName(stateName)"
      style="width: 170px"
      class="w-full sm:w-auto"
    />
  </div>
</template>

<script setup>
const emit = defineEmits( [ 'itemSelected' ] )
const stateName = ref( '' )
const stateSuggestions = ref( null )
const supabase = useSupabaseClient()

// get state names for the dropdown menu
const { data: stateData } = await supabase.rpc( 'get_states' )
if ( stateData ) {
  stateSuggestions.value = stateData
} else {
  console.log( 'stateData error', stateData )
}

// navigate to the selected strain dashboard and emit the strain id
const updateStateName = ( stateName ) => {
  emit( 'itemSelected', stateName )
  return navigateTo( `/states/${ stateName }` )
}
</script>