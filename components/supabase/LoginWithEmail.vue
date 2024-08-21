<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <form @submit.prevent="login" class="width400">
      <div class="mb-3">
        <span class="p-float-label inline">
          <InputText
            id="email"
            v-model="email"
            class="w-full"
            type="email"
            placeholder="Email Address"
            required
          />
          <label for="email">Email Address</label>
        </span>
      </div>
      <div class="mb-2">
        <span class="p-float-label inline">
          <Password
            id="password"
            toggleMask
            :feedback="false"
            v-model="password"
            class="w-full mb-2"
            type="password"
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </span>
      </div>
      <Button
        label="Sign In With Email & Password"
        class="w-full"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()

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
    navigateTo( '/dashboard' )
  }
}
</script>
