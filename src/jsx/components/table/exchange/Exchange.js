import { Row, Col, Table, Image } from 'antd'
import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { renderNumber } from '../../../../utils/formatNumber'
import { DAPP } from '../../../constants/category'
import { NO_DATA } from '../../../constants/data'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import CategorySearch from '../../input-search/CategorySearch'
import MyScoreComponent from '../../score/scoreComponent'

const Exchange = ({
  listProduct,
  handleChangeTable,
  params,
  loading,
  handleFilter,
  total
}) => {
  const navigate = useNavigate()

  const handleOnRowClicked = (record)=> {
    const splitedId = record?.exchangeId?.split('_')
    splitedId && navigate(`../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (<Link className='crypto-table-info image-list'>
        {record?.smallLogo ? <Image src={record?.smallLogo} preview={false} /> : <span className='image-list-no-data'>
          {record?.name?.slice(0, 3)}
        </span>}
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.name ? record?.name : 'Unknown'}</div>
          </div></span>
      </Link>)

    },
    {
      title: 'Subcategory',
      align: 'center',
      render: (_, record) => (<Badge bg=' badge-l' className='badge-success '>
        {record?.subCategory}
      </Badge>)
    },

    {
      title: 'Pair Count',
      showSorterTooltip: false,
      dataIndex: 'pairCount',
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'pairCount'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.pairCount ? record?.pairCount : NO_DATA }</span>
      )
    },
    {
      title: 'Fee Transaction',
      showSorterTooltip: false,
      dataIndex: 'feeTxs',
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'feeTxs'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.feeTxs ? `${record?.feeTxs} %` : NO_DATA }</span>
      )
    },
    {
      title: 'Volume 24h',
      dataIndex: 'volume24h',
      showSorterTooltip: false,
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
      title: 'Volume 7d',
      dataIndex: 'volume7d',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'volume7d'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.volume7d ? renderNumber(record?.volume7d) : 'Unknown' }</span>
      )
    },
    {
      title: 'Volume 30d',
      dataIndex: 'volume1m',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'volume1m'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.volume1m ? renderNumber(record?.volume1m) : 'Unknown' }</span>
      )
    },
    {
      title: 'Visit 7d',
      dataIndex: 'visit7d',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'visit7d'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.visit7d ? renderNumber(record?.visit7d) : 'Unknown' }</span>
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
        rowKey={(record) => record?.exchangeId}
        onRow={(record) => ({
          onClick: () => {
            handleOnRowClicked(record)
          }
        })}
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default Exchange
