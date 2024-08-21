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
    <form v-if="!successMessage" @submit.prevent="login" class="width400">
      <div class="mb-4">
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
      <div class="mb-4">
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
        label="sign up With Email & Password"
        class="w-full"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const login = async () => {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.log(error)
    if (error.toString().includes('already registered')) {
      errorMessage.value =
        'Looks like you already have an account! If you do not remember your password, you can retrieve it by clicking the "Forgot Password" link below.'
    } else {
      errorMessage.value = `Sorry, there was a problem creating this account. Please try signing up again! Error message: ${error.message}`
    }
  } else {
    successMessage.value =
      'Success! Please check your email for a confirmation link. If you do not receive a confirmation link, you may already have an account. Please be sure to check your spam or junk folder as well.'
  }
}
</script>
