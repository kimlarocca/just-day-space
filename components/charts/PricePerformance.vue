<template>
  <div
    v-if="hasData && timeFrame"
    class="price-performance container-white border p-4"
  >
    <h4 class="text-center">
      {{ timeFrame === 'All Time' ? 'All Time' : `${timeFrame}'s` }}
    </h4>
    <apexchart
      width="100%"
      type="bar"
      height="350"
      :options="options"
      :series="series"
    />
    <div class="text-center">
      <InlineMessage severity="info">
        Click on any category (e.g., Outdoor, Indoor, Greenhouse) to toggle it
        on and off the chart.
        <span class="hidden md:inline">
          Hover on any category to highlight that category.
        </span>
      </InlineMessage>
    </div>
  </div>
  <div v-else class="container-white border p-4">
    <h4 class="text-center mb-2">
      {{
        this.timeFrame === 'All Time'
          ? 'All Time Price Performance'
          : `${this.timeFrame}'s Price Performance`
      }}
    </h4>
    <p class="text-center red mb-4">Data for this is coming soon.</p>
  </div>
</template>

<script>
import { colorPalette } from '@/utils/charts'

export default {
  name: 'PricePerformance',
  props: {
    keys: {
      type: Array,
      default: () => [],
    },
    timeFrame: {
      type: String,
      default: '',
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      series: this.values,
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: true,
            tools: {
              download: '•••',
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: '0',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: [ 'transparent' ],
        },
        title: {
          text: 'Price Performance',
          align: 'center',
          margin: 10,
          offsetY: -5,
          style: {
            fontSize: '16.875px',
            fontWeight: '600',
            fontFamily: 'Montserrat',
            color: '#000000',
          },
        },
        xaxis: {
          categories: this.keys,
        },
        yaxis: {
          title: {
            text: 'Price Per LB',
          },
          labels: {
            formatter: function ( val ) {
              // add commas to val if it's over 999
              if ( val > 999 ) {
                return '$' + val.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
              } else {
                return '$' + val
              }
            }
          }
        },
        fill: {
          opacity: 1,
        },
        grid: {
          row: {
            colors: [ '#FBFBFD', 'transparent' ], // takes an array which will be repeated on columns
            opacity: 1,
          },
        },
        tooltip: {
          y: {
            formatter: function ( val ) {
              return '$ ' + val + ' per lb'
            },
          },
        },
        colors: colorPalette,
      },
    }
  },
  computed: {
    hasData () {
      let emptyArrays = 0
      if ( this.values?.data?.length === 0 ) return false
      // loop through this.values
      this.values.forEach(
        ( item ) => {
          if ( item?.data.every( item => item === 0 ) ) {
            emptyArrays++
          }
        } )
      if ( emptyArrays === this.values.length ) return false
      return true
    },
  },
}
</script>

<style lang="scss">
.bar-chart {
  width: 100%;
  margin-bottom: -20px;
}
</style>
