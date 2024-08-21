<template>
  <div class="manage-user-locations">
    <Button
      v-if="!showAddLocationSection"
      label="Add New Project"
      icon="pi pi-plus"
      class="p-button-outlined cursor-pointer mb-4 w-full md:w-fit"
      @click="showAddLocationSection = true"
    />
    <transition name="slide-fade" mode="out-in">
      <div v-if="showAddLocationSection" class="mb-4">
        <Message
          severity="error"
          :closable="false"
          class="mb-4"
          v-if="locations && locations.length === 0"
        >
          Please add at least 1 project to your profile!
        </Message>
        <form @submit.prevent="addLocation()">
          <p v-if="locationNameInvalid" class="small red mb-2">
            Please enter a project name:
          </p>
          <div class="mb-4">
            <span class="p-float-label inline">
              <InputText
                id="full_name"
                v-model="locationName"
                :class="locationNameInvalid ? 'p-invalid' : ''"
              />
              <label for="full_name">Project Name</label>
            </span>
          </div>
          <p v-if="zipCodeInvalid" class="small red mb-2">
            Please search for a zip code:
          </p>
          <div class="mb-4">
            <span class="p-float-label inline">
              <AutoComplete
                id="zip_code"
                v-model="zipCode"
                :suggestions="addressSuggestions"
                @complete="fetchSuggestions"
                optionLabel="name"
                :optionValue="zipCode"
                :class="zipCodeInvalid ? 'p-invalid' : ''"
              />
              <label for="zip_code">Zip Code</label>
            </span>
          </div>
          <p v-if="growingMethodsInvalid" class="small red mb-2">
            Please select at least one growing method:
          </p>
          <div class="flex flex-column lg:flex-row lg:align-items-center">
            <p class="mb-3 lg:mb-0 lg:mr-3 inline text-sm">Growing Method:</p>
            <div class="mb-3 lg:mb-0 lg:mr-3 inline">
              <Checkbox
                id="growing_indoor"
                v-model="growingIndoor"
                :binary="true"
                class="mr-2"
              />
              <label for="growing_indoor">Indoor</label>
            </div>
            <div class="mb-3 lg:mb-0 lg:mr-3 inline">
              <Checkbox
                id="growing_outdoor"
                v-model="growingOutdoor"
                :binary="true"
                class="mr-2"
              />
              <label for="growing_outdoor">Outdoor</label>
            </div>
            <div class="mb-3 lg:mb-0 lg:mr-3 inline">
              <Checkbox
                id="growing_greenhouse"
                v-model="growingGreenhouse"
                :binary="true"
                class="mr-2"
              />
              <label for="growing_greenhouse">Greenhouse</label>
            </div>
          </div>
          <div class="my-4">
            <p v-if="squareFootageInvalid" class="small red mb-2">
              Please enter the square footage for this project:
            </p>
            <span class="p-float-label inline">
              <InputNumber
                id="square_footage"
                v-model="squareFootage"
                :class="squareFootageInvalid ? 'p-invalid' : ''"
                min="1"
              />
              <label for="square_footage">Square Footage</label>
            </span>
          </div>
          <p v-if="totalInventoryInvalid" class="small red mb-2">
            Please select a total inventory for this project:
          </p>
          <div class="mb-4">
            <span class="p-float-label inline">
              <Dropdown
                v-model="totalInventoryChoice"
                :options="totalInventory"
                id="total_inventory"
                optionLabel="amount"
                optionValue="amount"
                :class="totalInventoryInvalid ? 'p-invalid' : ''"
              />
              <label for="total_inventory">Total Inventory</label>
            </span>
          </div>
          <Button
            label="Save Project"
            class="cursor-pointer mb-3 md:mb-0 mr-3 w-full md:w-fit"
            type="submit"
          />
          <Button
            label="Cancel"
            @click="showAddLocationSection = false"
            class="p-button-outlined fit-width w-full md:w-fit"
          />
        </form>
      </div>
    </transition>
    <Message
      v-if="successMessage"
      class="mb-4"
      severity="success"
      :closable="false"
      :sticky="false"
    >
      Success! Your project has been added.
    </Message>
    <div v-if="locations" class="strains-table">
      <div v-for="(location, index) in locations" :key="index" class="location">
        <div class="flex align-items-center justify-content-between w-full">
          <h5>
            <span class="tag mr-2">{{ location.zip_code }}</span>
            {{ location.location_name }}
          </h5>
          <Button
            icon="pi pi-trash"
            aria-label="delete strain"
            class="ml-2 p-button-rounded"
            v-tooltip.left="`Delete this location`"
            @click="locationToDelete = location"
          />
        </div>
      </div>
    </div>
    <Dialog v-model:visible="locationToDelete" modal class="text-center">
      <icons-large-x class="mb-2" />
      <h2 class="mb-2">Delete Project</h2>
      <p class="mb-4">
        Are you sure you want to delete the project
        <strong>
          {{ locationToDelete?.location_name }} ({{
            locationToDelete?.zip_code
          }})
        </strong>
        from your list?
      </p>
      <Button
        class="p-button-outlined fit-width mr-3"
        @click="locationToDelete = null"
        label="No, Keep It"
      />
      <Button
        class="p-button-danger fit-width"
        @click="deleteLocation(locationToDelete)"
        label="Yes, Delete"
      />
    </Dialog>
  </div>
</template>

<script setup>
const emit = defineEmits( [ 'locationAdded', 'locationsFound' ] )
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const addressSuggestions = ref( [] )
const growingIndoor = ref( false )
const growingOutdoor = ref( false )
const growingGreenhouse = ref( false )
const locationName = ref( null )
const locations = ref( [] )
const locationToDelete = ref( null )
const showAddLocationSection = ref( false )
const squareFootage = ref( null )
const successMessage = ref( false )
const totalInventory = ref( [
  { amount: '1-10' },
  { amount: '11-25' },
  { amount: '26-50' },
  { amount: '51-75' },
  { amount: '76-100' },
  { amount: '100+' },
  { amount: '200+' },
  { amount: '300+' },
  { amount: '400+' },
  { amount: '500+' },
  { amount: '600+' },
  { amount: '700+' },
  { amount: '800+' },
  { amount: '900+' },
  { amount: '1000+' },
] )
const totalInventoryChoice = ref( null )
const zipCode = ref( null )

// invalid form fields
const growingMethodsInvalid = ref( false )
const locationNameInvalid = ref( false )
const squareFootageInvalid = ref( false )
const totalInventoryInvalid = ref( false )
const zipCodeInvalid = ref( false )

// get locations from the user_locations table for this user
const getLocations = async () => {
  const { data: locationsData } = await supabase
    .from( 'user_locations' )
    .select( '*' )
    .eq( 'user_id', user.value?.id )
    .order( 'location_name' )
  if ( locationsData ) {
    locations.value = locationsData
    if ( locationsData.length === 0 ) {
      showAddLocationSection.value = true
    } else {
      emit( 'locationsFound', true )
    }
  } else {
    console.log( 'getLocations error', locationsData )
  }
}

// fetch suggestions from the regions database
const fetchSuggestions = async () => {
  const { data: locationData } = await supabase
    .from( 'regions' )
    .select( '*' )
    .ilike( 'zip_code', `${ zipCode.value }%` )
    .order( 'zip_code' )
    .limit( 20 )
  if ( locationData ) {
    addressSuggestions.value = locationData.map( ( location ) => {
      return {
        zip_code: location.zip_code,
        city: location.city,
        state: location.state,
        county: location.county,
        region: location.region,
        name: `${ location.city }, ${ location.state } ${ location.zip_code }`,
      }
    } )
  } else {
    console.log( 'fetchSuggestions error', locationData )
  }
}

// add location to the user_locations table
const addLocation = async () => {
  // set all invalid fields to false
  locationNameInvalid.value = false
  zipCodeInvalid.value = false
  growingMethodsInvalid.value = false
  squareFootageInvalid.value = false
  totalInventoryInvalid.value = false

  // validate form
  if ( !locationName.value ) {
    locationNameInvalid.value = true
    return
  }
  if ( !zipCode.value?.zip_code ) {
    zipCodeInvalid.value = true
    return
  }
  if (
    !growingOutdoor.value &&
    !growingIndoor.value &&
    !growingGreenhouse.value
  ) {
    growingMethodsInvalid.value = true
    return
  }
  if ( !squareFootage.value ) {
    squareFootageInvalid.value = true
    return
  }
  if ( !totalInventoryChoice.value ) {
    totalInventoryInvalid.value = true
    return
  }
  const { error } = await supabase.from( 'user_locations' ).insert( [
    {
      user_id: user.value?.id,
      location_name: locationName.value,
      zip_code: zipCode.value?.zip_code,
      city: zipCode.value?.city,
      state: zipCode.value?.state,
      county: zipCode.value?.county,
      region: zipCode.value?.region,
      growing_indoor: growingIndoor.value,
      growing_outdoor: growingOutdoor.value,
      growing_greenhouse: growingGreenhouse.value,
      square_footage: squareFootage.value,
      total_inventory: totalInventoryChoice.value,
    },
  ] )
  if ( error ) {
    console.log( error )
  } else {
    successMessage.value = true
    showAddLocationSection.value = false
    locationName.value = null
    zipCode.value = null
    growingIndoor.value = false
    growingOutdoor.value = false
    growingGreenhouse.value = false
    squareFootage.value = null
    totalInventoryChoice.value = null
    getLocations()
    emit( 'locationAdded', true )
  }
}

// delete location from the user_locations table
const deleteLocation = async () => {
  const { error } = await supabase
    .from( 'user_locations' )
    .delete()
    .eq( 'id', locationToDelete.value?.id )
  if ( error ) {
    console.log( error )
  } else {
    getLocations()
    locationToDelete.value = null
  }
}

onMounted( async () => {
  await getLocations()
} )
</script>

<style lang="scss" scoped>
.location {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--light-green);
  &:first-child {
    border-top: 1px solid var(--light-green);
  }
}
</style>
