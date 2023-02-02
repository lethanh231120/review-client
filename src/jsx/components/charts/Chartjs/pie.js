import React from 'react'
import { Pie } from 'react-chartjs-2'

const ChartPie = ({ color1, color2, color3, color4, height, width }) => {
  const data = {
    datasets: [
      {
        data: [45, 25, 20, 10],
        borderWidth: 0,
        backgroundColor: [
          `${color1 || 'rgba(149, 105, 255,1)'}`,
          `${color2 || 'rgba(149, 105, 255,0.7)'}`,
          `${color3 || 'rgba(149, 105, 255,0.5)'}`,
          `${color4 || 'rgba(0, 0, 0, 0.07)'}`
        ],
        hoverBackgroundColor: [
          `${color1 || 'rgba(149, 105, 255,1)'}`,
          `${color2 || 'rgba(149, 105, 255,0.7)'}`,
          `${color3 || 'rgba(149, 105, 255,0.5)'}`,
          `${color4 || 'rgba(0, 0, 0, 0.07)'}`
        ]
      }
    ],
    labels: ['one', 'two', 'three']
  }

  const options = {
    plugins: {
      legend: false,
      responsive: true
    },

    maintainAspectRatio: false
  }

  return (
    <>
      <Pie data={data} height={height || 200} options={options} />
    </>
  )
}

export default ChartPie
