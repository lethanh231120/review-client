import React from 'react'
import { Image, Table, Tooltip, Empty } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
// import { GlobalOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { formatMoney, renderNumber } from '../../../../utils/formatNumber'
import '../../table/venture/venture.scss'
import nodata from '../../../../images/product/nodata.png'
import MyScoreComponent from '../../score/scoreComponent'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageVenture from '../../../../images/absent_image_venture.png'

const VentureTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const handleRowClicked = (record) => {
    navigate(`../../../products/venture/${record?.ventureId}`)
  }

  const columns = [
    {
      title: 'Name',
      fixed: 'left',
      render: (_, record) => (
        <Link
          to={`../../../products/venture/${record?.ventureId}`}
          className='crypto-table-info image-list'
        >
          {record?.ventureId && record?.ventureLogo ? (
            <Image src={isValidProductId(record?.ventureId) ? formatImgUrlFromProductId(record?.ventureId) : imgAbsentImageVenture} preview={false} />
          )
            : (<span className='image-list-no-data'>
              {record?.ventureName?.slice(0, 3)}
            </span>)
          }
          <span>
            <div className='data-table-name ms-2'>
              <div className='data-table-name-title'>
                {record?.ventureName}
              </div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Year Founder</span>,
      key: 'yearFounded',
      dataIndex: 'yearFounded',
      render: (_, record) => (
        <>
          {record?.yearFounded !== null
            ? moment(record?.yearFounded).format('YYYY')
            : 'Unknown'}
        </>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Location</span>,
      dataIndex: 'location',
      render: (_, record) => (
        <span className='venture-table-location'>
          {record?.location ? record?.location : 'Unknown'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Seed</span>,
      dataIndex: 'seed',
      align: 'right',
      render: (_, record) => (
        <span>
          {record?.seed !== null && record?.seed > 0
            ? formatMoney(record?.seed)
            : '$0'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Series A</span>,
      key: 'seriesA',
      align: 'right',
      dataIndex: 'seriesA',
      render: (_, record) => (
        <span>
          {record?.seriesA !== null && record?.seriesA > 0
            ? formatMoney(record?.seriesA)
            : '$0'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Series B</span>,
      dataIndex: 'seriesB',
      align: 'right',
      render: (_, record) => (
        <span>
          {record?.seriesB !== null && record?.seriesB > 0
            ? formatMoney(record?.seriesB)
            : '0$'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Strategic</span>,
      dataIndex: 'strategic',
      align: 'center',
      render: (_, record) => (
        <span>
          {record?.strategic !== null && record?.strategic > 0
            ? formatMoney(record?.strategic)
            : '0$'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Total Funds</span>,
      dataIndex: 'totalFund',
      align: 'right',
      render: (_, record) => (
        <span>
          {record?.totalFund !== null && record?.totalFund > 0
            ? renderNumber(record?.totalFund)
            : '__'}
        </span>
      )
    },
    {
      title: (<span className='crypto-table-tooltip'>Score
        <Tooltip
          overlayClassName='dapp-table-tooltip-box'
          title='The reputation of the product is assessed by Gear5'
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
      ),
      dataIndex: 'score',
      // sorter: (a, b) => a.score - b.score,
      // showSorterTooltip: false,
      render: (_, record) => <MyScoreComponent score={record?.score} />
    }
  ]

  return (
    <div className='venture-table'>
      {listData ? (
        <Table
          loading={loading}
          columns={columns}
          dataSource={listData}
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: false
          }}
          rowKey={(record) => record?.ventureId}
          onRow={(record) => ({
            onClick: () => {
              handleRowClicked(record)
            }
          })}
          scroll={{ x: 'max-content' }}
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

export default VentureTable
