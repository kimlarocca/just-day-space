<template>
  <div class="index">
    <Hero class="mb-3" />
    <div class="p-6">
      <div class="flex align-items-center gap-2 flex-wrap mb-6">
        <div
          class="tag large outline clickable"
          :class="category === 'hardship' ? 'active' : ''"
          @click="changeCategory('hardship')"
        >
          pools
        </div>
        <div
          class="tag large outline clickable"
          :class="category === 'failure' ? 'active' : ''"
          @click="changeCategory('failure')"
        >
          gyms & yoga studios
        </div>
        <div
          class="tag large outline clickable"
          :class="category === 'grief' ? 'active' : ''"
          @click="changeCategory('grief')"
        >
          office spaces
        </div>
        <div
          class="tag large outline clickable"
          :class="category === 'suffering' ? 'active' : ''"
          @click="changeCategory('suffering')"
        >
          music studios
        </div>
        <div
          class="tag large outline clickable"
          :class="category === 'strength' ? 'active' : ''"
          @click="changeCategory('strength')"
        >
          outdoor play
        </div>
        <div class="tag large outline clickable">
          <i class="pi pi-sliders-h mr-1" style="font-size: 0.8rem" /> more
          filters
        </div>
      </div>
      <Collection title="Popular Places" class="mb-7" />
      <CollectionOffice title="Places To Work" class="mb-7" />
      <CollectionArt title="Art Studios" class="mb-8" />
      <RentYourSpace />
    </div>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const client = useSupabaseClient()
const currentUserProfile = useCurrentUserProfile()

if (currentUser.value) {
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', currentUser.value.id)
    .single()
  if (error) {
    console.error(error)
  } else if (data) {
    currentUserProfile.value = data
  }
}
</script>
