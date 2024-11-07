<template>
  <div class="collection">
    <h2 class="mb-4">{{ title }}</h2>
    <div class="grid mb-3">
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/office1.jpg"
          title="Serene Home Office"
          location="Beaverton, OR"
          :price="49"
          :stars="4.4"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/office2.jpg"
          title="Woodsy Home Office Retreat"
          location="Leggett, CA"
          :price="25"
          :stars="4.8"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/office3.jpg"
          title="Home Office By The Beach"
          location="Santa Monica, CA"
          :price="29"
          :stars="4.7"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="/images/office4.jpg"
          title="Professionally Designed Home Office"
          location="Portland, OR"
          :price="35"
          :stars="4.9"
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
