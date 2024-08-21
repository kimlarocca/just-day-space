<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <template v-if="successMessage">
      <Message class="mb-4" severity="success">
        {{ successMessage }}
      </Message>
    </template>
    <form @submit.prevent="login" class="width400">
      <div class="mb-3">
        <span class="p-float-label inline">
          <InputText
            id="magic-link-email"
            v-model="email"
            class="w-full"
            type="email"
            placeholder="Email Address"
            required
          />
          <label for="magic-link-email">Email Address</label>
        </span>
      </div>
      <Button :label="label" class="w-full" type="submit" />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref( '' )
const errorMessage = ref( '' )
const successMessage = ref( '' )

const props = defineProps( {
  label: {
    type: String,
    default: 'Sign In With Magic Link',
  },
} )

const login = async () => {
  const { data, error } = await client.auth.signInWithOtp(
    {
      email: email.value,
    },
    {
      redirectTo: config.supabaseAuthSignInRedirectTo,
    }
  )
  if ( error ) {
    console.log( error )
    errorMessage.value = `Sorry, there was a problem logging with your magic link. Please try again! Error message: ${ error }`
  } else {
    successMessage.value =
      'Success! If you have an account with that email address, you will get an email to with a magic link to login. If you created your account with Google, please log in with Google instead.'
  }
}
</script>
