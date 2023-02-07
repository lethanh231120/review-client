import React from 'react'
import ReactApexChart from 'react-apexcharts'

const BitCoinChart = ({ chartData }) => {
  console.log(chartData)
  const setting = {
    series: [
      {
        data: chartData
      }
    ],
    options: {
      chart: {
        type: 'candlestick',
        height: 390,
        id: 'candles',
        toolbar: {
          autoSelected: 'pan',
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            // upward: '#3C90EB',
            // downward: '#DF7D46'
          }
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return value?.toFixed(2)
          }
        }
      }
    },
    seriesBar: [
      {
        name: 'volume',
        // data: seriesDataLinear
        // data: [200,300, 200, 250, 200, 240, 180,230,200, 250, 200],
        data: chartData }] }

  return <div id='bitcoinhChart'>
    <ReactApexChart
      options={setting.options}
      series={setting?.series}
      type='candlestick'
      height={340}
    />
  </div>
}

export default BitCoinChart
