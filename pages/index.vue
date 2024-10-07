<template>
  <div class="landing-page">
    <div
      class="container-black flex justify-content-center align-items-center flex-column p-5 text-center"
    >
      <p class="mb-2">JustDaySpace is</p>
      <h1 class="mb-6">Launching Soon!</h1>
      <a href="https://amyinfinity.com/justdayspace-signup" class="plain">
        <Button label="Get Early Access" />
      </a>
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  layout: 'blank',
} )
</script>

<style lang="scss" scoped>
.landing-page {
  height: 100vh;
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: center;
}
.landing-page h1 {
  font-size: 4rem;
  color: white;
  font-weight: 400;
  line-height: 4rem;
  @media all and (min-width: 768px) {
    font-size: 6rem;
    line-height: 6rem;
  }
}
.landing-page p {
  font-size: 1.5rem;
  color: white;
  @media all and (min-width: 768px) {
    font-size: 2rem;
  }
}
</style>