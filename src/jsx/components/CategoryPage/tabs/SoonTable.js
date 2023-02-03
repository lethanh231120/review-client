import React from 'react'
import '../../table/soon/soon.scss'
import { Image, Table, Avatar, Tooltip, Empty, Tag } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import nodata from '../../../../images/product/nodata.png'
import { renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import moment from 'moment'
import { encodeUrl } from '../../../../utils/formatUrl'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import { mainColorHex } from '../../../constants/color'

const SoonTable = ({ listData, loading }) => {
  const navigate = useNavigate()

  const handleClickTag = (e, value) => {
    e.stopPropagation()
    if (value) {
      navigate(`../../../${SOON}/${encodeUrl(value)}`)
    }
  }

  const columns = [
    {
      title: `Name`,
      render: (_, record) => (
        <Link
          to={`../../../${PREFIX_DETAIL}/${SOON}/${record?.projectId}`}
          className='soon-table-info image-list'
        >
          {record?.bigLogo ? (
            <Image
              // style={{ width: "5rem", height: "5rem", marginRight: "1.5rem" }}
              src={record?.bigLogo}
              preview={false}
            />
          ) : (
            <span className='image-list-no-data'>
              {record?.projectName?.slice(0, 3)}
            </span>
          )}
          <span>
            <div className='table-info-name'>
              <div className='table-info-name-title'>
                {record?.projectName?.trim()}
              </div>
              <div className='table-info-symbol'>
                {record?.projectSymbol?.trim()}
              </div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: `Subcategory`,
      sorter: (a, b) => a.subCategory.localeCompare(b.subCategory),
      showSorterTooltip: false,
      dataIndex: 'subCategory', // override by render but still keep for pass param to server
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
      title: `Chain`,
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
          {record?.blockchain
            ? Object.keys(record?.blockchain)?.map((chainName, index) => (
              <>
                {chainName?.trim() ? (
                  <Tooltip title={chainName}>
                    <Avatar
                      size={25}
                      src={`https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/${chainName
                        ?.trim()
                        .toLowerCase()}.png`}
                      key={index}
                      className='soon-table-blockchain'
                      onClick={(e) => {
                        // e.stopPropagation();
                      }}
                    />
                  </Tooltip>
                ) : (
                  ''
                )}
              </>
            ))
            : '__'}
        </Avatar.Group>
      )
    },
    {
      title: `Round Type`,
      sorter: (a, b) => a.roundType.localeCompare(b.roundType),
      showSorterTooltip: false,
      dataIndex: 'roundType' // override by render but still keep for pass param to server
    },
    {
      title: `Total Raise`,
      sorter: (a, b) => a.fundRaisingGoals - b.fundRaisingGoals,
      showSorterTooltip: false,
      render: (_, record) => (
        <span>
          {record?.fundRaisingGoals
            ? renderNumber(record?.fundRaisingGoals)
            : '__'}
        </span>
      ),
      dataIndex: 'fundRaisingGoals' // override by render but still keep for pass param to server
    },
    {
      title: `Start Date`,
      // sorter: (a, b) => moment(a?.startDate)?.unix() - moment(b?.startDate)?.unix(),
      // showSorterTooltip: false,
      render: (_, record) => (
        <span>
          {record?.startDate
            ? moment(record?.startDate).format('ddd, DD MMM YYYY')
            : 'TBA'}
          {/* { record?.startDate} */}
        </span>
      ),
      dataIndex: 'startDate' // override by render but still keep for pass param to server
      // defaultSortOrder: 'descend'
    },
    {
      title: `End Date`,
      // sorter: true,
      // showSorterTooltip: false,
      render: (_, record) => (
        <span>
          {record?.endDate
            ? moment(record?.endDate).format('ddd, DD MMM YYYY')
            : 'TBA'}
          {/* { record?.endDate} */}
        </span>
      ),
      dataIndex: 'endDate' // override by render but still keep for pass param to server
    },
    {
      title: `Launch Pad`,
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
          {record?.roundSale
            ? Object.keys(record?.roundSale)?.map((idx, index) => (
              <>
                {record?.roundSale[idx] &&
                  record?.roundSale[idx]?.platformName &&
                  record?.roundSale[idx]?.platformLogo &&
                  record?.roundSale[idx]?.web ? (
                    <Tooltip title={record?.roundSale[idx]?.platformName}>
                      <Avatar
                        size={25}
                        src={record?.roundSale[idx]?.platformLogo}
                        key={index}
                        className='soon-table-blockchain'
                        onClick={(e) => {
                          // e.stopPropagation();
                        }}
                      />
                    </Tooltip>
                  ) : (
                    ''
                  )}
              </>
            ))
            : '__'}
        </Avatar.Group>
      )
    }
  ]

  const onRowClicked = (record) => {
    navigate(`../../../products/soon/${record?.projectId}`)
  }

  return (
    <div className='soon-table'>
      {!_.isEmpty(listData) ? (
        <Table
          columns={columns}
          dataSource={listData}
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: false
          }}
          loading={loading}
          rowKey={(record) => record?.projectId}
          onRow={(record) => ({
            onClick: () => {
              onRowClicked(record)
            }
          })}
        />
      ) : (
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
      )}
    </div>
  )
}

export default SoonTable
