import axios from 'axios'
import { getCookie, STORAGEKEY } from '../utils/storage/index'

const getUrlPrefix = () => '/'

const authorizationText = 'Authorization'
const bearerText = 'Bearer'

const instanceSearch = axios.create({
  baseURL: process.env.REACT_APP_API_SEARCH
})

const instanceWrite = axios.create({
  baseURL: process.env.REACT_APP_API_WRITE
})

const instanceRead = axios.create({
  baseURL: process.env.REACT_APP_API_READ
})

const instancePrice = axios.create({
  baseURL: process.env.REACT_APP_API_PRICE
})

const setHeaderSearch = async() => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceSearch.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
}
const setHeaderRead = async(header) => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceRead.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
  // Access page with reference first time
  if (header?.Referral) {
    instanceRead.defaults.headers.common['Referral'] = `${header?.Referral}`
  }
  if (header?.Sum) {
    instanceRead.defaults.headers.common['Sum'] = `${header?.Sum}`
  }
}
const setHeaderWrite = async(header) => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceWrite.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
  if (header?.ReCaptchaResponse) {
    instanceWrite.defaults.headers.common['ReCaptchaResponse'] = `${header?.ReCaptchaResponse}`
  }
  // Send review as anynomous has referral code first time access
  if (header?.Referral) {
    instanceWrite.defaults.headers.common['Referral'] = `${header?.Referral}`
  }
  if (header?.Sum) {
    instanceWrite.defaults.headers.common['Sum'] = `${header?.Sum}`
  }
}

const search = async(url, params = {}) => {
  try {
    await setHeaderSearch()
    // const source = axios.CancelToken.source()
    const config = { params: params }
    // const config = { params: params, cancelToken: source.token }
    const response = await instanceSearch.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const get = async(url, params = {}, header) => {
  try {
    await setHeaderRead(header)
    const config = { params: params }
    const response = await instanceRead.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const getPrice = async(url, params = {}) => {
  try {
    const config = { params: params }
    const response = await instancePrice.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const read = async(url, data = {}) => {
  try {
    await setHeaderRead()
    const response = await instanceRead.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const put = async(url, data = {}) => {
  try {
    await setHeaderWrite()
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instanceWrite.put(getUrlPrefix() + url, data)
    } else {
      response = await instanceWrite.put(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const post = async(url, data = {}, header) => {
  try {
    await setHeaderWrite(header)
    const response = await instanceWrite.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const del = async(url, data = {}) => {
  try {
    await setHeaderWrite()
    const response = await instanceWrite.delete(getUrlPrefix() + url, { data })
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const patch = async(url, data = {}) => {
  try {
    await setHeaderWrite()
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instanceWrite.patch(getUrlPrefix() + url, data)
    } else {
      response = await instanceWrite.patch(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const _responseHandler = (response) => {
  const { data } = response
  return data
}

const _errorHandler = (err) => {
  if (err.response && err.response.status === 401) {
    console.error(err)
  }
  throw err
}

// export const PRICE_WS_URL = 'wss://ct6a-backend.nika.guru'
export const WS_URL = process.env.REACT_APP_WS_URL
export const S3_IMG_URL = process.env.REACT_APP_API_IMAGE
export const API_CONFIRM = process.env.REACT_APP_API_CONFIRM
export const ALGORITHM_KECCAK256 = process.env.REACT_APP_ALGORITHM_KECCAK256
export { search, get, read, post, del, put, patch, getPrice }
