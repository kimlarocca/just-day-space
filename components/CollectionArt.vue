<template>
  <div class="collection">
    <h2 class="mb-4">{{ title }}</h2>
    <div class="grid mb-3">
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/art1.jpg"
          title="Tiny Home Art Studio"
          location="Culver City, CA"
          :price="20"
          :stars="4.3"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/art2.jpg"
          title="Huge Loft Art Studio"
          location="Los Angeles, CA"
          :price="49"
          :stars="4.6"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/art3.jpg"
          title="Green House Art Studio & Garden"
          location="Portland, OR"
          :price="299"
          :stars="4.2"
          daily
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/art4.jpg"
          title="Art Studio / Garage"
          location="Los Angeles, CA"
          :price="29"
          :stars="4.8"
          hourly
        />
      </div>
    </div>
    <p class="text-sm flex align-items-center">
      <nuxt-link to="/"> View More {{ title }} </nuxt-link>
      <i class="pi pi-angle-right plain" />
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: false
  }
})
</script>
