<template>
  <div class="new-user-onboarding">
    <div class="mb-4">
      <ProgressBar :value="progress" :show-value="true" />
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="progress === 0" class="container-white p-4 pb-5">
        <h3 class="mb-2">Step 1</h3>
        <h4 class="mb-4">
          Do you own a cannabis farm, hemp farm, or extraction lab?
        </h4>
        <p class="mb-3">Please select one or more:</p>
        <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
          <Checkbox
            id="farm_owner"
            v-model="farmOwner"
            :binary="true"
            class="mr-2"
            @change="setUserType('farm-owner')"
          />
          <label for="farm_owner">Cannabis Farm Owner</label>
        </div>
        <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
          <Checkbox
            id="hemp_farm_owner"
            v-model="hempOwner"
            :binary="true"
            class="mr-2"
            @change="setUserType('hemp-farm-owner')"
          />
          <label for="hemp_farm_owner">Hemp Farm Owner</label>
        </div>
        <div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">
          <Checkbox
            id="lab_owner"
            v-model="labOwner"
            :binary="true"
            class="mr-2"
            @change="setUserType('lab-owner')"
          />
          <label for="lab_owner">Extraction Lab Owner</label>
        </div>
        <div class="mt-5">
          <Button
            :disabled="!farmOwner && !hempOwner && !labOwner"
            label="Save & Continue"
            @click="progress = 33"
            class="mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
          />
        </div>
      </div>
      <div v-else-if="progress === 33" class="container-white p-4 pb-5">
        <h3 class="mb-2">Step 2</h3>
        <h4 class="mb-5">Tell us a little bit about yourself...</h4>
        <manage-user-profile :hide-user-type="true" />
        <Button
          label="Save & Continue"
          @click="progress = 66"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
        />
        <Button
          label="Skip"
          @click="progress = 66"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block p-button-outlined w-full md:w-fit"
        />
        <p class="mt-4">
          <nuxt-link @click="progress = 0" class="like-h6 cursor-pointer plain">
            <i class="pi pi-chevron-left text-sm mr-1" /> go back to step 1
          </nuxt-link>
        </p>
      </div>
      <div v-else-if="progress === 66" class="container-white p-4 pb-5">
        <h3 class="mb-2">Final Step!</h3>
        <h4 class="mb-5">Add at least one project</h4>
        <manage-user-locations
          class="mb-5"
          @location-added="locationAdded = true"
          @locations-found="locationAdded = true"
        />
        <Button
          :disabled="!locationAdded"
          label="Save & Finish"
          @click="navigateTo('/success')"
          class="block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
        />
        <p class="mt-4">
          <nuxt-link
            @click="progress = 33"
            class="like-h6 cursor-pointer plain"
          >
            <i class="pi pi-chevron-left text-sm mr-1" /> go back to step 2
          </nuxt-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const farmOwner = ref( false )
const hempOwner = ref( false )
const labOwner = ref( false )
const locationAdded = ref( false )
const progress = ref( 0 )
const supabase = useSupabaseClient()

// get the user type from supabase
farmOwner.value = currentUserProfile.value?.farm_owner
hempOwner.value = currentUserProfile.value?.hemp_farm_owner
labOwner.value = currentUserProfile.value?.lab_owner

// set the user type in supabase
const setUserType = async () => {
  // update the user's profile in supabase
  await supabase
    .from( 'profiles' )
    .update( {
      farm_owner: farmOwner.value ? true : false,
      lab_owner: labOwner.value ? true : false,
      hemp_farm_owner: hempOwner.value ? true : false,
    } )
    .eq( 'id', currentUser.value.id )
}
</script>
