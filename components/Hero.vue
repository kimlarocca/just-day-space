<template>
  <div class="hero p-4">
    <h1 class="mb-2">Find Your Escape</h1>
    <h2 class="mb-6">Connecting empty spaces with people who need them</h2>
    <div class="p-inputgroup w-fit">
      <span class="p-float-label inline">
        <InputText
          id="location"
          v-model="location"
          required
          style="width: 300px"
        />
        <label for="location">Set Your Location</label>
      </span>
      <Button icon="pi pi-search" class="px-4" />
    </div>
  </div>
</template>

<script setup>
const location = ref( '' )
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("/images/hero.jpg") no-repeat center center;
  background-size: cover;
  min-height: 500px;
}
.hero h1 {
  color: white;
  font-weight: 700;
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