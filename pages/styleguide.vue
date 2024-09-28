<template>
  <div class="styleguide container p-4">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Styleguide</Title>
      </Head>
    </Html>
    <h1>Styleguide</h1>
    <divider class="my-7" />
    <h1 class="mb-4">H1 Lorem Ipsum Dolor Sit Amet</h1>
    <h2 class="mb-4">H2 Lorem Ipsum Dolor Sit Amet</h2>
    <h3 class="mb-4">H3 Lorem Ipsum Dolor Sit Amet</h3>
    <h4 class="mb-4">H4 Lorem Ipsum Dolor Sit Amet</h4>
    <h5 class="mb-4">H5 Lorem Ipsum Dolor Sit Amet</h5>
    <h6 class="mb-4">H6 Lorem Ipsum Dolor Sit Amet</h6>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, esse
      eum ex explicabo facere maiores minus mollitia nulla qui saepe tempora
      veritatis. Dolore ducimus fuga provident sed temporibus. Ab, perspiciatis.
    </p>
    <p class="mb-2">
      <nuxt-link to="/">this is an inline link</nuxt-link>
    </p>
    <p class="mb-2">
      Text with a tooltip!
      <i
        class="pi pi-info-circle cursor-pointer"
        v-tooltip.right="'Here is the tooltip!'"
      />
    </p>
    <p class="mb-2">
      Here is some <strong>bold text</strong> and some <em>italic text</em>.
    </p>
    <p class="mb-4 small">Here is a paragraph with small text.</p>
    <div class="tag mb-4">this is a tag</div>
    <divider class="my-7" />
    <InputText placeholder="Email Address" v-model="value" class="block mb-3" />
    <div class="mb-3">
      <Password toggleMask placeholder="Password" v-model="value" />
    </div>
    <InputText disabled placeholder="Disabled" class="block mb-3" />
    <Dropdown
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
      class="mb-3"
    />
    <InputSwitch v-model="checked" class="block mb-3" />
    <div class="p-inputgroup flex-1 mb-6">
      <InputText placeholder="Search" />
      <Button icon="pi pi-search" />
    </div>
    <divider class="my-7" />
    <Button label="example button" class="block mb-3" />
    <Button label="outlined button" class="block mb-3 p-button-outlined" />
    <Button label="Disabled" disabled class="block mb-3" />
    <Button
      label="Loading State"
      icon="pi pi-check"
      :loading="true"
      class="block mb-6"
    />
    <ProgressSpinner class="mb-6" />
    <div class="width400">
      <v-timeline :timeline-items="timelineData" class="mb-6" />
    </div>
    <Message severity="info">An informative message goes here.</Message>
    <Message severity="warn">A warning message goes here.</Message>
    <Message severity="error">
      Sorry, there was a problem logging in to your account.
    </Message>
    <Message class="mb-4" severity="success">
      Success! Please check your email for the magic link.
    </Message>
  </div>
</template>

<script setup>
const checked = ref( true )
const cities = ref( [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
] )
const selectedCity = ref()
const value = ref( 'sample text' )

const timelineData = ref( [
  {
    title: 'Step 1',
    description: 'Description of step 1',
    completed: true,
  },
  {
    title: 'Step 2',
    completed: true,
  },
  {
    title: 'Step 3',
    completed: false,
  },
  {
    title: 'Step 4',
    description: 'Description of step 3',
    completed: false,
  },
] )
</script>
