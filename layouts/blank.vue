<template>
  <div class="p-4 container">
    <div class="grid">
      <div class="col col-12 lg:col-7 mb-4">
        <router-view />
      </div>
      <div class="col hidden lg:flex lg:col-5">
        <div>
          <img
            src="/images/onboarding-image.png"
            alt="an image of a cannabis plant"
            height="860"
            width="570"
          />
        </div>
      </div>
    </div>
  </div>
</template>
