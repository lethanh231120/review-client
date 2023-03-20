import React, { useContext, useEffect, useState } from 'react'
import { Table, Image, Tooltip, Avatar } from 'antd'
import {
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ApartmentOutlined
} from '@ant-design/icons'
import { renderNumber } from '../../../../utils/formatNumber'
import { useNavigate, Link } from 'react-router-dom'
import '../../table/crypto/crypto.scss'
import { ChainListContext } from '../../../../App'
import _ from 'lodash'
import MyScoreComponent from '../../score/scoreComponent'
import { exchanges } from '../../../../utils/ExchangeImage'
import { formatUrlDetailFromUrlImageExchange } from '../../../../utils/formatText'
import { MAX_PAGE } from '../../../constants/pagination'
import { formatImgUrlFromProductId } from '../../../../utils/formatText'
import { copyAddress } from '../../../../utils/effect'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { CRYPTO } from './../../../constants/category'
import { NO_DATA } from '../../../constants/data'
import { formatMoneyGreaterEqualOneDollar } from '../../../../utils/formatNumber'
import { formatMoneyLessOneDollar } from '../../../../utils/formatNumber'
import { toCammelCase, getExchangeNameFromUrlImageExchage } from '../../../../utils/formatText'
import { formatLargeNumber } from '../../../../utils/formatNumber'

const CryptoTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const [listProduct, setListProduct] = useState([])

  useEffect(() => {
    const getChain = async() => {
      setListProduct()
      if (!_.isEmpty(listData)) {
        const newListData = []
        listData?.forEach((itemProduct) => {
          if (!_.isEmpty(itemProduct?.multichain)) {
            newListData.push({
              ...itemProduct,
              exchanges: [
                itemProduct?.isBinance !== null && itemProduct?.isBinance
                  ? [exchanges?.binance]
                  : [],
                itemProduct?.isCoinbase && itemProduct?.isCoinbase !== null
                  ? [exchanges?.coinbase]
                  : [],
                itemProduct?.isPancakeSwap &&
                itemProduct?.isPancakeSwap !== null
                  ? [exchanges?.pancakeswap]
                  : [],
                itemProduct?.isUniSwap && itemProduct?.isUniSwap !== null
                  ? [exchanges?.uniswap]
                  : []
              ]?.flat(1)
            })
          } else {
            newListData.push({
              ...itemProduct,
              exchanges: [
                itemProduct?.isBinance && itemProduct?.isBinance !== null
                  ? [exchanges?.binance]
                  : [],
                itemProduct?.isCoinbase && itemProduct?.isCoinbase !== null
                  ? [exchanges?.coinbase]
                  : [],
                itemProduct?.isPancakeSwap &&
                itemProduct?.isPancakeSwap !== null
                  ? [exchanges?.pancakeswap]
                  : [],
                itemProduct?.isUniSwap && itemProduct?.isUniSwap !== null
                  ? [exchanges?.uniswap]
                  : []
              ]?.flat(1)
            })
          }
        })
        if (!_.isEmpty(newListData)) {
          setListProduct((newListData?.length > MAX_PAGE * 20) ? newListData?.slice(0, 200) : newListData)
        }
      }
    }
    getChain()
  }, [listData, chainList])

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../products/${urlDetail}`)
  }

  const handleRowClicked = (record) => {
    if (record?.cryptoId?.split('_')[1] === 'token') {
      navigate(
        `../../../products/crypto/${record?.cryptoId?.split('_')[1]}/${
          record?.cryptoId?.split('_')[2]
        }/${record?.cryptoId?.split('_')[3]}`
      )
    } else {
      navigate(
        `../../../products/crypto/${record?.cryptoId?.split('_')[1]}/${
          record?.cryptoId?.split('_')[2]
        }`
      )
    }
  }

  const onCancelClick = (e) =>{
    e.stopPropagation()
  }

  const columns = [
    {
      title: 'Name',
      fixed: 'left',
      render: (_, record) => (
        <Link
          to={`../../../products/crypto/${record?.cryptoId?.split('_')[1]}/${
            record?.cryptoId?.split('_')[2]
          }${
            record?.cryptoId?.split('_')[1] === 'token'
              ? `/${record?.cryptoId?.split('_')[3]}`
              : ''
          }`}
          onClick={(e) => e.stopPropagation()}
          className='crypto-table-info image-list'
        >
          {record?.cryptoId && record?.smallLogo ? (
            <Image src={record?.smallLogo} alt='Cryptocurrency Logo'/>
          ) : (
            <span className='image-list-no-data'>
              {record?.name?.slice(0, 3)}
            </span>
          )}
          <span>
            <Tooltip
              title={(
                <p>{`${record?.name} - ${record?.symbol}`}</p>
              )}>
              <div className='data-table-name'>
                <div className='data-table-name-title'>{record?.name}</div>
                <div className='data-table-symbol'>{record?.symbol}</div>
              </div>
            </Tooltip>
            {record?.cryptoId?.split('_')[1] === 'token' && (
              <div className='data-table-address'>
                {`${record?.cryptoId
                  ?.split('_')[3]
                  ?.slice(0, 4)}...${record?.cryptoId
                  ?.split('_')[3]
                  ?.slice(
                    record?.cryptoId?.split('_')[3]?.length - 4,
                    record?.cryptoId?.split('_')[3]?.length
                  )}`}
                <CopyOutlined
                  onClick={(e) =>
                    copyAddress(e, record?.cryptoId?.split('_')[3], 'Copy address successfully')
                  }
                />
              </div>
            )}
          </span>
        </Link>
      )
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Price
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title='Current equivalent price in US dollars of the token/coin'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'priceUSD',
      align: 'right',
      render: (_, record) => (
        <>
          {
            record?.priceUSD && record?.priceUSD >= 1 // format money greater than or equal with 1
              ? <b className='text-primary'>{formatMoneyGreaterEqualOneDollar(record?.priceUSD)}</b>
              : record?.priceUSD > 0 // format money greater than 0
                ? <b className='text-primary'>{formatMoneyLessOneDollar(record.priceUSD)}</b>
                : NO_DATA // money less than or equal with 0
          }
        </>
      )
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Chains
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title='The blockchains that this token/coin is currently on'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'chains',
      render: (_, record) => (
        record?.multichain
          ? <div onClick={(e) => onCancelClick(e)}
          >
            <Avatar.Group
              alt='Blockchains Logos'
              maxCount={record?.multichain?.length >= 4 ? 2 : 3}
              size={25}
              maxStyle={{
                color: '#fff',
                backgroundColor: '#039F7F',
                cursor: 'pointer'
              }}
            >
              {record?.multichain?.map((item, index) => (
                <React.Fragment key={item?.cryptoId}>
                  {chainList[item?.split('_')[2]] && (
                    <Tooltip title={toCammelCase(chainList[item?.split('_')[2]]?.chainName)}>
                      <Avatar
                        alt='Blockchain Logo'
                        size={25}
                        src={chainList[item?.split('_')[2]]?.image}
                        key={index}
                        className='crypto-table-chain'
                        onClick={(e) => onCancelClick(e)}
                      />
                    </Tooltip>
                  )}
                </React.Fragment>
              ))}
            </Avatar.Group>
          </div>
          : chainList[record?.chainName]
            ? <Tooltip title={toCammelCase(chainList[record?.chainName]?.chainName)}>
              <Avatar
                alt='Blockchain Logo'
                size={25}
                src={chainList[record?.chainName]?.image}
                key={record}
                className='crypto-table-chain'
                onClick={(e) => onCancelClick(e)}
              />
            </Tooltip>
            : record?.smallLogo ? (
              <Tooltip title={record?.name}>
                <Avatar
                  alt='Blockchain Logo'
                  src={formatImgUrlFromProductId(record?.cryptoId)}
                  // preview={false}
                  size={25}
                  key={record}
                  onClick={(e) => onCancelClick(e)}
                />
              </Tooltip>
            ) : (
              <span className='crypto-table-info-logo image-list-no-data'>
                {record?.name?.slice(0, 3)}
              </span>
            )
      )
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Exchanges
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title='The exchanges that this token/coin can be traded on'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'exchanges',
      render: (_, record) => (
        <Avatar.Group
          alt='Exchanges Logos'
          maxCount={4}
          size={25}
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
        >
          {record?.exchanges?.map((item, index) => (
            <React.Fragment key={index}>
              {item && (
                <Tooltip title={getExchangeNameFromUrlImageExchage(item)} >
                  <Avatar
                    alt='Exchange Logo'
                    size={25}
                    src={item}
                    key={index}
                    className='crypto-table-exchange'
                    onClick={(e) => handleClickExchange(e, item)}
                  />
                </Tooltip>

              )}
            </React.Fragment>
          ))}
        </Avatar.Group>
      )
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Contract
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title='Token contract verified status'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      align: 'center',
      dataIndex: 'contractVerified',
      render: (_, record) => (
        <span>
          {record?.contractVerified !== null && (
            <div style={{ display: 'flex', padding: '0 5px' }}>
              <Tooltip
                title={
                  record?.contractVerified
                    ? `${record?.name} contract has been verified`
                    : `${record?.name} contract has not been verified`
                }
              >
                {record?.contractVerified ? (
                  <CheckCircleOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                )}
              </Tooltip>{' '}
              <Tooltip
                title={
                  record?.isProxy
                    ? `${record?.name} contract does not have a proxy`
                    : `${record?.name} contract contains a proxy`
                }
              >
                {record?.isProxy ? (
                  <ApartmentOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                ) : (
                  <ApartmentOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                )}
              </Tooltip>
            </div>
          )}
        </span>
      )
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Market Cap
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title="Token/Coin's market cap"
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      align: 'right',
      dataIndex: 'marketcapUSD',
      render: (_, record) => <span>{record?.marketcapUSD ? <>{renderNumber(record?.marketcapUSD)}</> : NO_DATA}</span>
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Holders
        </span>
      ),
      dataIndex: 'holders',
      align: 'right',
      render: (_, record) => (<span>
        {formatLargeNumber(record?.holders)}
      </span>)
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Score
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title="Token/Coin's score graded by Gear5"
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => <MyScoreComponent score={record?.score} type={CRYPTO} />
    }
  ]

  return (
    <div className='crypto-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <Table
          columns={columns}
          dataSource={listProduct}
          pagination={listProduct?.length > 20 ? {
            defaultPageSize: 20,
            showSizeChanger: false
          } : false}
          rowKey={(record) => record?.cryptoId}
          onRow={(record) => ({
            onClick: () => {
              handleRowClicked(record)
            }
          })}
        />
      )}
    </div>
  )
}

export default CryptoTable
