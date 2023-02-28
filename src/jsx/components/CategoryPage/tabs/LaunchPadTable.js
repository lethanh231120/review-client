import React, { useContext } from 'react'
import { Avatar, Table, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import MyScoreComponent from '../../score/scoreComponent'
import { ChainListContext } from '../../../../App'
import { toCammelCase } from '../../../../utils/formatText'
import { myLogo } from '../../common-widgets/logo/logo'
// import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { launchpadExplain } from '../../common-widgets/row-explaination/RowExplainationText'
// import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { InfoCircleOutlined } from '@ant-design/icons'
// import CategorySearch from '../../input-search/CategorySearch'
// import { LAUNCHPAD } from '../../../constants/category'
// import { Badge } from 'react-bootstrap'

const LaunchPadTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)

  console.log(listData)
  const handleonRowClicked = (record)=> {
    const splitedId = record?.launchPadId?.split('_')
    splitedId && navigate(`../../products/${splitedId[1]}/${splitedId[2]}`)
  }
  const columns = [
    {
      title: 'Name',
      render: (_, record) => (<Link className='crypto-table-info image-list' to='#'>
        { myLogo('bigLogo', record?.launchPadId, 'launchpad') }
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.name ? record?.name : 'Unknown'}</div>
          </div></span>
      </Link>)

    },
    {
      title: <span className='crypto-table-tooltip'>
         Blockchains
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['blockchain']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'chains',
      key: 'chains',
      render: (_, record) => (
        <div
        >
          <Avatar.Group
            maxCount={2}
            size={25}
            maxStyle={{
              color: '#fff',
              backgroundColor: '#039F7F',
              cursor: 'pointer'
            }}
          >
            {record?.chains && Object.keys(record?.chains)?.map((item, index) => (
              <React.Fragment key={item}>
                {chainList[item] && (
                  <Tooltip title={toCammelCase(chainList[item]?.chainName)}>
                    <Avatar
                      size={25}
                      src={chainList[item]?.image}
                      key={index}
                      className='crypto-table-chain'
                    />
                  </Tooltip>
                )}
              </React.Fragment>
            ))}
          </Avatar.Group>
        </div>

      )
    },
    {
      title: <span className='crypto-table-tooltip'>
          Current ROI
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['currentROI']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'avgRoiCurrent',
      render: (_, record) => (
        <span>{record?.avgRoiCurrent ? `${formatLargeNumber(record?.avgRoiCurrent)}x` : 'Unknown' }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
          ATH ROI
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['athROI']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'avgRoiATH',
      render: (_, record) => (
        <span>{record?.avgRoiATH ? formatLargeNumber(record?.avgRoiATH) : 'Unknown' }x</span>
      )
    },
    {
      title: 'Founded Year',
      dataIndex: 'yearFounded',
      render: (_, record) => (
        <span>{record?.yearFounded ? record?.yearFounded : 'Unknown' }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
          Raised
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['raise']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'totalFundsRaised',
      render: (_, record) => (
        <span>{record?.totalFundsRaised ? renderNumber(record?.totalFundsRaised) : 'Unknown' }</span>
      )
    },

    {
      title: <span className='crypto-table-tooltip'>
         Marketcap
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['marketCap']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'marketCap',
      render: (_, record) => (
        <span>{record?.marketCap ? renderNumber(record?.marketCap) : 'Unknown' }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
          Volume24h
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['volume24h']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'volume24h',
      render: (_, record) => (
        <span>{record?.volume24h ? renderNumber(record?.volume24h) : 'Unknown' }</span>
      )
    },

    {
      title: <span className='crypto-table-tooltip'>
          Score
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={launchpadExplain['score']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => (
        <MyScoreComponent score={record?.score}/>)
    }
  ]
  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: false
        }}
        rowKey={(record) => record?.launchPadId}
        onRow={(record) => ({
          onClick: () => {
            handleonRowClicked(record)
          }
        })}
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default LaunchPadTable
