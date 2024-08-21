<template>
  <div class="count-up" :class="{ inline: inline }">
    <span v-if="currency" class="currency">$</span><span v-text="count" />
    <span v-if="suffix" class="suffix">{{ nth(to) }}</span>
    <span v-if="percent">%</span>
    <span v-if="minutes" class="minutes"> minutes</span>
  </div>
</template>

<script>
import { nth } from '@/utils/charts'
export default {
  name: 'CountUp',
  props: {
    currency: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    minutes: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: Boolean,
      default: false,
    },
    percent: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      count: 0,
      interval: null,
      end: this.to,
    }
  },
  computed: {
    increment () {
      return Math.ceil( this.end / 30 )
    },
  },
  mounted () {
    this.interval = setInterval( this.tick, 20 )
  },
  methods: {
    tick () {
      if ( this.count + this.increment >= this.end ) {
        this.count = this.to.toLocaleString()
        return clearInterval( this.interval )
      }
      this.count += this.increment
    },
  },
}
</script>

<style lang="scss">
.count-up {
  font-size: 6rem;
  font-weight: 500;
  font-family: var(--font-family-primary);
  line-height: 6rem;
  color: var(--green);
  margin-top: -20px;
  &.inline,
  .minutes {
    display: block;
    font-family: var(--font-family-header);
    font-weight: var(--font-weight-header);
    line-height: var(--line-height-11);
    font-size: var(--font-size-11);
    font-weight: 500;
  }
  .suffix {
    font-family: var(--font-family-header);
    font-weight: var(--font-weight-header);
    line-height: var(--line-height-16);
    font-size: var(--font-size-16);
    font-weight: 500;
  }
  .currency {
    font-size: 6rem;
  }
}
</style>
