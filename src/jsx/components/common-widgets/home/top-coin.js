import { Avatar } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WS_URL } from '../../../../api/BaseRequest'
// import { getPrice } from '../../../../api/BaseRequest'
import { MySkeletonLoadinng } from '../my-spinner'
// const getImage = (symbol) => {
//   return ``
// }

export const TopCoins = () => {
  const sparklineIndex = [
    1, 279, 325, 825, 6319, 44, 5
  ]
  const navigate = useNavigate()
  const [topCoins, setTopCoins] = useState([])
  const [listData, setListData] = useState()
  const [screenWidth, setScreenWidth] = useState()

  // GET TOP COINS DATA
  useEffect(() => {
    const socket = new WebSocket(`${WS_URL}/prices/crypto/latest`)

    socket?.addEventListener('open', () => {
      // console.log('WS Opened')
    })

    socket?.addEventListener('close', () => {
      // console.log('WS Closed')
    })

    socket?.addEventListener('error', (error) => {
      console.log('WS Error' + error)
    })

    socket?.addEventListener('message', (message) => {
      const data = JSON.parse(message?.data)
      const type = data?.type
      if (type === 'ping') {
        socket.send('pong')
      }
      if (type === 'add') {
        setTopCoins(data?.data)
      }
    })
  }, [])

  useEffect(() => {
    if (screenWidth > 1600) {
      setListData(topCoins && topCoins?.slice(0, 6))
    }
    if (screenWidth < 1600) {
      setListData(topCoins && topCoins?.slice(0, 7))
    }
  }, [screenWidth, topCoins])

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      setScreenWidth(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onTopCoinsClicked = (item) => {
    const type = item?.cryptoid?.split('_')[1]
    const name = item?.cryptoid?.split('_')[2]
    if (type === 'coin') {
      navigate(`products/crypto/${type}/${name}`)
    } else if (type === 'token') {
      const address = item?.cryptoid?.split('_')[3]
      navigate(`products/crypto/${type}/${name}/${address}`)
    }
  }

  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card' style={{ height: '100%' }}>
        <div className='card-header border-0 pb-0'>
          <div >
            <h3 className='heading'>Top&nbsp;Coins</h3>
          </div>
        </div>

        <div className='card-body pt-0' style={{ padding: '0px 0.7rem' }}>
          {listData ? (!_.isEmpty(listData) ? listData?.map((item, index) => (
            <div className='previews-info-list' key={index} style={{ cursor: 'pointer' }} onClick={() => onTopCoinsClicked(item)}>
              <div className='pre-icon top-coin-info'>
                <span
                  className='top-coin-icon'
                >
                  <Avatar alt='Cryptocurrency Logo' src={`/img/${item?.symbol?.toLowerCase()}.webp`}></Avatar>
                </span>
                <div className='ms-2'>
                  <div className='top-coin-name fs-16' style={{ color: 'black', fontWeight: '500' }}>{item?.name}</div>
                  {item?.symbol}
                </div>
              </div>
              <div className='count top-coin-price'>
                <div className='fs-14' style={{ color: 'black', fontWeight: '500' }}>${new Intl.NumberFormat().format(item?.priceUSD)}</div>
                <span className={item?.pricePercentChange24h > 0 ? 'text-success' : 'text-danger'}>
                  {item?.pricePercentChange24h?.toFixed(2)}%
                </span>
              </div>
              <div className='chart-img top-coin-img' >
                <img className='img-fluid' alt='Cryptocurrency Chart' src={`https://www.coingecko.com/coins/${sparklineIndex[index]}/sparkline.svg`} width={100} height={40} />
              </div>
            </div>
          )) : <MySkeletonLoadinng count={5} height={70}/>) : <MySkeletonLoadinng count={5} height={70}/>}
        </div>
      </div>
    </div>
  </div>
}
