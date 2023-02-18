import { Avatar } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MySpinner } from '../my-spinner'
// const getImage = (symbol) => {
//   return ``
// }

export const TopCoins = () => {
  const sparklineIndex = [
    1, 279, 325, 825, 6319, 44
  ]
  const navigate = useNavigate()
  const [topCoins, setTopCoins] = useState([])

  const PRICE_WS_URL = 'wss://crypto-price.gear5.guru/prices/crypto/top'
  // GET TOP COINS DATA
  useEffect(() => {
    const socket = new WebSocket(PRICE_WS_URL)

    socket?.addEventListener('open', () => {
      console.log('WS Opened')
    })

    socket?.addEventListener('close', () => {
      console.log('WS Closed')
    })

    socket?.addEventListener('error', (error) => {
      console.log('WS Error' + error)
    })

    socket?.addEventListener('message', (message) => {
      const data = JSON.parse(message?.data)
      data && setTopCoins(data?.slice(0, 5))
    })
  }, [])

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

  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card' style={{ height: '100%' }}>
        <div className='card-header border-0 pb-0'>
          <div >
            <h2 className='heading'>Top&nbsp;Coins</h2>
          </div>
        </div>
        {topCoins
          ? <div className='card-body pt-0 px-0' style={{ padding: '0px' }}>
            {!_.isEmpty(topCoins) ? topCoins?.map((item, index) => (
              <div className='previews-info-list' key={index} style={{ cursor: 'pointer' }} onClick={() => onTopCoinsClicked(item)}>
                <div className='pre-icon' style={{ width: '200px' }}>
                  <span
                    className='top-coin-icon'
                  >
                    <Avatar src={`/img/${item?.symbol?.toLowerCase()}.png`}></Avatar>
                  </span>
                  <div className='ms-3'>
                    <h6>{item?.name}</h6>
                    {item?.symbol}
                  </div>
                </div>
                <div className='count' style={{ width: '100px' }}>
                  <h6>${new Intl.NumberFormat().format(item?.price)}</h6>
                  <span className={parseInt(item?.percentChange24h) > 0 ? 'text-success' : 'text-danger'}>
                    {item?.percentChange24h?.toFixed(2)}%
                  </span>
                </div>
                <div className='chart-img' >
                  <img className='img-fluid' alt='' src={`https://www.coingecko.com/coins/${sparklineIndex[index]}/sparkline`} width={100} height={40} />
                </div>
              </div>
            )) : <div className='ms-2'>No Top coins Available</div>}
          </div> : <MySpinner />}
      </div>
    </div>
  </div>
}
