<template>
  <div class="example">
    <apexchart
      width="100%"
      height="350"
      type="line"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import {
  colorPalette,
} from '@/utils/charts'

export default {
  name: 'LineChart',
  props: {
    benchmark: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: null,
    },
    dataset: {
      type: Array,
      default: () => [],
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    showCategories: {
      type: Boolean,
      default: true,
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
    showTooltips: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      options: {
        title: {
          text: this.title,
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
        tooltip: {
          enabled: this.showTooltips,
          theme: 'light',
          y: {
            formatter: undefined,
            title: {
              formatter: () => '',
            },
          },
          x: {
            show: false,
          },
        },
        benchmark: {
          type: Array,
          default: () => [],
        },
        dataset: {
          type: Array,
          default: () => [],
        },
        chart: {
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
        legend: {
          itemMargin: {
            vertical: 5,
            horizontal: 8,
          },
        },
        xaxis: {
          type: 'string',
          categories: this.categories,
          labels: {
            show: !!this.showCategories,
            formatter ( value ) {
              // if it's a number, round up to nearest integer
              if ( typeof value === 'number' ) {
                return parseInt( value )
              } else {
                return value
              }
            },
          },
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
        grid: {
          row: {
            colors: [ '#f3f3f3', 'transparent' ], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        colors: colorPalette,
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          width: 3,
        },
      },
      series: [
        {
          data: this.dataset,
        },
      ],
    }
  },
}
</script>
