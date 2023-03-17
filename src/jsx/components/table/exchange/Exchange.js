import { Row, Col, Table, Image, Tooltip } from 'antd'
import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import { EXCHANGE } from '../../../constants/category'
import { NO_DATA } from '../../../constants/data'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import CategorySearch from '../../input-search/CategorySearch'
import MyScoreComponent from '../../score/scoreComponent'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageExchange from '../../../../images/absent_image_exchange.png'
import { InfoCircleOutlined } from '@ant-design/icons'
import { ExchangeExplain } from '../../common-widgets/row-explaination/RowExplainationText'
import { encodeUrl } from '../../../../utils/formatUrl'

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

  const handleClickTag = (e, value) => {
    e.stopPropagation()
    if (value) {
      navigate(`../../../${EXCHANGE}/${encodeUrl(value)}`)
    }
  }

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (<Link
        to={`../../products/${record?.exchangeId?.split('_')[1]}/${record?.exchangeId?.split('_')[2]}`}
        className='crypto-table-info image-list'
        onClick={e => e.stopPropagation()}>
        {record?.exchangeId && record?.smallLogo ? (
          <Image alt='Exchange Logo' src={isValidProductId(record?.exchangeId) ? formatImgUrlFromProductId(record?.exchangeId) : imgAbsentImageExchange} preview={false} />
        )
          : (<span className='image-list-no-data'>
            {record?.name?.slice(0, 3)}
          </span>)
        }
        <Tooltip title={(<p>{`${record?.name}`}</p>)}>
          <span>
            <div className='data-table-name ms-2'>
              <div>{record?.name ? record?.name : 'Unknown'}</div>
            </div>
          </span>
        </Tooltip>
      </Link>)

    },
    {
      title: 'Subcategory',
      align: 'left',
      render: (_, record) => (<div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={(e) => handleClickTag(e, record?.subCategory)}>
        {record?.subCategory}
      </div>)
    },
    {
      title: <span className='crypto-table-tooltip'>
        Pairs
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={ExchangeExplain['pairCount']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      align: 'right',
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
      title: <span className='crypto-table-tooltip'>
      Txn Fee
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={ExchangeExplain['feeTxn']}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      align: 'right',
      showSorterTooltip: false,
      dataIndex: 'feeTxs',
      render: (_, record) => (
        <span>{record?.feeTxs === 0 ? 0 : (record?.feeTxs ? `${record?.feeTxs} %` : NO_DATA) }</span>
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
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume24h === 0 ? 0 : (record?.volume24h ? <b className='text-primary'>{ renderNumber(record?.volume24h)}</b> : 'Unknown') }</span>
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
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume7d === 0 ? 0 : (record?.volume7d ? renderNumber(record?.volume7d) : 'Unknown') }</span>
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
      align: 'right',
      render: (_, record) => (
        <span>{record?.volume1m === 0 ? 0 : (record?.volume1m ? renderNumber(record?.volume1m) : 'Unknown') }</span>
      )
    },
    {
      title: 'Visit 7d',
      align: 'right',
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
        <span>{record?.visit7d === 0 ? 0 : (record?.visit7d ? formatLargeNumber(record?.visit7d) : 'Unknown') }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
      Score
        <Tooltip
          overlayClassName='crypto-table-tooltip-box'
          title={ExchangeExplain['score']}
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
        <MyScoreComponent score={record?.score} type={EXCHANGE}/>)
    }
  ]

  return (
    <div className=' font-family exchange-table '>
      <div style={{ fontSize: '1rem', padding: '0 0 1rem 0', color: 'black' }}>
        A total of{' '}
        <Badge className='progress-bar-striped progress-bar-animated'>{total ? new Intl.NumberFormat().format(total) : 0}</Badge> Exchanges
        found.
      </div>
      <Row>
        <Col md={{ span: 18 }} sm={{ span: 17 }} xs={{ span: 17 }}>
          <CategorySearch type={EXCHANGE}/>
        </Col>
        <Col md={{ span: 6 }} sm={{ span: 7 }} xs={{ span: 7 }}>
          <DrawerFilter type='exchange' handleFilter={handleFilter} />
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
