<template>
  <div class="region-search-bar">
    <Dropdown
      aria-label="search regions by name"
      v-model="region"
      :placeholder="regionName"
      :options="regionSuggestionsFormatted"
      optionLabel="region"
      optionValue="region"
      @change="emit('regionSelected', region)"
      style="width: 200px"
    />
  </div>
</template>

<script setup>
const props = defineProps( {
  regionName: {
    type: String,
    default: '',
  },
  stateName: {
    type: String,
    default: '',
    required: true,
  },
} )

const emit = defineEmits( [ 'regionSelected' ] )
const region = ref( props.regionName )
const regionSuggestions = ref( null )
const supabase = useSupabaseClient()

// get state names for the dropdown menu
const { data: regionData } = await supabase.rpc( 'get_regions', {
  state_name: props.stateName
} )
if ( regionData ) {
  regionSuggestions.value = regionData
} else {
  console.log( 'regionData error', regionData )
}

// computed property that capitalizes the region names
const regionSuggestionsFormatted = computed( () => {
  if ( regionSuggestions.value ) {
    return regionSuggestions.value.map( ( region ) => {
      if ( region.region ) {
        return {
          // make the first letter of each word uppercase
          region: region.region.replace( /\w\S*/g, ( txt ) => {
            return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase()
          } ),
        }
      }
    } )
  } else {
    return []
  }
} )
</script>