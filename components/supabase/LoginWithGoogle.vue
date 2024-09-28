<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <Button
      :label="label"
      icon="pi pi-google"
      class="p-button-outlined w-full mb-2"
      @click="login"
    />
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()
const emit = defineEmits( [ 'closePanel' ] )

const errorMessage = ref( '' )

const props = defineProps( {
  label: {
    type: String,
    default: 'Sign In With Google',
  },
} )

const login = async () => {
  emit( 'closePanel' )
  const error = await client.auth.signInWithOAuth(
    { provider: 'google' },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if ( error.value ) {
    console.log( error )
    errorMessage.value = `Sorry, there was a problem creating this account. Please try again! Error message: ${ error }`
  }
}
</script>
