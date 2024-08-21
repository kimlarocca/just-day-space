<template>
  <footer class="pt-7">
    <divider class="gray mb-7" />
    <div class="flex justify-content-between flex-column lg:flex-row">
      <p class="mb-2 uppercase font-bold">
        <a
          href="https://cuetip.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          class="plain mr-4"
        >
          Privacy Policy
        </a>
        <a
          href="https://cuetip.com/terms-and-conditions/"
          target="_blank"
          rel="noopener noreferrer"
          class="plain mr-4"
        >
          Terms
        </a>
        <a
          href="https://cuetip.com/contact/"
          target="_blank"
          rel="noopener noreferrer"
          class="plain"
        >
          Help
        </a>
      </p>
      <p>Copyright © {{ currentYear }} Cuetip. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
