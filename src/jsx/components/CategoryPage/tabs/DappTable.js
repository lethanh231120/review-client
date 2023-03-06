import React, { useContext } from 'react'
import '../../table/dapp/dapp.scss'
import { Image, Table, Avatar, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { InfoCircleOutlined } from '@ant-design/icons'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import { PREFIX_DETAIL, DAPP } from '../../../constants/category'
import { ChainListContext } from '../../../../App'
import MyScoreComponent from '../../score/scoreComponent'
import { encodeUrl } from '../../../../utils/formatUrl'
import { Badge } from 'react-bootstrap'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageDapp from '../../../../images/absent_image_dapp.png'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'

const DappTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const handleClickTag = (e, value) => {
    e.stopPropagation()
    if (value) {
      navigate(`../../../${DAPP}/${encodeUrl(value)}`)
    }
  }

  const colunms = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <Link
          to={`../../../${PREFIX_DETAIL}/${DAPP}/${record?.dAppId}`}
          className='crypto-table-info image-list'
        >
          {record?.dAppId && record?.dAppLogo ? (
            <Image src={isValidProductId(record?.dAppId) ? formatImgUrlFromProductId(record?.dAppId) : imgAbsentImageDapp} preview={false} alt='DApp Logo'/>
          )
            : (<span className='image-list-no-data'>
              {record?.dAppName?.slice(0, 3)}
            </span>)
          }
          <span>
            <div className='data-table-name ms-2'>
              <div className='data-table-name-title'>
                {record?.dAppName ? record?.dAppName : 'Unknown'}
              </div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: 'Subcategory',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (_, record) => (
        <>
          {record?.subCategory ? (
            <Badge bg=' badge-l' className='badge-success' style={{ cursor: 'pointer' }} onClick={(e) => handleClickTag(e, record?.subCategory)}>
              {record?.subCategory}
            </Badge>
          ) : (
            '__'
          )}
        </>
      )
    },
    {
      title: <span>Chains</span>,
      dataIndex: 'exchanges',
      render: (_, record) => (
        <Avatar.Group
          alt='Blockchains Logos'
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
        >
          {record?.chains &&
            Object.keys(record?.chains).map((key) => (
              <div key={key}>
                {chainList[key] && (
                  <Avatar
                    alt='Blockchain Logo'
                    size={25}
                    src={chainList[key]?.image}
                    // key={key}
                    className='crypto-table-chain'
                    // onClick={(e) => handleClickExplorer(e, item)}
                  />
                )}
              </div>
            ))}
        </Avatar.Group>
      )
    },
    {
      title: (<span className='crypto-table-tooltip'>Volume 24h
        <Tooltip
          overlayClassName='dapp-table-tooltip-box'
          title='Trading volume in the last 24h'
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
      ),
      dataIndex: 'volume24h',
      render: (_, record) => (
        <span>
          {record?.volume24h ? renderNumber(record?.volume24h) : '___'}
        </span>
      )
    },
    {
      title: (<span className='crypto-table-tooltip'>User 24h
        <Tooltip
          overlayClassName='dapp-table-tooltip-box'
          title='Amount of users in the last 24h'
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
      ),
      dataIndex: 'user24h',
      render: (_, record) => (
        <span>{record?.user24h ? formatLargeNumber(record?.user24h) : '__'}</span>
      )
    },
    {
      title: (<span className='crypto-table-tooltip'>Balance
        <Tooltip
          overlayClassName='dapp-table-tooltip-box'
          title='Dapp worth in USD'
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
      ),
      dataIndex: 'balance',
      render: (_, record) => (
        <span>
          {record?.balance ? renderNumber(record?.balance) : '__'}
        </span>
      )
    },
    {
      title: (<span className='crypto-table-tooltip'>Score
        <Tooltip
          overlayClassName='dapp-table-tooltip-box'
          title='The reputation of the product is assessed by Gear5'
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
      ),
      dataIndex: 'score',
      render: (_, record) => <MyScoreComponent score={record?.score} />
      // sorter: (a, b) => a.score - b.score,
      // showSorterTooltip: false,
      // defaultSortOrder: 'descend'
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/dapp/${record?.dAppId}`)
  }

  return (
    <div className='dapp-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <Table
          columns={colunms}
          dataSource={listData}
          pagination={listData?.length > 20 ? {
            defaultPageSize: 20,
            showSizeChanger: false
          } : false}
          rowKey={(record) => record?.dAppId}
          onRow={(record) => ({
            onClick: () => {
              onRowClicked(record)
            }
          })}
        />
      )}
    </div>
  )
}

export default DappTable
