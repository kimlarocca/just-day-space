<template>
  <div class="signup container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Login</Title>
      </Head>
    </Html>
    <div class="grid">
      <div class="col col-12 lg:col-5">
        <h1 class="mb-3">Beta User Login</h1>
        <h3>Get ready to make some money from your space!</h3>
        <divider class="my-6 w-2" />
        <div class="width400">
          <supabase-login-with-email class="mb-4" />
          <p class="small mb-4">
            <nuxt-link to="/forgot-password" @click="emit('closePanel')">
              Forgot Password?
            </nuxt-link>
          </p>
        </div>
      </div>
      <div class="col col-7 hidden lg:flex">
        <img
          class="signup-image rounded"
          src="/images/hero.jpg"
          alt="Signup for just day space"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius);
}
</style>
