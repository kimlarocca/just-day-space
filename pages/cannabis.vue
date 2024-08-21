<template>
  <div class="strains">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | My Strains</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-4">
      <h2 class="mr-4">My Strains</h2>
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
            <h4 class="mb-4">Add a New Strain</h4>
            <i
              class="pi pi-times cursor-pointer text-xl"
              @click="closeAddStrainSection()"
            />
          </div>
          <span class="p-float-label inline">
            <AutoComplete
              id="strain_name"
              v-model="strainName"
              :suggestions="strainSuggestions"
              @complete="fetchSuggestions"
              @item-select="selectedStrain = strainName"
              optionLabel="display_name"
            />
            <label for="strain_name">Search Strains</label>
          </span>
        </div>
        <template v-if="selectedStrain">
          <div class="flex align-items-center mb-2">
            <h5>
              {{ selectedStrain.name }}
            </h5>
            <div class="tag ml-3">
              {{ selectedStrain.category }}
            </div>
          </div>
          <p class="mb-4">{{ selectedStrain.subtitle }}</p>
          <img
            :src="selectedStrain.image_url"
            :alt="selectedStrain.name"
            class="strain-image block mb-4"
          />
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
                id="new_strain_rating"
              />
              <label for="new_strain_rating">
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
        </template>
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
        <h6 class="my-4 cursor-pointer" @click="showForm = !showForm">
          Can't find your strain in the search above?
        </h6>
        <transition name="slide-fade" mode="out-in">
          <div v-if="showForm">
            <Message
              v-if="newStrainRequested"
              severity="success"
              @close="closeStrainRequestForm()"
            >
              Thank you for your submission! We will review your request and
              contact you if we have any questions.
            </Message>
            <template v-else>
              <p class="mb-2">
                If you can't find your strain in the search above, you can
                request a new strain. Strains you request will be sent to an
                admin to approve and will not be available immediately.
              </p>
              <p class="mb-4">
                To help validate their authenticity, we may contact you for
                references or sources (e.g., web link, database, genetic cross
                proof, etc.).
              </p>
              <div class="mb-4">
                <span class="p-float-label inline">
                  <InputText id="new_strain_name" v-model="newStrainName" />
                  <label for="new_strain_name">Name Of Strain</label>
                </span>
              </div>
              <div class="mb-4">
                <span class="p-float-label inline">
                  <Dropdown
                    v-model="newStrainCategory"
                    :options="strainCategories"
                    id="new_strain_category"
                  />
                  <label for="new_strain_category">Lineage</label>
                </span>
              </div>
              <Button
                label="Submit New Strain Request"
                @click="sendStrainRequest()"
              />
            </template>
          </div>
        </transition>
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
          <img
            v-if="strain.strains.image_url"
            :src="strain.strains.image_url"
            :alt="strain.strains.name"
            class="m-2"
          />
          <icons-cannabis-leaf
            v-else
            class="mx-2 my-1"
            :class="
              strain.strains.category.includes('Sativa') ? 'green' : 'blue'
            "
          />
          <div class="mr-3">
            <h5 class="mb-1">
              {{ strain.strains.name }} ({{ strain.strains.category }})
            </h5>
            <p class="mb-1">
              Project: {{ strain.user_locations.location_name }}
            </p>
            <div
              v-if="strain.rating"
              class="tag inline-block rating mr-2 mb-2 md:mb-0"
            >
              {{ strain.rating }}
            </div>
            <div class="tag small inline-block" :class="strain.growing_method">
              {{ strain.growing_method }}
            </div>
          </div>
        </div>
        <Button
          icon="pi pi-chart-line"
          aria-label="view strain dashboard"
          class="ml-3 p-button-rounded"
          @click="navigateTo(`/strains/${strain.strains.id}`)"
          v-tooltip.left="'View Strain Dashboard'"
        />
        <Button
          icon="pi pi-trash"
          aria-label="delete strain"
          class="ml-2 p-button-rounded"
          @click="strainToDelete = strain"
          v-tooltip.left="'Delete This Strain'"
        />
      </div>
    </div>
    <Dialog v-model:visible="strainToDelete" modal class="text-center">
      <icons-large-x class="mb-2" />
      <h2 class="mb-2">Delete Strain</h2>
      <p class="mb-4">
        Are you sure you want to delete "{{ strainToDelete?.strains?.name }}"
        from your list?
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

import { requestNewStrain } from '@/utils/sendgrid'

const addStrainError = ref( false )
const addStrainSuccess = ref( false )
const growingMethod = ref( null )
const growingMethodInvalid = ref( false )
const loading = ref( false )
const newStrainCategory = ref( '' )
const newStrainName = ref( '' )
const newStrainRequested = ref( false )
const rating = ref( null )
const selectedLocation = ref( null )
const selectedStrain = ref( null )
const showForm = ref( false )
const showAddStrainSection = ref( false )
const sortBy = ref( 'name' )
const strainCategories = ref( [
  'Indica',
  'Sativa',
  'Hybrid',
  'Hybrid Indica',
  'Hybrid Sativa',
] )
const strainName = ref( '' )
const strainRatings = ref( [ 'A', 'AA', 'AAA' ] )
const strainSuggestions = ref( [] )
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
    .from( 'user_strains' )
    .select(
      `
    strain_id,
    growing_method,
    rating,
    strains( id, name, category, subtitle, image_url ),
    user_locations( id, location_name )
    `
    )
    .eq( 'user_id', user.value.id )
  if ( data ) {
    userStrains.value = data
  }
  loading.value = false
}

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

// computed property that returns the growing methods from the location selected
const growingMethods = computed( () => {
  const array = []
  // find the location with the id of selectedStrain.value in the userLocations array of objects
  if ( userLocations.value === null ) return array
  const selectedLocationObj = userLocations.value.find(
    ( location ) => location.id === selectedLocation.value
  )
  if ( selectedLocationObj?.growing_indoor ) {
    array.push( { label: 'Indoor', value: 'Indoor' } )
  }
  if ( selectedLocationObj?.growing_outdoor ) {
    array.push( { label: 'Outdoor', value: 'Outdoor' } )
  }
  if ( selectedLocationObj?.growing_greenhouse ) {
    array.push( { label: 'Greenhouse', value: 'Greenhouse' } )
  }
  return array
} )

// add strain to the user_strains table
const addStrain = async () => {
  // set all invalid fields to false
  growingMethodInvalid.value = false

  // validate form
  if ( !growingMethod.value ) {
    growingMethodInvalid.value = true
    return
  }

  const { error } = await supabase.from( 'user_strains' ).insert( [
    {
      user_id: user.value.id,
      strain_id: selectedStrain.value.id,
      growing_method: growingMethod.value,
      location_id: selectedLocation.value,
      rating: rating.value,
    },
  ] )
  if ( error ) {
    addStrainError.value = true
  } else {
    selectedStrain.value = null
    strainSuggestions.value = []
    strainName.value = ''
    addStrainSuccess.value = true
    rating.value = null
    fetchUserStrains()
  }
}

const closeAddStrainSection = () => {
  showAddStrainSection.value = false
  selectedStrain.value = null
  strainSuggestions.value = []
  strainName.value = ''
  rating.value = null
  addStrainSuccess.value = false
}

// delete strain from the user_strains table
const deleteStrain = async () => {
  const { error } = await supabase
    .from( 'user_strains' )
    .delete()
    .eq( 'strain_id', strainToDelete.value.strains.id )
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
        return a.strains.name.localeCompare( b.strains.name )
      } else if ( sortBy.value === 'category' ) {
        return a.strains.category.localeCompare( b.strains.category )
      }
    } )
  }
} )

// send a request for a new strain
const sendStrainRequest = async () => {
  requestNewStrain(
    newStrainName.value,
    newStrainCategory.value,
    user.value.email
  )
  newStrainRequested.value = true
  newStrainName.value = ''
  newStrainCategory.value = ''
}

// close the strain request form
const closeStrainRequestForm = () => {
  newStrainRequested.value = false
  showForm.value = false
}

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
