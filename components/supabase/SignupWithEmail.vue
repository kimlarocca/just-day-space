<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        {{ errorMessage }}
      </Message>
    </template>
    <template v-if="successMessage">
      <Message class="mb-4" severity="success">
        {{ successMessage }}
      </Message>
    </template>
    <form v-if="!successMessage" @submit.prevent="login">
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
      <Button label="sign up" class="w-full" type="submit" />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref( '' )
const password = ref( '' )
const errorMessage = ref( '' )
const successMessage = ref( '' )

const login = async () => {
  const { error } = await client.auth.signUp( {
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: config.supabaseSuccessRedirectTo
    }
  } )
  if ( error ) {
    console.log( error )
    if ( error.toString().includes( 'already registered' ) ) {
      errorMessage.value =
        'Looks like you already have an account! If you do not remember your password, you can retrieve it by clicking the "Forgot Password" link below.'
    } else {
      errorMessage.value = `Sorry, there was a problem creating this account. Please try signing up again! Error message: ${ error.message }`
    }
  } else {
    successMessage.value =
      'Success! Please check your email for a confirmation link. If you do not receive a confirmation link, you may already have an account. Please be sure to check your spam or junk folder as well.'
  }
}
</script>
