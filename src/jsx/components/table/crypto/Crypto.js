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
// import { ChainListContext } from '../../layout/Main'
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
import { isValidProductId, formatImgUrlFromProductId, formatUrlDetailFromUrlImageExchange, getExchangeNameFromUrlImageExchage, toCammelCase } from '../../../../utils/formatText'
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
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { copyContractAddress } from '../../../../utils/effect'

const Crypto = ({
  listProduct,
  handleChangeTable,
  params,
  loading,
  handleFilter,
  total
}) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const [listData, setListData] = useState([])

  useEffect(() => {
    const getChain = async() => {
      if (!_.isEmpty(listProduct)) {
        const newListData = []
        listProduct?.forEach((itemProduct) => {
          if (!_.isEmpty(itemProduct?.multichain)) {
            // const listMultiChain = [];

            // itemProduct?.multichain?.forEach((itemMultiChain) => {
            //   console.log(chainList);
            //   const itemChain =
            //     chainList &&
            //     chainList?.find(
            //       (itemChain) =>
            //         itemChain?.chainName === itemMultiChain?.chainName
            //     );
            //   if (
            //     itemChain &&
            //     itemChain?.image !== null &&
            //     itemChain?.image !== ""
            //   ) {
            //     listMultiChain.push({
            //       ...itemMultiChain,
            //       ...itemChain,
            //     });
            //   }
            // });
            // if (!_.isEmpty(listMultiChain)) {
            newListData.push({
              ...itemProduct,
              // multichain: listMultiChain,
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
            // }
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
        }
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

  const columns = [
    {
      title: 'Name',
      fixed: 'left',
      render: (_, record) => (
        <Link
          to={`../../../${PREFIX_DETAIL}/${CRYPTO}/${
            record?.cryptoId?.split('_')[1]
          }/${record?.cryptoId?.split('_')[2]}${
            record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN
              ? `/${record?.cryptoId?.split('_')[3]}`
              : ''
          }`}
          className='crypto-table-info image-list'
        >
          {record?.cryptoId && record?.bigLogo
            ? <Image src={isValidProductId(record?.cryptoId) ? formatImgUrlFromProductId(record?.cryptoId) : imgAbsentImageCrypto} preview={false} />
            : (
              <span className='image-list-no-data'>
                {record?.name?.slice(0, 3)}
              </span>
            )}
          <span>
            <div className='data-table-name'>
              <div className='data-table-name-title'>{record?.name}</div>
              <div className='data-table-symbol'>{record?.symbol}</div>
              <div className='image-list-icon-scam-warning'>
                {record?.isScam ? (
                  <Image src={scam} preview={false} />
                ) : record?.isWarning ? (
                  <Image src={warning} preview={false} />
                ) : (
                  ''
                )}
              </div>
            </div>
            {record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN && (
              <div className='data-table-address'>
                <span style={{ color: 'blue' }}>
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
                    copyContractAddress(e, record?.cryptoId?.split('_')[3])
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
              ? formatMoneyGreaterEqualOneDollar(record?.priceUSD)
              : record?.priceUSD > 0 // format money greater than 0
                ? formatMoneyLessOneDollar(record.priceUSD)
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
      key: 'chains',
      render: (_, record) => (
        record?.multichain
          ? <div onClick={(e) => onCancelClick(e)}
          >
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
                <React.Fragment key={item?.cryptoId}>
                  {chainList[item?.chainName] && (
                    <Tooltip title={toCammelCase(chainList[item?.chainName]?.chainName)}>
                      <Avatar
                        size={25}
                        src={chainList[item?.chainName]?.image}
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
                size={25}
                src={chainList[record?.chainName]?.image}
                key={record}
                className='crypto-table-chain'
                onClick={(e) => onCancelClick(e)}
              />
            </Tooltip>
            : record?.bigLogo ? (
              <Tooltip title={record?.name}>
                <Avatar
                  src={formatImgUrlFromProductId(record?.cryptoId)}
                  preview={false}
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
      // width: '10rem',
      render: (_, record) => (
        <Avatar.Group
          maxCount={4}
          size={25}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
        >
          {record?.exchanges?.map((item, index) => (
            <React.Fragment key={index}>
              {item && (
                <Tooltip title={getExchangeNameFromUrlImageExchage(item)} >
                  <Avatar
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
      render: (_, record) => <span>{record?.marketcapUSD ? renderNumber(record?.marketcapUSD) : NO_DATA}</span>
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
      render: (_, record) => <MyScoreComponent score={record?.score} />
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
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}>
        A total of{' '}
        <b>{total ? new Intl.NumberFormat().format(total) : 0}</b> Coins /
        Token Contracts found.
      </div>
      <Row>
        <Col md={{ span: 18 }} sm={{ span: 18 }} xs={{ span: 20 }}>
          <CategorySearch type={CRYPTO}/>
        </Col>
        <Col md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 4 }}>
          <DrawerFilter type='crypto' handleFilter={handleFilter} />
        </Col>
      </Row>
      <Table
        loading={loading}
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
    </div>
  )
}

export default Crypto

