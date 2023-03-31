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
  plugins: {
    legend: {
      position: 'top',
      display: false// hide square defination annotate
    },
    title: {
      display: true,
      text: 'Visit Chart'
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
        text: 'Visitor'
      },
      min: 0,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const ReferralChart = ({ data }) => {
  const [labels1, setLabels] = useState()
  const [data1, setData1] = useState()
  // console.log(labels)
  useEffect(() => {
    console.log(data)
    if (data) {
      const labels = []
      const data1 = new Map()
      data?.forEach(clickEachDay => {
      // console.log(moment(clickEachDay?.createdDate).format({ formatDateStyle }))
        labels?.push(clickEachDay?.createdDate)
        data1.set(clickEachDay?.createdDate, clickEachDay?.click)
      })
      setLabels(labels)
      setData1(data1)
    }
  }, [data])
  const dataTest = {
    defaultFontFamily: 'Poppins',
    labels: labels1,
    datasets: [
      {
        data: labels1?.map((label) =>data1?.get(label)),
        borderColor: 'rgba(3, 159, 127, 1)',
        backgroundColor: 'rgba(3, 159, 127, 1)'
      }
    ]
  }
  return <Line options={options} data={dataTest} />
}

export default ReferralChart
