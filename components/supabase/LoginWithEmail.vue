<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <form @submit.prevent="login">
      <div class="mb-3">
        <InputText
          id="email"
          v-model="email"
          class="w-full"
          type="email"
          placeholder="Email Address"
          required
        />
      </div>
      <div class="mb-3">
        <Password
          id="password"
          toggleMask
          :feedback="false"
          v-model="password"
          class="w-full"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <Button label="Login" class="w-full" type="submit" />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()
const emit = defineEmits( [ 'closePanel' ] )

const email = ref( '' )
const password = ref( '' )
const errorMessage = ref( '' )

const login = async () => {
  const error = await client.auth.signInWithPassword(
    { email: email.value, password: password.value },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if ( error.error ) {
    console.log( error )
    if ( error?.error?.message?.includes( 'Invalid login credentials' ) ) {
      errorMessage.value =
        'The email and password combination you entered is incorrect. Please try again!'
    } else {
      errorMessage.value = error
    }
  } else {
    emit( 'closePanel' )
    navigateTo( '/dashboard' )
  }
}
</script>
