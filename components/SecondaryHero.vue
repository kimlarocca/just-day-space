<template>
  <div class="secondary-hero p-4">
    <h1>{{ title }}</h1>
    <h2 v-if="subTitle" class="mt-2 mb-6">{{ subTitle }}</h2>
  </div>
</template>

<script setup>
const props = defineProps( {
  title: {
    type: String,
    default: null,
    required: true
  },
  subTitle: {
    type: String,
    default: null,
    required: false
  },
} )
</script>

<style lang="scss" scoped>
.secondary-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("/images/hero.jpg") no-repeat center center;
  background-size: cover;
  min-height: 200px;
}
.secondary-hero h1 {
  color: white;
  font-size: var(--font-size-16);
}
.secondary-hero h2 {
  color: white;
}
</style>