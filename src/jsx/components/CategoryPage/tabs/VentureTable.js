import React from 'react'
import { Image, Table, Tooltip, Empty } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
// import { GlobalOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { formatMoney, renderNumber } from '../../../../utils/formatNumber'
import '../../table/venture/venture.scss'
import nodata from '../../../../images/product/nodata.png'
import { dapp_score_explain_text } from '../../../constants/data'
import MyScoreComponent from '../../score/scoreComponent'

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
          className='venture-table-info image-list'
        >
          {record?.ventureLogo ? (
            <Image
              // style={{ width: "5rem" }}
              src={record?.ventureLogo}
              preview={false}
            />
          ) : (
            <span className='image-list-no-data'>
              {record?.ventureName?.slice(0, 3)}
            </span>
          )}
          <span>
            <div className='table-info-name'>
              <div className='table-info-name-title'>
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
      align: 'right',
      sorter: (a, b) => a.yearFounded - b.yearFounded,
      showSorterTooltip: false,
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
      sorter: (a, b) => a.location.localeCompare(b.location),
      showSorterTooltip: false,
      render: (_, record) => (
        <span className='venture-table-location'>
          {record?.location ? record?.location : 'Unknown'}
        </span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Seed</span>,
      sorter: (a, b) => a.seed - b.seed,
      showSorterTooltip: false,
      dataIndex: 'seed',
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
      align: 'center',
      dataIndex: 'seriesA',
      sorter: (a, b) => a.seriesA - b.seriesA,
      showSorterTooltip: false,
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
      sorter: (a, b) => a.seriesB - b.seriesB,
      showSorterTooltip: false,
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
      sorter: (a, b) => a.strategic - b.strategic,
      showSorterTooltip: false,
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
      sorter: (a, b) => a.totalFund - b.totalFund,
      showSorterTooltip: false,
      defaultSortOrder: 'descend',
      render: (_, record) => (
        <span>
          {record?.totalFund !== null && record?.totalFund > 0
            ? renderNumber(record?.totalFund)
            : '__'}
        </span>
      )
    },
    {
      title: (
        <span className='venture-table-tooltip'>
          Score
          <Tooltip
            overlayClassName='venture-table-tooltip-box'
            title={dapp_score_explain_text}
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'score',
      sorter: (a, b) => a.score - b.score,
      showSorterTooltip: false,
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
