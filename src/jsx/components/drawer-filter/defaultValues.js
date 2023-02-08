import { fullyDilutedMarketCapMarks, fundRaisingGoalsMarks, marketCapMarks, pairCountMarks, priceUSDMarks, scoreMarks, seriesMarks, strategicMarks, tokenPriceMarks, totalFundsMarks, userMarks, visit7dMarks, volume1mMarks, volume7dMarks } from './marks.js'

export const fromObjectToArray = (stringData) => {
  const arr = []
  const parsedData = JSON.parse(stringData)

  parsedData && Object.keys(parsedData)?.forEach(key => {
    arr.push({ name: key, value: parsedData[key] })
  })
  return arr
}

export const dappFilterDefaultValue = [
  { name: 'volume24h', value: [0, marketCapMarks.length] },
  { name: 'user24h', value: [0, userMarks.length] },
  { name: 'tvl', value: [0, 5] },
  { name: 'tag', value: '' },
  { name: 'score', value: [0, scoreMarks.length] }
]

export const cryptoFilterDefaultValue = [
  { name: 'type', value: '' },
  { name: 'marketCap', value: [0, marketCapMarks.length] },
  { name: 'priceUSD', value: [0, priceUSDMarks.length] },
  { name: 'totalLpUSD', value: [0, priceUSDMarks.length] },
  { name: 'tradingOn', value: '' },
  { name: 'tag', value: '' },
  { name: 'score', value: [0, scoreMarks.length] }
]

export const exchangeFilterDefaultValue = [
  { name: 'pairCount', value: [0, pairCountMarks.length] },
  { name: 'volume24h', value: [0, marketCapMarks.length] },
  { name: 'volume7d', value: [0, volume7dMarks.length] },
  { name: 'volume1m', value: [0, volume1mMarks.length] },
  { name: 'visit7d', value: [0, visit7dMarks.length] },
  { name: 'score', value: [0, scoreMarks.length] }
]

export const soonFilterDefaultValue = [
  { name: 'roundType', value: '' },
  { name: 'tag', value: '' },
  { name: 'fullyDilutedMarketCap', value: [0, fullyDilutedMarketCapMarks.length] },
  { name: 'fundRaisingGoals', value: [0, fundRaisingGoalsMarks.length] },
  { name: 'tokenPrice', value: [0, tokenPriceMarks.length] },
  { name: 'score', value: [0, scoreMarks.length] },
  { name: 'launchpad', value: '' }

]

export const ventureFilterDefaultValue = [
  { name: 'seriesA', value: [0, seriesMarks.length] },
  { name: 'seriesB', value: [0, seriesMarks.length] },
  { name: 'seriesC', value: [0, seriesMarks.length] },
  { name: 'ico', value: [0, seriesMarks.length] },
  { name: 'strategic', value: [0, strategicMarks.length] },
  { name: 'totalFund', value: [0, totalFundsMarks.length] },
  { name: 'lcoation', value: '' },
  { name: 'score', value: [0, scoreMarks.length] }
]

