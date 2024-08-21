<template>
  <div class="concentrates">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | My Concentrates</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-4">
      <h2 class="mr-4">My Concentrates</h2>
      <Button
        label="Add New"
        :icon="showAddConcentrateSection ? 'pi pi-minus' : 'pi pi-plus'"
        class="p-button-outlined cursor-pointer fit-width"
        @click="showAddConcentrateSection = !showAddConcentrateSection"
      />
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="showAddConcentrateSection" class="container-white p-4 mb-4">
        <div class="flex align-items-start justify-content-between">
          <h4 class="mb-4">Add a New Concentrate</h4>
          <i
            class="pi pi-times cursor-pointer text-xl"
            @click="closeAddConcentrateSection()"
          />
        </div>
        <p v-if="concentrateCategoryInvalid" class="small red mb-2">
          Please select a category for this concentrate:
        </p>
        <div class="mb-4">
          <span class="p-float-label inline">
            <Dropdown
              v-model="concentrateCategory"
              :options="concentrateCategories"
              id="category"
              :class="concentrateCategoryInvalid ? 'p-invalid' : ''"
            />
            <label for="category">Category</label>
          </span>
        </div>
        <div v-if="concentrateCategory === 'Other'" class="mb-4">
          <span class="p-float-label inline">
            <InputText
              id="concentrate_name"
              v-model="concentrateCategoryOther"
            />
            <label for="concentrate_name">Other Concentrate Category</label>
          </span>
        </div>
        <p v-if="concentrateNameInvalid" class="small red mb-2">
          Please enter a concentrate name:
        </p>
        <div class="mb-4">
          <span class="p-float-label inline">
            <InputText
              id="concentrate_name"
              v-model="concentrateName"
              :class="concentrateNameInvalid ? 'p-invalid' : ''"
            />
            <label for="concentrate_name">Concentrate Name</label>
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
            <nuxt-link to="settings#locations">click here</nuxt-link> to add at
            least 1 project to your profile!
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
        <div class="mb-4">
          <span class="p-float-label inline">
            <Dropdown
              v-model="concentrateExtractionMethod"
              :options="concentrateExtractionMethodCategories"
              id="category"
            />
            <label for="category">Extraction Method</label>
          </span>
        </div>
        <div v-if="concentrateExtractionMethod === 'Other'" class="mb-4">
          <span class="p-float-label inline">
            <InputText
              id="concentrate_name"
              v-model="concentrateExtractionMethodOther"
            />
            <label for="concentrate_name">Other Extraction Method</label>
          </span>
        </div>
        <p class="mb-2">
          If your byproduct is 2 or multiple strains, please share the mixture
          with us!
        </p>
        <div class="mb-4">
          <span class="p-float-label inline">
            <InputText
              id="strain_name_mixture"
              v-model="concentrateStrainNameMixture"
            />
            <label for="strain_name_mixture">Strain Name Mixture</label>
          </span>
        </div>
        <div class="my-4">
          <span class="p-float-label inline">
            <InputNumber
              id="thc_percentage"
              v-model="concentrateThcPercentage"
              :minFractionDigits="2"
              prefix="%"
            />
            <label for="thc_percentage">THC Content (best estimate)</label>
          </span>
        </div>
        <div v-if="concentrateCategory.includes('Distillate')" class="mb-4">
          <span class="p-float-label inline">
            <Dropdown
              v-model="concentrateDistillateType"
              :options="concentrateDistillateTypeCategories"
              id="distillate_type"
            />
            <label for="distillate_type">Distillate Type</label>
          </span>
        </div>
        <div v-if="concentrateCategory.includes('Distillate')" class="mb-4">
          <span class="p-float-label inline">
            <Dropdown
              v-model="concentrateDistillateCleanOrDirty"
              :options="concentrateDistillateCleanOrDirtyCategories"
              id="distillate_clean_or_dirty"
            />
            <label for="distillate_clean_or_dirty">Clean or Dirty?</label>
          </span>
        </div>
        <div class="mb-3">
          <span class="p-float-label inline">
            <Dropdown
              v-model="rating"
              :options="ratingCategories"
              id="new_strain_category"
            />
            <label for="new_strain_category">
              Select The Rating For This Concentrate
            </label>
          </span>
        </div>
        <Button
          label="Add To Your Concentrates"
          icon="pi pi-plus"
          class="cursor-pointer mb-3"
          @click="addConcentrate"
        />
        <Message
          v-if="addConcentrateSuccess"
          :closable="false"
          :sticky="false"
          :life="5000"
          severity="success"
          class="mb-2"
        >
          Success! This concentrate has been added to your list of concentrates.
        </Message>
        <Message
          v-if="addConcentrateError"
          :closable="false"
          severity="error"
          class="mb-2"
        >
          Sorry, there was a problem adding this Concentrate. Please try again!
        </Message>
      </div>
    </transition>
    <ProgressSpinner v-if="loading" />
    <div v-if="sortedUserConcentrates" class="strains-table">
      <p v-if="sortedUserConcentrates.length === 0">
        You have not added any strains yet. Please click the button above to add
        a new strain!
      </p>
      <div
        v-for="(strain, index) in sortedUserConcentrates"
        :key="index"
        class="flex align-items-center justify-content-between mb-3 w-full"
      >
        <div class="container-white flex align-items-center w-full mb-3">
          <icons-cannabis-jar class="mx-2 my-1 green" />
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
          @click="concentrateToDelete = strain"
        />
      </div>
    </div>
    <Dialog v-model:visible="concentrateToDelete" modal class="text-center">
      <icons-large-x class="mb-2" />
      <h2 class="mb-2">Delete Concentrate</h2>
      <p class="mb-4">
        Are you sure you want to delete "{{ concentrateToDelete?.name }}" from
        your list?
      </p>
      <Button
        class="p-button-outlined fit-width mr-3"
        @click="concentrateToDelete = null"
        label="No, Keep It"
      />
      <Button
        class="p-button-danger fit-width"
        @click="deleteConcentrate()"
        label="Yes, Delete"
      />
    </Dialog>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const addConcentrateSuccess = ref( false )
const addConcentrateError = ref( false )
const concentrateName = ref( '' )
const concentrateNameInvalid = ref( false )
const concentrateCategory = ref( '' )
const concentrateCategoryInvalid = ref( false )
const concentrateCategoryOther = ref( '' )
const concentrateCategories = ref( [
  'Badder',
  'Bubble Hash',
  'Budder',
  'CBD D8',
  'Conversion Distillate',
  'Crumble',
  'Diamonds',
  'Full Spectrum',
  'Hash',
  'High Terpene Extract',
  'Kief',
  'Live Resin',
  'Rosin',
  'Sauce',
  'Shatter',
  'Sugar',
  'THC Distillate D9',
  'THC-A',
  'Wax',
  'Other',
] )
const concentrateExtractionMethod = ref( '' )
const concentrateExtractionMethodCategories = ref( [
  'Butane',
  'CO2',
  'Ethanol',
  'Solventless',
  'Other',
] )
const concentrateExtractionMethodOther = ref( '' )
const concentrateStrainNameMixture = ref( '' )
const concentrateThcPercentage = ref( null )
const concentrateDistillateType = ref( '' )
const concentrateDistillateTypeCategories = ref( [
  'Cat 1',
  'Cat 2',
  'Cat 3',
  'CBD',
  'Conversion',
] )
const concentrateDistillateCleanOrDirty = ref( '' )
const concentrateDistillateCleanOrDirtyCategories = ref( [ 'Clean', 'Dirty' ] )
const concentrateToDelete = ref( null )
const loading = ref( false )
const rating = ref( null )
const ratingCategories = ref( [ 'A', 'AA', 'AAA' ] )
const selectedLocation = ref( null )
const showAddConcentrateSection = ref( false )
const sortBy = ref( 'name' )
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userLocations = ref( null )
const userConcentrates = ref( null )

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

// add concentrate to the user_concentrates table
const addConcentrate = async () => {
  // set all invalid fields to false
  concentrateNameInvalid.value = false
  concentrateCategoryInvalid.value = false

  // validate form
  if ( !concentrateCategory.value ) {
    concentrateCategoryInvalid.value = true
    return
  }
  if ( !concentrateName.value ) {
    concentrateNameInvalid.value = true
    return
  }

  const { error } = await supabase.from( 'user_concentrates' ).insert( [
    {
      user_id: user.value.id,
      name: concentrateName.value,
      category: concentrateCategory.value,
      category_other: concentrateCategoryOther.value,
      extraction_method: concentrateExtractionMethod.value,
      extraction_method_other: concentrateExtractionMethodOther.value,
      distillate_type: concentrateDistillateType.value,
      clean_or_dirty: concentrateDistillateCleanOrDirty.value,
      strain_name_mixture: concentrateStrainNameMixture.value,
      thc_content: concentrateThcPercentage.value,
      rating: rating.value,
      location_id: selectedLocation.value,
    },
  ] )
  if ( error ) {
    addConcentrateError.value = true
  } else {
    concentrateName.value = ''
    concentrateCategory.value = ''
    addConcentrateSuccess.value = true
    concentrateExtractionMethod.value = null
    concentrateCategoryOther.value = ''
    concentrateDistillateCleanOrDirty.value = null
    concentrateDistillateType.value = null
    concentrateExtractionMethodOther.value = ''
    rating.value = null
    showAddConcentrateSection.value = false
    fetchUserConcentrates()
  }
}

const closeAddConcentrateSection = () => {
  showAddConcentrateSection.value = false
  selectedStrain.value = null
  addConcentrateSuccess.value = false
  addConcentrateError.value = false
}

const fetchUserConcentrates = async () => {
  loading.value = true
  const { data } = await supabase
    .from( 'user_concentrates' )
    .select(
      `
    id,
    name,
    category,
    extraction_method,
    extraction_method_other,
    distillate_type,
    strain_name_mixture,
    thc_content,
    clean_or_dirty,
    rating,
    user_locations( id, location_name )
    `
    )
    .eq( 'user_id', user.value.id )
  if ( data ) {
    userConcentrates.value = data
  }
  loading.value = false
}

// delete strain from the user_hemp_strains table
const deleteConcentrate = async () => {
  const { error } = await supabase
    .from( 'user_concentrates' )
    .delete()
    .eq( 'id', concentrateToDelete.value.id )
  if ( error ) {
    console.log( error )
  } else {
    concentrateToDelete.value = null
    fetchUserConcentrates()
  }
}

// computed property that sorts the userConcentrates by the sortBy value
const sortedUserConcentrates = computed( () => {
  if ( userConcentrates.value ) {
    return userConcentrates.value.sort( ( a, b ) => {
      if ( sortBy.value === 'name' ) {
        return a.name.localeCompare( b.name )
      } else if ( sortBy.value === 'category' ) {
        return a.category.localeCompare( b.category )
      }
    } )
  }
} )

onMounted( () => {
  fetchUserConcentrates()
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
.strains-table .cannabis-jar {
  width: 100px;
  height: auto;
}
</style>
