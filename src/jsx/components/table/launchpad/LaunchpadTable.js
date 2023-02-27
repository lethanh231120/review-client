import React, { useContext } from 'react'
import { Avatar, Table, Row, Col, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import MyScoreComponent from '../../score/scoreComponent'
import { ChainListContext } from '../../../../App'
import { toCammelCase } from '../../../../utils/formatText'
import { myLogo } from '../../common-widgets/logo/logo'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { launchpadExplain } from '../../common-widgets/row-explaination/RowExplainationText'
// import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { InfoCircleOutlined } from '@ant-design/icons'
import CategorySearch from '../../input-search/CategorySearch'
import { LAUNCHPAD } from '../../../constants/category'

const LaunchpadList = ({ listProduct,
  handleChangeTable,
  params,
  loading,
  handleFilter,
  total }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)

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
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
              params?.orderBy === 'avgRoiCurrent'
                ? params?.sort === 'desc'
                  ? 'descend'
                  : 'ascend'
                : '',
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
      showSorterTooltip: false,
      dataIndex: 'avgRoiATH',
      sorter: true,
      defaultSortOrder:
              params?.orderBy === 'avgRoiATH'
                ? params?.sort === 'desc'
                  ? 'descend'
                  : 'ascend'
                : '',
      render: (_, record) => (
        <span>{record?.avgRoiATH ? formatLargeNumber(record?.avgRoiATH) : 'Unknown' }x</span>
      )
    },
    {
      title: 'Founded Year',
      showSorterTooltip: false,
      dataIndex: 'yearFounded',
      sorter: true,
      defaultSortOrder:
                params?.orderBy === 'yearFounded'
                  ? params?.sort === 'desc'
                    ? 'descend'
                    : 'ascend'
                  : '',
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
      showSorterTooltip: false,
      dataIndex: 'totalFundsRaised',
      sorter: true,
      defaultSortOrder:
                params?.orderBy === 'totalFundsRaised'
                  ? params?.sort === 'desc'
                    ? 'descend'
                    : 'ascend'
                  : '',
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
      showSorterTooltip: false,
      dataIndex: 'marketCap',
      sorter: true,
      defaultSortOrder:
              params?.orderBy === 'marketCap'
                ? params?.sort === 'desc'
                  ? 'descend'
                  : 'ascend'
                : '',
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
      showSorterTooltip: false,
      dataIndex: 'volume24h',
      sorter: true,
      defaultSortOrder:
            params?.orderBy === 'volume24h'
              ? params?.sort === 'desc'
                ? 'descend'
                : 'ascend'
              : '',
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
      showSorterTooltip: false,
      dataIndex: 'score',
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      sorter: true,
      defaultSortOrder:
            params?.orderBy === 'score'
              ? params?.sort === 'desc'
                ? 'descend'
                : 'ascend'
              : '',
      render: (_, record) => (
        <MyScoreComponent score={record?.score}/>)
    }
  ]

  return (
    <div className='font-family dapp-table'>
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}>
            A total of{' '}
        <b>{total ? new Intl.NumberFormat().format(total) : 0}</b> Launchpads
            found.
      </div>
      <Row>
        <Col md={{ span: 18 }} sm={{ span: 17 }} xs={{ span: 17 }}>
          <CategorySearch type={LAUNCHPAD}/>
        </Col>
        <Col md={{ span: 6 }} sm={{ span: 7 }} xs={{ span: 7 }}>
          <DrawerFilter type='launchpad' handleFilter={handleFilter} />
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listProduct}
        onChange={handleChangeTable}
        pagination={false}
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
export default LaunchpadList
