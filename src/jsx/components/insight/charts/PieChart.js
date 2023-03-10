import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import _ from 'lodash'
Chart.register(ArcElement)

export const chartColorPallet = ['#47B39C', '#FFC154', '#EC6B56', '#47B39C', '#EC6B56', '#FFC154', '#47B39C', '#EC6B56', '#FFC154']
// export const chartColorPallet = [
//   'rgb(255, 205, 86)',
//   'rgb(75, 192, 192)',
//   'rgb(255, 99, 132)',
//   'rgb(255, 159, 64)',
//   'rgb(54, 162, 235)'

// ]
// export const chartColorPallet = [
//   '#18A594',
//   '#41B991',
//   '#6ACC8A',
//   '#96DD80',
//   '#C5EC77',
//   '#F9F871'
// ]
const PieChart = ({ dataSet, height, width, isDetail }) => {
  const data = {
    labels: dataSet?.results?.map(item => item[0]),
    datasets: [
      {
        data: dataSet?.results?.map(item => item[1]),
        borderWidth: 0,
        backgroundColor: chartColorPallet
        // hoverBackgroundColor: dataSet?.results?.map(item => randomColor())
      }
    ]

  }
  const options = {
    plugins: {
      legend: {
        display: isDetail,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 15
        }
      },
      // responsive: true,
      tooltip: {
        callbacks: {
          title: (xDatapoint) => {
            const label = xDatapoint[0]?.label
            return `${_.capitalize(label)} Blockchain`
          }
        }
      }
    },

    maintainAspectRatio: false
  }

  return (
    <div style={{ position: 'relative' }}>
      <Pie data={data} height={ height} width={width} options={options} />
    </div>
  )
}

export default PieChart

export const randomColor = () => {
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
  const r = randomBetween(0, 255)
  const g = randomBetween(0, 255)
  const b = randomBetween(0, 255)
  const rgb = `rgb(${r},${g},${b})`

  return rgb
}
