import { Avatar, Card, Table, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { get } from '../../../api/BaseRequest'
import { ChainListContext } from '../../../App'
import {
//   CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ApartmentOutlined
} from '@ant-design/icons'
import Timer from './Timer'
import { useNavigate } from 'react-router-dom'
import './live-new-tokens.scss'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import _ from 'lodash'

const LiveNewTokensList = () => {
  const navigate = useNavigate()
  const PAGE_SIZE = 100
  const [tokenList, setTokenList] = useState([])
  const [loading, setLoading] = useState(true)
  const chainList = useContext(ChainListContext)

  useEffect(() => {
    const getAllTokens = async() => {
      const res = await get('reviews/crypto/latest?limit=100')
      if (res?.code === 'B.CODE.200') {
        setTokenList(res?.data)
        setLoading(false)
      }
    }
    getAllTokens()
    const interval = setInterval(() => {
      getAllTokens()
    }, 30000)

    return () => {
      clearInterval(interval
      )
    }
  }, [])

  const getChainImage = (chainname) => {
    const item = Object.keys(chainList)?.find(element => element === chainname)
    return chainList[item]?.image
  }

  const getChainWebsite = (chainname) => {
    const item = Object.keys(chainList)?.find(element => element === chainname)
    return chainList[item]?.exploreWebsite
  }

  const onRowClicked = (cryptoId) => {
    if (cryptoId) {
      const splitted = cryptoId?.split('_')
      navigate(`../../products/crypto/${splitted[1]}/${splitted[2]}/${splitted[3]}`)
    }
  }

  const onAddressClicked = (e, address, chainName) => {
    e.stopPropagation()
    const website = getChainWebsite(chainName)
    console.log(`${website}/token/${address}`)

    website && window.open(`${website}/token/${address}`)
  }

  const formatPrice = (price) => {
    const FIXED_ZEROS = 10
    const formatted = Number(price).toFixed(FIXED_ZEROS).replace(/\.?0+$/, '')
    return formatted || null
  }

  const shortenString = (txt) => {
    const MAX_LENGTH = 20
    if (txt && txt.length > MAX_LENGTH) {
      return _.truncate(txt, { length: MAX_LENGTH })
    } else {
      return txt
    }
  }

  const columns = [
    {
      title: 'Name/Symbol',
      render: (_, record) => (<div className=' d-flex'>
        <span className='top-coin-icon' >
          <Avatar alt='Logo' style={{ backgroundColor: '#fff', color: '#18A594', fontWeight: 'bold' }}>{record?.name && record?.name?.slice(0, 2)?.toUpperCase()}</Avatar>
        </span>
        <div className='ms-2'>
          <div className='d-flex align-items-center'>
            <div className=' fs-16' style={{ color: 'black', fontWeight: '500' }}>{record?.name && shortenString(record?.name)}
            </div>
            <div className='fs-14 d-flex align-items-center' style={{ color: 'black', fontWeight: '500' }}> {record?.symbol && `(${shortenString(record?.symbol)})`}</div>
          </div>
          <div className='d-flex align-items-center'>
            <Avatar size={20} src={record?.chainName && getChainImage(record?.chainName)}/>
            <span className='token-address text-etc-overflow ms-1'
              onClick={e => onAddressClicked(e, record?.address, record?.chainName)}>{record?.address && record?.address }
            </span>
          </div>
        </div>
      </div>)
    },
    {
      title: 'Price',
      render: (_, record) => (<div className='highlight-text'>{record?.priceUSD && `$${formatPrice(record?.priceUSD)}`}</div>)
    },
    {
      title: 'Listed Since',
      render: (_, record) => (<div className='highlight-text'>
        {record?.createdDate && <Timer inputDate={record?.createdDate}/>}
      </div>)
    },
    {
      title: 'Holders',
      render: (_, record) => (<div className='highlight-text'>{record?.holders && record?.holders}</div>)
    },
    {
      title: 'Contract',
      align: 'center',
      render: (_, record) => (<div className='d-flex justify-content-center'>
        <Tooltip title={record?.contractVerified ? 'This contract is verified' : 'This contract is NOT verified'}>
          <div style={{ color: record?.contractVerified ? 'green' : 'red' }}>  {record?.contractVerified ? <CheckCircleOutlined /> : <CloseCircleOutlined />}</div>
        </Tooltip>
        <Tooltip title={record?.isProxy ? 'This contract is a PROXY CONTRACT' : 'This contract is NOT a PROXY CONTRACT'}>
          <div className='ms-2'><ApartmentOutlined style={{ color: record?.isProxy ? 'red' : 'green' }}/></div>
        </Tooltip>
      </div>)
    }
  ]

  return <div className='font-family crypto-table'>
    <Card
    // title={<div>Live New Tokens</div>}s
    >
      {loading ? <MySkeletonLoadinng count={30} height={80} />
        : <Table
          loading={loading}
          columns={columns}
          dataSource={tokenList}
          pagination={{ pageSize: PAGE_SIZE, showSizeChanger: false, disabled: true }}
          rowKey={record => record?.cryptoId}
          onRow={(record) => ({
            onClick: () => {
              onRowClicked(record?.cryptoId)
            }
          })}
          className='new-token-table'
          scroll={{ x: 'max-content' }}
        />}
    </Card>
  </div>
}

export default LiveNewTokensList
