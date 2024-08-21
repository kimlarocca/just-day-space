<template>
  <nav v-if="currentUserProfile">
    <nuxt-link
      to="/dashboard"
      class="block plain mb-4 text-center"
      @click="emit('menuClicked', true)"
    >
      <cuetip-logo-minimal />
    </nuxt-link>
    <ul>
      <li>
        <nuxt-link
          to="/weekly-pricing"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-dollar mr-3" /> enter weekly pricing
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.farm_owner">
        <nuxt-link
          to="/dashboard"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-chart-bar mr-3" /> cannabis dashboard
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.hemp_farm_owner">
        <nuxt-link
          to="/dashboard-hemp"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-chart-bar mr-3" /> hemp dashboard
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.lab_owner">
        <nuxt-link
          to="/dashboard-concentrates"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-chart-bar mr-3" /> concentrates dashboard
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.farm_owner">
        <nuxt-link
          to="/cannabis"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-folder mr-3" /> my strains
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.hemp_farm_owner">
        <nuxt-link
          to="/hemp"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-folder mr-3" /> my hemp
        </nuxt-link>
      </li>
      <li v-if="currentUserProfile.lab_owner">
        <nuxt-link
          to="/concentrates"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-folder mr-3" /> my concentrates
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/history"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-history mr-3" /> my pricing history
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/settings"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-user mr-3" /> manage profile
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/help"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-question-circle mr-3" /> help center
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/logout"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          <i class="pi pi-sign-out mr-3" /> logout
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const currentUserProfile = useCurrentUserProfile()
const emit = defineEmits( [ 'menuClicked' ] )
</script>

<style lang="scss">
nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    height: 48px;
    line-height: 48px;
    a,
    a:visited,
    a:active {
      padding-left: 1.5rem;
      text-transform: capitalize;
      display: block;
      width: 95%;
      color: var(--gray);
      font-weight: 500;
      &:hover {
        color: var(--green);
      }
      &.router-link-active:first-of-type {
        background: var(--green);
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        color: var(--white);
      }
    }
  }
}
</style>
