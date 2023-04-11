import React, { useEffect, useState, useContext } from 'react'
import { post, S3_IMG_URL } from '../../../../api/BaseRequest'
import { Image, Tooltip, Avatar, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CRYPTO, DAPP, EXCHANGE, LAUNCHPAD, SOON, VENTURE } from '../../../constants/category'
import _ from 'lodash'
// import { formatImgUrlFromProductId } from '../../../../utils/formatText'
import { PREFIX_DETAIL, CRYPTO_TOKEN } from '../../../constants/category'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import { ChainListContext } from '../../../../App'
// import { NO_DATA } from '../../../constants/data'
// import { toCammelCase } from '../../../../utils/formatText'
// import { getExchangeNameFromUrlImageExchage, toCammelCase } from '../../../../utils/formatText'
// import { CheckCircleOutlined, CloseCircleOutlined, ApartmentOutlined } from '@ant-design/icons'
import { renderNumber } from '../../../../utils/formatNumber'
// import { renderNumber, formatLargeNumber } from '../../../../utils/formatNumber'
// import { renderNumber, formatMoneyLessOneDollar, formatMoneyGreaterEqualOneDollar, formatLargeNumber } from '../../../../utils/formatNumber'
import MyScoreComponent from '../../score/scoreComponent'
import './similar.scss'
import { exchanges } from '../../../../utils/ExchangeImage'
import moment from 'moment'

import { Badge } from 'react-bootstrap'
import ProductImage, { altCrypto, altDApp, altExchange, altLaunchpad, altSoon, altVenture, sizeImg32_4 } from '../../common-widgets/page-detail/ProductImage'
import { formatDateStyle } from './../../../../utils/time/time'

const Similar = ({ type, listProjectId }) => {
  const navigate = useNavigate()
  const [listProject, setListProject] = useState()
  const [data, setData] = useState()
  const [screenWidth, setScreenWidth] = useState()

  const chainList = useContext(ChainListContext)

  const columnCryptos = [
    {
      title: 'Name',
      render: (_, record) => (
        <span
          className='crypto-table-info image-list'
        >
          <ProductImage
            imageUrl={record?.smallLogo}
            productName={record?.symbol || record?.name}
            altImageType={altCrypto}
            size={sizeImg32_4}
          />
          <span>
            <Tooltip
              title={(
                <p>{`${record?.name} - ${record?.symbol}`}</p>
              )}>
              <div className='data-table-name'>
                <div className='data-table-name-title'>{record?.name}</div>
                <div className='data-table-symbol'>{record?.symbol}</div>
                <div className='image-list-icon-scam-warning'>
                  {record?.isScam ? (
                    <Image alt='Scam' src={scam} preview={false} />
                  ) : record?.isWarning ? (
                    <Image alt='Warning' src={warning} preview={false} />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Tooltip>
            {record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN && (
              <div className='data-table-address'>
                <span className='product-name-text text-primary' style={{ cursor: 'pointer' }} rel='noreferrer' >
                  {`${record?.cryptoId
                    ?.split('_')[3]
                    ?.slice(0, 4)}...${record?.cryptoId
                    ?.split('_')[3]
                    ?.slice(
                      record?.cryptoId?.split('_')[3]?.length - 4,
                      record?.cryptoId?.split('_')[3]?.length
                    )}`}
                </span>
              </div>
            )}
          </span>
        </span>
      )
    },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Price
    //     </span>
    //   ),
    //   dataIndex: 'priceUSD',
    //   align: 'right',
    //   render: (_, record) => (
    //     <>
    //       {
    //         record?.priceUSD && record?.priceUSD >= 1 // format money greater than or equal with 1
    //           ? formatMoneyGreaterEqualOneDollar(record?.priceUSD)
    //           : record?.priceUSD > 0 // format money greater than 0
    //             ? formatMoneyLessOneDollar(record.priceUSD)
    //             : NO_DATA // money less than or equal with 0
    //       }
    //     </>
    //   )
    // },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Chains
    //     </span>
    //   ),
    //   dataIndex: 'chains',
    //   render: (_, record) => (
    //     record?.multichain
    //       ? <div
    //       >
    //         <Avatar.Group
    //           alt='Blockchains Logos'
    //           maxCount={record?.multichain?.length >= 4 ? 2 : 3}
    //           size={25}
    //           maxStyle={{
    //             color: '#fff',
    //             backgroundColor: '#039F7F',
    //             cursor: 'pointer'
    //           }}
    //         >
    //           {record?.multichain?.map((item, index) => (
    //             <React.Fragment key={item?.cryptoId}>
    //               {chainList[item?.split('_')[2]] && (
    //                 <Tooltip title={toCammelCase(chainList[item?.split('_')[2]]?.chainName)}>
    //                   <Avatar
    //                     alt='Blockchain Logo'
    //                     size={25}
    //                     src={chainList[item?.split('_')[2]]?.image}
    //                     key={index}
    //                     className='crypto-table-chain'
    //                   />
    //                 </Tooltip>
    //               )}
    //             </React.Fragment>
    //           ))}
    //         </Avatar.Group>
    //       </div>
    //       : chainList[record?.chainName]
    //         ? <Tooltip title={toCammelCase(chainList[record?.chainName]?.chainName)}>
    //           <Avatar
    //             alt='Blockchain Logo'
    //             size={25}
    //             src={chainList[record?.chainName]?.image}
    //             key={record}
    //             className='crypto-table-chain'
    //           />
    //         </Tooltip>
    //         : record?.smallLogo ? (
    //           <Tooltip title={record?.name}>
    //             <Avatar
    //               alt='Blockchain Logo'
    //               src={formatImgUrlFromProductId(record?.cryptoId)}
    //               // preview={false}
    //               size={25}
    //               key={record}
    //             />
    //           </Tooltip>
    //         ) : (
    //           <span className='crypto-table-info-logo image-list-no-data'>
    //             {record?.name?.slice(0, 3)}
    //           </span>
    //         )
    //   )
    // },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Exchanges
    //     </span>
    //   ),
    //   dataIndex: 'exchanges',
    //   render: (_, record) => (
    //     <Avatar.Group
    //       alt='Exchanges Logos'
    //       maxCount={4}
    //       size={25}
    //       maxStyle={{
    //         color: '#fff',
    //         backgroundColor: '#039F7F',
    //         cursor: 'pointer'
    //       }}
    //     >
    //       {record?.exchanges?.map((item, index) => (
    //         <React.Fragment key={index}>
    //           {item && (
    //             <Tooltip title={getExchangeNameFromUrlImageExchage(item)} >
    //               <Avatar
    //                 alt='Exchange Logo'
    //                 size={25}
    //                 src={item}
    //                 key={index}
    //                 className='crypto-table-exchange'
    //               />
    //             </Tooltip>

    //           )}
    //         </React.Fragment>
    //       ))}
    //     </Avatar.Group>
    //   )
    // },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Contract
    //     </span>
    //   ),
    //   key: 'contractVerified',
    //   align: 'center',
    //   dataIndex: 'contractVerified',
    //   render: (_, record) => (
    //     <span>
    //       {record?.contractVerified !== null && (
    //         <div style={{ display: 'flex', padding: '0 5px' }}
    //         >
    //           <Tooltip
    //             title={
    //               record?.contractVerified
    //                 ? `${record?.name} contract has been verified`
    //                 : `${record?.name} contract has not been verified`
    //             }
    //           >
    //             {record?.contractVerified ? (
    //               <CheckCircleOutlined
    //                 style={{ color: 'green', padding: '0 5px' }}
    //               />
    //             ) : (
    //               <CloseCircleOutlined
    //                 style={{ color: 'red', padding: '0 5px' }}
    //               />
    //             )}
    //           </Tooltip>{' '}
    //           <Tooltip
    //             title={
    //               record?.isProxy
    //                 ? `${record?.name} contract is a proxy contract`
    //                 : `${record?.name} contract is not a proxy contract`
    //             }
    //           >
    //             {record?.isProxy ? (
    //               <ApartmentOutlined
    //                 style={{ color: 'red', padding: '0 5px' }}
    //               />
    //             ) : (
    //               <ApartmentOutlined
    //                 style={{ color: 'green', padding: '0 5px' }}
    //               />
    //             )}
    //           </Tooltip>
    //         </div>
    //       )}
    //     </span>
    //   )
    // },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Market Cap
    //     </span>
    //   ),
    //   className: 'width-170',
    //   key: 'marketcapUSD',
    //   align: 'right',
    //   dataIndex: 'marketcapUSD',
    //   render: (_, record) => <span>{record?.marketcapUSD ? renderNumber(record?.marketcapUSD) : NO_DATA}</span>
    // },
    // {
    //   title: (
    //     <span className='crypto-table-tooltip'>
    //       Holders
    //     </span>
    //   ),
    //   dataIndex: 'holders',
    //   align: 'right',
    //   render: (_, record) => (<span>
    //     {formatLargeNumber(record?.holders)}
    //   </span>)
    // },
    {
      title: (
        <span className='crypto-table-tooltip'>
          Score
        </span>
      ),
      className: 'width-120',
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => <MyScoreComponent score={record?.score} type={CRYPTO}/>
    }
  ]

  const columnDapps = [
    {
      title: 'Name',
      render: (_, record) => (<span className='crypto-table-info image-list'>
        <ProductImage
          imageUrl={record?.dAppLogo}
          productName={record?.dAppName}
          altImageType={altDApp}
          size={sizeImg32_4}
        />
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.dAppName ? record?.dAppName : 'Unknown'}</div>
          </div>
        </span>
      </span>)

    },
    // {
    //   title: 'Subcategory',
    //   render: (_, record) => (<Badge bg=' badge-l' className='badge-success '>
    //     {record?.subCategory}
    //   </Badge>)
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Chain
    //   </span>,
    //   render: (_, record) => (
    //     <Avatar.Group
    //       alt='Blockchains Logos'
    //       maxStyle={{
    //         color: '#fff',
    //         backgroundColor: '#039F7F',
    //         cursor: 'pointer'
    //       }}
    //       maxCount={3}
    //       size={25} >
    //       {record?.chains && Object.keys(record?.chains).map((key, index) => <Tooltip key={index} title={toCammelCase(key)}><Avatar alt='Blockchain Logo' size={25} src={chainList[key]?.image} /></Tooltip>)}
    //     </Avatar.Group>
    //   )
    // },
    // {
    //   title: 'Volume24h',
    //   dataIndex: 'volume24h',
    //   render: (_, record) => (
    //     <span>{record?.volume24h ? renderNumber(record?.volume24h) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: 'User24h',
    //   dataIndex: 'user24h',
    //   render: (_, record) => (
    //     <span>{record?.user24h ? formatLargeNumber(record?.user24h) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: 'Balance',
    //   dataIndex: 'balance',
    //   render: (_, record) => (
    //     <span>{record?.balance ? renderNumber(record?.balance) : 'Unknown' }</span>
    //   )
    // },
    {
      title: <span className='crypto-table-tooltip'>
      Score
      </span>,
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => (
        <MyScoreComponent score={record?.score} type={DAPP}/>)
    }
  ]

  const columnExchanges = [
    {
      title: 'Name',
      render: (_, record) => (<span className='crypto-table-info image-list'>
        <ProductImage
          imageUrl={record?.smallLogo}
          productName={record?.name}
          altImageType={altExchange}
          size={sizeImg32_4}
        />
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.name ? record?.name : 'Unknown'}</div>
          </div>
        </span>
      </span>)

    },
    // {
    //   title: 'Subcategory',
    //   align: 'center',
    //   render: (_, record) => (<Badge bg=' badge-l' className='badge-success '>
    //     {record?.subCategory}
    //   </Badge>)
    // },

    // {
    //   title: <span className='crypto-table-tooltip'>
    //     Pairs
    //   </span>,
    //   dataIndex: 'pairCount',
    //   render: (_, record) => (
    //     <span>{record?.pairCount ? record?.pairCount : NO_DATA }
    //     </span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Txn Fee
    //   </span>,
    //   dataIndex: 'feeTxs',
    //   render: (_, record) => (
    //     <span>{record?.feeTxs ? `${record?.feeTxs} %` : NO_DATA }</span>
    //   )
    // },
    // {
    //   title: 'Volume 24h',
    //   dataIndex: 'volume24h',
    //   render: (_, record) => (
    //     <span>{record?.volume24h ? renderNumber(record?.volume24h) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: 'Volume 7d',
    //   dataIndex: 'volume7d',
    //   render: (_, record) => (
    //     <span>{record?.volume7d ? renderNumber(record?.volume7d) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: 'Volume 30d',
    //   dataIndex: 'volume1m',
    //   render: (_, record) => (
    //     <span>{record?.volume1m ? renderNumber(record?.volume1m) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: 'Visit 7d',
    //   dataIndex: 'visit7d',
    //   render: (_, record) => (
    //     <span>{record?.visit7d ? formatLargeNumber(record?.visit7d) : 'Unknown' }</span>
    //   )
    // },
    {
      title: <span className='crypto-table-tooltip'>
      Score
      </span>,
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => (
        <MyScoreComponent score={record?.score} type={EXCHANGE}/>)
    }
  ]

  const columnVentures = [
    {
      title: 'Name',
      render: (_, record) => (<span className='crypto-table-info image-list'>
        <ProductImage
          imageUrl={record?.ventureLogo}
          productName={record?.ventureName}
          altImageType={altVenture}
          size={sizeImg32_4}
        />
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.ventureName ? record?.ventureName : 'Unknown'}</div>
          </div></span>
      </span>)

    },
    // {
    //   title: 'Year Founded',
    //   dataIndex: 'yearFounded',
    //   render: (_, record) => (
    //     <span>{record?.yearFounded ? record?.yearFounded : NO_DATA }</span>
    //   )
    // },
    // {
    //   title: 'Location',
    //   showSorterTooltip: false,
    //   dataIndex: 'location',
    //   render: (_, record) => (
    //     <span>{record?.location ? `${record?.location}` : NO_DATA }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Seed
    //   </span>,
    //   dataIndex: 'seed',
    //   render: (_, record) => (
    //     <span>{record?.seed ? renderNumber(record?.seed) : '$0' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //  Series A
    //   </span>,
    //   dataIndex: 'seriesA',
    //   render: (_, record) => (
    //     <span>{record?.seriesA ? renderNumber(record?.seriesA) : '$0' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Series B
    //   </span>,
    //   dataIndex: 'seriesB',
    //   render: (_, record) => (
    //     <span>{record?.seriesB ? renderNumber(record?.seriesB) : '$0' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Series C
    //   </span>,
    //   dataIndex: 'seriesC',
    //   render: (_, record) => (
    //     <span>{record?.seriesC ? renderNumber(record?.seriesC) : '$0' }</span>
    //   )
    // },
    // {
    //   title: 'Strategic',
    //   dataIndex: 'strategic',
    //   render: (_, record) => (
    //     <span>{record?.strategic ? renderNumber(record?.strategic) : '$0' }</span>
    //   )
    // },
    // {
    //   title: 'Total Funds',
    //   dataIndex: 'totalFund',
    //   render: (_, record) => (
    //     <span>{record?.totalFund ? renderNumber(record?.totalFund) : '$0' }</span>
    //   )
    // },
    {
      title: <span className='crypto-table-tooltip'>
      Score
      </span>,
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => (
        <MyScoreComponent score={record?.score} type={VENTURE}/>)
    }
  ]

  const columnLaunchPad = [
    {
      title: 'Name',
      render: (_, record) => (<span className='crypto-table-info image-list'>
        <ProductImage
          imageUrl={record?.smallLogo}
          productName={record?.name}
          altImageType={altLaunchpad}
          size={sizeImg32_4}
        />
        <span>
          <div className='data-table-name ms-2'>
            <div>{record?.name ? record?.name : 'Unknown'}</div>
          </div></span>
      </span>)

    },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //  Blockchains
    //   </span>,
    //   dataIndex: 'chains',
    //   key: 'chains',
    //   render: (_, record) => (
    //     <div
    //     >
    //       <Avatar.Group
    //         alt='Blockchains Logos'
    //         maxCount={2}
    //         size={25}
    //         maxStyle={{
    //           color: '#fff',
    //           backgroundColor: '#039F7F',
    //           cursor: 'pointer'
    //         }}
    //       >
    //         {record?.chains && Object.keys(record?.chains)?.map((item, index) => (
    //           <React.Fragment key={item}>
    //             {chainList[item] && (
    //               <Tooltip title={toCammelCase(chainList[item]?.chainName)}>
    //                 <Avatar
    //                   alt='Blockchain Logo'
    //                   size={25}
    //                   src={chainList[item]?.image}
    //                   key={index}
    //                   className='crypto-table-chain'
    //                 />
    //               </Tooltip>
    //             )}
    //           </React.Fragment>
    //         ))}
    //       </Avatar.Group>
    //     </div>

    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Current ROI
    //   </span>,
    //   dataIndex: 'avgRoiCurrent',
    //   render: (_, record) => (
    //     <span>{record?.avgRoiCurrent ? `${formatLargeNumber(record?.avgRoiCurrent)}x` : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   ATH ROI
    //   </span>,
    //   dataIndex: 'avgRoiATH',
    //   render: (_, record) => (
    //     <span>{record?.avgRoiATH ? formatLargeNumber(record?.avgRoiATH) : 'Unknown' }x</span>
    //   )
    // },
    // {
    //   title: 'Year Founded',
    //   dataIndex: 'yearFounded',
    //   render: (_, record) => (
    //     <span>{record?.yearFounded ? record?.yearFounded : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Raised
    //   </span>,
    //   dataIndex: 'totalFundsRaised',
    //   render: (_, record) => (
    //     <span>{record?.totalFundsRaised ? renderNumber(record?.totalFundsRaised) : 'Unknown' }</span>
    //   )
    // },

    // {
    //   title: <span className='crypto-table-tooltip'>
    //  Market Cap
    //   </span>,
    //   dataIndex: 'marketCap',
    //   render: (_, record) => (
    //     <span>{record?.marketCap ? renderNumber(record?.marketCap) : 'Unknown' }</span>
    //   )
    // },
    // {
    //   title: <span className='crypto-table-tooltip'>
    //   Volume24h
    //   </span>,
    //   dataIndex: 'volume24h',
    //   render: (_, record) => (
    //     <span>{record?.volume24h ? renderNumber(record?.volume24h) : 'Unknown' }</span>
    //   )
    // },

    {
      title: <span className='crypto-table-tooltip'>
      Score
      </span>,
      dataIndex: 'score',
      align: 'center',
      render: (_, record) => (
        <MyScoreComponent score={record?.score} type={LAUNCHPAD} />)
    }
  ]

  const columnSoons = [
    {
      title: `Name`,
      render: (_, record) => (
        <span
          className='crypto-table-info image-list'
        >
          <ProductImage
            imageUrl={record?.smallLogo}
            productName={record?.projectSymbol || record?.projectName}
            altImageType={altSoon}
            size={sizeImg32_4}
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
        </span>
      )
    },
    {
      title: `Subcategory`,
      dataIndex: 'subCategory', // override by render but still keep for pass param to server
      render: (_, record) => (
        <>
          {record?.subCategory ? (
            <Badge bg=' badge-l' className='badge-success' style={{ cursor: 'pointer' }}>
              {record?.subCategory}
            </Badge>
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
                        ?.trim()?.toLowerCase()}.png`}
                      className='soon-table-blockchain'
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
      // sorter: (a, b) => moment(a?.startDate)?.unix() - moment(b?.startDate)?.unix(),
      // showSorterTooltip: false,
      render: (_, record) => (
        <span>
          {record?.startDate
            ? moment(record?.startDate).format({ formatDateStyle })
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
            ? moment(record?.endDate).format({ formatDateStyle })
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

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      setScreenWidth(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const getChain = async() => {
      if (!_.isEmpty(data)) {
        const newListData = []
        data?.forEach((itemProduct) => {
          if (!_.isEmpty(itemProduct?.multichain)) {
            newListData.push({
              ...itemProduct,
              exchanges: [
                itemProduct?.isBinance !== null && itemProduct?.isBinance
                  ? [exchanges?.binance]
                  : [],
                itemProduct?.isCoinbase && itemProduct?.isCoinbase !== null
                  ? [exchanges?.coinbase]
                  : [],
                itemProduct?.isPancakeSwap &&
                itemProduct?.isPancakeSwap !== null
                  ? [exchanges?.pancakeswap]
                  : [],
                itemProduct?.isUniSwap && itemProduct?.isUniSwap !== null
                  ? [exchanges?.uniswap]
                  : []
              ]?.flat(1)
            })
          } else {
            newListData.push({
              ...itemProduct,
              exchanges: [
                itemProduct?.isBinance && itemProduct?.isBinance !== null
                  ? [exchanges?.binance]
                  : [],
                itemProduct?.isCoinbase && itemProduct?.isCoinbase !== null
                  ? [exchanges?.coinbase]
                  : [],
                itemProduct?.isPancakeSwap &&
                itemProduct?.isPancakeSwap !== null
                  ? [exchanges?.pancakeswap]
                  : [],
                itemProduct?.isUniSwap && itemProduct?.isUniSwap !== null
                  ? [exchanges?.uniswap]
                  : []
              ]?.flat(1)
            })
          }
        })
        if (!_.isEmpty(newListData)) {
        //   setListProject(newListData)
          if (screenWidth > 3000) {
            setListProject(newListData && newListData?.slice(0, 6))
          }
          if (screenWidth < 3000) {
            setListProject(newListData && newListData?.slice(0, 6))
          }
          if (screenWidth < 2700) {
            setListProject(newListData && newListData?.slice(0, 5))
          }
          if (screenWidth < 2400) {
            setListProject(newListData && newListData?.slice(0, 6))
          }
          if (screenWidth < 1600) {
            setListProject(newListData && newListData?.slice(0, 5))
          }
          if (screenWidth < 1200) {
            setListProject(newListData && newListData?.slice(0, 6))
          }
          if (screenWidth < 992) {
            setListProject(newListData && newListData?.slice(0, 5))
          }
        }
      }
    }
    getChain()
  }, [data, chainList, screenWidth])

  useEffect(() => {
    const key = type === CRYPTO ? 'cryptoIds' : (type === DAPP) ? 'dAppIds' : (type === EXCHANGE) ? 'exchangeIds' : (type === VENTURE) ? 'ventureIds' : type === SOON ? 'projectIds' : 'launchpadIds'
    const params = {}
    params[key] = listProjectId
    if (key && !_.isEmpty(listProjectId)) {
      post(`reviews/${type === CRYPTO ? CRYPTO : type === DAPP ? DAPP : type === EXCHANGE ? EXCHANGE : type === SOON ? SOON : type === VENTURE ? VENTURE : LAUNCHPAD}/list`, params)
        .then((res) => setData(res?.data[type === CRYPTO ? 'cryptos' : type === DAPP ? 'dApps' : type === EXCHANGE ? 'exchanges' : type === SOON ? 'soons' : type === VENTURE ? 'ventures' : 'launchPads']))
    }
  }, [listProjectId, type])

  const handleRowClicked = (record) => {
    if (record?.cryptoId?.split('_')[1] === CRYPTO_TOKEN) {
      navigate(
        `../../../../../${PREFIX_DETAIL}/${CRYPTO}/${
          record?.cryptoId?.split('_')[1]
        }/${record?.cryptoId?.split('_')[2]}/${record?.cryptoId?.split('_')[3]}`
      )
    } else {
      // type === coin
      navigate(
        `../../../../../${PREFIX_DETAIL}/${CRYPTO}/${
          record?.cryptoId?.split('_')[1]
        }/${record?.cryptoId?.split('_')[2]}`
      )
    }
  }

  const handleonRowClickDapp = (record)=> {
    const splitedId = record?.dAppId?.split('_')
    splitedId && navigate(`../../../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const handleOnRowClickExchange = (record)=> {
    const splitedId = record?.exchangeId?.split('_')
    splitedId && navigate(`../../../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const handleOnRowClickVenture = (record)=> {
    const splitedId = record?.ventureId?.split('_')
    splitedId && navigate(`../../../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const handleonRowClickLaunchpad = (record)=> {
    const splitedId = record?.launchPadId?.split('_')
    splitedId && navigate(`../../../../products/${splitedId[1]}/${splitedId[2]}`)
  }

  const handleonRowClickSoon = (record) => {
    navigate(`../../../../products/soon/${record?.projectId?.split('_')[2]}`)
  }

  return (<>
    {type === CRYPTO ? (
      <div className='similar-crypto table-responsive'>
        <Table
          columns={columnCryptos}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.cryptoId}
          onRow={(record) => ({
            onClick: () => {
              handleRowClicked(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    ) : type === DAPP ? (
      <div className='similar-dapp'>
        <Table
          columns={columnDapps}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.dAppId}
          onRow={(record) => ({
            onClick: () => {
              handleonRowClickDapp(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    ) : type === EXCHANGE ? (
      <div className='similar-exchange'>
        <Table
          columns={columnExchanges}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.exchangeId}
          onRow={(record) => ({
            onClick: () => {
              handleOnRowClickExchange(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    ) : type === VENTURE ? (
      <div className='similar-venture'>
        <Table
          columns={columnVentures}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.ventureId}
          onRow={(record) => ({
            onClick: () => {
              handleOnRowClickVenture(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    ) : type === SOON ? (
      <div className='similar-soon'>
        <Table
          columns={columnSoons}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.projectId}
          onRow={(record) => ({
            onClick: () => {
              handleonRowClickSoon(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    ) : (
      <div className='similar-launchpad'>
        <Table
          columns={columnLaunchPad}
          dataSource={listProject}
          pagination={false}
          rowKey={(record) => record?.launchPadId}
          onRow={(record) => ({
            onClick: () => {
              handleonRowClickLaunchpad(record)
            }
          })}
          scroll={{ x: 'max-content' }}
        />
      </div>
    )}
  </>)
}

export default Similar
