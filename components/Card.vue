<template>
  <div class="p-card">
    <div class="p-card-image mb-2">
      <img :src="image" alt="card image" />
    </div>
    <div class="p-card-body flex justify-content-between">
      <div>
        <p class="font-bold">{{ title }}</p>
        <p class="text-sm">{{ location }}</p>
        <p class="text-sm">
          <span class="green font-bold">{{ formatCurrency(price) }}</span>
          {{ daily ? 'daily' : '' }}
          {{ hourly ? 'hourly' : '' }}
        </p>
      </div>
      <p class="text-sm">
        <i class="pi pi-star-fill ml-1" style="font-size: 0.75rem" />
        {{ stars }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: false
  },
  title: {
    type: String,
    default: false
  },
  location: {
    type: String,
    default: false
  },
  price: {
    type: Number,
    default: false
  },
  hourly: {
    type: Boolean,
    default: false
  },
  daily: {
    type: Boolean,
    default: false
  },
  stars: {
    type: Number,
    default: 0
  }
})
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
