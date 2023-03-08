import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import { get } from '../../../../api/BaseRequest'
import Barchart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'

const ChartDetail = () => {
  const { id } = useParams()
  const [chartData, setChartData] = useState()

  useEffect(() => {
    const getChartById = async() => {
      const res = await get(`reviews/chart/detail?id=${id}`)
      if (res?.code === '200' || res?.code === 200) {
        setChartData(res?.data)
      }
    }
    getChartById()
  }, [id])

  const getChartType = (data) => {
    switch (data?.typechart) {
      case 'pie':
        return <PieChart dataSet={data} height={500} width={'30%'} isDetail={true}/>
      case 'line':
        return <LineChart dataSet={data} height={200} />
      case 'bar':
        return <Barchart dataSet={data} height={200} />
      default:
        return null
    }
  }

  return <Card>
    <Card.Header style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#19A594' }}>{chartData?.title}</Card.Header>
    <Card.Body>
      <div className='row'>
        <div className='col-8'>
          {getChartType(chartData)}
        </div>
        <div className='col-4'>
          <Card>
            <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#19A594' }}>About</Card.Header>
            <Card.Body style={{ fontSize: '1.1rem', fontWeight: 'w600' }}>{chartData?.description}</Card.Body>
          </Card>
        </div>
      </div>
    </Card.Body>
  </Card>
}

export default ChartDetail
