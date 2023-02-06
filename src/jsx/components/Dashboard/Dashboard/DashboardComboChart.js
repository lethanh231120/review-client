import React from 'react'
import ReactApexChart from 'react-apexcharts'

const DashboardComboChart = ({ data }) => {
  const chartData = []

  data?.forEach(element => {
    chartData.push({ x: element?.timeInterval?.day, y: [parseInt(element?.open), parseInt(element?.high), parseInt(element?.low), parseInt(element?.close)] })
  })

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
      }
    },
    seriesBar: [
      {
        name: 'volume',
        // data: seriesDataLinear
        // data: [200,300, 200, 250, 200, 240, 180,230,200, 250, 200],
        data: chartData }] }

  return <div className='chart-box'>
    <div id='chart-candlestick'>
      <ReactApexChart
        options={setting.options}
        series={setting.series}
        type='candlestick'
        height={390}
      />
    </div>
  </div>
}

export default DashboardComboChart
