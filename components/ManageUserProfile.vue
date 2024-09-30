<template>
  <div v-if="profile && profile.length > 0">
    <h6 class="mb-2">Date of Birth</h6>
    <Calendar
      v-model="birthday"
      :maxDate="maxBirthdayDate"
      showIcon
      placeholder="Select A Date"
      class="mb-2 w-full"
      @date-select="updateProfile"
    />
    <p class="small font-italic mb-4">
      Your date of birth is required - you must be 18 or older to book or list
      on Just Day Space.
    </p>
    <h6 class="mb-2">Name</h6>
    <InputText
      v-model="fullName"
      placeholder="Enter your full name here"
      @change="updateProfile"
      class="mb-4"
    />
    <h6 class="mb-2">Bio</h6>
    <Textarea
      v-model="bio"
      rows="5"
      placeholder="Enter a brief paragraph about yourself - this may lead to more bookings!"
      @change="updateProfile"
    />
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

const fullName = ref( null )
const birthday = ref( null )
const bio = ref( null )
const profile = ref( [] )
const successMessage = ref( false )

// set maxBirthdayDate to 18 years ago
const maxBirthdayDate = new Date()
maxBirthdayDate.setFullYear( maxBirthdayDate.getFullYear() - 18 )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  fullName.value = data[ 0 ]?.full_name
  birthday.value = data[ 0 ]?.birthday
  bio.value = data[ 0 ]?.bio
}

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      full_name: fullName.value,
      birthday: birthday.value,
      bio: bio.value,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
    currentUserProfile.value.full_name = fullName.value
    currentUserProfile.value.birthday = birthday.value
    currentUserProfile.value.bio = bio.value
  }
}
</script>
