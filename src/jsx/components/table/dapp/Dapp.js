import { Row, Col, Table, Avatar, Tooltip, Image } from 'antd'
import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ChainListContext } from '../../../../App'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import { DAPP } from '../../../constants/category'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import CategorySearch from '../../input-search/CategorySearch'
import MyScoreComponent from '../../score/scoreComponent'
import { isValidProductId, formatImgUrlFromProductId, toCammelCase } from '../../../../utils/formatText'
import imgAbsentImageDapp from '../../../../images/absent_image_dapp.png'
import { DappExplain } from '../../common-widgets/row-explaination/RowExplainationText'
import { InfoCircleOutlined } from '@ant-design/icons'

const Dapp = ({
  listProduct,
  handleChangeTable,
  params,
  loading,
  handleFilter,
  total
}) => {
  const navigate = useNavigate()

  const chainList = useContext(ChainListContext)

  const handleonRowClicked = (record)=> {
    const splitedId = record?.dAppId?.split('_')
    splitedId && navigate(`../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (<Link className='crypto-table-info image-list' to={`../../products/${record?.dAppId?.split('_')[1]}/${record?.dAppId?.split('_')[2]}`}>
        {record?.dAppId && record?.dAppLogo ? (
          <Image alt='DApp Logo' onError={() => console.log(1)} src={isValidProductId(record?.dAppId) ? formatImgUrlFromProductId(record?.dAppId) : imgAbsentImageDapp} preview={false} />
        )
          : (<span className='image-list-no-data-detail'>
            {record?.dAppName?.slice(0, 3)}
          </span>)
        }
        <span>
          {/* <Tooltip
            title={(
              <p>{`${record?.dAppName}`}</p>
            )}> */}
          <div className='data-table-name ms-2'>
            <div>{record?.dAppName ? record?.dAppName : 'Unknown'}</div>
          </div>
          {/* </Tooltip> */}
        </span>
      </Link>)

    },
    {
      title: 'Subcategory',
      render: (_, record) => (<Badge bg=' badge-l' className='badge-success '>
        {record?.subCategory}
      </Badge>)
    },
    {
      title: <span className='crypto-table-tooltip'>
      Chain(s)
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={DappExplain['blockchain']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      render: (_, record) => (
        <Avatar.Group
          alt='Blockchains Logos'
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
          maxCount={3}
          size={25} >
          {record?.chains && Object.keys(record?.chains).map((key, index) => <Tooltip key={index} title={toCammelCase(key)}><Avatar alt='Blockchain Logo' size={25} src={chainList[key]?.image} /></Tooltip>)}
        </Avatar.Group>
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
      title: 'User24h',
      showSorterTooltip: false,
      dataIndex: 'user24h',
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'user24h'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.user24h ? formatLargeNumber(record?.user24h) : 'Unknown' }</span>
      )
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'balance'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.balance ? renderNumber(record?.balance) : 'Unknown' }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
      Score
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={DappExplain['score']}
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
        <MyScoreComponent score={record?.score} type='dapp'/>)
    }
  ]

  return (
    <div className='font-family dapp-table'>
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0', color: 'black' }}>
        A total of{' '}
        <Badge>{total ? new Intl.NumberFormat().format(total) : 0}</Badge> Dapps
        found.
      </div>
      <Row>
        <Col md={{ span: 18 }} sm={{ span: 17 }} xs={{ span: 17 }}>
          <CategorySearch type={DAPP}/>
        </Col>
        <Col md={{ span: 6 }} sm={{ span: 7 }} xs={{ span: 7 }}>
          <DrawerFilter type='dapp' handleFilter={handleFilter} />
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listProduct}
        onChange={handleChangeTable}
        pagination={false}
        rowKey={(record) => record?.dAppId}
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

export default Dapp
