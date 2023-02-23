import { Row, Col, Table, Image } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { renderNumber } from '../../../../utils/formatNumber'
import { VENTURE } from '../../../constants/category'
import { NO_DATA } from '../../../constants/data'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import CategorySearch from '../../input-search/CategorySearch'
import MyScoreComponent from '../../score/scoreComponent'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageVenture from '../../../../images/absent_image_venture.png'

const Venture = ({
  listProduct,
  handleChangeTable,
  params,
  loading,
  handleFilter,
  total
}) => {
  const navigate = useNavigate()

  const handleOnRowClicked = (record)=> {
    const splitedId = record?.ventureId?.split('_')
    splitedId && navigate(`../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (<Link to='#' className='crypto-table-info image-list'>
        {record?.ventureId && record?.ventureLogo ? (
          <Image src={isValidProductId(record?.ventureId) ? formatImgUrlFromProductId(record?.ventureId) : imgAbsentImageVenture} preview={false} />
        )
          : (<span className='image-list-no-data-detail'>
            {record?.ventureName?.slice(0, 3)}
          </span>)
        }
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.ventureName ? record?.ventureName : 'Unknown'}</div>
          </div></span>
      </Link>)

    },
    {
      title: 'Year Founded',
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
        <span>{record?.yearFounded ? record?.yearFounded : NO_DATA }</span>
      )
    },
    {
      title: 'Location',
      showSorterTooltip: false,
      dataIndex: 'location',
      render: (_, record) => (
        <span>{record?.location ? `${record?.location}` : NO_DATA }</span>
      )
    },
    {
      title: 'Seed',
      dataIndex: 'seed',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'seed'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.seed ? renderNumber(record?.seed) : '$0' }</span>
      )
    },
    {
      title: 'Series A',
      dataIndex: 'seriesA',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'seriesA'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.seriesA ? renderNumber(record?.seriesA) : '$0' }</span>
      )
    },
    {
      title: 'Series B',
      dataIndex: 'seriesB',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'seriesB'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.seriesB ? renderNumber(record?.seriesB) : '$0' }</span>
      )
    },
    {
      title: 'Series C',
      dataIndex: 'seriesC',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'seriesC'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.seriesC ? renderNumber(record?.seriesC) : '$0' }</span>
      )
    },
    {
      title: 'Strategic',
      dataIndex: 'strategic',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'strategic'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.strategic ? renderNumber(record?.strategic) : '$0' }</span>
      )
    },
    {
      title: 'Total Funds',
      dataIndex: 'totalFund',
      showSorterTooltip: false,
      sorter: true,
      defaultSortOrder:
        params?.orderBy === 'totalFund'
          ? params?.sort === 'desc'
            ? 'descend'
            : 'ascend'
          : '',
      render: (_, record) => (
        <span>{record?.totalFund ? renderNumber(record?.totalFund) : '$0' }</span>
      )
    },
    {
      title: 'Score',
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
    <div className='font-family venture-table'>
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}>
        A total of{' '}
        <b>{total ? new Intl.NumberFormat().format(total) : 0}</b> Ventures
        found.
      </div>
      <Row>
        <Col md={{ span: 12 }} sm={{ span: 14 }} xs={{ span: 24 }}>
          <CategorySearch type={VENTURE}/>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 10 }} xs={{ span: 24 }}>
          <DrawerFilter type='venture' handleFilter={handleFilter} />
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listProduct}
        onChange={handleChangeTable}
        pagination={false}
        rowKey={(record) => record?.ventureId}
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

export default Venture
