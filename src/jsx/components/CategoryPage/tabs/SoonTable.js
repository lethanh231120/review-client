import React from 'react'
import '../../table/soon/soon.scss'
import { Table, Avatar, Tooltip } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { renderNumber } from '../../../../utils/formatNumber'
import moment from 'moment'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import ProductImage, { altSoon, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import { S3_IMG_URL } from '../../../../api/BaseRequest'

const SoonTable = ({ listData, loading }) => {
  const navigate = useNavigate()

  const columns = [
    {
      title: `Name`,
      render: (_, record) => (
        <Link
          to={`../../../${PREFIX_DETAIL}/${SOON}/${
            record?.projectId?.split('_')[2]
          }`}
          className='crypto-table-info image-list'
          onClick={(e) => e.stopPropagation()}
        >
          <ProductImage
            imageUrl={record?.smallLogo}
            productName={record?.projectSymbol || record?.projectName}
            altImageType={altSoon}
            size={sizeImg48}
          />
          <span>
            <Tooltip
              title={(
                <p>{`${record?.projectName?.trim()} - ${record?.projectSymbol?.trim()}`}</p>
              )}>
              <div className='data-table-name ms-2'>
                <div className='data-table-name-title'>
                  {record?.projectName?.trim()}
                </div>
                <div className='data-table-symbol'>
                  {record?.projectSymbol?.trim()}
                </div>
              </div>
            </Tooltip>
          </span>
        </Link>
      )
    },
    {
      title: `Chain`,
      render: (_, record) => (
        <Avatar.Group
          alt='Blockchains Logo'
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
        >
          {record?.blockchain
            ? Object.keys(record?.blockchain)?.map((chainName, index) => (
              <div key={index}>
                {chainName?.trim() ? (
                  <Tooltip title={chainName}>
                    <Avatar
                      alt='Blockchain Logo'
                      size={25}
                      src={`${S3_IMG_URL}/image/chain/smallLogo/${chainName
                        ?.trim()
                        .toLowerCase()}.png`}
                      className='soon-table-blockchain'
                      // onClick={(e) => {
                      //   // e.stopPropagation();
                      // }}
                    />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            ))
            : '__'}
        </Avatar.Group>
      )
    },
    {
      title: `Round Type`,
      dataIndex: 'roundType' // override by render but still keep for pass param to server
    },
    {
      title: `Total Raise`,
      render: (_, record) => (
        <span>
          {record?.fundRaisingGoals
            ? renderNumber(record?.fundRaisingGoals)
            : '__'}
        </span>
      ),
      align: 'right',
      dataIndex: 'fundRaisingGoals' // override by render but still keep for pass param to server
    },
    {
      title: `Start Date`,
      render: (_, record) => (
        <span>
          {record?.startDate
            ? moment(record?.startDate).format('ddd, DD MMM YYYY')
            : 'TBA'}
        </span>
      ),
      dataIndex: 'startDate' // override by render but still keep for pass param to server
    },
    {
      title: `End Date`,
      render: (_, record) => (
        <span>
          {record?.endDate
            ? moment(record?.endDate).format('ddd, DD MMM YYYY')
            : 'TBA'}
        </span>
      ),
      dataIndex: 'endDate' // override by render but still keep for pass param to server
    },
    {
      title: `Launch Pad`,
      render: (_, record) => (
        <Avatar.Group
          alt='Launchpads Logos'
          maxCount={2}
          size={25}
          maxStyle={{
            color: '#fff',
            backgroundColor: '#039F7F',
            cursor: 'pointer'
          }}
        >
          {record?.roundSale
            ? Object.keys(record?.roundSale)?.map((idx, index) => (
              <div key={index}>
                {record?.roundSale[idx] &&
                  record?.roundSale[idx]?.platformName &&
                  record?.roundSale[idx]?.platformLogo &&
                  record?.roundSale[idx]?.web ? (
                    <Tooltip title={record?.roundSale[idx]?.platformName}>
                      <Avatar
                        alt='Launchpad Logo'
                        size={25}
                        src={record?.roundSale[idx]?.platformLogo}
                        className='soon-table-blockchain'
                        onClick={(e) => {
                          // e.stopPropagation();
                        }}
                      />
                    </Tooltip>
                  ) : (
                    ''
                  )}
              </div>
            ))
            : '__'}
        </Avatar.Group>
      )
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/soon/${record?.projectId?.split('_')[2]}`)
  }

  return (
    <div className='soon-table'>
      {loading ? (<MySkeletonLoadinng count={10} height={70}/>) : (
        <>
          <Table
            columns={columns}
            dataSource={listData}
            pagination={listData?.length > 20 ? {
              defaultPageSize: 20,
              showSizeChanger: false
            } : false}
            loading={loading}
            rowKey={(record) => record?.projectId}
            onRow={(record) => ({
              onClick: () => {
                onRowClicked(record)
              }
            })}
          />
        </>
      )}
    </div>
  )
}

export default SoonTable
