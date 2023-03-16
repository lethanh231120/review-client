import { Table } from 'antd'
import _ from 'lodash'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import { get } from '../../../../api/BaseRequest'
import SEO from '../../SEO/SEO'
import Barchart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import './ChartDetail.scss'
import { getHeaderProductDetail } from './../../SEO/server/insight-detail'
const ChartDetail = () => {
  const { id } = useParams()
  const [chartData, setChartData] = useState()
  // const location = useLocation()

  // const data = location?.state
  useEffect(() => {
    const getChartById = async() => {
      const res = await get(`reviews/chart/detail?chartId=${id}`)
      if (res?.code === 'B.CODE.200') {
        setChartData(res?.data)
      }
    }
    getChartById()
  }, [id])

  const getChartType = (data) => {
    const colorPallet = data?.config?.colors?.split(',')
    switch (data?.typechart) {
      case 'pie':
        return <PieChart dataSet={data} height={100} isDetail={true} title={data?.title} colorPallet={colorPallet}/>
      case 'line':
        return <LineChart dataSet={data} height={200} isDetail={true} title={data?.title}/>
      case 'bar':
        return <Barchart dataSet={data} height={200} isDetail={true} title={data?.title} colorPallet={colorPallet}/>
      default:
        return null
    }
  }

  const formatLabel = (string) => {
    if (string) {
      if (moment(string)?.isValid()) {
        return moment(string)?.format('YYYY-MM-DD')
      } else {
        return _.capitalize(string)
      }
    } else { return '' }
  }

  const columns = [
    {
      title: 'Label',
      render: (_, record) => <span>{record[0] && formatLabel(record[0])}</span>
    },
    {
      title: 'Data',
      render: (_, record) => <span>{record[1] && record[1]}</span>
    }
  ]

  return <>
    <SEO props={{ title: getHeaderProductDetail(chartData) }}/>
    <Card className='cus-card'>
      {/* <Card.Header style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#19A594' }}>{chartData?.title}</Card.Header> */}
      <Card.Body>
        <div className='row'>
          <div className='col-xl-8 col-sm-12 '>
            {getChartType(chartData)}
          </div>
          <div className='col-xl-4 col-sm-12'>
            <Card>
              <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#19A594' }}>About</Card.Header>
              <Card.Body style={{ fontSize: '1.1rem', fontWeight: 'w600' }}>{chartData?.description}</Card.Body>
            </Card>
            <Card>
              <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#19A594' }}>Data Table</Card.Header>
              <Card.Body>
                <Table pagination={{ pageSize: 6, style: { display: 'flex', justifyContent: 'center' }}} className='custom-table' columns={columns} dataSource={chartData?.results}/>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Card.Body>
    </Card>
  </>
}

export default ChartDetail
