<template>
  <div>
    <form class="password-reset" @submit.prevent="resetPassword">
      <h4 class="mb-4">Change Password</h4>
      <p v-if="currentUser.app_metadata.provider !== 'email'">
        <em>
          You are using your <strong>{{ currentUser.email }}</strong>
          {{ currentUser.app_metadata.provider }} account to login. To change
          your password, you must do so through your
          {{ currentUser.app_metadata.provider }} account.
        </em>
      </p>
      <div v-else class="width400">
        <div class="mb-4" v-if="!successMessage">
          <Password
            id="password"
            toggleMask
            v-model="password"
            type="password"
            placeholder="New Password"
            required
          />
        </div>
        <Button
          v-if="!successMessage"
          :loading="pending"
          type="submit"
          class="full-width"
          label="Update Password"
        />
      </div>
      <template v-if="errorMessage">
        <Message
          :sticky="false"
          :life="5000"
          class="mt-4"
          severity="error"
          @close="errorMessage = ''"
        >
          Sorry, there was an error updating your password: {{ errorMessage }}
        </Message>
      </template>
      <template v-if="successMessage">
        <Message
          :sticky="true"
          :life="5000"
          class="mt-4"
          severity="success"
          @close="successMessage = ''"
        >
          {{ successMessage }}
        </Message>
      </template>
    </form>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const client = useSupabaseClient()
const errorMessage = ref( '' )
const password = ref( '' )
const pending = ref( false )
const successMessage = ref( null )

const resetPassword = async () => {
  pending.value = true
  const { error } = await client.auth.updateUser( {
    email: currentUser.value.email,
    password: password.value,
  } )
  pending.value = false
  if ( error ) {
    console.log( error )
    if ( error.toString().includes( '8 characters' ) ) {
      errorMessage.value = 'Password should be at least 8 characters.'
    } else {
      errorMessage.value = error
    }
  } else {
    successMessage.value = 'Success! Your password has been updated.'
  }
}
</script>
