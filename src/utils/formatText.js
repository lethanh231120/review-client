import { PREFIX_DETAIL, DAPP, VENTURE, EXCHANGE } from '../constants/category'

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatUrlDetailFromUrlImageExchange = (urlImage) => {
  let exchangeText = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[1]
  let productId = urlImage?.split('/')[6]?.split('.')[0]?.split('_')[2]
  let endpoint = `${PREFIX_DETAIL}/${exchangeText}/${productId}`
  return endpoint
}

export const formatUrlDetailFromDappId = (dappId) => {
  let dappText = DAPP
  let productId = `${dappId?.split('_')[2]}`
  let endpoint = `${PREFIX_DETAIL}/${dappText}/${productId}`
  return endpoint
}

export const formatUrlDetailFromVentureId = (ventureId) => {
  let ventureText = VENTURE
  let productId = `${ventureId?.split('_')[2]}`
  let endpoint = `${PREFIX_DETAIL}/${ventureText}/${productId}`
  return endpoint
}

export const formatUrlDetailFromExchangeId = (exchangeId) => {
  let exchangeText = EXCHANGE
  let productId = `${exchangeId?.split('_')[2]}`
  let endpoint = `${PREFIX_DETAIL}/${exchangeText}/${productId}`
  return endpoint
}