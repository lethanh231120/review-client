import React from 'react'
import '../../table/exchange/exchange.scss'

import { Link } from 'react-router-dom'
// display table
import { Image, Table, Tooltip, Empty } from 'antd'
import { PREFIX_DETAIL, EXCHANGE } from '../../../constants/category'
import { renderNumber } from '../../../../utils/formatNumber'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import nodata from '../../../../images/product/nodata.png'
import MyScoreComponent from '../../score/scoreComponent'
import { encodeUrl } from '../../../../utils/formatUrl'
import { Badge } from 'react-bootstrap'
import { NO_DATA } from '../../../constants/data'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageExchange from '../../../../images/absent_image_exchange.png'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'

const ExchangeTable = ({ listData, loading }) => {
  const navigate = useNavigate()

  const handleClickTag = (e, value) => {
    e.stopPropagation()
    if (value) {
      navigate(`../../../${EXCHANGE}/${encodeUrl(value)}`)
    }
  }
  const columns = [
    {
      title: 'Name',
      render: (_, record) => (
        <Link
          to={`../../../${PREFIX_DETAIL}/${EXCHANGE}/${record?.exchangeId}`}
          className='crypto-table-info image-list'
        >
          {record?.exchangeId && record?.smallLogo ? (
            <Image src={isValidProductId(record?.exchangeId) ? formatImgUrlFromProductId(record?.exchangeId) : imgAbsentImageExchange} preview={false} alt='Exchange Logo'/>
          )
            : (<span className='image-list-no-data'>
              {record?.name?.slice(0, 3)}
            </span>)
          }
          <span>
            <div className='data-table-name'>
              <div className='data-table-name-title'>
                {record?.name ? record?.name : 'Unknown'}
              </div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: 'Subcategory',
      render: (_, record) => (
        <>
          {record?.subCategory ? (
            <Badge bg=' badge-l' className='badge-success' style={{ cursor: 'pointer' }} onClick={(e) => handleClickTag(e, record?.subCategory)}>
              {record?.subCategory}
            </Badge>
          ) : (
            '__'
          )}
        </>
      )
    },
    {
      title: 'Pair Count',
      align: 'right',
      render: (_, record) => (
        <span>
          {record?.pairCount ? new Intl.NumberFormat().format(record?.pairCount) : NO_DATA }
        </span>
      ),
      dataIndex: 'pairCount' // override by render but still keep for pass param to server
    },
    {
      title: 'Transaction Fee',
      align: 'right',
      render: (_, record) => (
        <span>{record?.feeTxs ? renderNumber(record?.feeTxs) : '__'}</span>
      )
    },
    {
      title: 'Volume 24h',
      align: 'right',
      render: (_, record) => (
        <span>
          {record?.volume24h ? renderNumber(record?.volume24h) : '__'}
        </span>
      ),
      dataIndex: 'volume24h' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 7d',
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume7d ? renderNumber(record?.volume7d) : '__'}</span>
      ),
      dataIndex: 'volume7d' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 30d',
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume1m ? renderNumber(record?.volume1m) : '__'}</span>
      ),
      dataIndex: 'volume1m' // override by render but still keep for pass param to server
    },
    {
      title: 'Visit 7d',
      align: 'right',
      key: 'visit7d',
      render: (_, record) => (
        <span>
          {record?.visit7d
            ? new Intl.NumberFormat().format(record?.visit7d)
            : '__'}
        </span>
      ),
      dataIndex: 'visit7d' // override by render but still keep for pass param to server
    },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Score
          <Tooltip
            overlayClassName='crypto-table-tooltip-box'
            title='The reputation of the product is assessed by Gear5'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      align: 'center',
      // sorter: (a, b) => a.score - b.score,
      // showSorterTooltip: false,
      render: (_, record) => <MyScoreComponent score={record?.score} />,
      dataIndex: 'score' // override by render but still keep for pass param to server
      // defaultSortOrder: 'descend'
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/exchange/${record?.exchangeId}`)
  }

  return (
    <div className='exchange-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <>
          {listData ? (
            <Table
              columns={columns}
              dataSource={listData}
              pagination={{
                defaultPageSize: 20,
                showSizeChanger: false
              }}
              loading={loading}
              rowKey={(record) => record?.exchangeId}
              onRow={(record) => ({
                onClick: () => {
                  onRowClicked(record)
                }
              })}
            />
          ) : (
            <>
              <Empty
                image={nodata}
                description={
                  <span>
                    <span
                      style={{ fontSize: '1.8em', color: 'red', fontWeight: 600 }}
                    >
                  SORRY{' '}
                    </span>
                    <span
                      style={{
                        fontSize: '1.6rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: '600'
                      }}
                    >
                  NO DATA FOUND
                    </span>
                  </span>
                }
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ExchangeTable
