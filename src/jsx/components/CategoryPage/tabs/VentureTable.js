import React from 'react'
import { Image, Table, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
// import { GlobalOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import { NO_DATA } from '../../../constants/data'
import { renderNumber } from '../../../../utils/formatNumber'
import '../../table/venture/venture.scss'
import MyScoreComponent from '../../score/scoreComponent'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageVenture from '../../../../images/absent_image_venture.png'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { VENTURE } from './../../../constants/category'

const VentureTable = ({ loading, listData }) => {
  const navigate = useNavigate()
  const handleRowClicked = (record) => {
    navigate(`../../../products/${record?.ventureId?.split('_')[1]}/${record?.ventureId?.split('_')[2]}`)
  }

  const columns = [
    {
      title: 'Name',
      fixed: 'left',
      render: (_, record) => (
        <Link
          to={`../../../products/${record?.ventureId?.split('_')[1]}/${record?.ventureId?.split('_')[2]}`}
          className='crypto-table-info image-list'
          onClick={(e) => e.stopPropagation()}
        >
          {record?.ventureId && record?.ventureLogo ? (
            <Image src={isValidProductId(record?.ventureId) ? formatImgUrlFromProductId(record?.ventureId) : imgAbsentImageVenture} preview={false} alt='Venture Logo' />
          )
            : (<span className='image-list-no-data'>
              {record?.ventureName?.slice(0, 3)}
            </span>)
          }
          <span>
            <div className='data-table-name ms-2'>
              <div className='data-table-name-title'>
                {record?.ventureName}
              </div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Year Founder</span>,
      key: 'yearFounded',
      dataIndex: 'yearFounded',
      render: (_, record) => (
        <>
          <span>{record?.yearFounded ? record?.yearFounded : NO_DATA }</span>
        </>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Location</span>,
      dataIndex: 'location',
      render: (_, record) => (
        <span>{record?.location ? `${record?.location}` : NO_DATA }</span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Seed</span>,
      dataIndex: 'seed',
      align: 'right',
      render: (_, record) => (
        <span>{record?.seed ? renderNumber(record?.seed) : '$0' }</span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Series A</span>,
      key: 'seriesA',
      align: 'right',
      dataIndex: 'seriesA',
      render: (_, record) => (
        <span>{record?.seriesA ? renderNumber(record?.seriesA) : '$0' }</span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Series B</span>,
      dataIndex: 'seriesB',
      align: 'right',
      render: (_, record) => (
        <span>{record?.seriesB ? renderNumber(record?.seriesB) : '$0' }</span>
      )
    },
    {
      title: <span className='crypto-table-tooltip'>
      Series C
        <InfoCircleOutlined />
      </span>,
      align: 'right',
      dataIndex: 'seriesC',
      render: (_, record) => (
        <span>{record?.seriesC ? renderNumber(record?.seriesC) : '$0' }</span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Strategic</span>,
      dataIndex: 'strategic',
      align: 'center',
      render: (_, record) => (
        <span>{record?.strategic ? renderNumber(record?.strategic) : '$0' }</span>
      )
    },
    {
      title: <span className='venture-table-tooltip'>Total Funds</span>,
      dataIndex: 'totalFund',
      align: 'right',
      render: (_, record) => (
        <span>{record?.totalFund ? <b className='text-primary'>{renderNumber(record?.totalFund)}</b> : 'Unkowned' }</span>
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
      render: (_, record) => <MyScoreComponent score={record?.score} type={VENTURE} />
    }
  ]

  return (
    <div className='venture-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <>
          <Table
            columns={columns}
            dataSource={listData}
            pagination={listData?.length > 20 ? {
              defaultPageSize: 20,
              showSizeChanger: false
            } : false}
            rowKey={(record) => record?.ventureId}
            onRow={(record) => ({
              onClick: () => {
                handleRowClicked(record)
              }
            })}
          />
        </>
      )}
    </div>
  )
}

export default VentureTable
