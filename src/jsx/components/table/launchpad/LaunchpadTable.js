import React, { useContext } from 'react'
import { Avatar, Table, Row, Col, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import MyScoreComponent from '../../score/scoreComponent'
import { ChainListContext } from '../../../../App'
import { toCammelCase } from '../../../../utils/formatText'
import { myLogo } from '../../common-widgets/logo/logo'
// import DrawerFilter from '../../drawer-filter/DrawerFilter'

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
        { myLogo('thumbLogo', record?.launchPadId, 'launchpad') ||
         myLogo('bigLogo', record?.launchPadId, 'launchpad') ||
         myLogo('nativeLogo', record?.launchPadId, 'launchpad') ||
         myLogo('smallLogo', record?.launchPadId, 'launchpad') }
        {/* <Avatar src={record?.bigLogo || record?.smallLogo || record?.thumbLogo || record?.nativeLogo} alt={record?.dAppName?.slice(0, 3)}/> */}
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.name ? record?.name : 'Unknown'}</div>
          </div></span>
      </Link>)

    },
    {
      title: 'Chains',
      dataIndex: 'chains',
      key: 'chains',
      render: (_, record) => (
        <div
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
      title: 'Current ROI',
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
      title: 'ATH ROI',
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
        <span>{record?.avgRoiATH ? formatLargeNumber(record?.avgRoiATH) : 'Unknown' }</span>
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
      title: 'Raised',
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
      title: 'Market Cap',
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
      title: 'Volume24h',
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
      title: 'Score',
      showSorterTooltip: false,
      dataIndex: 'score',
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
        <Col md={{ span: 12 }} sm={{ span: 14 }} xs={{ span: 24 }}>
          {/* <CategorySearch type={DAPP}/> */}
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 10 }} xs={{ span: 24 }}>
          {/* <DrawerFilter type='dapp' handleFilter={handleFilter} /> */}
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