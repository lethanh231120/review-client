
const pairCountMarks = {
  0: { label: '0', value: 0 },
  1: { label: '100', value: 100 },
  2: { label: '500', value: 500 },
  3: { label: '1K', value: 1e3 },
  4: { label: '5K', value: 5e3 },
  5: { label: '10K', value: 1e4 }
}

const visit7dMarks = {
  0: { label: '0', value: 0 },
  1: { label: '100K', value: 1e5 },
  2: { label: '1M', value: 1e6 },
  3: { label: '10M', value: 1e7 },
  4: { label: '50M', value: 5e7 },
  5: { label: '100M', value: 1e8 }
}

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

const volume7dMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10M', value: 1e7 },
  2: { label: '1B', value: 1e9 },
  3: { label: '100B', value: 1e11 },
  4: { label: '500B', value: 5e11 },
  5: { label: '1T', value: 1e12 }
}

const volume1mMarks = {
  0: { label: '0', value: 0 },
  1: { label: '100M', value: 1e8 },
  2: { label: '10B', value: 1e10 },
  3: { label: '500B', value: 5e11 },
  4: { label: '1T', value: 1e12 },
  5: { label: '5T', value: 5e12 }
}

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
  const scores = {}
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
    scores[index] = { label: item, value: parseInt(item) * mul }
  })

  return scores
}

const userMarks = {
  0: { label: '0', value: 0 },
  1: { label: '1K', value: 1e3 },
  2: { label: '10K', value: 1e4 },
  3: { label: '100K', value: 1e5 },
  4: { label: '1M', value: 1e6 },
  5: { label: '10M', value: 1e7 }
}
const tvlMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}
const seriesMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '10M', value: 1e7 },
  5: { label: '100M', value: 1e8 }
}

const strategicMarks = {
  0: { label: '0', value: 0 },
  1: { label: '100K', value: 1e5 },
  2: { label: '1M', value: 1e6 },
  3: { label: '10M', value: 1e7 },
  4: { label: '100M', value: 1e8 },
  5: { label: '1B', value: 1e9 }
}

const totalFundsMarks = {
  0: { label: '0', value: 0 },
  1: { label: '1M', value: 1e6 },
  2: { label: '10M', value: 1e7 },
  3: { label: '100M', value: 1e8 },
  4: { label: '1B', value: 1e9 },
  5: { label: '10B', value: 1e10 }
}

const fullyDilutedMarketCapMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}

const fundRaisingGoalsMarks = {
  0: { label: '0', value: 0 },
  1: { label: '100K', value: 1e5 },
  2: { label: '1M', value: 1e6 },
  3: { label: '10M', value: 1e7 },
  4: { label: '50M', value: 5e7 },
  5: { label: '100M', value: 1e8 }
}

const tokenPriceMarks = {
  0: { label: '0', value: 0 },
  1: { label: '1', value: 1 },
  2: { label: '2', value: 2 },
  3: { label: '3', value: 3 },
  4: { label: '4', value: 4 },
  5: { label: '5', value: 5 }
}

const launchpadFundRaisedMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}

const launchpadAvgRoiCurrentMarks = {
  0: { label: '0', value: 0 },
  1: { label: '5', value: 5 },
  2: { label: '10', value: 10 },
  3: { label: '20', value: 20 },
  4: { label: '30', value: 30 },
  5: { label: '40', value: 40 }
}

const launchpadAvgRoiATHMarks = {
  0: { label: '0', value: 0 },
  1: { label: '40', value: 40 },
  2: { label: '80', value: 80 },
  3: { label: '120', value: 120 },
  4: { label: '160', value: 160 },
  5: { label: '200', value: 200 }
}

const launchpadMarketcapMarks = {
  0: { label: '0', value: 0 },
  1: { label: '1M', value: 1e6 },
  2: { label: '100M', value: 1e8 },
  3: { label: '10B', value: 1e10 },
  4: { label: '50B', value: 5e10 },
  5: { label: '100B', value: 1e11 }
}

const launchpadVolume24hMarks = {
  0: { label: '0', value: 0 },
  1: { label: '10K', value: 1e4 },
  2: { label: '100K', value: 1e5 },
  3: { label: '1M', value: 1e6 },
  4: { label: '100M', value: 1e8 },
  5: { label: '10B', value: 1e10 }
}

const launchpadFoundedYearMarks = {
  0: { label: '2010', value: 2010 },
  1: { label: '2015', value: 2015 },
  2: { label: '2020', value: 2020 },
  3: { label: '2025', value: 2025 },
  4: { label: '2030', value: 2030 }
}

export {
  pairCountMarks,
  visit7dMarks,
  fullyDilutedMarketCapMarks,
  totalFundsMarks,
  tvlMarks,
  seriesMarks,
  marketCapMarks,
  priceUSDMarks,
  userMarks,
  strategicMarks,
  scoreMarks,
  getScoreMarks,
  volume1mMarks,
  volume7dMarks,
  fundRaisingGoalsMarks,
  tokenPriceMarks,
  launchpadFundRaisedMarks,
  launchpadAvgRoiCurrentMarks,
  launchpadAvgRoiATHMarks,
  launchpadMarketcapMarks,
  launchpadVolume24hMarks,
  launchpadFoundedYearMarks
}
