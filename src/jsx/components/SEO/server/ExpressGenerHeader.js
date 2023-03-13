import { getHeaderHome } from './home'
import { getHeaderListInsight } from './insight'
import { getHeaderListCrypto } from './listCrypto'
import { getHeaderListDApp } from './listDApp'
import { getHeaderListExchange } from './listExchange'
import { getHeaderListLaunchpad } from './listLaunchpad'
import { getHeaderListSoon } from './listSoon'
import { getHeaderListVenture } from './listVenture'

// <!-- Copy logic from handle route, discard [res] parameter -->
export const genListHeader = (category, subCategory) => {
  switch (category) {
    case 'crypto':{
      return getHeaderListCrypto(subCategory)
    }
    case 'dapp':{
      return getHeaderListDApp(subCategory)
    }
    case 'venture':{
      return getHeaderListVenture(subCategory)
    }
    case 'exchange':{
      return getHeaderListExchange(subCategory)
    }
    case 'soon':{
      return getHeaderListSoon(subCategory)
    }
    case 'launchpad':{
      return getHeaderListLaunchpad(subCategory)
    }
    case 'insight':{
      return getHeaderListInsight(subCategory)
    }
    default: {
      return getHeaderHome()
    }
  }
}
