<template>
  <div class="weekly-pricing">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Weekly Pricing</Title>
      </Head>
    </Html>
    <div class="flex align-items-center mb-4">
      <h2>My Weekly Pricing</h2>
      <div class="tag ml-3">
        {{ previousSundayMonth }} {{ previousSundayDay }} -
        {{ nextSundayMonth }}
        {{ nextSundayDay }}
      </div>
    </div>
    <countdown-timer class="mb-5" />
    <ProgressSpinner v-if="loading" />
    <h3 class="tab-link mb-5">Cannabis</h3>
    <div v-if="sortedUserStrains" class="strains-table">
      <div
        v-for="(strain, index) in sortedUserStrains"
        :key="index"
        class="flex flex-column md:flex-row md:align-items-center justify-content-between mb-5 md:mb-3 w-full"
      >
        <div class="container-white flex align-items-center w-full mb-3">
          <img
            v-if="strain.strains.image_url"
            :src="strain.strains.image_url"
            :alt="strain.strains.name"
            class="strain-thumbnail m-2"
          />
          <icons-cannabis-leaf v-else class="green mx-2 my-1" />
          <div class="mr-3">
            <h5 class="mb-1">
              {{ strain.strains.name }} ({{ strain.strains.category }})
            </h5>
            <p class="mb-1">
              Project: {{ strain.user_locations.location_name }}
            </p>
            <div v-if="strain.rating" class="tag inline-block rating mr-2">
              {{ strain.rating }}
            </div>
            <div class="tag small inline-block" :class="strain.growing_method">
              {{ strain.growing_method }}
            </div>
          </div>
        </div>
        <div class="flex flex-row md:flex-column align-items-center md:ml-3">
          <div class="flex align-items-center">
            <i class="pi pi-dollar text-2xl green mr-1" />

            <span class="p-float-label inline">
              <InputNumber
                v-model="
                  prices[
                    `${strain.strain_id}-${strain.growing_method}-${strain.user_locations.id}`
                  ]
                "
                inputId="integeronly"
                class="weekly-price-input"
                placeholder="Price Per LB"
              />
              <label for="full_name">Price Per LB</label>
            </span>
          </div>
          <p
            v-if="strain.last_weeks_price"
            class="small font-italic text-right mt-1 ml-2"
          >
            Last week: {{ formatCurrency(strain.last_weeks_price) }}
          </p>
        </div>
      </div>
    </div>
    <div class="hidden" v-for="(location, index) in locations" :key="index">
      <h3 class="tab-link my-5">Trim: {{ location.location_name }}</h3>
      <div
        class="flex flex-column md:flex-row md:align-items-center justify-content-between mb-5 md:mb-3 w-full"
      >
        <div class="container-white flex align-items-center w-full mb-3">
          <icons-cannabis-leaf class="green mx-2 my-1" />
          <div class="mr-3">
            <h5 class="mb-1">Clean (Tested)</h5>
          </div>
        </div>
        <div class="flex flex-row md:flex-column align-items-center md:ml-3">
          <div class="flex align-items-center">
            <i class="pi pi-dollar text-2xl green mr-1" />
            <InputNumber
              v-model="cleanTrimPrice[location.location_name]"
              inputId="integeronly"
              class="weekly-price-input"
            />
          </div>
          <p class="small text-right ml-2">Price Per LB</p>
        </div>
      </div>
      <div
        class="flex flex-column md:flex-row md:align-items-center justify-content-between mb-5 md:mb-3 w-full"
      >
        <div class="container-white flex align-items-center w-full mb-3">
          <icons-cannabis-leaf class="green mx-2 my-1" />
          <div class="mr-3">
            <h5 class="mb-1">Dirty (Untested)</h5>
          </div>
        </div>
        <div class="flex flex-row md:flex-column align-items-center md:ml-3">
          <div class="flex align-items-center">
            <i class="pi pi-dollar text-2xl green mr-1" />
            <InputNumber
              v-model="dirtyTrimPrice[location.location_name]"
              inputId="integeronly"
              class="weekly-price-input"
              suffix=" / lb"
            />
          </div>
          <p class="small text-right ml-2">Price Per LB</p>
        </div>
      </div>
    </div>
    <Button
      label="Continue & Confirm"
      class="mt-4"
      @click="showConfirmation = true"
    />
    <Dialog
      v-model:visible="showConfirmation"
      modal
      class="text-center"
      @update:visible="showSuccessMessage = false"
    >
      <icons-large-check class="mb-2" />
      <h2 class="mb-4">Confirm Your Weekly Prices</h2>
      <template v-if="showSuccessMessage">
        <Message class="mb-4" severity="success" :closable="false">
          Success! Your prices have been saved.
        </Message>
        <nuxt-link to="/dashboard" class="plain">
          <Button label="Return To The Dashboard" />
        </nuxt-link>
      </template>
      <template v-else>
        <table class="w-full mb-4">
          <tr
            v-for="(strain, index) in userStrainsWithPrices"
            :key="index"
            class="divider"
          >
            <td>
              <p>{{ strain.strains.name }}</p>
            </td>
            <td>
              <div class="tag small" :class="strain.growing_method">
                {{ strain.growing_method }}
              </div>
            </td>
            <td>
              <p v-if="strain.price">{{ formatCurrency(strain.price) }}/lb</p>
              <p v-else class="red small">No Price Entered</p>
            </td>
          </tr>
          <tr
            v-for="(cleanTrim, cleanTrimIndex) in cleanTrimPrice"
            :key="cleanTrimIndex"
            class="divider"
          >
            <td>
              <p>Clean Trim: {{ cleanTrimIndex }}</p>
            </td>
            <td>
              <p v-if="cleanTrim">${{ cleanTrim }}/lb</p>
              <p v-else class="red">No Price Entered</p>
            </td>
          </tr>
          <tr
            v-for="(dirtyTrim, dirtyTrimIndex) in dirtyTrimPrice"
            :key="dirtyTrimIndex"
            class="divider divider-bottom"
          >
            <td>
              <p>Dirty Trim: {{ dirtyTrimIndex }}</p>
            </td>
            <td>
              <p v-if="dirtyTrim">${{ dirtyTrim }}/lb</p>
              <p v-else class="red">No Price Entered</p>
            </td>
          </tr>
        </table>
        <Button
          class="p-button-outlined fit-width mr-3"
          @click="showConfirmation = null"
          label="Cancel"
        />
        <Button
          class="fit-width"
          @click="insertPrices"
          label="Confirm & Submit"
          :loading="loading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const cleanTrimPrice = ref( {} )
const dirtyTrimPrice = ref( {} )
const loading = ref( false )
const locations = ref( null )
const priceHistory = ref( null )
const prices = ref( {} )
const showConfirmation = ref( false )
const showSuccessMessage = ref( false )
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userStrains = ref( null )

// get locations from the user_locations table for this user
const { data: locationsData } = await supabase
  .from( 'user_locations' )
  .select( '*' )
  .eq( 'user_id', user.value?.id )
  .order( 'location_name' )
if ( locationsData ) {
  locations.value = locationsData
}

// get the pricing history data for the last 7 days for the logged in user
const { data: lastWeeksPrices } = await supabase.rpc( 'get_last_weeks_prices_by_user_id', {
  current_user_id: user.value.id
} )
if ( lastWeeksPrices ) {
  priceHistory.value = lastWeeksPrices
} else {
  console.log( 'lastWeeksPrices error', lastWeeksPrices )
}

const fetchUserStrains = async () => {
  loading.value = true
  const { data } = await supabase
    .from( 'user_strains' )
    .select(
      `
    strain_id,
    location_id,
    growing_method,
    rating,
    strains( id, name, category, subtitle, image_url ),
    user_locations( id, location_name, zip_code, city, state, county, region )
    `
    )
    .eq( 'user_id', user.value?.id )
  if ( data ) {
    userStrains.value = data
    if ( data ) {
      userStrains.value = data
      // cross check the priceHistory array and add last weeks prices to the userStrains array
      if ( priceHistory.value ) {
        for ( let i = 0; i < userStrains.value.length; i++ ) {
          for ( let j = 0; j < priceHistory.value.length; j++ ) {
            if ( userStrains.value[ i ].strain_id === priceHistory.value[ j ].strain_id && userStrains.value[ i ].location_id === priceHistory.value[ j ].location_id && userStrains.value[ i ].growing_method === priceHistory.value[ j ].growing_method ) {
              userStrains.value[ i ].last_weeks_price = priceHistory.value[ j ].price
            }
          }
        }
      }
    }
  }
  loading.value = false
}

// computed property that sorts the userStrains by the location and then the strain name
const sortedUserStrains = computed( () => {
  if ( userStrains.value ) {
    return userStrains.value.sort( ( a, b ) => {
      if ( a.user_locations.location_name < b.user_locations.location_name ) {
        return -1
      } else if (
        a.user_locations.location_name > b.user_locations.location_name
      ) {
        return 1
      } else {
        return a.strains.name.localeCompare( b.strains.name )
      }
    } )
  }
} )

// get and format the dates for today, previous sunday, and next sunday
const now = new Date()
const previousSunday = new Date( now.setDate( now.getDate() - now.getDay() ) )
const previousSundayMonth = previousSunday.toLocaleString( 'default', {
  month: 'short',
} )
const previousSundayDay = previousSunday.getDate()
const nextSunday = new Date( now.setDate( now.getDate() - now.getDay() + 7 ) )
const nextSundayMonth = nextSunday.toLocaleString( 'default', { month: 'short' } )
const nextSundayDay = nextSunday.getDate()

const userStrainsWithPrices = computed( () => {
  if ( userStrains.value ) {
    return userStrains.value.map( ( strain ) => {
      strain.price = prices.value[ `${ strain.strain_id }-${ strain.growing_method }-${ strain.user_locations.id }` ]
      return strain
    } )
  }
} )

// insert the prices to the database
const insertPrices = async () => {
  loading.value = true
  for ( const strain of userStrainsWithPrices.value ) {
    if ( strain.price && strain.price > 0 ) {
      await supabase.from( 'pricing' ).insert( [
        {
          created_at: new Date().toISOString().slice( 0, 10 ),
          growing_method: strain?.growing_method,
          category: strain?.strains.category,
          price: strain?.price,
          name: strain?.strains.name,
          region: strain?.user_locations.region,
          state: strain?.user_locations.state,
          strain_id: strain?.strain_id,
          user_id: user.value?.id,
          rating: strain?.rating,
          county: strain?.user_locations?.county,
          zip_code: strain?.user_locations?.zip_code,
          city: strain?.user_locations?.city,
          location_id: strain?.user_locations?.id,
        },
      ] )
    }
  }
  // add clean trim to the pricing table
  if ( cleanTrimPrice.value ) {
    for ( const [ key, value ] of Object.entries( cleanTrimPrice.value ) ) {
      if ( value && value > 0 ) {
        // find the location object that matches the key in the locations array
        const location = locations.value.find( ( location ) => {
          return location.location_name === key
        } )
        await supabase.from( 'pricing' ).insert( [
          {
            created_at: new Date().toISOString().slice( 0, 10 ),
            price: value,
            name: 'Clean Trim',
            region: location?.region,
            state: location?.state,
            user_id: user.value?.id,
            county: location?.county,
            zip_code: location?.zip_code,
            city: location?.city,
            location_id: location?.id,
          },
        ] )
      }
    }
  }
  // add dirty trim to the pricing table
  if ( dirtyTrimPrice.value ) {
    for ( const [ key, value ] of Object.entries( dirtyTrimPrice.value ) ) {
      if ( value && value > 0 ) {
        // find the location object that matches the key in the locations array
        const location = locations.value.find( ( location ) => {
          return location.location_name === key
        } )
        await supabase.from( 'pricing' ).insert( [
          {
            created_at: new Date().toISOString().slice( 0, 10 ),
            price: value,
            name: 'Dirty Trim',
            region: location?.region,
            state: location?.state,
            user_id: user.value?.id,
            county: location?.county,
            zip_code: location?.zip_code,
            city: location?.city,
            location_id: location?.id,
          },
        ] )
      }
    }
  }
  cleanTrimPrice.value = {}
  dirtyTrimPrice.value = {}
  prices.value = {}
  loading.value = false
  showSuccessMessage.value = true
}

onMounted( () => {
  fetchUserStrains()
} )
</script>

<style lang="scss">
.weekly-pricing {
  .weekly-price-input {
    width: 120px;
    min-width: 120px;
  }

  .p-inputtext {
    font-size: 1.5rem;
  }

  .strain-thumbnail,
  .cannabis-leaf {
    width: 100px;
    height: auto;
  }
}
</style>
