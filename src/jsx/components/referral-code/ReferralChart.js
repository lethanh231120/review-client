import React, { useEffect } from 'react'
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
import { useState } from 'react'
import { formatChartDate } from '../insight/charts/BarChart'
import { formatDateStyle } from '../../../utils/time/time'

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
      text: 'Reward chart'
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

const ReferralChart = ({ data }) => {
  const [rewardLabelsTime, setRewardLabelsTime] = useState()
  const [dataRewardClick, setDataRewardClick] = useState()
  const [dataRewardValue, setDataRewardValue] = useState()
  const [dataRewardTotal, setDataRewardTotal] = useState()

  const [claimedLabelsTime, setClaimedLabelsTime] = useState()
  const [dataClaimedClick, setDataClaimedClick] = useState()
  const [dataClaimedValue, setDataClaimedValue] = useState()

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  useEffect(() => {
    if (data) {
      const rewardLabelsTimeLocal = []
      const dataRewardClickLocal = new Map()
      const dataRewardValueLocal = new Map()
      const dataRewardTotalLocal = new Map()

      const claimedLabelsTimeLocal = []
      const dataClaimedClickLocal = new Map()
      const dataClaimedValueLocal = new Map()
      // reverse array, then tranverse array (past to now)
      data?.slice()?.reverse()?.forEach(clickEachDay => {
        const formattedDate = formatChartDate(clickEachDay?.createdDate, formatDateStyle)
        const dailyClick = clickEachDay?.click
        const dailyRewardValue = clickEachDay?.rewardPrice
        const dailyRewardTotal = dailyRewardValue * dailyClick

        const isGetReward = !clickEachDay?.isClaimed
        if (isGetReward) {
          rewardLabelsTimeLocal?.push(formattedDate)
          dataRewardClickLocal?.set(formattedDate, dailyClick)
          dataRewardValueLocal?.set(formattedDate, dailyRewardValue)
          dataRewardTotalLocal?.set(formattedDate, dailyRewardTotal)

          // Fake data
          for (let i = 1; i <= 7; i++) {
            var date = new Date()
            // add a day
            date.setDate(date.getDate() + i)
            const formattedDate = formatChartDate(date, formatDateStyle)
            const fakeClick = getRndInteger(0, 1000)
            const fakeRewardValue = getRndInteger(1, 10)
            const fakeDailyReward = (clickEachDay?.rewardPrice * fakeClick)
            rewardLabelsTimeLocal?.push(formattedDate)
            dataRewardClickLocal?.set(formattedDate, fakeClick)
            dataRewardValueLocal?.set(formattedDate, fakeRewardValue)
            dataRewardTotalLocal?.set(formattedDate, fakeDailyReward)
          }
        } else {
          claimedLabelsTimeLocal?.push(formattedDate)
          dataClaimedClickLocal?.set(formattedDate, dailyClick)
          dataClaimedValueLocal?.set(formattedDate, dailyRewardTotal)
        }
      })
      setRewardLabelsTime(rewardLabelsTimeLocal)
      setDataRewardClick(dataRewardClickLocal)
      setDataRewardValue(dataRewardValueLocal)
      setDataRewardTotal(dataRewardTotalLocal)

      setClaimedLabelsTime(claimedLabelsTimeLocal)
      setDataClaimedClick(dataClaimedClickLocal)
      setDataClaimedValue(dataClaimedValueLocal)
    }
  }, [data])

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

  const dataSetClaimed = {
    defaultFontFamily: 'Poppins',
    labels: claimedLabelsTime,
    datasets: [
      {
        label: 'Click',
        data: claimedLabelsTime?.map((label) =>dataClaimedClick?.get(label)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Reward',
        data: claimedLabelsTime?.map((label) =>dataClaimedValue?.get(label)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  console.log(dataSetClaimed)

  return <>
    <Line options={options} data={dataSetReward} />
    <Line options={options} data={dataSetClaimed} />
  </>
}

export default ReferralChart
