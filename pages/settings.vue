<template>
  <div class="settings container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Account Settings</Title>
      </Head>
    </Html>
    <h1 class="mb-5">Account Settings</h1>
    <supabase-upload-image :image="avatarImage || ''" class="mb-5" />
    <manage-user-profile />
    <divider class="my-6 w-2" />
    <div id="password">
      <supabase-reset-password />
    </div>
    <divider class="my-6 w-2" />
    <div id="delete">
      <h4 class="mb-4">Delete Account</h4>
      <p>
        Please <a href="mailto:help@justdayspace.com">contact us</a> if you wish
        to delete your account.
      </p>
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
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUser = useSupabaseUser()
const supabase = useSupabaseClient()

const avatarImage = ref( null )
const profile = ref( [] )
const successMessage = ref( false )
const userType = ref( null )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value?.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  avatarImage.value = data[ 0 ]?.avatar_url
  userType.value = data[ 0 ]?.user_type
}
</script>

<style lang="scss">
.settings {
  position: relative;
}
.settings nav {
  a,
  a:visited,
  a:active {
    color: var(--gray);
    font-weight: 500;
    &.active,
    &:hover {
      color: var(--purple);
    }
  }
}
</style>
