import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Table, Tooltip } from 'antd'
import { soonRoundSaleExplain } from '../row-explaination/RowExplainationText'
import { InfoCircleOutlined } from '@ant-design/icons'
import { formatDateStyle } from '../../../../utils/time/time'
import { statusPast, txtTBA } from '../../../constants/page-soon'
import { LaunchpadTableDetail } from './LaunchpadTableDetail'
import { formatLargeNumber, formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { getStatusBackgroundFromSoonStatus, getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'

const TableRoundSale = ({ projectName, roundSales }) => {
  const getStatusRoundSale = (start, end, sold, goal) => {
    const status = getStatusFromStartDateAndEndDate(start, end)
    // can't define
    if (!status) {
      return <span className='badge badge-rounded badge-light' >
      UNKNOWN
      </span>
    }

    if (status === statusPast) {
      // must be number, and positive number
      if ((typeof sold === 'number' && typeof goal === 'number') || (sold < 0 && goal < 0)) {
        if (sold >= goal) {
          return <span className='badge badge-rounded badge-info' >
            SUCCESS
          </span>
        } else {
          return <span className='badge badge-rounded badge-secondary' >
          FAILED
          </span>
        }
      } else {
        // past without data define
        return <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(status)}`}>
          {status?.toUpperCase()}
        </span>
      }
    }
    // upcoming, ongoing
    return <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(status)}`}>
      {status?.toUpperCase()}
    </span>
  }

  const columns = [
    {
      title: <span className='crypto-table-tooltip text-black'>
            Round
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={soonRoundSaleExplain['round']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      align: 'left',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => (<><b className='text-primary'>{record?.type}</b></>)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Start
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['start']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'left',
    dataIndex: 'start',
    key: 'start',
    render: (_, record) => (<>{record?.start ? moment(record?.start).format(formatDateStyle) : txtTBA}</>)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          End
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['end']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'left',
    dataIndex: 'end',
    key: 'end',
    render: (_, record) => (<>{record?.end ? moment(record?.end).format(formatDateStyle) : txtTBA}</>)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Sold
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['sold']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'right',
    dataIndex: 'rasiedmoney',
    key: 'rasiedmoney',
    render: (_, record) => <>{record?.rasiedmoney ? <b className='text-primary'>{formatLargeNumberMoneyUSD(record?.rasiedmoney)}</b> : 'Unknown'}</>
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Price
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['price']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    className: '',
    align: 'right',
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => <>{record?.price ? formatLargeNumberMoneyUSD(record?.price) : 'Unknown'}</>
    },
    { title: <span className='crypto-table-tooltip text-black'>
    Supply
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['supply']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'right',
    dataIndex: 'tokenForSale',
    key: 'tokenForSale',
    render: (_, record) => <>{record?.tokenForSale ? formatLargeNumber(record?.tokenForSale) : 'Unknown'}</>
    },
    { title: <span className='crypto-table-tooltip text-black'>
      Goal
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['goal']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'right',
    dataIndex: 'raise',
    key: 'raise',
    render: (_, record) => <>{record?.raise ? <b className='text-primary'>{formatLargeNumberMoneyUSD(record?.raise)}</b> : 'Unknown'}</>
    },
    // { title: <span className='crypto-table-tooltip text-black'>
    // Launchpad
    //   <Tooltip
    //     overlayClassName='crypto-table-tooltip-box'
    //     title={soonRoundSaleExplain['launchpad']}
    //   >
    //     <InfoCircleOutlined />
    //   </Tooltip>
    // </span>,
    // align: 'left',
    // dataIndex: 'launchPadId',
    // key: 'launchPadId',
    // render: (_, record) => (<LaunchpadTableDetail launchpadId={record?.launchPadId} />)
    // },
    { title: <span className='crypto-table-tooltip text-black'>
      Status
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['status']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'left',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => <>{getStatusRoundSale(record?.start, record?.end)}</>
    }
  ]

  if (roundSales && !_.isEmpty(roundSales)) {
    return <div>
      <div className='card-header'>
        <h4 className='card-title text-primary d-flex align-items-center'>
          <i className='material-icons fs-30'>auto_awesome</i>
      &nbsp;
          {projectName ? <>{projectName}&nbsp;</> : ''}IDO
        </h4>
      </div>
      <div className='card-body' style={{ padding: '0' }}>
        <div className='table-responsive recentOrderTable'>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) =><>
                <p className='text-primary' style={{ margin: '0 0 0 5rem' }}>
                - {record.lockUpPeriod}
                  {record?.launchPadId ? <>
                    <br />
                - {record?.linkDetail ? 'Buy here' : 'Launch at' }: <b><LaunchpadTableDetail launchpadId={record?.launchPadId} linkBuy={record?.linkDetail} /></b>
                  </> : ''}
                </p>
              </>,
              rowExpandable: (record) => record.lockUpPeriod, // have data
              defaultExpandAllRows: true
            }}
            dataSource={roundSales}
            className='soon-table-round-sale'
            pagination={false}
            rowKey={(record) => record?.id}
          />
        </div>
      </div>
    </div>
  }
  return null
}

export default TableRoundSale
