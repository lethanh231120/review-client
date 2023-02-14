import _ from 'lodash'
import moment from 'moment'
import { API_KEY, bitqueryEndpoint, BITQUERY_QUERY } from '../../Dashboard/Dashboard/bitquery-query/query'

const ChainsTokenMap = {
  'ethereum': ['Uniswap', '0xdac17f958d2ee523a2206206994597c13d831ec7', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', '0x6b175474e89094c44da98b954eedeac495271d0f'],
  'binance': ['Pancake', '0xe9e7cea3dedca5984780bafc599bd69add087d56', '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', '0x55d398326f99059ff775485246999027b3197955']
}

const queryFetch = async(network,
  exchangeName,
  baseCurrency,
  quoteCurrency) => {
  const data = []

  const ressp = await fetch(bitqueryEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      query: BITQUERY_QUERY(
        network,
        exchangeName,
        baseCurrency,
        quoteCurrency
      )
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
    }
  })

  const rawData = await ressp.json()
  if (!_.isEmpty(rawData?.data?.ethereum?.dexTrades)) {
    const tempData = rawData?.data?.ethereum?.dexTrades

    tempData?.forEach(item => {
      data.push({ x: moment(item?.timeInterval?.hour).valueOf(), y: [parseFloat(item?.open), parseFloat(item?.high), parseFloat(item?.low), parseFloat(item?.close)] })
    })
  }

  return data
}

const getCryptoDetailChartData = async(network, baseCurrency) => {
  const quoteTokenList = ChainsTokenMap[network]
  let chartData = []
  if (quoteTokenList) {
    chartData = await queryFetch(network, quoteTokenList[0], baseCurrency, quoteTokenList[1])
    if (_.isEmpty(chartData)) {
      chartData = await queryFetch(network, quoteTokenList[0], baseCurrency, quoteTokenList[2])
      if (_.isEmpty(chartData)) {
        chartData = await queryFetch(network, quoteTokenList[0], baseCurrency, quoteTokenList[3])
      }
    }
  }

  return chartData
}

export default getCryptoDetailChartData
