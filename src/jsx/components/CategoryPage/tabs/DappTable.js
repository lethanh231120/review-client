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
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageDapp from '../../../../images/absent_image_dapp.png'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { toCammelCase } from '../../../../utils/formatText'

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
          to={`../../../${PREFIX_DETAIL}/${DAPP}/${record?.dAppId?.split('_')[2]}`}
          className='crypto-table-info image-list'
          onClick={(e) => e.stopPropagation()}
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
      align: 'left',
      render: (_, record) => (
        <>
          {record?.subCategory ? (
            <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' style={{ cursor: 'pointer' }} onClick={(e) => handleClickTag(e, record?.subCategory)}>
              {record?.subCategory}
            </div>
          ) : (
            '__'
          )}
        </>
      )
    },
    {
      title: <span>Chain</span>,
      dataIndex: 'exchanges',
      align: 'left',
      render: (_, record) => (
        <Avatar.Group
          alt='Blockchains Logos'
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
          maxCount={record?.chains ? (Object?.keys(record?.chains)?.length >= 4 ? 2 : 3) : 0}
          size={25} >
          {record?.chains && Object.keys(record?.chains).map((key, index) => <Tooltip key={index} title={toCammelCase(key)}
          >
            <Avatar alt='Blockchain Logo' size={25} src={chainList[key]?.image} /></Tooltip>)}
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
      align: 'right',
      dataIndex: 'volume24h',
      render: (_, record) => (
        <span>{record?.volume24h ? <b className='text-primary'>{renderNumber(record?.volume24h)}</b> : 'Unknown' }</span>
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
      align: 'right',
      dataIndex: 'user24h',
      render: (_, record) => (
        <span>{record?.user24h ? <b className='text-primary'>{formatLargeNumber(record?.user24h)}</b> : 'Unknown' }</span>
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
      align: 'right',
      dataIndex: 'balance',
      render: (_, record) => (
        <span>{record?.balance ? renderNumber(record?.balance) : 'Unknown' }</span>
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
      render: (_, record) => <MyScoreComponent score={record?.score} type={DAPP} />
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/dapp/${record?.dAppId?.split('_')[2]}`)
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
