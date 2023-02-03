import React, { useContext } from 'react'
import '../../table/dapp/dapp.scss'
import { Image, Table, Avatar, Tag, Tooltip, Empty } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { InfoCircleOutlined } from '@ant-design/icons'
import { renderNumber } from '../../../../utils/formatNumber'
import { PREFIX_DETAIL, DAPP } from '../../../constants/category'
import { ChainListContext } from '../../../../jsx/index'
import nodata from '../../../../images/product/nodata.png'
import MyScoreComponent from '../../score/scoreComponent'
import { encodeUrl } from '../../../../utils/formatUrl'
import { mainColorHex } from '../../../constants/color'

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
          className='dapp-table-info image-list'
        >
          {record?.dAppLogo ? (
            <Image
              // style={{
              //   width: "5rem",
              //   height: "5rem",
              //   marginRight: "1.5rem",
              //   borderRadius: "50%",
              // }}
              src={record?.dAppLogo}
              preview={false}
            />
          ) : (
            <span className='image-list-no-data'>
              {record?.dAppName?.slice(0, 3)}
            </span>
          )}
          <span>
            <div className='table-info-name'>
              <div className='table-info-name-title'>
                {record?.dAppName}
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
            <Tag onClick={(e) => handleClickTag(e, record?.subCategory)} color={mainColorHex}>
              {record?.subCategory}
            </Tag>
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
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
        >
          {record?.chains &&
            Object.keys(record?.chains).map((key) => (
              <>
                {chainList[key] && (
                  <Avatar
                    size={25}
                    src={chainList[key]?.image}
                    key={key}
                    className='crypto-table-chain'
                    // onClick={(e) => handleClickExplorer(e, item)}
                  />
                )}
              </>
            ))}
        </Avatar.Group>
      )
    },
    {
      title: (
        <>
          <span className='dapp-table-tooltip'>Volume 24h</span>
          <Tooltip
            overlayClassName='dapp-table-tooltip-box'
            title='Trading volume in the last 24h'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </>
      ),
      dataIndex: 'volume24h',
      render: (_, record) => (
        <span>
          {record?.volume24h ? renderNumber(record?.volume24h) : '___'}
        </span>
      ),
      sorter: (a, b) => a.volume24h - b.volume24h,
      showSorterTooltip: false
    },
    {
      title: (
        <>
          <span className='dapp-table-tooltip'>User24h</span>
          <Tooltip
            overlayClassName='dapp-table-tooltip-box'
            title='Amount of users in the last 24h'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </>
      ),
      dataIndex: 'user24h',
      render: (_, record) => (
        <span>{record?.user24h ? record?.user24h : '__'}</span>
      ),
      sorter: (a, b) => a.user24h - b.user24h,
      showSorterTooltip: false
    },
    {
      title: (
        <>
          <span className='dapp-table-tooltip'>Balance</span>
          <Tooltip
            overlayClassName='dapp-table-tooltip-box'
            title='Dapp worth in USD'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </>
      ),
      dataIndex: 'balance',
      render: (_, record) => (
        <span>
          {record?.balance ? renderNumber(record?.balance) : '__'}
        </span>
      ),
      sorter: (a, b) => a.tvl - b.tvl,
      showSorterTooltip: false
    },
    {
      title: (
        <>
          <span className='dapp-table-tooltip'>Score</span>
          <Tooltip
            overlayClassName='dapp-table-tooltip-box'
            title='Dapp score graded by Gear5'
          >
            <InfoCircleOutlined />
          </Tooltip>
        </>
      ),
      dataIndex: 'score',
      render: (_, record) => <MyScoreComponent score={record?.score} />,
      sorter: (a, b) => a.score - b.score,
      showSorterTooltip: false,
      defaultSortOrder: 'descend'
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/dapp/${record?.dAppId}`)
  }

  return (
    <div className='dapp-table'>
      {listData ? (
        <Table
          loading={loading}
          columns={colunms}
          dataSource={listData}
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: false
          }}
          rowKey={(record) => record?.dAppId}
          onRow={(record) => ({
            onClick: () => {
              onRowClicked(record)
            }
          })}
        />
      ) : (
        <>
          <Empty
            image={nodata}
            description={
              <span>
                <span
                  style={{ fontSize: '1.8em', color: 'red', fontWeight: 600 }}
                >
                  SORRY{' '}
                </span>
                <span
                  style={{
                    fontSize: '1.6rem',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontWeight: '600'
                  }}
                >
                  NO DATA FOUND
                </span>
              </span>
            }
          />
        </>
      )}
    </div>
  )
}

export default DappTable
