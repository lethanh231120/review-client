
import _ from 'lodash'
import {
  getScoreMarks,
  CRYPTO_MARKETCAP_SELECTION,
  CRYPTO_PRICE_SELECTION,
  DAPP_USER24H_SELECTION,
  VENTURE_SERIES_SELECTION,
  VENTURE_STRATEGIC_SELECTION,
  VENTURE_TOTALFUNDS_SELECTION,
  EXCHANGE_PAIRCOUNT_SELECTION,
  EXCHANGE_VOLUME1M_SELECTION,
  EXCHANGE_VOLUME7D_SELECTION,
  EXCHANGE_VISIT7D_SELECTION,
  SOON_FDMC_SELECTION,
  SOON_GOAL_SELECTION,
  SOON_TOKENPRICE_SELECTION,
  LAUNCHPAD_YEAR_SELECTION,
  LAUNCHPAD_FUNDRAISED_SELECTION,
  LAUNCHPAD_ATHROI_SELECTION,
  LAUNCHPAD_ROICURRENT_SELECTION,
  LAUNCHPAD_MARKETCAP_SELECTION,
  LAUNCHPAD_VOLUME24H_SELECTION,
  CRYPTO_TOTALLP_SELECTION
} from './marks.js'

const checkingValues = (from, to, param, name, options) => {
  if (from >= 0 && to >= 0) {
    param[name] = `${from}.${to}`
  }
  if (!from && to >= 0) {
    param[name] = `0.${to}`
  }
  if (!to && from >= 0) {
    param[name] = `${from}.${options[options?.length - 1]?.value}`
  }
}

const checkingStatus = (status, filterParams) => {
  if (status) {
    if (status === 'isWarning') {
      filterParams['isWarning'] = true
      filterParams['isScam'] = ''
    }
    if (status === 'isScam') {
      filterParams['isScam'] = true
      filterParams['isWarning'] = ''
    }
    if (status === 'safe') {
      filterParams['isWarning'] = false
      filterParams['isScam'] = false
    }
    if (status === 'none') {
      filterParams['isWarning'] = ''
      filterParams['isScam'] = ''
    }
  }
}

export const formatData = (type) => {
  const filterParams = {}
  const stringData = window.localStorage.getItem(type)
  const values = stringData && JSON.parse(stringData)
  // ---------------------------CRYPTO
  if (values) {
    if (type === 'crypto') {
      // PRICE
      checkingValues(values?.priceUSD?.from, values?.priceUSD?.to, filterParams, 'priceUSD', CRYPTO_PRICE_SELECTION)
      checkingValues(values?.marketcapUSD?.from, values?.marketcapUSD?.to, filterParams, 'marketcapUSD', CRYPTO_MARKETCAP_SELECTION)
      checkingValues(values?.totalLpUSD?.from, values?.totalLpUSD?.to, filterParams, 'totalLpUSD', CRYPTO_TOTALLP_SELECTION)
      checkingValues(values?.score?.from, values?.score?.to, filterParams, 'score', getScoreMarks('crypto'))

      if (values?.tradingOn) {
        filterParams['tradingOn'] = values?.tradingOn?.join('.')
      }

      if (values?.type) {
        if (values?.type === 'All') {
          filterParams['type'] = ''
        } else {
          filterParams['type'] = values?.type
        }
      }

      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }

      checkingStatus(values?.status, filterParams)
    }
    // ---------------------------DAPP
    if (type === 'dapp') {
      checkingValues(values?.volume24h?.from, values?.volume24h?.to, filterParams, 'volume24h', CRYPTO_MARKETCAP_SELECTION)
      checkingValues(values?.user24h?.from, values?.user24h?.to, filterParams, 'user24h', DAPP_USER24H_SELECTION)
      checkingValues(values?.balance?.from, values?.balance?.to, filterParams, 'balance', CRYPTO_MARKETCAP_SELECTION)

      // ------=---------TAG
      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }
      checkingStatus(values?.status, filterParams)
    }
    // ---------------------------VENTURE
    if (type === 'venture') {
      checkingValues(values?.volumeTotalFunds?.from, values?.volumeTotalFunds?.to, filterParams, 'volumeTotalFunds', CRYPTO_MARKETCAP_SELECTION)
      checkingValues(values?.seriesA?.from, values?.seriesA?.to, filterParams, 'seriesA', VENTURE_SERIES_SELECTION)
      checkingValues(values?.seriesB?.from, values?.seriesB?.to, filterParams, 'seriesB', VENTURE_SERIES_SELECTION)
      checkingValues(values?.seriesC?.from, values?.seriesC?.to, filterParams, 'seriesC', VENTURE_SERIES_SELECTION)
      checkingValues(values?.ico?.from, values?.ico?.to, filterParams, 'ico', VENTURE_SERIES_SELECTION)
      checkingValues(values?.strategic?.from, values?.strategic?.to, filterParams, 'strategic', VENTURE_STRATEGIC_SELECTION)
      checkingValues(values?.totalFund?.from, values?.totalFund?.to, filterParams, 'totalFund', VENTURE_TOTALFUNDS_SELECTION)

      if (values?.location) {
        if (values?.location === 'All') {
          filterParams['location'] = ''
        } else {
          filterParams['location'] = values?.location
        }
      }

      checkingStatus(values?.status, filterParams)
    }
    // ---------------------------EXCHANGE
    if (type === 'exchange') {
      checkingValues(values?.pairCount?.from, values?.pairCount?.to, filterParams, 'pairCount', EXCHANGE_PAIRCOUNT_SELECTION)
      checkingValues(values?.visit7d?.from, values?.visit7d?.to, filterParams, 'visit7d', EXCHANGE_VISIT7D_SELECTION)
      checkingValues(values?.volume24h?.from, values?.volume24h?.to, filterParams, 'volume24h', CRYPTO_MARKETCAP_SELECTION)
      checkingValues(values?.volume7d?.from, values?.volume7d?.to, filterParams, 'volume7d', EXCHANGE_VOLUME7D_SELECTION)
      checkingValues(values?.volume1m?.from, values?.volume1m?.to, filterParams, 'volume1m', EXCHANGE_VOLUME1M_SELECTION)

      checkingStatus(values?.status, filterParams)
    }
    // -------------------SOON
    if (type === 'soon') {
      if (values?.roundType) {
        if (values?.roundType === 'All') {
          filterParams['roundType'] = ''
        } else {
          filterParams['roundType'] = values?.roundType
        }
      }
      checkingValues(values?.fullyDilutedMarketCap?.from, values?.fullyDilutedMarketCap?.to, filterParams, 'fullyDilutedMarketCap', SOON_FDMC_SELECTION)
      checkingValues(values?.fundRaisingGoals?.from, values?.fundRaisingGoals?.to, filterParams, 'fundRaisingGoals', SOON_GOAL_SELECTION)
      checkingValues(values?.tokenPrice?.from, values?.tokenPrice?.to, filterParams, 'tokenPrice', SOON_TOKENPRICE_SELECTION)

      if (values?.launchpad) {
        filterParams['launchpad'] = values?.launchpad
      }

      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }
    }
    if (type === 'launchpad') {
      checkingValues(values?.marketCap?.from, values?.marketCap?.to, filterParams, 'marketCap', LAUNCHPAD_MARKETCAP_SELECTION)
      checkingValues(values?.totalFundsRaised?.from, values?.totalFundsRaised?.to, filterParams, 'totalFundsRaised', LAUNCHPAD_FUNDRAISED_SELECTION)
      checkingValues(values?.yearFounded?.from, values?.yearFounded?.to, filterParams, 'yearFounded', LAUNCHPAD_YEAR_SELECTION)
      checkingValues(values?.avgRoiCurrent?.from, values?.avgRoiCurrent?.to, filterParams, 'avgRoiCurrent', LAUNCHPAD_ROICURRENT_SELECTION)
      checkingValues(values?.avgRoiATH?.from, values?.avgRoiATH?.to, filterParams, 'avgRoiATH', LAUNCHPAD_ATHROI_SELECTION)
      checkingValues(values?.volume24h?.from, values?.volume24h?.to, filterParams, 'volume24h', LAUNCHPAD_VOLUME24H_SELECTION)
      checkingValues(values?.score?.from, values?.score?.to, filterParams, 'score', getScoreMarks('launchpad'))
    }
  }

  return filterParams
}

export const fromObjectToArray = (stringData) => {
  const arr = []
  const parsedData = JSON.parse(stringData)
  parsedData && Object.keys(parsedData)?.forEach(key => {
    if (!_.isEmpty(parsedData[key]) || key === 'isWarning' || key === 'isScam') {
      arr.push({ name: key, value: parsedData[key] })
    }
  })
  return arr
}

