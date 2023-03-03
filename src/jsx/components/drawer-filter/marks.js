
const EXCHANGE_PAIRCOUNT_SELECTION = [
  { label: '0', value: 0 },
  { label: '100', value: 100 },
  { label: '500', value: 500 },
  { label: '1K', value: 1e3 },
  { label: '5K', value: 5e3 },
  { label: '10K', value: 1e4 }
]

const EXCHANGE_VISIT7D_SELECTION = [
  { label: '0', value: 0 },
  { label: '100K', value: 1e5 },
  { label: '1M', value: 1e6 },
  { label: '10M', value: 1e7 },
  { label: '50M', value: 5e7 },
  { label: '100M', value: 1e8 }
]

const marketCapMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}
const priceUSDMarks = {
  0: { label: '0', value: 0 },
  1: { label: '1', value: 1 },
  2: { label: '10', value: 10 },
  3: { label: '100', value: 100 },
  4: { label: '1K', value: 1e3 },
  5: { label: '10K', value: 1e4 },
  6: { label: '100K', value: 1e5 }
}

const EXCHANGE_VOLUME7D_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10M', value: 1e7 },
  { label: '$1B', value: 1e9 },
  { label: '$100B', value: 1e11 },
  { label: '$500B', value: 5e11 },
  { label: '$1T', value: 1e12 }
]

const EXCHANGE_VOLUME1M_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 },
  { label: '$500B', value: 5e11 },
  { label: '$1T', value: 1e12 },
  { label: '$5T', value: 5e12 }
]

const scoreMarks = {
  0: { label: '0', value: 0 },
  1: { label: '2', value: 40 },
  2: { label: '4', value: 80 },
  3: { label: '6', value: 120 },
  4: { label: '8', value: 160 },
  5: { label: '10', value: 200 }
}

const getScoreMarks = (type) => {
  const labels = ['0', '2', '4', '6', '8', '10']
  const MUL_CRYPTO = 10
  const MUL_DAPP = 10
  const MUL_LAUNCHPAD = 10
  const MUL_EX_VEN = 20
  const scores = []
  let mul

  switch (type) {
    case 'crypto':
      mul = MUL_CRYPTO
      break
    case 'dapp':
      mul = MUL_DAPP
      break
    case 'exchange':
      mul = MUL_EX_VEN
      break
    case 'venture':
      mul = MUL_EX_VEN
      break
    case 'launchpad':
      mul = MUL_LAUNCHPAD
      break
    default:
      mul = 0
      break
  }

  labels.forEach((item, index) => {
    scores.push({ label: item, value: parseInt(item) * mul })
  })

  return scores
}

const DAPP_USER24H_SELECTION = [
  { label: '0', value: 0 },
  { label: '1K', value: 1e3 },
  { label: '10K', value: 1e4 },
  { label: '100K', value: 1e5 },
  { label: '1M', value: 1e6 },
  { label: '10M', value: 1e7 }
]
const tvlMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}
const VENTURE_SERIES_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$10M', value: 1e7 },
  { label: '$100M', value: 1e8 }
]

const VENTURE_STRATEGIC_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$10M', value: 1e7 },
  { label: '$100M', value: 1e8 },
  { label: '$1B', value: 1e9 }
]

const VENTURE_TOTALFUNDS_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$1M', value: 1e6 },
  { label: '$10M', value: 1e7 },
  { label: '$100M', value: 1e8 },
  { label: '$1B', value: 1e9 },
  { label: '$10B', value: 1e10 }
]

const SOON_FDMC_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 }
]

const SOON_GOAL_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$10M', value: 1e7 },
  { label: '$50M', value: 5e7 },
  { label: '$100M', value: 1e8 }
]

const SOON_TOKENPRICE_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$1', value: 1 },
  { label: '$2', value: 2 },
  { label: '$3', value: 3 },
  { label: '$4', value: 4 },
  { label: '$5', value: 5 }
]

const LAUNCHPAD_FUNDRAISED_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 }
]

const LAUNCHPAD_ROICURRENT_SELECTION = [
  { label: '0', value: 0 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 }
]

const LAUNCHPAD_ATHROI_SELECTION = [
  { label: '0', value: 0 },
  { label: '40', value: 40 },
  { label: '80', value: 80 },
  { label: '120', value: 120 },
  { label: '160', value: 160 },
  { label: '200', value: 200 }
]

const LAUNCHPAD_MARKETCAP_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 },
  { label: '$50B', value: 5e10 },
  { label: '$100B', value: 1e11 }
]

const LAUNCHPAD_VOLUME24H_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 }
]

const LAUNCHPAD_YEAR_SELECTION = [
  { label: '2010', value: 2010 },
  { label: '2015', value: 2015 },
  { label: '2020', value: 2020 },
  { label: '2025', value: 2025 },
  { label: '2030', value: 2030 }
]

// CRYPTO
const CRYPTO_MARKETCAP_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 }
]

const CRYPTO_PRICE_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$1', value: 1 },
  { label: '$10', value: 10 },
  { label: '$100', value: 1e2 },
  { label: '$1K', value: 1e3 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 }
]

const CRYPTO_TOTALLP_SELECTION = [
  { label: '$0', value: 0 },
  { label: '$10K', value: 1e4 },
  { label: '$100K', value: 1e5 },
  { label: '$1M', value: 1e6 },
  { label: '$100M', value: 1e8 },
  { label: '$10B', value: 1e10 }
]

export {
  EXCHANGE_PAIRCOUNT_SELECTION,
  EXCHANGE_VISIT7D_SELECTION,
  SOON_FDMC_SELECTION,
  VENTURE_TOTALFUNDS_SELECTION,
  tvlMarks,
  VENTURE_SERIES_SELECTION,
  marketCapMarks,
  priceUSDMarks,
  DAPP_USER24H_SELECTION,
  VENTURE_STRATEGIC_SELECTION,
  scoreMarks,
  getScoreMarks,
  EXCHANGE_VOLUME7D_SELECTION,
  EXCHANGE_VOLUME1M_SELECTION,
  SOON_TOKENPRICE_SELECTION,
  SOON_GOAL_SELECTION,
  LAUNCHPAD_FUNDRAISED_SELECTION,
  LAUNCHPAD_ATHROI_SELECTION,
  LAUNCHPAD_ROICURRENT_SELECTION,
  LAUNCHPAD_MARKETCAP_SELECTION,
  LAUNCHPAD_VOLUME24H_SELECTION,
  LAUNCHPAD_YEAR_SELECTION,
  CRYPTO_MARKETCAP_SELECTION,
  CRYPTO_PRICE_SELECTION,
  CRYPTO_TOTALLP_SELECTION
}
