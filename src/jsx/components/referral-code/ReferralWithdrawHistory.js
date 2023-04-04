import React from 'react'
import { get } from '../../../api/BaseRequest'
import { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

const getReward = async() => {
  try {
    const resp = await get('reviews/referral/reward')
    const respData = resp?.data
    return respData
  } catch (err) {
    console.error(err)
  }
}

export const ReferralWithdrawHistory = () => {
  const [withdrawLabelsTime, setWithdrawLabelsTime] = useState()
  const [withdrawClickMap, setWithdrawClickMap] = useState()
  const [withdrawRewardMap, setWithdrawRewardMap] = useState()
  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    const respData = await getReward()

    const arrWithdrawLabelsLocal = []
    const mapClickLocal = new Map()
    const mapRewardLocal = new Map()
    respData?.forEach(item => {
      arrWithdrawLabelsLocal?.push(item?.createdDate)
      mapClickLocal?.set(item?.createdDate, item?.totalClick)
      mapRewardLocal?.set(item?.createdDate, item?.totalReward)
    })
    setWithdrawLabelsTime(arrWithdrawLabelsLocal)
    setWithdrawClickMap(mapClickLocal)
    setWithdrawRewardMap(mapRewardLocal)
  }

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
        text: 'Reward Chart'
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

  const data = {
    defaultFontFamily: 'Poppins',
    labels: withdrawLabelsTime,
    datasets: [
      {
        label: 'Click',
        data: withdrawLabelsTime?.map((label) =>withdrawClickMap?.get(label)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Reward',
        data: withdrawLabelsTime?.map((label) =>withdrawRewardMap?.get(label)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  return <>
    <Line options={options} data={data} />
  </>
}
