<template>
  <div>
    <AutoComplete
      aria-label="search strains by name"
      v-model="strainName"
      placeholder="Search Strains"
      :suggestions="strainSuggestions"
      @complete="fetchSuggestions"
      @item-select="updateStrainId(strainName.id)"
      optionLabel="display_name"
      style="width: 170px"
      class="w-full sm:w-auto"
    />
  </div>
</template>

<script setup>
const emit = defineEmits( [ 'itemSelected' ] )
const strainName = ref( '' )
const strainSuggestions = ref( null )
const supabase = useSupabaseClient()

// fetch strain suggestions from supabase
const fetchSuggestions = async () => {
  const { data } = await supabase
    .from( 'strains' )
    .select()
    .ilike( 'name', `%${ strainName.value }%` )
    .limit( 50 )
  if ( data ) {
    strainSuggestions.value = data
    strainSuggestions.value = data.map( ( strain ) => {
      return {
        name: strain.name ?? '',
        id: strain.id,
        subtitle: strain.subtitle,
        category: strain.category,
        image_url: strain.image_url,
        display_name: `${ strain.name } (${ strain.category })`,
      }
    } )
  }
}

// navigate to the selected strain dashboard and emit the strain id
const updateStrainId = ( strainId ) => {
  emit( 'itemSelected', strainId )
  return navigateTo( `/strains/${ strainId }` )
}
</script>