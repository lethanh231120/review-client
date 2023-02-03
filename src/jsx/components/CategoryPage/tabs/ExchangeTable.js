import React from 'react'
import '../../table/exchange/exchange.scss'

import { Link } from 'react-router-dom'
// display table
import { Image, Table, Tooltip, Tag, Empty } from 'antd'
import { PREFIX_DETAIL, EXCHANGE } from '../../../constants/category'
import { renderNumber } from '../../../../utils/formatNumber'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import nodata from '../../../../images/product/nodata.png'
import MyScoreComponent from '../../score/scoreComponent'
import { encodeUrl } from '../../../../utils/formatUrl'
import { mainColorHex } from '../../../constants/color'

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
          className='exchange-table-info image-list'
        >
          {record?.smallLogo ? (
            <Image
              // style={{ width: "5rem", height: "5rem", marginRight: "1.5rem" }}
              src={record?.smallLogo}
              preview={false}
            />
          ) : (
            <span className='image-list-no-data'>
              {record?.name?.slice(0, 3)}
            </span>
          )}
          <span>
            <div className='table-info-name'>
              <div className='table-info-name-title'>
                {record?.name}
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
            <Tag onClick={(e) => handleClickTag(e, record?.subCategory)} color={mainColorHex}>
              {record?.subCategory}
            </Tag>
          ) : (
            '__'
          )}
        </>
      )
    },
    {
      title: 'Pair Count',
      sorter: (a, b) => a.pairCount - b.pairCount,
      showSorterTooltip: false,
      render: (_, record) => (
        <span>{record?.pairCount ? record?.pairCount : '__'}</span>
      ),
      dataIndex: 'pairCount' // override by render but still keep for pass param to server
    },
    {
      title: 'Fee Transaction',
      render: (_, record) => (
        <span>{record?.feeTxs ? renderNumber(record?.feeTxs) : '__'}</span>
      )
    },
    {
      title: 'Volume 24h',
      sorter: (a, b) => a.volume24h - b.volume24h,
      showSorterTooltip: false,
      render: (_, record) => (
        <span>
          {record?.volume24h ? renderNumber(record?.volume24h) : '__'}
        </span>
      ),
      dataIndex: 'volume24h' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 7d',
      sorter: (a, b) => a.volume7d - b.volume7d,
      showSorterTooltip: false,
      render: (_, record) => (
        <span>{record?.volume7d ? renderNumber(record?.volume7d) : '__'}</span>
      ),
      dataIndex: 'volume7d' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 30d',
      sorter: (a, b) => a.volume1m - b.volume1m,
      showSorterTooltip: false,
      render: (_, record) => (
        <span>{record?.volume1m ? renderNumber(record?.volume1m) : '__'}</span>
      ),
      dataIndex: 'volume1m' // override by render but still keep for pass param to server
    },
    {
      title: 'Visit 7d',
      sorter: (a, b) => a.visit7d - b.visit7d,
      showSorterTooltip: false,
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
      sorter: (a, b) => a.score - b.score,
      showSorterTooltip: false,
      render: (_, record) => <MyScoreComponent score={record?.score} />,
      dataIndex: 'score', // override by render but still keep for pass param to server
      defaultSortOrder: 'descend'
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/exchange/${record?.exchangeId}`)
  }

  return (
    <div className='exchange-table'>
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
    </div>
  )
}

export default ExchangeTable
