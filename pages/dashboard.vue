<template>
  <div class="dashboard p-4 px-6">
    <Html lang="en">
      <Head>
        <Title>Just Day Space | Manage Your Spaces</Title>
      </Head>
    </Html>
    <transition name="fade">
      <div class="grid top" v-if="progress === 0">
        <div class="col col-5">
          <h1 class="h-full flex align-items-center">
            Let's Get Started & Add Your First Space!
          </h1>
        </div>
        <div class="col col-7">
          <transition name="fade">
            <div v-if="showImage">
              <div class="grid mb-5">
                <div class="col col-9">
                  <h6 class="mb-2">Step 1</h6>
                  <h2 class="mb-2">The Basics</h2>
                  <p>
                    Share some basic information like where and what type your
                    space is.
                  </p>
                </div>
                <img
                  class="col col-3 more-rounded"
                  src="/images/signup.jpg"
                  alt="a home with a private pool and views of the ocean provided by just day space"
                />
              </div>
              <div class="grid mb-5">
                <div class="col col-9">
                  <h6 class="mb-2">Step 2</h6>
                  <h2 class="mb-2">Add Photos</h2>
                  <p>
                    Upload some photos of your space so guests can see what it
                    looks like.
                  </p>
                </div>
                <img
                  class="col col-3 more-rounded"
                  src="/images/step2.jpg"
                  alt="step 2"
                />
              </div>
              <div class="grid">
                <div class="col col-9">
                  <h6 class="mb-2">Step 3</h6>
                  <h2 class="mb-2">Finish & Publish</h2>
                  <p>
                    Set your prices and availability, then publish your space!
                  </p>
                </div>
                <img
                  class="col col-3 more-rounded"
                  src="/images/step3.jpg"
                  alt="step 3"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="grid top" v-if="progress === 20">
        <div class="col col-6">
          <div class="h-full flex align-items-center">
            <div>
              <h6 class="mb-3">Step 1: The Basics</h6>
              <h1 class="mb-3">Is This Your Location?</h1>
              <p>
                Don't worry, your address is not shared with anyone until they
                book your space!
              </p>
            </div>
          </div>
        </div>
        <div class="col col-6">
          <transition name="fade">
            <img
              v-if="showImage"
              class="map-image"
              src="/images/map.jpg"
              alt="map of your location"
            />
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="grid top" v-if="progress === 40">
        <div class="col col-6">
          <div class="h-full flex align-items-center">
            <div>
              <h6 class="mb-3">Step 1: The Basics</h6>
              <h1 class="mb-3">Add Some Basic Details</h1>
              <p>
                Let us know a little more about your space! Don't worry, you can
                always change these details later.
              </p>
            </div>
          </div>
        </div>
        <div class="col col-6">
          <transition name="fade">
            <div v-if="showImage">
              <div class="mb-5">
                <h5 class="mb-3">What do you want to call your space?</h5>
                <InputText
                  id="email"
                  v-model="title"
                  class="w-full"
                  type="email"
                  placeholder="Keep the title short and sweet"
                  required
                />
              </div>
              <div class="mb-5">
                <h5 class="mb-3">What type of space do you have?</h5>
                <InputText
                  id="type"
                  v-model="type"
                  class="w-full"
                  type="text"
                  placeholder="Home Office, Pool, Yoga Studio..."
                  required
                />
              </div>
              <div class="mb-5">
                <h5 class="mb-3">Is there a restroom?</h5>
                <div class="flex flex-wrap gap-4">
                  <div class="flex items-center gap-2">
                    <RadioButton
                      v-model="restroom"
                      inputId="restroom1"
                      name="restroom"
                      value="true"
                    />
                    <label for="restroom1">Yes</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton
                      v-model="restroom"
                      inputId="restroom2"
                      name="restroom"
                      value="false"
                    />
                    <label for="restroom2">No</label>
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <h5 class="mb-3">Write a short description (optional)</h5>
                <Textarea
                  id="description"
                  v-model="description"
                  class="w-full"
                  type="text"
                  placeholder="Tell guests a little more about your space"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="grid top" v-if="progress === 60">
        <div class="col col-6">
          <div class="h-full flex align-items-center">
            <div>
              <h6 class="mb-3">Step 2: Upload Photos</h6>
              <h1 class="mb-3">
                Let's add some photos of your beautiful space!
              </h1>
              <p>
                Our top spaces have at least 5 photos, but you can skip this
                step for now.
              </p>
            </div>
          </div>
        </div>
        <div class="col col-6">
          <transition name="fade">
            <div
              v-if="showImage"
              class="container-gray flex align-items-center justify-content-center flex-column"
            >
              <i class="pi pi-cloud-upload mb-3" style="font-size: 5rem" />
              <p>Drag and drop files to here to upload.</p>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="grid top" v-if="progress === 80">
        <div class="col col-6">
          <div class="h-full flex align-items-center">
            <div>
              <h6 class="mb-3">Step 3: Finish & Publish</h6>
              <h1 class="mb-3">Last step, you're almost there!</h1>
              <p>Set your prices and guest maximum, then publish your space.</p>
            </div>
          </div>
        </div>
        <div class="col col-6">
          <transition name="fade">
            <div v-if="showImage">
              <div class="mb-6">
                <h5 class="mb-3">How much do you want to charge per hour?</h5>
                <InputNumber
                  id="price"
                  v-model="price"
                  prefix="$"
                  suffix="/hour"
                  class="w-full"
                  type="number"
                  placeholder="Enter an hourly rate"
                  required
                />
                <Message severity="info">
                  Based on your listing type and location, we recommend
                  <strong>$35/hour</strong>
                </Message>
              </div>
              <div class="mb-6">
                <h5 class="mb-3">
                  How many guests can your space accommodate?
                </h5>
                <InputText
                  id="guests"
                  v-model="guests"
                  class="w-full"
                  type="number"
                  placeholder="Set your guest maximum"
                  required
                />
              </div>
              <div>
                <h5 class="mb-3">Hide this listing from search results?</h5>
                <div class="flex align-items-center gap-2">
                  <Checkbox v-model="hideListing" binary />
                  <p>don't publish for now</p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="grid top" v-if="progress === 100">
        <div class="col col-6">
          <div class="h-full flex align-items-center">
            <div>
              <h6 class="mb-3">Step 3: Finish & Publish</h6>
              <h1 class="mb-3">It's time to celebrate!</h1>
              <p>
                Your space is now ready for guests to book.<br />Raise a glass,
                you've done your adulting for the day.
              </p>
            </div>
          </div>
        </div>
        <div class="col col-6">
          <transition name="fade">
            <div v-if="showImage">
              <img
                src="/images/celebrate.jpg"
                alt="celebrate"
                class="rounded"
              />
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <div class="bottom">
      <ProgressBar :value="progress" />
      <div class="flex align-items-center justify-content-between p-3">
        <nuxt-link to="#" class="btn btn-primary">
          <p
            class="overflow-hidden"
            v-if="progress > 0"
            @click="progress -= 20"
          >
            <i class="pi pi-angle-left" /> Back
          </p>
        </nuxt-link>
        <div class="flex gap-3">
          <Button
            v-if="progress === 60"
            @click="nextStep()"
            label="Skip"
            class="outline"
          />
          <Button @click="nextStep()" :label="label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

definePageMeta({
  layout: 'no-footer'
})

const currentUserProfile = useCurrentUserProfile()
const hasSpaces = ref(false)
const progress = ref(0)
const showImage = ref(true)
const title = ref('')
const type = ref('')
const description = ref('')
const price = ref(null)
const guests = ref(null)
const restroom = ref(true)
const hideListing = ref(false)

//computed property for label
const label = computed(() => {
  if (progress.value === 0) {
    return 'Get Started'
  } else if (progress.value === 20) {
    return 'Yes, This is My Location'
  } else if (progress.value === 40) {
    return 'Next'
  } else if (progress.value === 60) {
    return 'Next'
  } else if (progress.value === 80) {
    return 'Finish & Publish'
  }
  return 'Return To Dashboard'
})

//next step
const nextStep = () => {
  showImage.value = false
  progress.value += 20
  //wait 1 second
  setTimeout(() => {
    showImage.value = true
  }, 500)
}

onMounted(() => {
  //check if user has completed required profile fields
  if (currentUserProfile.value && !currentUserProfile.value.birthday) {
    navigateTo('/onboarding')
  }

  // check if user has added any spaces yet
})
</script>

<style lang="scss">
.top {
  min-height: 420px;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
}
.map-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
}
.container-gray {
  height: 400px;
}
</style>
