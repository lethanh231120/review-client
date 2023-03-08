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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Barchart = ({ dataSet, height, width, isDetail }) => {
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
        backgroundColor: backgroundColor(dataSet?.title),
        barThickness: 20

      }
    ]
  }
  console.log(backgroundColor(dataSet?.title))
  const options = {
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          title: (xDatapoint) => {
            // console.log(xDatapoint)
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
            barPercentage: 0.1,
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
    <>
      <Bar data={data} height={height} style={{ width: '100%' }} options={options} />
    </>
  )
}

export default Barchart
