<template>
  <div class="timeline">
    <div
      v-for="(item, index) in timelineItems"
      :key="index"
      class="timeline-item flex"
      :class="{ completed: item.completed }"
    >
      <div class="timeline-item-marker" />
      <div class="timeline-item-content">
        <p class="timeline-item-title text-lg">{{ item.title }}</p>
        <p v-if="item.description" class="small">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  timelineItems: {
    type: Array,
    default: null,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-item {
  // add a vertical line underneath connecting the timeline items
  position: relative;
  min-height: 64px;
  .timeline-item-title {
    color: var(--gray);
  }
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 34px;
    left: 12px;
    width: 2px;
    height: 26px;
    background-color: var(--medium-gray);
  }
  &.completed {
    .timeline-item-title {
      font-weight: 600;
      color: var(--green);
    }
    &:not(:last-child)::after {
      background-color: var(--green);
    }
    .timeline-item-marker {
      border: solid 1px var(--green);
      background-color: var(--light-green);
    }
  }
}

.timeline-item-marker {
  margin-top: 4.5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--white);
  border: solid 1px var(--medium-gray);
  margin-right: 20px;
  transition: var(--transition);
}
</style>
