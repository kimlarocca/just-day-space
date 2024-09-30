<template>
  <div class="upload-image">
    <h6 class="mb-4">Profile Image</h6>
    <ProgressSpinner class="inline-block mb-4" v-if="uploading" />
    <Avatar
      v-if="imageUrl"
      :image="imageUrl"
      size="xlarge"
      shape="circle"
      alt="profile photo"
      class="mb-4"
    />
    <p v-if="currentUser.app_metadata.provider === 'google'">
      <em>
        You are using your <strong>{{ currentUser.email }}</strong> Google
        account to login. To change your profile picture, you must do so through
        your Google account.
      </em>
    </p>
    <template v-else>
      <p v-if="!imageUrl" class="mb-3">
        You have not added a profile image yet.
      </p>
      <div class="flex">
        <FileUpload
          mode="basic"
          :customUpload="true"
          @uploader="uploadImage"
          accept="image/*"
          :maxFileSize="1000000"
          :fileLimit="1"
          choose-label="Update"
          :auto="true"
          upload-icon="pi pi-image"
          class="mr-2 fit-width black"
          style="height: 36px; text-transform: capitalize"
        />
        <Button
          v-if="imageUrl"
          @click="deleteImage"
          class="black p-button-rounded"
          icon="pi pi-trash"
        />
      </div>
      <p v-if="!imageUrl" class="small mt-3">
        <em>
          Image files must be less than 1MB in size, and should ideally be a
          square.<br />jpg, png, webp, and gif files are accepted.
        </em>
      </p>
    </template>
    <template v-if="errorMessage">
      <Message class="mt-4" severity="error">
        {{ errorMessage }}
      </Message>
    </template>
    <template v-if="successMessage">
      <Message :sticky="false" :life="5000" class="mt-4" severity="success">
        {{ successMessage }}
      </Message>
    </template>
  </div>
</template>

<script setup>
const emit = defineEmits( [ 'imageUploaded' ] )

const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const props = defineProps( {
  image: {
    type: String,
    default: '',
    required: true,
  },
} )

const uploading = ref( false )
const errorMessage = ref()
const successMessage = ref()
const imageUrl = ref( props.image )

const uploadImage = async ( event ) => {
  try {
    uploading.value = true
    const file = event.files[ 0 ]
    const fileExt = file.name.split( '.' ).pop()
    const filePath = `${ props.userId }-${ Math.random() }.${ fileExt }`

    const { error: uploadError } = await supabase.storage
      .from( 'avatars' )
      .upload( filePath, file )

    if ( uploadError ) throw uploadError

    const { data: imagePublicUrl } = await supabase.storage
      .from( 'avatars' )
      .getPublicUrl( filePath )

    imageUrl.value = imagePublicUrl.publicUrl

    const { error } = await supabase
      .from( 'profiles' )
      .upsert( {
        id: currentUser.value.id,
        updated_at: new Date().toISOString(),
        avatar_url: imageUrl.value,
      } )
      .match( { id: currentUser.value.id } )
    if ( error ) {
      console.log( error )
      errorMessage.value = `Error: ${ error }`
    } else {
      successMessage.value = 'Success! Your image has been saved.'
      currentUserProfile.value.avatar_url = imageUrl.value
      emit( 'imageUploaded' )
    }
  } catch ( error ) {
    errorMessage.value = `Error: ${ error }`
  } finally {
    uploading.value = false
  }
}

// delete the image from the database and storage
const deleteImage = async () => {
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      avatar_url: null,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( error )
    errorMessage.value = `Error: ${ error }`
  } else {
    successMessage.value = 'Success! Your photo has been deleted.'
    imageUrl.value = null
    currentUserProfile.value.avatar_url = null
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: solid 1px var(--light-gray);
}
.upload-image-button {
  height: 36px;
}
.p-avatar.p-avatar-circle {
  width: 200px;
  height: 200px;
}
</style>
