<template>
  <div class="forgot-password">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Forgot Password</Title>
      </Head>
    </Html>
    <header class="flex align-items-end justify-content-between">
      <nuxt-link to="/" class="plain"><cuetip-logo /></nuxt-link>
      <p class="small">
        Already have an account?
        <nuxt-link to="/" class="like-h6">Sign In</nuxt-link>
      </p>
    </header>
    <divider class="mb-6" />
    <h1 class="mb-3">Forgot Your Password?</h1>
    <h2 class="mb-2">Sign in with a magic link</h2>
    <p>
      Enter the email address you used when you joined cuetip and we'll send you
      a magic link you can use to sign in. Once you are logged in, you may reset
      your password.
    </p>
    <Divider class="mb-4 pt-6 w-4 lg:w-2" />
    <supabase-login-with-magic-link />
  </div>
</template>
