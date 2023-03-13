import { Avatar } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get } from '../../../../../api/BaseRequest'
import { ChainListContext } from '../../../../../App'
// import { ChainListContext } from '../../../../../App'
import { MySkeletonLoadinng } from '../../my-spinner'

export const LatestTokenTable = () => {
  const chainList = useContext(ChainListContext)
  const navigate = useNavigate()
  //   const [screenWidth, setScreenWidth] = useState()
  const [latestTokens, setLatestTokens] = useState()

  const getChainImage = (chainname) => {
    const item = Object.keys(chainList)?.find(element => element === chainname)
    return chainList[item]?.image
  }
  console.log(chainList)
  useEffect(() =>{
    const getLatestTokens = async() => {
      const res = await get('reviews/crypto/latest')
      if (res?.code === 'B.CODE.200') {
        const temp = res?.data
        if (temp?.length > 7) {
          setLatestTokens(res?.data?.slice(0, 7))
        } else {
          setLatestTokens(temp)
        }
      }
    }
    getLatestTokens()
  }, [])

  //   useEffect(() => {
  //     if (screenWidth > 1600) {
  //       setLatestTokens(latestTokens && latestTokens?.slice(0, 6))
  //     }
  //     if (screenWidth < 1600) {
  //       setLatestTokens(latestTokens && latestTokens?.slice(0, 7))
  //     }
  //   }, [screenWidth, latestTokens])

  //   useEffect(() => {
  //     function handleResize() {
  //       const { innerWidth: width } = window
  //       setScreenWidth(width)
  //     }

  //     handleResize()
  //     window.addEventListener('resize', handleResize)
  //     return () => window.removeEventListener('resize', handleResize)
  //   }, [])

  const onTopCoinsClicked = (item) => {
    const type = item?.cryptoId?.split('_')[1]
    const name = item?.cryptoId?.split('_')[2]
    if (type === 'coin') {
      navigate(`products/crypto/${type}/${name}`)
    } else if (type === 'token') {
      const address = item?.cryptoId?.split('_')[3]
      navigate(`products/crypto/${type}/${name}/${address}`)
    }
  }

  const agoRender = (date) => {
    if (moment(date)?.isValid) {
      const ago = `${moment(date, 'YYYY-MM-DD HH:mm:ss')?.fromNow()}`
      return _.capitalize(ago && ago)
    } else {
      return ''
    }
  }
  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card' style={{ height: '100%' }}>
        <div className='card-header border-0 pb-0'>
          <div >
            <h2 className='heading'>Gear5 Live New&nbsp;Tokens</h2>
          </div>
        </div>
        <div className='card-body pt-0' style={{ padding: '0px 0.7rem' }}>
          {latestTokens ? (!_.isEmpty(latestTokens) ? latestTokens?.map((item, index) => (
            <div className='previews-info-list' key={index} style={{ cursor: 'pointer' }} onClick={() => onTopCoinsClicked(item)}>
              <div className='pre-icon top-coin-info'>
                <span
                  className='top-coin-icon'
                >
                  <Avatar alt='Cryptocurrency Logo' style={{ backgroundColor: '#fff', color: '#18A594', fontWeight: 'bold' }}>{item?.name && item?.name?.slice(0, 2)?.toUpperCase()}</Avatar>
                </span>
                <div className='ms-2'>
                  <h6 className=''>{item?.name && _.truncate(item?.name, { length: 15 })}
                    {/* {item?.symbol && `(${item?.symbol})` */}
                  </h6>
                  <div className='d-flex'>
                    <Avatar className='me-1' size={20} src={getChainImage(item?.chainName)}/>
                    {item?.address && _.truncate(item?.address, { length: 15 })}
                  </div>
                </div>
              </div>
              <div className='count'>
                {item?.createdDate && agoRender(item?.createdDate)}
              </div>
            </div>
          )) : <MySkeletonLoadinng count={5} height={70}/>) : <MySkeletonLoadinng count={5} height={70}/>}
        </div>
      </div>
    </div>
  </div>
}
