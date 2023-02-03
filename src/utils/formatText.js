import { PREFIX_DETAIL, DAPP, VENTURE, EXCHANGE } from '../jsx/constants/category'

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatUrlDetailFromUrlImageExchange = (urlImage) => {
  const exchangeText = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[1]
  const productId = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[2]
  const endpoint = `${PREFIX_DETAIL}/${exchangeText}/${productId}`
  return endpoint
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
