<template>
  <div class="signup container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Sign Up</Title>
      </Head>
    </Html>
    <div class="grid">
      <div class="col col-12 lg:col-5">
        <h1 class="mb-3">Get started for free</h1>
        <h3>Let's make some money from your empty space!</h3>
        <divider class="my-6 w-2" />
        <p class="mb-4">Please fill out the form below to sign up:</p>
        <div class="width400">
          <supabase-signup-with-email class="mb-6" />
          <!-- <p class="mb-3">Or sign in with google:</p>
          <supabase-login-with-google /> -->
        </div>
      </div>
      <div class="col col-7 hidden lg:flex">
        <img
          class="signup-image rounded"
          src="/images/signup.jpg"
          alt="a home on a lake with boats and palm trees provided by just day space"
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