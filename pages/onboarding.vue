<template>
  <div class="dashboard container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Let's Get Started!</Title>
      </Head>
    </Html>
    <h1 class="mb-4">Let's Get Started!</h1>
    <ProgressBar :value="progress" class="mb-4" />
    <transition name="slide-fade">
      <div v-if="step === 0">
        <h2 class="mb-4">First, tell us about yourself</h2>
        <ManageUserProfile />
        <Button
          @click="step++"
          :disabled="!currentUserProfile?.birthday"
          class="mt-4"
          label="Continue"
        />
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="step === 1">
        <h2 class="mb-4">Next, upload a profile picture</h2>
        <SupabaseUploadImage
          :image="currentUserProfile?.avatar_url || ''"
          @image-uploaded="hasProfilePic = true"
          class="mb-4"
        />
        <Button @click="step--" class="mr-4 p-button-outlined" label="Back" />
        <Button
          v-if="currentUserProfile?.avatar_url"
          @click="step++"
          label="Continue"
        />
        <Button v-else @click="step++" label="Skip" />
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="step === 2">
        <h2 class="mb-4">How did you hear about us?</h2>
        <Dropdown
          v-model="referredBy"
          :options="referrers"
          placeholder="Select an option"
          @change="updateProfile"
          class="mb-4"
        />
        <Button @click="step--" class="mr-4 p-button-outlined" label="Back" />
        <Button v-if="referredBy" @click="step++" label="Continue" />
        <Button v-else @click="step++" label="Skip" />
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="step === 3">
        <h2 class="mb-4">Thanks, you're all set up!</h2>
        <p class="mb-4">
          You can always update your profile later in your account settings.
        </p>
        <nuxt-link to="/dashboard" class="plain">
          <Button label="Add Your First Space" icon="pi pi-plus" />
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const referredBy = ref( null )
const step = ref( 0 )

const referrers = [
  'Google',
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'Friend',
  'Other',
]

const progress = computed( () => {
  if ( step.value === 0 ) return 0
  else if ( step.value === 1 ) return 33
  else if ( step.value === 2 ) return 66
  return 100
} )

const updateProfile = async () => {
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      referred_by: referredBy.value,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
    currentUserProfile.value.referred_by = referredBy.value
  }
}
</script>
