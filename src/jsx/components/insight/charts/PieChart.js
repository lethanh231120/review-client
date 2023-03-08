import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import _ from 'lodash'
Chart.register(ArcElement)

export const chartColorPallet = ['#18A594', '#a6d75b', '#22a7f0', '#115f9a', '#48b5c4', '#1984c5', '#c9e52f', '#d0ee11', '#d0f400']
const PieChart = ({ dataSet, height, width, isDetail }) => {
  const data = {
    labels: dataSet?.results?.map(item => item[0]),
    datasets: [
      {
        data: dataSet?.results?.map(item => item[1]),
        // borderWidth: 1,
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
      responsive: true,
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
    <Pie data={data} height={ height} width={width} options={options} />
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
