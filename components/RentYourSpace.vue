<template>
  <div class="hero rounded p-4 px-6">
    <h1 class="mb-2">Rent Your Space</h1>
    <h2 class="mb-5">
      Turn your empty space into a money maker<br />with Just Day Space!
    </h2>
    <Button label="get started for free" class="px-4" />
  </div>
</template>

<script setup>
const location = ref('')
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('/images/signup.jpg') no-repeat center center;
  background-size: cover;
  min-height: 500px;
}
.hero h1 {
  color: white;
  font-size: var(--font-size-16);
}
.hero h2 {
  color: white;
}
.hero .p-inputtext {
  border: 2px solid transparent;
  min-width: 220px;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  overflow: hidden;
  padding: 4px;
}
.hero .p-float-label input:focus ~ label,
.hero .p-float-label .p-inputwrapper-focus ~ label {
  color: var(--text-color);
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
}
</style>
