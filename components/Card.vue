<template>
  <div class="p-card">
    <div class="p-card-image mb-2">
      <img :src="image" alt="card image" />
    </div>
    <div class="p-card-body">
      <p class="font-bold">{{ title }}</p>
      <p class="text-base">Location: {{ location }}</p>
      <p class="text-base">
        <span class="green font-bold">{{ formatCurrency(price) }}</span>
        {{ daily ? "daily" : "" }}
        {{ hourly ? "hourly" : "" }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps( {
  image: {
    type: String,
    default: false,
  },
  title: {
    type: String,
    default: false,
  },
  location: {
    type: String,
    default: false,
  },
  price: {
    type: Number,
    default: false,
  },
  hourly: {
    type: Boolean,
    default: false,
  },
  daily: {
    type: Boolean,
    default: false,
  },
} )
</script>

<style lang="scss" scoped>
.p-card-image {
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
}
</style>