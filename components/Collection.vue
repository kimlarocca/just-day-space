<template>
  <div class="collection">
    <h2 class="mb-4">{{ title }}</h2>
    <div class="grid mb-3">
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="https://plus.unsplash.com/premium_photo-1683133267429-7915ba56827a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Relaxing Yoga Studio"
          location="Portland, OR"
          :price="49"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="https://plus.unsplash.com/premium_photo-1675745329659-29044cb6adbb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Private Plunge Pool"
          location="Los Angeles, CA"
          :price="149"
          hourly
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="https://images.unsplash.com/photo-1692986134127-f906b1a02599?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Beach House with Pool"
          location="Oregon Coast, OR"
          :price="499"
          daily
        />
      </div>
      <div class="col col-12 md:col-6 lg:col-3">
        <Card
          image="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Modern Home Office With Views"
          location="Seattle, WA"
          :price="29"
          hourly
        />
      </div>
    </div>
    <p class="text-base">
      <nuxt-link to="/">
        View more {{ title }} <i class="pi pi-angle-right" />
      </nuxt-link>
    </p>
  </div>
</template>

<script setup>
const props = defineProps( {
  title: {
    type: String,
    default: false,
  }
} )
</script>