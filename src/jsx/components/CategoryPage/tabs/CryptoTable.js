import React, { useContext, useEffect, useState } from 'react'
import { Table, Image, Tooltip, Avatar, message } from 'antd'
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
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'

const CryptoTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const [listProduct, setListProduct] = useState()

  const copyAddress = (e, address) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(address)
    message.success({
      content: 'Copy address successfully',
      duration: 3
    })
  }

  useEffect(() => {
    const getChain = async() => {
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
          setListProduct(newListData)
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
          className='crypto-table-info image-list'
        >
          {record?.cryptoId && record?.smallLogo ? (
            <Image src={isValidProductId(record?.cryptoId) ? formatImgUrlFromProductId(record?.cryptoId) : imgAbsentImageCrypto} preview={false} />
          ) : (
            <span className='image-list-no-data'>
              {record?.name?.slice(0, 3)}
            </span>
          )}

          <span>
            <div className='data-table-name'>
              <div className='data-table-name-title'>{record?.name}</div>
              <div className='data-table-symbol'>{record?.symbol}</div>
            </div>
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
                    copyAddress(e, record?.cryptoId?.split('_')[3])
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
          {record?.priceUSD !== null && record?.priceUSD > 0
            ? `$ ${record?.priceUSD
              ?.toFixed(4)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
            : '0$'}
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
        <Avatar.Group
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
        >
          {record?.multichain?.map((item, index) => (
            <>
              {chainList[item?.chainName] && (
                <Avatar
                  size={25}
                  src={chainList[item?.chainName]?.image}
                  key={index}
                  className='crypto-table-chain'
                />
              )}
            </>
          ))}
        </Avatar.Group>
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
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
        >
          {record?.exchanges?.map((item, index) => (
            <>
              {item && (
                <Avatar
                  size={25}
                  src={item}
                  key={index}
                  className='crypto-table-exchange'
                  onClick={(e) => handleClickExchange(e, item)}
                />
              )}
            </>
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
      render: (_, record) => <span>{renderNumber(record?.marketcapUSD)}</span>
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
        {new Intl.NumberFormat().format(record?.holders)}
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
      // showSorterTooltip: false,
      dataIndex: 'score',
      align: 'center',
      // sorter: (a, b) => a.score - b.score,
      // defaultSortOrder: 'descend',
      render: (_, record) => <MyScoreComponent score={record?.score} />
    }
  ]

  console.log(listProduct?.length)
  return (
    <div className='crypto-table'>
      {/* {listData ? ( */}
      <Table
        loading={loading}
        columns={columns}
        dataSource={(listProduct?.length > MAX_PAGE * 20) ? listProduct?.slice(0, 200) : listProduct}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: false
        }}
        rowKey={(record) => record?.cryptoId}
        onRow={(record) => ({
          onClick: () => {
            handleRowClicked(record)
          }
        })}
        scroll={{ x: 'max-content' }}
      />
      {/* ) : (
        <>
          <Empty
            image={nodata}
            description={
              <span>
                <span
                  style={{ fontSize: "1.8em", color: "red", fontWeight: 600 }}
                >
                  SORRY{" "}
                </span>
                <span
                  style={{
                    fontSize: "1.6rem",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: "600",
                  }}
                >
                  NO DATA FOUND
                </span>
              </span>
            }
          />
        </>
      )} */}
    </div>
  )
}

export default CryptoTable
