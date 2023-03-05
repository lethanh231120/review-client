import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Table, Tooltip } from 'antd'
import { soonRoundSaleExplain } from '../row-explaination/RowExplainationText'
import { InfoCircleOutlined } from '@ant-design/icons'
import { formatDateStyle, getRelativeTimeString } from '../../../../utils/time/time'
import { txtTBA } from '../../../constants/page-soon'
import { LaunchpadTableDetail } from './LaunchpadTableDetail'
import { formatLargeNumber, formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { getStatusBackgroundFromSoonStatus, getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import { StatusTextDisplay } from './StatusTextDisplay'
import { txtAbsentTakeUpData } from '../../../constants/data'

const TableRoundSale = ({ projectName, roundSales }) => {
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
          Launchpad
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['launchPadId']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'left',
    dataIndex: 'launchPadId',
    key: 'launchPadId',
    render: (_, record) => (<LaunchpadTableDetail launchpadId={record?.launchPadId} />)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Raise
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['raise']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'right',
    dataIndex: 'raise',
    key: 'raise',
    render: (_, record) => (<><b className='text-primary'>{formatLargeNumberMoneyUSD(record?.raise)}</b></>)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Total
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['tokenForSale']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    align: 'right',
    dataIndex: 'tokenForSale',
    key: 'tokenForSale',
    render: (_, record) => (<>{formatLargeNumber(record?.tokenForSale)}</>)
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
    align: 'right',
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => (<>{formatLargeNumberMoneyUSD(record?.price)}</>)
    },
    { title: <span className='crypto-table-tooltip text-black'>
          Status
      <Tooltip
        overlayClassName='crypto-table-tooltip-box'
        title={soonRoundSaleExplain['status']}
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>,
    fixed: 'center',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => record?.start && record?.end ? (<span className={`badge badge-rounded text-uppercase ${getStatusBackgroundFromSoonStatus(getStatusFromStartDateAndEndDate(record?.start, record?.end))}`}>
      <StatusTextDisplay status={getStatusFromStartDateAndEndDate(record?.start, record?.end)} />
          &nbsp;
      {getRelativeTimeString(record?.start, record?.end)}
    </span>) : (txtAbsentTakeUpData)
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
              expandedRowRender: (record) => <p className='text-primary' style={{ margin: '0 0 0 5rem' }}><b>{record.lockUpPeriod}</b></p>,
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
