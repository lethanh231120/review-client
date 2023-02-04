import { Row, Col, Table, Avatar, Tooltip, Image } from 'antd'
import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ChainListContext } from '../../..'
import { renderNumber } from '../../../../utils/formatNumber'
import { DAPP } from '../../../constants/category'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import CategorySearch from '../../input-search/CategorySearch'
import MyScoreComponent from '../../score/scoreComponent'

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
      render: (_, record) => (<Link className='crypto-table-info image-list'>
        {record?.dAppLogo ? <Image src={record?.dAppLogo} preview={false} /> : <span className='image-list-no-data'>
          {record?.name?.slice(0, 3)}
        </span>}
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.dAppName ? record?.dAppName : 'Unknown'}</div>
          </div></span>
      </Link>)

    },
    {
      title: 'Subcategory',
      render: (_, record) => (<Badge bg=' badge-l' className='badge-success '>
        {record?.subCategory}
      </Badge>)
    },
    {
      title: 'Chains',
      render: (_, record) => (
        <Avatar.Group
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
          maxCount={3}
          size={25} >
          {record?.chains && Object.keys(record?.chains).map((key, index) => <Tooltip key={index} title={key}><Avatar size={25} src={chainList[key]?.image} /></Tooltip>)}
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
        <span>{record?.user24h ? renderNumber(record?.user24h) : 'Unknown' }</span>
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
    <div className='crypto-table font-family'>
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}>
        A total of{' '}
        <b>{total ? new Intl.NumberFormat().format(total) : 0}</b> Dapps
        found.
      </div>
      <Row>
        <Col md={{ span: 12 }} sm={{ span: 14 }} xs={{ span: 24 }}>
          <CategorySearch type={DAPP}/>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 10 }} xs={{ span: 24 }}>
          <DrawerFilter type='crypto' handleFilter={handleFilter} />
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
