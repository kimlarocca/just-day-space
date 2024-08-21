<template>
  <div class="bar-chart">
    <apexchart
      width="100%"
      type="bar"
      :height="chartHeight"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import {
  gradientEnd,
  gradientStart,
  purple,
  colorPalette,
} from '@/utils/charts'

export default {
  name: 'BarChart',
  props: {
    averageValue: {
      type: Number,
      default: null,
    },
    gradient: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 320,
    },
    horizontal: {
      type: Boolean,
      default: true,
    },
    keys: {
      type: Array,
      default: () => [],
    },
    max: {
      type: Number,
      default: null,
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    showTooltips: {
      type: Boolean,
      default: true,
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      series: [
        {
          name: '',
          data: this.values,
        },
      ],
      options: {
        title: {
          text: this.title,
          align: 'center',
          margin: 10,
          offsetY: 12,
          style: {
            fontSize: '22px',
            fontWeight: '300',
            fontFamily: 'Prompt',
            color: '#222222',
          },
        },
        chart: {
          width: '100%',
          offsetY: -20,
          type: 'bar',
          foreColor: '#383838',
          toolbar: {
            show: true,
            tools: {
              download: '•••',
            },
          },
        },
        plotOptions: {
          bar: {
            distributed: !this.gradient,
            horizontal: this.horizontal,
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: this.title,
          align: 'center',
          margin: 10,
          offsetY: 17,
          style: {
            fontSize: '16.875px',
            fontWeight: '600',
            fontFamily: 'Montserrat',
            color: '#000000',
          },
        },
        grid: {
          borderColor: 'transparent',
        },
        axisBorder: {
          show: false,
          color: 'transparent',
        },
        legend: {
          itemMargin: {
            vertical: 8,
            horizontal: 8,
          },
          markers: {
            radius: 6,
          },
        },
        xaxis: {
          categories: this.keys,
          axisTicks: {
            show: false,
            color: '#ffffff',
          },
          axisBorder: {
            color: '#c9c9c9',
          },
          labels: {
            show: this.showLabels,
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
          axisTicks: {
            show: false,
            color: '#ffffff',
          },
          axisBorder: {
            color: '#c9c9c9',
          },
          title: {
            text: 'Price Per LB',
          },
          labels: {
            show: this.showLabels,
            formatter: function ( val ) {
              // add commas to val if it's over 999
              if ( val > 999 ) {
                return '$' + val.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
              } else {
                return '$' + val
              }
            }
          },
        },
        tooltip: {
          enabled: this.showTooltips,
          theme: 'light',
          y: {
            formatter: function ( val ) {
              return '$ ' + val + ' per lb'
            },
          },
        },
        colors: this.gradient ? gradientStart : colorPalette,
        fill: {
          type: this.gradient ? 'gradient' : colorPalette,
          gradient: {
            inverseColors: false,
            gradientToColors: gradientEnd,
          },
        },
        annotations: {
          yaxis: [
            {
              y: this.averageValue,
              borderColor: this.averageValue ? purple : 'transparent',
              label: {
                borderColor: this.averageValue ? purple : 'transparent',
                style: {
                  color: 'transparent',
                  background: this.averageValue ? purple : 'transparent',
                },
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    chartHeight () {
      if ( this.height < 300 ) {
        return 300
      } else {
        return this.height
      }
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
