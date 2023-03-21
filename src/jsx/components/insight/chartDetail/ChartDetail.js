import { Table } from 'antd'
import _ from 'lodash'
import moment from 'moment/moment'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import { get } from '../../../../api/BaseRequest'
import SEO from '../../SEO/SEO'
import Barchart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import './ChartDetail.scss'
import { getHeaderProductDetail } from './../../SEO/server/insight-detail'
import { SummaryHomeContext } from '../../../../App'
import { LatestTokenTable } from '../../common-widgets/home/latest-token/LatestTokenTable'
import { ScamEachChainsList } from '../../common-widgets/home/blockchain-data-table/scam-each-chain-chart'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { ReviewList } from '../../common-widgets/home/reviews/review-list'
import { dataReviewFounder } from '../../product-detail/detail-layout'
import { PushpinOutlined } from '@ant-design/icons'
const ChartDetail = () => {
  const { id } = useParams()
  const [chartData, setChartData] = useState()

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

  const summaryData = useContext(SummaryHomeContext)

  const setScamDataEachChains = (data) => {
    const list = []
    const temp = data?.chainTokens
    const others = { scam: data?.chainTokens?.others?.scam, total: data?.chainTokens?.others?.total, datatitle: 'Others' }

    Object.keys(temp)?.map(key => {
      if (key !== 'others') {
        list.push({ scam: temp[key]?.scam, total: temp[key]?.total, datatitle: key })
      }
    })
    const sorted = list?.sort((a, b) => b?.total - a?.total)
    sorted.push(others)
    return sorted
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
          <div className='col-xl-8 col-sm-12 mt-5 mb-0'>
            {getChartType(chartData)}
          </div>
          <div className='col-xl-4 col-sm-12'>
            <Card>
              <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#19A594' }}>About</Card.Header>
              <Card.Body style={{ fontSize: '1.1rem', fontWeight: 'w600' }}><h2 className='fs-18' style={{ color: '#A098AE', fontWeight: '400' }}>{chartData?.description}</h2></Card.Body>
            </Card>
            <Card>
              <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#19A594' }}>Data Table</Card.Header>
              <Card.Body>
                <Table pagination={{ pageSize: 5, style: { display: 'flex', justifyContent: 'center' }}} className='custom-table' columns={columns} dataSource={chartData?.results}/>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Card.Body>
    </Card>

    <div className='row'>
      {/* Recent Reviews */}
      <div className='col-12 mt-4' >
        <ReviewList isHome={false}/>
      </div>
    </div>
    <Card className='cus-card mb-4' style={{ padding: '8px', backgroundColor: '#18A594', color: '#fff' }}>
      <Card.Title className='mt-1 me-2 ms-4' style={{ color: '#fff', fontSize: '18px', display: 'flex', alignItems: 'center' }} >
        {dataReviewFounder.accountName}
        <PushpinOutlined style={{ marginLeft: '0.3rem' }}/>
      </Card.Title>
      <Card.Body style={{ marginTop: '-20px' }}>  {dataReviewFounder?.content}</Card.Body>
    </Card>
    <div className='row'>
      {/* Scam percentage each chains chart */}
      <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4'>
        {summaryData ? <ScamEachChainsList data={setScamDataEachChains(summaryData)}/> : <MySkeletonLoadinng/>}
      </div>
      {/* blockchain data allocation */}
      <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-4' style={{ textTransform: 'none' }}>
        <LatestTokenTable />
      </div>
    </div>
  </>
}

export default ChartDetail
