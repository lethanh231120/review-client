import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS, CategoryScale, LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend)
export const ScamEachChainChart = ({ data }) => {
  console.log(data?.map(item => item?.datatitle))
  const chartData = {
    defaultFontFamily: 'Poppins',
    labels: data?.map(item => item?.datatitle),
    datasets: [
      {
        label: 'Scam',
        backgroundColor: '#ff2c53',
        hoverBackgroundColor: '#ff5777',
        barThickness: 20,
        data: data?.map(item => item?.scam)
      },
      {
        label: 'Total',
        backgroundColor: '#18A594',
        hoverBackgroundColor: '#18A594',
        barThickness: 20,
        data: data?.map(item => item?.total)
      }
    ]
  }

  const options = {
    indexAxis: 'y',

    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'end',
        anchor: 'end',
        font: { size: '14' }
      },
      legend: {
        display: true,
        position: 'bottom'
      },
      // title: {
      //   display: true
      // },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        barPercentage: 0.3,
        ticks: {
          display: false
        },
        gridLines: {
          drawBorder: false
        }
      },

      y: {
        display: false,
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    }
  }

  return <div className='card px-4'>
    <div className='card-body pb-0'>
      <div className='row justify-content-between'>
        <div className='col-auto'>
          <h2 className='heading'>Scam Data In Each Blockchains</h2>
        </div>
      </div>
    </div>
    <div className='chart-wrapper mt-4'>
      <div >
        <Bar data={chartData} options={options} height={150} />
      </div>
    </div>
    <div className='card-footer'>
      {/* <div className='row'>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
      </div> */}
    </div>
  </div>
}
