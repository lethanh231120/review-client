import React, { useEffect, useState, useContext } from 'react'
import './crypto.scss'
import { Image, Table, Avatar, Tooltip, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import {
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ApartmentOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ChainListContext } from '../../../../App'
import _ from 'lodash'
import {
  renderNumber,
  formatMoneyLessOneDollar,
  formatMoneyGreaterEqualOneDollar,
  formatLargeNumber
} from '../../../../utils/formatNumber'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { crypto_score_explain_text } from '../../../constants/data'
import MyScoreComponent from '../../score/scoreComponent'
import {
  formatImgUrlFromProductId,
  // isValidProductId,
  // formatImgUrlFromProductId,
  formatUrlDetailFromUrlImageExchange, getExchangeNameFromUrlImageExchage, toCammelCase } from '../../../../utils/formatText'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import {
  PREFIX_DETAIL,
  CRYPTO,
  CRYPTO_TOKEN
} from '../../../constants/category'
import { exchanges } from '../../../../utils/ExchangeImage'
import { NO_DATA } from '../../../constants/data'
// import CategorySearch from '../../layout/input-search/CategorySearch'
import CategorySearch from '../../input-search/CategorySearch'
import '../../../../scss/base/table.scss'
// import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { copyAddress } from '../../../../utils/effect'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { Badge } from 'react-bootstrap'

const Crypto = ({
  listProduct,
  handleChangeTable,
  params,
  handleFilter,
  total
}) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const [listData, setListData] = useState([])
  const [mainExplorerMap, setMainExplorerMap] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getChain = async() => {
      if (listProduct !== null) {
        if (!_.isEmpty(listProduct)) {
          const newListData = []
          listProduct?.forEach((itemProduct) => {
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
            setListData(newListData)
            setLoading(false)
          }
        }
      } else {
        setLoading(false)
      }
    }
    getChain()
  }, [listProduct, chainList])

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../${urlDetail}`)
  }

  const onCancelClick = (e) =>{
    e.stopPropagation()
  }

  const getAddressFromCryptoId = (cryptoId) =>{
    const parts = cryptoId?.split('_')
    if (parts.length < 4) {
      return null
    }
    return parts[3]
  }

  const getMainExplorer = records => {
    const mainExplorerMapLocal = new Map()
    records?.forEach(record => {
      if (!_.isEmpty(record?.multichain)) {
        const newMultiChain = []
        record?.multichain?.forEach((itemMulti) => {
          const itemChain = chainList[itemMulti?.chainName]
          if (itemChain) {
            newMultiChain.push({
              ...itemChain,
              ...itemMulti
            })
            // main address to display
            if (record.chainName === itemMulti?.chainName) {
              const address = getAddressFromCryptoId(record?.cryptoId)
              const url = itemChain?.exploreWebsite + itemChain?.path + address
              mainExplorerMapLocal.set(record?.cryptoId, url)
            }
          }
        })
      } else {
        // don't have multiple chain
        const dataChain = chainList[record?.chainName]
        // have data in chain list
        if (dataChain) {
          const address = getAddressFromCryptoId(record?.cryptoId)
          const url =
            `${dataChain?.exploreWebsite}${dataChain?.path}${address}`
          mainExplorerMapLocal.set(record?.cryptoId, url)
        }
      }
    })
    setMainExplorerMap(mainExplorerMapLocal)
  }

  useEffect(() => {
    getMainExplorer(listProduct)
  }, [])
  const onAddressClicked = (e, cryptoId) => {
    e.stopPropagation()
    e.preventDefault()
    const url = mainExplorerMap?.get(cryptoId)
    url && window.open(url, '_blank')
  }

  const columns = [
    {
      title: 'Name',
      fixed: 'left',
      render: (_, record) => (
        <Link
          onClick={e => e.stopPropagation()}
          to={`../../../${PREFIX_DETAIL}/${CRYPTO}/${
            record?.cryptoId?.split('_')[1]
          }/${record?.cryptoId?.split('_')[2]}${
            record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN
              ? `/${record?.cryptoId?.split('_')[3]}`
              : ''
          }`}
          className='crypto-table-info image-list'
        >
          {record?.cryptoId && record?.smallLogo
            ? <Image alt='Cryptocurrency Logo' src={record?.smallLogo} preview={false}/>
            : (
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
                <div className='image-list-icon-scam-warning'>
                  {record?.isScam ? (
                    <Image alt='Scam' src={scam} preview={false}/>
                  ) : record?.isWarning ? (
                    <Image alt='Warning' src={warning} preview={false}/>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Tooltip>
            {record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN && (
              <div className='data-table-address'>
                <span className='product-name-text text-primary' style={{ cursor: 'pointer' }}
                  onClick={(e) => onAddressClicked(e, record?.cryptoId)}>
                  {`${record?.cryptoId
                    ?.split('_')[3]
                    ?.slice(0, 4)}...${record?.cryptoId
                    ?.split('_')[3]
                    ?.slice(
                      record?.cryptoId?.split('_')[3]?.length - 4,
                      record?.cryptoId?.split('_')[3]?.length
                    )}`}
                </span>
                <CopyOutlined
                  onClick={(e) =>
                    copyAddress(e, record?.cryptoId?.split('_')[3], 'Copy address successfully!')
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
      showSorterTooltip: false,
      sorter: true,
      align: 'right',
      defaultSortOrder:
        params?.orderBy === 'priceUSD'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <>
          {
            record?.priceUSD && record?.priceUSD >= 1 // format money greater than or equal with 1
              ? <b className='text-primary'>{formatMoneyGreaterEqualOneDollar(record?.priceUSD)}</b>
              : record?.priceUSD > 0 // format money greater than 0
                ? <b className='text-primary'>{formatMoneyLessOneDollar(record.priceUSD)}</b>
                : record?.priceUSD <= 0 ? <b className='text-primary'>$0</b> : NO_DATA // money less than or equal with 0
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
      align: 'left',
      dataIndex: 'chains',
      key: 'chains',
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
      align: 'left',
      dataIndex: 'exchanges',
      // width: '10rem',
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
      // width: '10rem',
      key: 'contractVerified',
      align: 'center',
      dataIndex: 'contractVerified',
      render: (_, record) => (
        <span>
          {record?.contractVerified !== null && (
            <div style={{ display: 'flex', padding: '0 5px' }} onClick={(e) => onCancelClick(e)}
            >
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
                    ? `${record?.name} contract is a proxy contract`
                    : `${record?.name} contract is not a proxy contract`
                }
              >
                {record?.isProxy ? (
                  <ApartmentOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                ) : (
                  <ApartmentOutlined
                    style={{ color: 'green', padding: '0 5px' }}
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
      className: 'width-170',
      sorter: true,
      showSorterTooltip: false,
      key: 'marketcapUSD',
      align: 'right',
      dataIndex: 'marketcapUSD',
      defaultSortOrder:
        params?.orderBy === 'marketcapUSD'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => <span>{record?.marketcapUSD ? <>{renderNumber(record?.marketcapUSD)}</> : NO_DATA}</span>
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Holders
        </span>
      ),
      dataIndex: 'holders',
      showSorterTooltip: false,
      sorter: true,
      align: 'right',
      defaultSortOrder:
        params?.orderBy === 'holders'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
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
            title={crypto_score_explain_text}
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      className: 'width-120',
      showSorterTooltip: false,
      dataIndex: 'score',
      align: 'center',
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder:
      params?.orderBy === 'score'
        ? params?.sort === 'desc'
          ? 'descend'
          : 'ascend'
        : '',
      sorter: true,
      render: (_, record) => <MyScoreComponent score={record?.score} type={CRYPTO}/>
    }
  ]

  const handleRowClicked = (record) => {
    if (record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN) {
      navigate(
        `../../../${PREFIX_DETAIL}/${CRYPTO}/${
          record?.cryptoId?.split('_')[1]
        }/${record?.cryptoId?.split('_')[2]}/${record?.cryptoId?.split('_')[3]}`
      )
    } else {
      // type === coin
      navigate(
        `../../../${PREFIX_DETAIL}/${CRYPTO}/${
          record?.cryptoId?.split('_')[1]
        }/${record?.cryptoId?.split('_')[2]}`
      )
    }
  }

  return (
    <div className='font-family crypto-table'>
      {loading ? (<MySkeletonLoadinng count={50} height={70} />) : (
        <>
          <div style={{ fontSize: '1rem', padding: '0 0 1rem 0', color: 'black' }}>
            A total of{' '}
            <Badge className='progress-bar-striped progress-bar-animated'>{total ? new Intl.NumberFormat().format(total) : 0}</Badge> Coins/
            Token Contracts found.
          </div>
          <Row>
            <Col md={{ span: 18 }} sm={{ span: 17 }} xs={{ span: 17 }}>
              <CategorySearch type={CRYPTO}/>
            </Col>
            <Col md={{ span: 6 }} sm={{ span: 7 }} xs={{ span: 7 }}>
              <DrawerFilter type='crypto' handleFilter={handleFilter} />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={listData}
            onChange={handleChangeTable}
            pagination={false}
            rowKey={(record) => record?.cryptoId}
            onRow={(record) => ({
              onClick: () => {
                handleRowClicked(record)
              }
            })}
            scroll={{ x: 'max-content' }}
          />
        </>
      )}
    </div>
  )
}

export default Crypto

