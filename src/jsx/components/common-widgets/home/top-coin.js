import { Avatar } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPrice } from '../../../../api/BaseRequest'
import { MySpinner } from '../my-spinner'

export const TopCoins = () => {
  const sparklineIndex = [
    1, 279, 325, 825, 6319, 44
  ]
  const navigate = useNavigate()
  const [topCoins, setTopCoins] = useState()

  // GET TOP COINS DATA
  useEffect(() => {
    const getTopCoinData = async() => {
      const res = await getPrice('prices/crypto/top')
      if (res?.code === 'B.200') {
        const temp = res?.data
        if (temp?.length > 6) {
          setTopCoins(temp?.slice(0, 6))
        }
      }
    }

    const intervalCall = setInterval(() =>{
      getTopCoinData()
    }, 1000)
    return () => { clearInterval(intervalCall) }
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
        {topCoins ? <div className='card-body pt-0 px-0' style={{ padding: '0px' }}>
          {topCoins?.map((item, index) => (
            <div className='previews-info-list' key={index} style={{ cursor: 'pointer' }} onClick={() => onTopCoinsClicked(item)}>
              <div className='pre-icon' style={{ width: '200px' }}>
                <span
                  className='top-coin-icon'
                >
                  <Avatar src={ item?.bigLogo}></Avatar>
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
          ))}
        </div> : <MySpinner />}
      </div>
    </div>
  </div>
}
