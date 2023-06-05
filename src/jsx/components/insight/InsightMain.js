import { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { get } from '../../../api/BaseRequest'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import SEO from '../SEO/SEO'
import Barchart from './charts/BarChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'
import { getHeaderListInsight } from './../SEO/server/insight'
import { ScamEachChainsList } from '../common-widgets/home/blockchain-data-table/scam-each-chain-chart'
import { LatestTokenTable } from '../common-widgets/home/latest-token/LatestTokenTable'
import { SummaryHomeContext } from '../../../App'
import { Ads } from '../ads/Ads'
import { INSIGHT } from '../../constants/category'

const InsightMain = () => {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() =>{
    const getInsightChart = async() => {
      const res = await get('reviews/chart')
      if (res?.code === 'B.CODE.200') {
        console.log('data call api', res?.data)
        setData(res?.data)
        setLoading(false)
      }
    }

    getInsightChart()
  }, [])

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

  const getChartType = (data) => {
    console.log('data in type chart', data)
    const colorPallet = data?.config?.colors?.split(',')
    switch (data?.typechart) {
      case 'pie':
        return <PieChart dataSet={data} height={200} isDetail={false} colorPallet={colorPallet}/>
      case 'line':
        return <LineChart dataSet={data} height={200} isDetail={false}/>
      case 'bar':
        return <Barchart dataSet={data} height={200} isDetail={false} colorPallet={colorPallet}/>
      default:
        return null
    }
  }

  console.log('data all', data)
  const chartSection = (data) => {
    console.log('data in chart section', data)
    return <Col key={data?.chartId} xl={4} sm={6} xs={12} style={{ display: 'flex', cursor: 'pointer', marginBottom: '1.5rem' }} >
      <Link to={`${data?.chartId}`} style={{ width: '100%' }}>
        <Card style={{ width: '100%', height: '100%' }}>
          <Card.Header>
            <h2 className='card-title'>{data?.title}</h2>
          </Card.Header>
          <Card.Body>
            <div >
              {getChartType(data)}
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  }

  return loading ? <MySkeletonLoadinng count={4} height={100}/>
    : <>
      <SEO props={{ title: getHeaderListInsight() }}/>

      <Row >
        {data && Object.keys(data)?.map(key => chartSection(data[key]))}
      </Row>
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

      <Ads pageType={INSIGHT} />
    </>
}

export default InsightMain
