import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { formatMoney } from '../../../../utils/formatNumber'

function AssetsChart({ data }) {
  const chartData = {
    series: data?.map(item => item?.amount),
    options: {
      stroke: {
        width: 0
      },
      chart: {
        type: 'donut'
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          // expandOnClick: false,
          // startAngle: 120,
          // endAngle: 360,
          donut: {
            size: '72%',
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 0
              },
              value: {
                show: true,
                fontSize: '14px',
                fontFamily: 'Arial',
                offsetY: 5,
                formatter: function(value) {
                  return formatMoney(value)?.replace('$', '')
                }
              },
              total: {
                show: true,
                fontSize: '12px',
                fontWeight: '800',
                fontFamily: 'Arial',
                label: 'Total Projects',
                formatter: function(w) {
                  let total = 0
                  data?.forEach(item => {
                    total += item?.amount
                  })
                  return formatMoney(total)?.replace('$', '')
                }
              }
            }
          }
        }
      },
      legend: {
        show: false
      },
      colors: data?.map(item => item?.fillcolor),
      labels: data?.map(item => item?.datatitle),
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 1500,
          options: {
            chart: {
              // width: 200,
              height: 200
            }
          }
        }
      ]
    }
  }
  return (
    <div id=''>
      { chartData.series &&
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='donut'
          height={270}
        // width={400}
        />
      }
    </div>
  )
}

export default AssetsChart
