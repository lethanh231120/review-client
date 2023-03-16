import { CRYPTO, DAPP, EXCHANGE, LAUNCHPAD, SOON, VENTURE } from '../../../constants/category'
import { getHeaderHome } from './home'

const isInteger = (number) => {
  return (typeof number === 'number') && Math.floor(number) === number
}

const calculateScore = (rawScore, type) =>{
  let score = 0
  if (rawScore <= 0) {
    score = 0
  } else {
    if (type === LAUNCHPAD) {
      score = rawScore / 3.5
    }
    if (type === VENTURE || type === EXCHANGE) {
      score = rawScore / 20
    }
    if (type === CRYPTO || type === DAPP) {
      score = rawScore / 10
    }
  }
  return score
}
const getTxtAdditional = (isScam, isWarning, score, type) =>{
  let txtAdditional = ''
  // Scam project
  if (isScam) {
    txtAdditional = 'SCAMMED!'
  } else
  // Warning project
  if
  (isWarning) {
    txtAdditional = 'WARNING!'
  }
  const rawScore = score
  const txtTop = 'TOP'
  const minScoreTop = 8
  if (txtAdditional === '' && (calculateScore(rawScore, type) >= minScoreTop)) {
    txtAdditional = txtTop
  }
  txtAdditional += ' '
  return txtAdditional
}

export const getHeaderProductDetail = (productDetail) => {
  const data = productDetail
  let title = data?.name || data?.ventureName || data?.dAppName || data?.projectName || getHeaderHome()
  const productId = data?.cryptoId || data?.dAppId || data?.ventureId || data?.exchangeId || data?.projectId || data?.launchPadId
  let totalInteract = ''
  let hasInteract = false
  // have data, and at least one in two has data is number greater than 0
  const totalScam = data?.totalIsScam
  const totalReview = data?.totalReviews
  if ((isInteger(totalScam) && isInteger(totalReview)) && (totalScam > 0 || totalReview > 0)) {
    const txtTotalScam = `${data?.totalIsScam} Scam Reports`
    const txtTotalReviews = `${data?.totalReviews} Reviews`

    // prefer display total review first
    if (totalReview > totalScam) {
      totalInteract += ` ${txtTotalReviews}, ${txtTotalScam} | `
    } else {
      totalInteract += ` ${txtTotalScam}, ${txtTotalReviews} | `
    }
    hasInteract = true
  } else {
    totalInteract += ' '
  }

  const extraData = hasInteract ? '' : '| Reviews, Discuss & Details '
  const brandDate = '| Gear5'
  const isScam = data?.isScam
  const isWarning = data?.isWarning
  const rawScore = data?.score
  switch (productId) {
    case data?.cryptoId :{
      title = `${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, CRYPTO)}Crypto Projects ${extraData}${brandDate}`
      break
    }
    case data?.dAppId :{
      title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, DAPP)}Decentralized Application ${extraData}${brandDate}`
      break
    }
    case data?.ventureId :{
      title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, VENTURE)}Crypto Ventures ${extraData}${brandDate}`
      break
    }
    case data?.exchangeId :{
      title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, EXCHANGE)}Crypto Exchanges ${extraData}${brandDate}`
      break
    }
    // Soon Project
    case data?.projectId :{
      title = `${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, SOON)}ICO/IDO/IEO Projects ${extraData}${brandDate}`
      break
    }
    case data?.launchPadId :{
      title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, LAUNCHPAD)}Crypto Launchpads ${extraData}${brandDate}`
      break
    }
  }

  return title
}
