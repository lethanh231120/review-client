import { getHeaderHome } from './home'

export const getHeaderProductDetail = (productDetail) => {
  let title = productDetail?.name || productDetail?.ventureName || productDetail?.dAppName || productDetail?.projectName || getHeaderHome()
  const productId = productDetail?.cryptoId || productDetail?.dAppId || productDetail?.ventureId || productDetail?.exchangeId || productDetail?.projectId || productDetail?.launchPadId
  const totalScam = `${(productDetail?.totalIsScam && productDetail?.totalIsScam > 0) ? `${productDetail?.totalIsScam} Scam Reports` : ''}`
  const totalReviews = `${(productDetail?.totalReviews && productDetail?.totalReviews > 0) ? `${productDetail?.totalReviews} Reviews` : ''}`
  let totalInteract = totalScam
  if (totalInteract) {
    totalInteract += `, ${totalReviews}`
  } else {
    totalInteract = totalReviews
  }
  if (totalInteract) {
    totalInteract = ` ${totalInteract}, `
  } else {
    totalInteract += ' '
  }
  switch (productId) {
    case productDetail?.cryptoId :{
      title = `${title}${productDetail?.symbol ? ` (${productDetail?.symbol})` : ''},${totalInteract}TOP Crypto Projects | Reviews, Rating & Details | Gear5`
      break
    }
    case productDetail?.dAppId :{
      title = `${title},${totalInteract}Decentralized Application Rating, Reviews & Details | Gear5`
      break
    }
    case productDetail?.ventureId :{
      title = `${title},${totalInteract}Crypto Ventures Rating, Reviews & Details | Gear5`
      break
    }
    case productDetail?.exchangeId :{
      title = `${title},${totalInteract}Crypto Exchanges Rating, Reviews & Details | Gear5`
      break
    }
    // Soon Project
    case productDetail?.projectId :{
      title = `${title}${productDetail?.projectSymbol ? ` (${productDetail?.projectSymbol})` : ''},${totalInteract}ICO/IDO/IEO Projects | Reviews, Rating & Details | Gear5`
      break
    }
    case productDetail?.launchPadId :{
      title = `${title},${totalInteract}Crypto Launchpads Rating, Reviews & Details | Gear5`
      break
    }
  }

  return title
}
