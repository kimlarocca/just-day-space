<template>
  <nav class="mx-4">
    <logo class="mb-3" />
    <nuxt-link to="/login" class="plain" @click="emit('menuClicked', true)">
      <Button label="log in or sign up" class="w-full" />
    </nuxt-link>
    <ul class="mt-3">
      <li>
        <nuxt-link
          to="/settings"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          Manage profile
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/help"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          Help center
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/logout"
          class="plain flex align-items-center"
          @click="emit('menuClicked', true)"
        >
          Logout
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
    height: 40px;
    line-height: 40px;
    a,
    a:visited,
    a:active {
      text-transform: capitalize;
      display: block;
      width: 95%;
      color: var(--text-color);
      font-weight: 300;
      font-size: var(--font-size-6);
      &:hover {
        color: var(--purple);
      }
      &.router-link-active:first-of-type {
        background: var(--purple);
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        color: var(--white);
      }
    }
  }
}
</style>
