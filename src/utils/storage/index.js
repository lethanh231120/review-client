import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const STORAGEKEY = {
  ACCESS_TOKEN: `Gear5_${window?.location?.hostname}_access_token`,
  USER_INFO: `Gear5_${window?.location?.hostname}_user_info`,
  REFERRAL_CODE: `Gear5_${window?.location?.hostname}_referral_code`,
  CAMPAIGN_CODE: `Gear5_${window?.location?.hostname}_campaign_code`,
  COUNTER_HUMAN_CHECK: `Gear5_${window?.location?.hostname}_counter`,
  COUNTER_MOVE: `Gear5_${window?.location?.hostname}_move`
}

export const setCookie = (key, value) => {
  cookies.set(key, value)
}

export const getCookie = (key) => cookies.get(key)
export const removeCookie = (key) => cookies.remove(key)
