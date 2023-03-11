import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { chartColorPallet } from './PieChart'
import moment from 'moment/moment'
// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
import './chart.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

ChartJS.defaults.color = '#18A594'
const Barchart = ({ dataSet, height, isDetail, title }) => {
  const backgroundColor = (title) => {
    if (title?.includes('scam')) {
      return '#808080'
    }
    if (title?.toLowerCase()?.includes('daily new token')) {
      return '#18A594'
    } else {
      return chartColorPallet
    }
  }

  const data = {
    defaultFontFamily: 'Poppins',
    labels: dataSet?.results?.map(item => item[0]),
    datasets: [
      {
        data: dataSet?.results?.map(item => item[1]),
        borderColor: 'rgba(149, 105, 255, 1)',
        borderWidth: '0',
        backgroundColor: backgroundColor(dataSet?.title)
        // barThickness: 20

      }
    ]
  }
  const options = {
    plugins: {
      maintainAspectRatio: false,
      legend: false,
      title: {
        display: true,
        text: title,
        padding: isDetail ? 30 : 0,
        font: {
          size: 22,
          color: '#18A594'
        }
      },
      tooltip: {
        callbacks: {
          title: (xDatapoint) => {
            const label = xDatapoint[0]?.label
            if (moment(label)?.isValid()) {
              return moment(label)?.format('YYYY-MM-DD')
            } else {
              return label
            }
          }
        }
      }
    },
    scales: {
      y:
          {
            display: isDetail,
            ticks: {
              beginAtZero: true

            },
            grid: {
              display: false
            }

          },

      x:
          {
            display: isDetail,
            // Change here
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            grid: {
              display: isDetail
            },
            ticks: {
              callback: function(value) {
                const label = this.getLabelForValue(value)
                if (moment(label)?.isValid()) {
                  return moment(label)?.format('YYYY-MM-DD')
                } else {
                  return label
                }
              }
            }
          }

    }
  }

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Bar data={data} height={height} style={{ width: '100%' }} options={options} />
    </div>
  )
}

export default Barchart
