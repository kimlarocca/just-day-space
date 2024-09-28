<template>
  <div class="signup container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Sign Up</Title>
      </Head>
    </Html>
    <h1 class="mb-3">Get started for free</h1>
    <h4>Start creating and sharing your captions today</h4>
    <divider class="my-6 w-2" />
    <p class="mb-4">Please fill out the form below to sign up:</p>
    <div class="width400">
      <supabase-signup-with-email class="mb-6" />
      <p class="mb-3">Or sign in with google:</p>
      <supabase-login-with-google />
    </div>
  </div>
</template>
