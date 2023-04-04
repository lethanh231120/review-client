import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  // Hover, display anotation all line chart
  interaction: {
    mode: 'index',
    intersect: false
  },
  stacked: false,
  plugins: {
    legend: {
      position: 'top'
      // display: false// hide square defination annotate
    },
    title: {
      display: true,
      text: 'Visitor Chart 7 Days Latest'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Amount'
      },
      min: 0,
      ticks: {
        stepSize: 1 // y axis step
      }
    }
  }
}

const ReferralChart = ({ rewardLabelsTime, dataRewardClick, dataRewardValue, dataRewardTotal }) => {
  const dataSetReward = {
    defaultFontFamily: 'Poppins',
    labels: rewardLabelsTime,
    datasets: [
      {
        label: 'Click',
        data: rewardLabelsTime?.map((label) =>dataRewardClick?.get(label)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Reward Per 1K Views',
        data: rewardLabelsTime?.map((label) =>dataRewardValue?.get(label)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Total Of Reward',
        data: rewardLabelsTime?.map((label) =>dataRewardTotal?.get(label)),
        borderColor: 'rgb(3,159,127)',
        backgroundColor: 'rgba(3,159,127,0.5)'
      }
    ]
  }

  return <>
    <Line options={options} data={dataSetReward} />
  </>
}

export default ReferralChart
