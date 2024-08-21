<template>
  <div class="hemp">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | My Hemp</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-4">
      <h2 class="mr-4">My Hemp</h2>
      <Button
        label="Add New Strain"
        :icon="showAddStrainSection ? 'pi pi-minus' : 'pi pi-plus'"
        class="p-button-outlined cursor-pointer fit-width"
        @click="showAddStrainSection = !showAddStrainSection"
      />
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="showAddStrainSection" class="container-white p-4 mb-4">
        <div class="mb-5">
          <div class="flex align-items-start justify-content-between">
            <h4 class="mb-4">Add a New Hemp Strain</h4>
            <i
              class="pi pi-times cursor-pointer text-xl"
              @click="closeAddStrainSection()"
            />
          </div>
          <p v-if="strainNameInvalid" class="small red mb-2">
            Please enter a hemp strain name:
          </p>
          <div class="mb-4">
            <span class="p-float-label inline">
              <InputText
                id="strain_name"
                v-model="strainName"
                :class="strainNameInvalid ? 'p-invalid' : ''"
              />
              <label for="strain_name">Name</label>
            </span>
          </div>
          <p v-if="strainCategoryInvalid" class="small red mb-2">
            Please select a lineage for this hemp strain:
          </p>
          <div class="mb-4">
            <span class="p-float-label inline">
              <Dropdown
                v-model="strainCategory"
                :options="strainCategories"
                id="category"
                :class="strainCategoryInvalid ? 'p-invalid' : ''"
              />
              <label for="category">Lineage</label>
            </span>
          </div>
          <div class="mb-3">
            <Message
              severity="error"
              :closable="false"
              class="mb-4"
              v-if="!userLocations"
            >
              Please
              <nuxt-link to="settings#locations">click here</nuxt-link> to add
              at least 1 project to your profile!
            </Message>
            <span class="p-float-label inline">
              <Dropdown
                v-model="selectedLocation"
                :options="userLocations"
                optionLabel="location_name"
                optionValue="id"
                id="location_id"
              />
              <label for="location_id">Select The Project</label>
            </span>
          </div>
          <div class="mb-3">
            <span class="p-float-label inline">
              <Dropdown
                v-model="growingMethod"
                :options="growingMethods"
                optionLabel="label"
                optionValue="value"
                id="growing_method"
                :class="growingMethodInvalid ? 'p-invalid' : ''"
              />
              <label for="growing_method">Select The Growing Method</label>
            </span>
          </div>
          <div class="mb-3">
            <span class="p-float-label inline">
              <Dropdown
                v-model="rating"
                :options="strainRatings"
                id="new_strain_category"
              />
              <label for="new_strain_category">
                Select The Rating For This Strain
              </label>
            </span>
          </div>
          <Button
            label="Add To Your Strains"
            icon="pi pi-plus"
            class="cursor-pointer mb-3"
            @click="addStrain"
          />
          <Message
            v-if="addStrainSuccess"
            :closable="false"
            :sticky="false"
            :life="5000"
            severity="success"
            class="mb-2"
          >
            Success! This strain has been added to your list of strains.
          </Message>
          <Message
            v-if="addStrainError"
            :closable="false"
            severity="error"
            class="mb-2"
          >
            Sorry, there was a problem adding this strain. Please try again!
          </Message>
        </div>
      </div>
    </transition>
    <ProgressSpinner v-if="loading" />
    <div v-if="sortedUserStrains" class="strains-table">
      <p v-if="sortedUserStrains.length === 0">
        You have not added any strains yet. Please click the button above to add
        a new strain!
      </p>
      <div
        v-for="(strain, index) in sortedUserStrains"
        :key="index"
        class="flex align-items-center justify-content-between mb-3 w-full"
      >
        <div class="container-white flex align-items-center w-full mb-3">
          <icons-cannabis-leaf
            class="mx-2 my-1"
            :class="strain.category.includes('Sativa') ? 'green' : 'blue'"
          />
          <div class="mr-3">
            <h5 class="mb-1">{{ strain.name }} ({{ strain.category }})</h5>
            <p class="mb-1">
              Project: {{ strain.user_locations.location_name }}
            </p>
            <div v-if="strain.rating" class="tag inline-block rating mr-2">
              {{ strain.rating }}
            </div>
            <div class="tag small inline-block" :class="strain.growing_method">
              {{ strain.growing_method }}
            </div>
          </div>
        </div>
        <Button
          icon="pi pi-trash"
          aria-label="delete strain"
          class="ml-3 p-button-rounded"
          @click="strainToDelete = strain"
        />
      </div>
    </div>
    <Dialog v-model:visible="strainToDelete" modal class="text-center">
      <icons-large-x class="mb-2" />
      <h2 class="mb-2">Delete Hemp Strain</h2>
      <p class="mb-4">
        Are you sure you want to delete "{{ strainToDelete?.name }}" from your
        list?
      </p>
      <Button
        class="p-button-outlined fit-width mr-3"
        @click="strainToDelete = null"
        label="No, Keep It"
      />
      <Button
        class="p-button-danger fit-width"
        @click="deleteStrain()"
        label="Yes, Delete"
      />
    </Dialog>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const addStrainError = ref( false )
const addStrainSuccess = ref( false )
const growingMethod = ref( null )
const growingMethodInvalid = ref( false )
const loading = ref( false )
const rating = ref( null )
const selectedLocation = ref( null )
const showAddStrainSection = ref( false )
const sortBy = ref( 'name' )
const strainCategories = ref( [
  'Indica',
  'Sativa',
  'Hybrid Indica',
  'Hybrid Sativa',
] )
const strainCategory = ref( '' )
const strainCategoryInvalid = ref( false )
const strainName = ref( '' )
const strainNameInvalid = ref( false )
const strainRatings = ref( [ 'A', 'AA', 'AAA' ] )
const strainToDelete = ref( null )
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userLocations = ref( null )
const userStrains = ref( null )

// get the locations for this user from the user_locations table
const { data } = await supabase
  .from( 'user_locations' )
  .select( '*' )
  .eq( 'user_id', user.value.id )
  .order( 'location_name' )
if ( data && data.length > 0 ) {
  userLocations.value = data
  selectedLocation.value = data[ 0 ].id
}

const fetchUserStrains = async () => {
  loading.value = true
  const { data } = await supabase
    .from( 'user_hemp_strains' )
    .select(
      `
    id,
    name,
    category,
    growing_method,
    rating,
    user_locations( id, location_name )
    `
    )
    .eq( 'user_id', user.value.id )
  if ( data ) {
    userStrains.value = data
  }
  loading.value = false
}

// computed property that returns the growing methods from the location selected
const growingMethods = computed( () => {
  const array = []
  // find the location with the id of selectedStrain.value in the userLocations array of objects
  if ( userLocations.value === null ) return array
  const selectedLocationObj = userLocations.value.find(
    ( location ) => location.id === selectedLocation.value
  )
  if ( selectedLocationObj?.growing_indoor ) {
    array.push( { label: 'Indoor', value: 'indoor' } )
  }
  if ( selectedLocationObj?.growing_outdoor ) {
    array.push( { label: 'Outdoor', value: 'outdoor' } )
  }
  if ( selectedLocationObj?.growing_greenhouse ) {
    array.push( { label: 'Greenhouse', value: 'greenhouse' } )
  }
  return array
} )

// add strain to the user_strains table
const addStrain = async () => {
  // set all invalid fields to false
  strainNameInvalid.value = false
  strainCategoryInvalid.value = false
  growingMethodInvalid.value = false

  // validate form
  if ( !strainName.value ) {
    strainNameInvalid.value = true
    return
  }
  if ( !strainCategory.value ) {
    strainCategoryInvalid.value = true
    return
  }
  if ( !growingMethod.value ) {
    growingMethodInvalid.value = true
    return
  }

  const { error } = await supabase.from( 'user_hemp_strains' ).insert( [
    {
      user_id: user.value.id,
      name: strainName.value,
      category: strainCategory.value,
      growing_method: growingMethod.value,
      location_id: selectedLocation.value,
      rating: rating.value,
    },
  ] )
  if ( error ) {
    addStrainError.value = true
  } else {
    strainName.value = ''
    strainCategory.value = ''
    addStrainSuccess.value = true
    growingMethod.value = null
    selectedLocation.value = null
    rating.value = null
    showAddStrainSection.value = false
    fetchUserStrains()
  }
}

const closeAddStrainSection = () => {
  showAddStrainSection.value = false
  addStrainSuccess.value = false
}

// delete strain from the user_hemp_strains table
const deleteStrain = async () => {
  const { error } = await supabase
    .from( 'user_hemp_strains' )
    .delete()
    .eq( 'id', strainToDelete.value.id )
  if ( error ) {
    console.log( error )
  } else {
    strainToDelete.value = null
    fetchUserStrains()
  }
}

// computed property that sorts the userStrains by the sortBy value
const sortedUserStrains = computed( () => {
  if ( userStrains.value ) {
    return userStrains.value.sort( ( a, b ) => {
      if ( sortBy.value === 'name' ) {
        return a.name.localeCompare( b.name )
      } else if ( sortBy.value === 'category' ) {
        return a.category.localeCompare( b.category )
      }
    } )
  }
} )

onMounted( () => {
  fetchUserStrains()
} )
</script>

<style lang="scss">
.strain-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
}

.strains-table img,
.strains-table .strain-thumbnail,
.strains-table .cannabis-leaf {
  width: 100px;
  height: auto;
}
</style>
