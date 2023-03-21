import { PREFIX_DETAIL, DAPP, VENTURE, EXCHANGE,
  CRYPTO, CRYPTO_COIN, CRYPTO_TOKEN
} from '../jsx/constants/category'
export const capitalizeFirstLetter = (string) => {
  if (string?.length >= 1) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return string
}

export const formatUrlDetailFromUrlImageExchange = (urlImage) => {
  const exchangeText = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[1]
  const productId = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[2]
  const endpoint = `${PREFIX_DETAIL}/${exchangeText}/${productId}`
  return endpoint
}

export const getExchangeNameFromUrlImageExchage = (urlImage) =>{
  const productId = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[2]
  let productName = productId.replaceAll('-', ' ')
  // to cammel case
  productName = toCammelCase(productName)
  return productName
}

export const toCammelCase = (string) =>{
  return string && string.replace(/(\w)(\w*)/g,
    function(g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase() })
}

export const formatUrlDetailFromDappId = (dappId) => {
  const dappText = DAPP
  const productId = `${dappId?.split('_')[2]}`
  const endpoint = `${PREFIX_DETAIL}/${dappText}/${productId}`
  return endpoint
}

export const formatUrlDetailFromVentureId = (ventureId) => {
  const ventureText = VENTURE
  const productId = `${ventureId?.split('_')[2]}`
  const endpoint = `${PREFIX_DETAIL}/${ventureText}/${productId}`
  return endpoint
}

export const formatUrlDetailFromExchangeId = (exchangeId) => {
  const exchangeText = EXCHANGE
  const productId = `${exchangeId?.split('_')[2]}`
  const endpoint = `${PREFIX_DETAIL}/${exchangeText}/${productId}`
  return endpoint
}

export const isValidProductId = (productId) =>{
  const productIdParts = productId?.split('_')
  return productIdParts?.length >= 3
}

export const formatImgUrlFromProductId = (productId) => {
  const productIdParts = productId?.split('_')
  // not valid product id, Ex: gear5_coin_ethereum
  if (productIdParts?.length < 3) {
    return null
  }
  let productImgType = productIdParts[1]
  const folderImgPath = 'bigLogo'
  // special case
  switch (productImgType) {
    case CRYPTO_COIN :
    case CRYPTO_TOKEN:
      productImgType = CRYPTO
      break
  }
  const imgUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${productImgType}/${folderImgPath}/${productId}.png`
  return imgUrl
}

export const encodeSpecialCharacterUrl = (url) =>{
  url = url?.replaceAll('+', '%2B')
  return url
}
