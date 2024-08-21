<template>
  <div v-if="profile && profile.length > 0">
    <p class="text-sm mb-4">Username: {{ currentUser?.email }}</p>
    <Message
      severity="error"
      v-if="userTypeInvalid && !hideUserType"
      :closable="false"
      class="mb-4"
    >
      Please select at least one user type!
    </Message>
    <div
      v-if="!hideUserType"
      class="flex flex-column lg:flex-row lg:align-items-center mb-5"
    >
      <p class="mb-3 lg:mb-0 lg:mr-3 block md:inline text-sm">User Type:</p>
      <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
        <Checkbox
          id="farm_owner"
          v-model="farmOwner"
          :binary="true"
          class="mr-2"
          @change="updateProfile"
        />
        <label for="farm_owner">Cannabis Farm Owner</label>
      </div>
      <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
        <Checkbox
          id="hemp_farm_owner"
          v-model="hempFarmOwner"
          :binary="true"
          class="mr-2"
          @change="updateProfile"
        />
        <label for="hemp_farm_owner">Hemp Farm Owner</label>
      </div>
      <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
        <Checkbox
          id="lab_owner"
          v-model="labOwner"
          :binary="true"
          class="mr-2"
          @change="updateProfile"
        />
        <label for="lab_owner">Extraction Lab Owner</label>
      </div>
    </div>
    <div class="mb-4">
      <span class="p-float-label inline">
        <InputText id="full_name" v-model="fullName" @change="updateProfile" />
        <label for="full_name">Full Name</label>
      </span>
    </div>
    <div class="mb-4">
      <span class="p-float-label inline">
        <InputMask
          v-model="phone"
          date="phone"
          mask="(999) 999-9999"
          placeholder="(999) 999-9999"
          @change="updateProfile"
        />
        <label for="phone">Phone Number</label>
      </span>
    </div>
    <div class="mb-4">
      <span class="p-float-label inline">
        <InputNumber
          id="workers"
          v-model="workers"
          @input="updateProfile"
          @update:modelValue="updateProfile"
        />
        <label for="workers">Total Number Of Workers</label>
      </span>
    </div>
    <div class="mb-4">
      <span class="p-float-label inline">
        <InputNumber
          id="lights"
          v-model="lights"
          @input="updateProfile"
          @update:modelValue="updateProfile"
        />
        <label for="lights">Total Number Of Lights</label>
      </span>
    </div>
  </div>
  <div class="changes-saved-toast">
    <Message
      v-if="successMessage"
      class="mb-4"
      severity="success"
      :closable="false"
      :sticky="false"
    >
      Your changes have been saved.
    </Message>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const farmOwner = ref( null )
const hempFarmOwner = ref( null )
const fullName = ref( null )
const labOwner = ref( null )
const lights = ref( null )
const phone = ref( null )
const profile = ref( [] )
const successMessage = ref( false )
const userTypeInvalid = ref( false )
const workers = ref( null )

const props = defineProps( {
  hideUserType: {
    type: Boolean,
    default: false,
  },
} )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  farmOwner.value = data[ 0 ]?.farm_owner
  hempFarmOwner.value = data[ 0 ]?.hemp_farm_owner
  fullName.value = data[ 0 ]?.full_name
  labOwner.value = data[ 0 ]?.lab_owner
  lights.value = data[ 0 ]?.number_of_lights
  phone.value = data[ 0 ]?.phone
  workers.value = data[ 0 ]?.number_of_workers
  // check if user type is valid
  if ( !farmOwner.value && !labOwner.value && !hempFarmOwner.value ) {
    userTypeInvalid.value = true
  }
}

const updateProfile = async () => {
  // check if user type is valid
  if ( !farmOwner.value && !labOwner.value && !hempFarmOwner.value ) {
    userTypeInvalid.value = true
    return
  }
  userTypeInvalid.value = false
  successMessage.value = false
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      farm_owner: farmOwner.value,
      hemp_farm_owner: hempFarmOwner.value,
      full_name: fullName.value,
      lab_owner: labOwner.value,
      number_of_lights: lights.value,
      number_of_workers: workers.value,
      phone: phone.value,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
    // update the state
    currentUserProfile.value.farm_owner = farmOwner.value
    currentUserProfile.value.hemp_farm_owner = hempFarmOwner.value
    currentUserProfile.value.full_name = fullName.value
    currentUserProfile.value.lab_owner = labOwner.value
    currentUserProfile.value.number_of_lights = lights.value
    currentUserProfile.value.number_of_workers = workers.value
    currentUserProfile.value.phone = phone.value
  }
}
</script>
