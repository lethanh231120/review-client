import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function AssetsChart() {
  const [state] = useState({
    series: [100000, 1000000],
    options: {
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
                offsetY: 5
              },
              total: {
                show: true,
                fontSize: '12px',
                fontWeight: '800',
                fontFamily: 'Arial',
                label: 'Total Projects',
                formatter: function(w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
              }
            }
          }
        }
      },
      legend: {
        show: false
      },
      colors: ['#32CD32', '#FF0000'],
      labels: ['Alive Projects', 'Dead/Scam Projects'],
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 200
            }
          }
        }
      ]
    }
  })
  return (
    <div id=''>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='donut'
        height={300}
        // width={400}
      />
    </div>
  )
}

export default AssetsChart
