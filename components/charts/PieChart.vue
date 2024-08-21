<template>
  <div class="pie-chart">
    <apexchart
      width="100%"
      :height="height"
      :type="type"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import { colorPalette } from '@/utils/charts'

export default {
  name: 'PieChart',
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    keys: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 320,
    },
    width: {
      type: Number,
      default: 320,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'pie',
    },
  },
  data () {
    return {
      options: {
        tooltip: {
          enabled: false,
          y: {
            formatter: function ( val ) {
              return val.toFixed( 0 ) + "%"
            },
          },
        },
        title: {
          text: this.title,
          align: 'center',
          margin: 10,
          offsetY: -8,
          style: {
            fontSize: '16.875px',
            fontWeight: '600',
            fontFamily: 'Montserrat',
            color: '#000000',
          },
        },
        chart: {
          width: '100%',
          offsetY: 5,
          toolbar: {
            show: true,
            tools: {
              download: '•••',
            },
          },
        },
        colors: colorPalette,
        dataLabels: {
          enabled: true,
          formatter: function ( val ) {
            return val.toFixed( 0 ) + "%"
          },
          style: {
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Montserrat',
          },
          dropShadow: {
            enabled: false,
          },
        },
        labels: this.keys,
        legend: {
          position: 'bottom',
          itemMargin: {
            vertical: 5,
            horizontal: 8,
          },
        },
        plotOptions: {
          pie: {
            customScale: 1,
          },
        },
      },
      series: this.values,
    }
  },
}
</script>

<style lang="scss">
.pie-chart {
  width: 100%;
}
</style>
