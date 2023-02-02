import axios from 'axios'
import { getCookie, STORAGEKEY } from '../utils/storage/index'

const getUrlPrefix = () => '/'

const authorizationText = 'Authorization'
const bearerText = 'Bearer'

const instanceSearch = axios.create({
  baseURL: process.env.REACT_APP_API_SEARCH,
})

const instanceWrite = axios.create({
  baseURL: process.env.REACT_APP_API_WRITE,
})

const instanceRead = axios.create({
  baseURL: process.env.REACT_APP_API_READ,
})

const instancePrice = axios.create({
  baseURL: process.env.REACT_APP_API_PRICE,
})

const setHeaderSearch = async () => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceSearch.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
}
const setHeaderRead = async () => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceRead.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
}
const setHeaderWrite = async () => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
  instanceWrite.defaults.headers.common[authorizationText] = `${bearerText} ${token}`
}

const search = async (url, params = {}) => {
  try {
    await setHeaderSearch()
    const config = { params: params }
    const response = await instanceSearch.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const get = async (url, params = {}) => {
  try {
    await setHeaderRead()
    const config = { params: params }
    const response = await instanceRead.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}
const getPrice = async (url, params = {}) => {
  try {
    const config = { params: params }
    const response = await instancePrice.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const read = async (url, data = {}) => {
  try {
    await setHeaderRead()
    const response = await instanceRead.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const put = async (url, data = {}) => {
  try {
    await setHeaderWrite()
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instanceWrite.put(getUrlPrefix() + url, data)
    } else {
      response = await instanceWrite.put(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const post = async (url, data = {}) => {
  try {
    await setHeaderWrite()
    const response = await instanceWrite.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const del = async (url, data = {}) => {
  try {
    await setHeaderWrite()
    const response = await instanceWrite.delete(getUrlPrefix() + url, { data })
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const patch = async (url, data = {}) => {
  try {
    await setHeaderWrite()
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instanceWrite.patch(getUrlPrefix() + url, data)
    } else {
      response = await instanceWrite.patch(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
    // console.log(err)
  }
  throw err
}

export { search, get, read, post, del, put, patch, getPrice }
