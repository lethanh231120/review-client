import React from 'react'
import '../../table/exchange/exchange.scss'

import { Link } from 'react-router-dom'
// display table
import { Image, Table, Tooltip } from 'antd'
import { PREFIX_DETAIL, EXCHANGE } from '../../../constants/category'
import { renderNumber } from '../../../../utils/formatNumber'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import MyScoreComponent from '../../score/scoreComponent'
import { encodeUrl } from '../../../../utils/formatUrl'
import { NO_DATA } from '../../../constants/data'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageExchange from '../../../../images/absent_image_exchange.png'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { formatLargeNumber } from '../../../../utils/formatNumber'

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
          to={`../../../${PREFIX_DETAIL}/${record?.exchangeId?.split('_')[1]}/${record?.exchangeId?.split('_')[2]}`}
          className='crypto-table-info image-list'
          onClick={(e) => e.stopPropagation()}
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
      align: 'left',
      render: (_, record) => (
        <>
          {record?.subCategory ? (
            <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' style={{ cursor: 'pointer' }} onClick={(e) => handleClickTag(e, record?.subCategory)}>
              {record?.subCategory}
            </div>
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
        <span>{record?.pairCount ? record?.pairCount : NO_DATA }</span>
      ),
      dataIndex: 'pairCount' // override by render but still keep for pass param to server
    },
    {
      title: 'Transaction Fee',
      align: 'right',
      render: (_, record) => (
        <span>{record?.feeTxs === 0 ? 0 : (record?.feeTxs ? `${record?.feeTxs} %` : NO_DATA) }</span>
      )
    },
    {
      title: 'Volume 24h',
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume24h === 0 ? 0 : (record?.volume24h ? <b className='text-primary'>{ renderNumber(record?.volume24h)}</b> : 'Unknown') }</span>
      ),
      dataIndex: 'volume24h' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 7d',
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume7d === 0 ? 0 : (record?.volume7d ? <b className='text-primary'>{ renderNumber(record?.volume7d)}</b> : 'Unknown') }</span>
      ),
      dataIndex: 'volume7d' // override by render but still keep for pass param to server
    },
    {
      title: 'Volume 30d',
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume1m === 0 ? 0 : (record?.volume1m ? <b className='text-primary'>{ renderNumber(record?.volume1m)}</b> : 'Unknown') }</span>
      ),
      dataIndex: 'volume1m' // override by render but still keep for pass param to server
    },
    {
      title: 'Visit 7d',
      align: 'right',
      key: 'visit7d',
      render: (_, record) => (
        <span>{record?.visit7d === 0 ? 0 : (record?.visit7d ? <b className='text-primary'>{ formatLargeNumber(record?.visit7d)}</b> : 'Unknown') }</span>
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
      render: (_, record) => <MyScoreComponent score={record?.score} type={EXCHANGE} />,
      dataIndex: 'score' // override by render but still keep for pass param to server
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/${record?.exchangeId?.split('_')[1]}/${record?.exchangeId?.split('_')[2]}`)
  }

  return (
    <div className='exchange-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <Table
          columns={columns}
          dataSource={listData}
          pagination={ listData?.length > 20 ? {
            defaultPageSize: 20,
            showSizeChanger: false
          } : false}
          loading={loading}
          rowKey={(record) => record?.exchangeId}
          onRow={(record) => ({
            onClick: () => {
              onRowClicked(record)
            }
          })}
        />
      )}
    </div>
  )
}

export default ExchangeTable
