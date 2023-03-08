import React from 'react'
import { Line } from 'react-chartjs-2'

import 'chart.js/auto'

const LineChart = ({ dataSet, height })=> {
  const data = {
    defaultFontFamily: 'Poppins',
    labels: dataSet?.results?.map(item => item[0]),
    datasets: [
      {
        data: dataSet?.results?.map(item => item[1]),
        borderColor: 'rgba(149, 105, 255,1)',
        borderWidth: this.props.borderWidth ? this.props.borderWidth : '2',
        // pointBackgroundColor: "rgba(64, 24, 157, 1)",
        backgroundColor: 'rgba(149, 105, 255, 0)',
        ension: 0.4
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y:
          {
            display: false,
            min: 0,
            max: 100,
            ticks: {
              beginAtZero: true,
              padding: 0
            },
            grid: {
              display: false
            }
          },

      x:
          {
            display: false,
            ticks: {
              padding: 0
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }

    }
  }
  return (
    <>
      <Line
        data={data}
        options={options}
        height={height}
      />
    </>
  )
}

export default LineChart
