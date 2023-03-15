import { getHeaderHome } from './home'

const isInteger = (number) => {
  return (typeof number === 'number') && Math.floor(number) === number
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
  const txtTop = 'TOP '
  switch (productId) {
    case data?.cryptoId :{
      title = `${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract}${txtTop}Crypto Projects ${extraData}${brandDate}`
      break
    }
    case data?.dAppId :{
      title = `${title},${totalInteract}${txtTop}Decentralized Application ${extraData}${brandDate}`
      break
    }
    case data?.ventureId :{
      title = `${title},${totalInteract}${txtTop}Crypto Ventures ${extraData}${brandDate}`
      break
    }
    case data?.exchangeId :{
      title = `${title},${totalInteract}${txtTop}Crypto Exchanges ${extraData}${brandDate}`
      break
    }
    // Soon Project
    case data?.projectId :{
      title = `${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract}${txtTop}ICO/IDO/IEO Projects ${extraData}${brandDate}`
      break
    }
    case data?.launchPadId :{
      title = `${title},${totalInteract}${txtTop}Crypto Launchpads ${extraData}${brandDate}`
      break
    }
  }

  return title
}
