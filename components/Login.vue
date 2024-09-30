<template>
  <div class="login">
    <h1 class="mb-4 mt-2 flex align-items-center">Login</h1>
    <!-- <supabase-login-with-google
      @close-panel="emit('closePanel')"
      class="mb-4"
    />
    <p class="mb-3">Or sign in with email and password:</p> -->
    <supabase-login-with-email @close-panel="emit('closePanel')" class="mb-4" />
    <p class="small mb-4">
      <nuxt-link to="/forgot-password" @click="emit('closePanel')">
        Forgot Password?
      </nuxt-link>
    </p>
  </div>
</template>

<script setup>
const emit = defineEmits( [ 'closePanel' ] )
</script>