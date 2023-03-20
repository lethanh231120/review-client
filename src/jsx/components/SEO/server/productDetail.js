import { toCammelCase } from '../../../../utils/formatText'
import { getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import { CRYPTO, DAPP, EXCHANGE, LAUNCHPAD, VENTURE } from '../../../constants/category'
import { getHeaderHome } from './home'
import { SUB_TITLE } from './listCrypto'

const META_TITLE = getHeaderHome()
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
  let title = data?.name || data?.ventureName || data?.dAppName || data?.projectName || META_TITLE
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
      const txtTotalReviews = `${data?.totalReviews} User${data?.totalReviews === 1 ? '' : 's'} Contribute${data?.totalReviews === 1 ? 's' : ''} Review`
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
      if (data?.type === 'token') {
        title = `${data?.name} (${data?.symbol}) ${data?.address} review on Gear5`
      } else if (data?.type === 'coin') {
        if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
          title = `Review & Discuss ${data?.name} (${data?.symbol}) -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Gear5`
        } else {
          title = `${data?.name} (${data?.symbol}) - Review & Discuss Cryptocurrency projects | Gear5`
        }
      } else {
        title = `${getTxtAdditional(isScam, isWarning, rawScore, CRYPTO)}${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract} Crypto Projects${extraData}`
      }
      break
    }
    case data?.dAppId :{
      if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
        title = `Review ${data?.dAppName} project -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Gear5`
      } else {
        title = `Reviews & Discuss ${data?.dAppName} - project Dapps | Gear5`
      }
      break
    }
    case data?.ventureId :{
      title = `${data?.ventureName} Crypto Ventures | Portfolio & Details | Gear5`
      break
    }
    case data?.exchangeId :{
      if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
        title = `${data?.name} ${data?.subCategory} -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Crypto Exchanges | Gear5`
      } else {
        title = `${data?.name} ${data?.subCategory} | Reviews & Discuss Crypto Exchanges | Gear5`
      }
      break
    }
    // Soon Project
    case data?.projectId :{
      let soonStatus = getStatusFromStartDateAndEndDate(data?.startDate, data?.endDate)
      if (isInteger(totalReview) && totalReview > 0) {
        soonStatus = soonStatus ? `${soonStatus} |` : soonStatus
        title = `${data?.projectName} (${data?.projectSymbol}) - ${data?.roundType} - ${totalReview} Reviews |${soonStatus ? ` ${toCammelCase(soonStatus)}` : ''} Gear5`
      } else {
        title = `${data?.projectName} (${data?.projectSymbol}) - ${data?.roundType} |${soonStatus ? ` ${toCammelCase(soonStatus)}` : ''} | Project details | Gear5`
      }
      break
    }
    case data?.launchPadId :{
      title = `${data?.name} Crypto Launchpads | Invest Data & Details | Gear5`
      break
    }
  }

  return title
}
