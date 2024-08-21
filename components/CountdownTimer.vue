<template>
  <div class="countdown-timer container-gradient p-4 pb-5 mb-4">
    <div class="countdown-container grid mb-3">
      <div class="countdown-item item1 mr-2">
        <icons-cannabis-leaf class="leaf1 white" />
        <div class="countdown-value mb-2">
          <p class="day">{{ countdown.days }}</p>
          <p class="text-sm uppercase">Days</p>
        </div>
      </div>
      <div class="countdown-item item2 mr-2">
        <icons-cannabis-leaf class="hidden sm:flex leaf2 blue" />
        <div class="countdown-value mb-2">
          <p class="day">{{ countdown.hours }}</p>
          <p class="text-sm uppercase">Hours</p>
        </div>
      </div>
      <div class="countdown-item item3 mr-2">
        <div class="countdown-value mb-2">
          <p class="day">{{ countdown.minutes }}</p>
          <p class="text-sm uppercase">Minutes</p>
        </div>
      </div>
      <div class="countdown-item item4 mr-2">
        <icons-cannabis-leaf class="hidden md:flex leaf3 green" />
        <div class="countdown-value mb-2">
          <p class="day">{{ countdown.seconds }}</p>
          <p class="text-sm uppercase">Seconds</p>
        </div>
      </div>
    </div>
    <p class="last-day uppercase text-center">
      Weekly submissions are due {{ nextSundayDayName }}, {{ nextSundayMonth }}
      {{ nextSundayDay }} at 11:59pm PST
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Function to calculate the next Sunday 11:59 PM PST
const getNextSunday = () => {
  const now = new Date()
  const daysUntilSunday = 7 - now.getDay() // Calculate days until Sunday
  const nextSunday = new Date(now)
  nextSunday.setDate(now.getDate() + daysUntilSunday)
  nextSunday.setHours(23, 59, 0, 0) // Set to 11:59 PM PST
  return nextSunday
}

const currentDate = ref(new Date())
const nextSunday = ref(getNextSunday())

// format nextSunday for display
const nextSundayMonth = computed(() =>
  nextSunday.value.toLocaleString('default', { month: 'short' })
)
const nextSundayDayName = computed(() =>
  nextSunday.value.toLocaleString('default', { weekday: 'long' })
)
const nextSundayDay = computed(() => {
  const day = nextSunday.value.getDate()
  if (day === 1 || day === 21 || day === 31) {
    return `${day}st`
  } else if (day === 2 || day === 22) {
    return `${day}nd`
  } else if (day === 3 || day === 23) {
    return `${day}rd`
  } else {
    return `${day}th`
  }
})

// Create a countdown ref and update it periodically
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const updateCountdown = () => {
  const now = new Date()
  const timeRemaining = nextSunday.value - now
  countdown.value.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  countdown.value.hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  countdown.value.minutes = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  )
  countdown.value.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
}

// Update the countdown immediately when the component is mounted
updateCountdown()

// Update the countdown every second
const timer = setInterval(updateCountdown, 1000)

// Clean up timer when component is unmounted
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.countdown-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
}

.countdown-value {
  width: 130px;
  height: 75px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: var(--border-radius);
  .day {
    font-size: 3rem;
    line-height: 3rem;
    font-weight: 500;
  }
  @media all and (min-width: 768px) {
    width: 150px;
    height: 100px;
  }
}

.item2 .countdown-value {
  background: var(--blue);
}

.item3 .countdown-value {
  background: var(--pink);
}

.item4 .countdown-value {
  background: var(--green);
}

.countdown-timer .leaf1 {
  margin: 0 0 -20px 30px;
  width: 75px;
}

.countdown-timer .leaf2 {
  margin: 0 0 -20px 0px;
  width: 125px;
}

.countdown-timer .leaf3 {
  margin: 0 0 -20px 45px;
  width: 100px;
}

.last-day {
  font-weight: 500;
}
</style>
