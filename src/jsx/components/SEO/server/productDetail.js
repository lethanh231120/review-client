import { CRYPTO, DAPP, EXCHANGE, LAUNCHPAD, SOON, VENTURE } from '../../../constants/category'
import { getHeaderHome } from './home'
import { SUB_TITLE } from './listCrypto'

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
    txtAdditional = '[SCAMMED!]'
  } else
  // Warning project
  if (isWarning) {
    txtAdditional = '[WARNING!]'
  }
  const rawScore = score
  const txtTop = '[TOP]'
  const minScoreTop = 8
  if (txtAdditional === '' && (calculateScore(rawScore, type) >= minScoreTop)) {
    txtAdditional = txtTop
  }
  if (txtAdditional !== '') {
    txtAdditional += ' '
  }
  return txtAdditional
}

export const getHeaderProductDetail = (productDetail) => {
  const data = productDetail
  let title = data?.name || data?.ventureName || data?.dAppName || data?.projectName || getHeaderHome()
  const productId = data?.cryptoId || data?.dAppId || data?.ventureId || data?.exchangeId || data?.projectId || data?.launchPadId

  let totalInteract = ''
  // have data, and at least one in two has data is number greater than 0
  const totalScam = data?.totalIsScam
  const totalReview = data?.totalReviews
  if ((isInteger(totalScam) && isInteger(totalReview))) {
    if (totalScam !== 0 && totalReview !== 0) {
      const txtTotalScam = `${data?.totalIsScam} Scam Report${data?.totalIsScam === 1 ? '' : 's'}`
      const txtTotalReviews = `${data?.totalReviews} Review${data?.totalReviews === 1 ? '' : 's'}`
      // prefer display total review first
      if (totalReview > totalScam) {
        totalInteract += ` ${txtTotalReviews}, ${txtTotalScam} | `
      } else {
        totalInteract += ` ${txtTotalScam}, ${txtTotalReviews} | `
      }
    } else if (totalScam !== 0) {
      const txtTotalScam = `${data?.totalIsScam} User${data?.totalIsScam === 1 ? '' : 's'} Report${data?.totalIsScam === 1 ? 's' : ''} As Scam`
      totalInteract += ` ${txtTotalScam} | `
    } else if (totalReview !== 0) {
      const txtTotalReviews = `${data?.totalReviews} User${data?.totalIsScam === 1 ? '' : 's'} Contribute${data?.totalIsScam === 1 ? 's' : ''} Review`
      totalInteract += ` ${txtTotalReviews} | `
    }
  } else {
    totalInteract += ' '
  }

  const extraData = SUB_TITLE
  const isScam = data?.isScam
  const isWarning = data?.isWarning
  const rawScore = data?.score
  switch (productId) {
    case data?.cryptoId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, CRYPTO)}${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract} Crypto Projects${extraData}`
      break
    }
    case data?.dAppId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, DAPP)}${title},${totalInteract} Decentralized Application${extraData}`
      break
    }
    case data?.ventureId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, VENTURE)}${title},${totalInteract} Crypto Ventures${extraData}`
      break
    }
    case data?.exchangeId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, EXCHANGE)}${title},${totalInteract} Crypto Exchanges${extraData}`
      break
    }
    // Soon Project
    case data?.projectId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, SOON)}${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract} ICO/IDO/IEO Projects${extraData}`
      break
    }
    case data?.launchPadId :{
      title = `${getTxtAdditional(isScam, isWarning, rawScore, LAUNCHPAD)}${title},${totalInteract} Crypto Launchpads${extraData}`
      break
    }
  }

  return title
}
