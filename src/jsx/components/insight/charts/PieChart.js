import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import _ from 'lodash'
Chart.register(ArcElement)

export const chartColorPallet = ['#47B39C', '#FFC154', '#EC6B56', '#47B39C', '#EC6B56', '#FFC154', '#47B39C', '#EC6B56', '#FFC154']
Chart.defaults.color = '#18A594'
const PieChart = ({ dataSet, height, isDetail, title }) => {
  const data = {
    labels: dataSet?.results?.map(item => _.capitalize(item[0])),
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
      title: {
        display: true,
        text: title,
        font: {
          size: 22,
          color: '#18A594'
        },
        padding: isDetail ? 30 : 0
      },
      legend: {
        display: isDetail,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 30
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
    maintainAspectRatio: true,
    responsive: true
  }

  return (
    <div style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Pie data={data} height={height} options={options} />
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
