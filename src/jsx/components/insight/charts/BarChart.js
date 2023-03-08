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

const Barchart = ({ dataSet }) => {
  const data = {
    defaultFontFamily: 'Poppins',
    labels: dataSet?.results?.map(item => item[0]),
    datasets: [
      {
        data: dataSet?.results?.map(item => item[1]),
        borderColor: 'rgba(149, 105, 255, 1)',
        borderWidth: '0',
        backgroundColor: chartColorPallet,
        barThickness: 20

      }
    ]
  }

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
            display: false,
            ticks: {
              beginAtZero: true
            },
            grid: {
              display: false
            }
          },

      x:
          {
            display: false,
            // Change here
            barPercentage: 0.1,
            grid: {
              display: false
            }
          }

    }
  }

  return (
    <>
      <Bar data={data} height={150} options={options} />
    </>
  )
}

export default Barchart
