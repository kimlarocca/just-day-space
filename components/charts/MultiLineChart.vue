<template>
  <div class="multi-line-chart">
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
  name: 'MultiLineChart',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    hybridSativa: {
      type: Array,
      default: () => [],
    },
    hybrid: { type: Array, default: () => [] },
    hybridIndica: { type: Array, default: () => [] },
    indica: {
      type: Array,
      default: () => [],
    },
    sativa: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      options: {
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
        legend: {
          itemMargin: {
            vertical: 8,
            horizontal: 8,
          },
        },
        markers: {
          size: 4,
          colors: colorPalette,
          shape: "circle",
          radius: 2,
        },
        xaxis: {
          type: 'string',
          categories: this.categories,
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
        stroke: {
          show: true,
          // curve: 'smooth',
          lineCap: 'butt',
          width: 3,
        },
      },
      series: [
        {
          name: 'Sativa',
          data: this.sativa,
        },
        {
          name: 'Indica',
          data: this.indica,
        },
        {
          name: 'Hybrid',
          data: this.hybrid,
        },
        // {
        //   name: 'Hybrid Sativa',
        //   data: this.hybridSativa,
        // },
        // {
        //   name: 'Hybrid Indica',
        //   data: this.hybridIndica,
        // },
      ],
    }
  },
}
</script>
