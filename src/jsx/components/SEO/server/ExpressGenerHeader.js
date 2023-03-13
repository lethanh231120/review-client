import { getHeaderListCrypto } from './listCrypto'

// <!-- Copy logic from handle route, discard [res] parameter -->
export const genListHeader = (category, subCategory) => {
  switch (category) {
    case 'crypto':{
      getHeaderListCrypto(subCategory)
      break
    }
    // case 'dapp':{
    //   genStaticHeader(getMetaTagListDApp(subCategory))
    //   break
    // }
    // case 'venture':{
    //   genStaticHeader(getMetaTagListVenture())
    //   break
    // }
    // case 'exchange':{
    //   genStaticHeader(getMetaTagListExchange(subCategory))
    //   break
    // }
    // case 'soon':{
    //   genStaticHeader(getMetaTagListSoon(subCategory))
    //   break
    // }
    // case 'launchpad':{
    //   genStaticHeader(getMetaTagListLaunchpad())
    //   break
    // }
    // case 'insight':{
    //   genStaticHeader(getMetaTagInsight())
    //   break
    // }
    // default: {
    //   genStaticHeader(getMetaTagHome())
    //   break
    // }
  }
}
