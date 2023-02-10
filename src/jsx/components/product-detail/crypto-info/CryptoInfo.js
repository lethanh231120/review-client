import React, { useContext, useState, useEffect } from 'react'
import { Avatar } from 'antd'
import CoinChart from '../../charts/coinchart/CoinChart'
import Description from '../description/Description'
import {
  CopyOutlined
  // GlobalOutlined,
  // DownOutlined,
  // LinkOutlined
} from '@ant-design/icons'
import './crypto.scss'
import _ from 'lodash'
import { CRYPTO } from '../../../constants/category'
import { encodeUrl } from '../../../../utils/formatUrl'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
// import { ChainListContext } from '../../../../jsx/index'
import { ChainListContext } from '../../../../App'
import { ReportModalContext } from '../../../index'
import { Button, Dropdown } from 'react-bootstrap'
// import { Button, Modal, Tab, Nav, Dropdown, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { LinkOutlined } from '@ant-design/icons'
import { isValidProductId, formatImgUrlFromProductId, formatUrlDetailFromUrlImageExchange } from '../../../../utils/formatText'
import { DetailLayout } from '../detail-layout'
import getCryptoDetailChartData from './HandleChartData.js'
import { MySpinner } from '../../common-widgets/my-spinner'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { formatLargeNumber } from '../../../../utils/formatNumber'

const CryptoInfo = ({ copyAddress, isShow, productInfo, ...rest }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const reportModal = useContext(ReportModalContext)
  const [chartData, setChartData] = useState([])
  const [showInfo, setShowInfo] = useState()
  const [multichain, setMultichain] = useState()
  const [mainExplorer, setMainExplorer] = useState()

  console.log(reportModal)
  useEffect(() => {
    setShowInfo(
      !isShow?.community &&
        _.isEmpty(productInfo?.details?.multichain) &&
        !isShow?.founders &&
        !isShow?.explorer &&
        !isShow?.sourceCode
    )
  }, [isShow, productInfo])

  useEffect(() => {
    const getChartData = async(wrappedTokenId) => {
      const network = wrappedTokenId?.split('_')[2]
      const baseCurrency = wrappedTokenId?.split('_')[3]
      const data = await getCryptoDetailChartData(network, baseCurrency)
      setChartData(data)
    }

    !_.isEmpty(productInfo) && getChartData(productInfo?.details?.wrapTokenId)
  }, [productInfo])

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../../../../${urlDetail}`)
  }

  const handleClickTag = (value) => {
    navigate(`../../../../../${CRYPTO}/${encodeUrl(value)}`)
  }

  useEffect(() => {
    const getDataVenture = async() => {
      if (!_.isEmpty(productInfo?.details?.multichain)) {
        const newMultiChain = []
        productInfo?.details?.multichain?.forEach((itemMulti) => {
          const itemChain = chainList[itemMulti?.chainName]
          if (itemChain) {
            newMultiChain.push({
              ...itemChain,
              ...itemMulti
            })
            // main address to display
            if (productInfo?.details?.chainName === itemMulti?.chainName) {
              setMainExplorer(
                `${itemChain?.exploreWebsite}${itemChain?.path}${productInfo?.details?.address}`
              )
            }
          }
        })
        if (!_.isEmpty(newMultiChain)) {
          setMultichain(newMultiChain)
        }
      } else {
        // don't have multiple chain
        const dataChain = chainList[productInfo?.details?.chainName]
        // have data in chain list
        if (dataChain) {
          setMainExplorer(
            `${dataChain?.exploreWebsite}${dataChain?.path}${productInfo?.details?.address}`
          )
        }
      }
    }
    getDataVenture()
  }, [productInfo, chainList])

  const handleReportScam = () => {
    rest?.setData({
      ...rest.data,
      isScam: true,
      star: 1
    })
  }

  // Header
  const header = <div className='row'>
    <div className='profile-head'>
      <div className='profile-info'>
        <div className='profile-details'>
          <div className='profile-photo'>
            {/* must have crypto id and its image */}
            {productInfo?.details?.cryptoId && productInfo?.details?.bigLogo ? (
              <Image src={isValidProductId(productInfo?.details?.cryptoId) ? formatImgUrlFromProductId(productInfo?.details?.cryptoId) : imgAbsentImageCrypto} preview={false} height={64} width={64}/>
            ) : (
              <span className='image-list-no-data-detail'>
                {productInfo?.details?.name?.slice(0, 3)}
              </span>
            )}
          </div>
          <div className='profile-name px-3 pt-2'>
            <h4 className='text-primary mb-2 cus-h4'>
              <span className='crypto-overview-name'>
                {productInfo?.details?.name}
              </span>
              {productInfo?.details?.symbol ? (
                <span className='crypto-overview-symbol'>
                  {productInfo?.details?.symbol}
                </span>
              ) : (
                ''
              )}
            </h4>
            {productInfo?.details?.address && (
              <p className='crypto-info-item-address'>
                <a href={mainExplorer} target='_blank' rel='noreferrer'>
                  {`${productInfo?.details?.address?.slice(
                    0,
                    5
                  )}...${productInfo?.details?.address?.slice(
                    productInfo?.details?.address?.length - 5,
                    productInfo?.details?.address?.length
                  )}`}
                </a>
                <CopyOutlined
                  style={{ padding: '0, 1rem' }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    copyAddress(e, productInfo?.details?.address)
                  }}
                />
              </p>
            )}
          </div>
          {productInfo?.details?.website && (
            <Button
              as='a'
              target='_blank'
              href={`${productInfo?.details?.website}`}
              className='btn btn-primary mb-1 ms-auto'
            >
                Website
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>

  // summary
  const summary =
    <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.totalReviews)}
          </h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.totalIsScam)}
          </h3>
          <span>
          Reported Scam
          </span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.score)}
          </h3>
          <span>
          Score
          </span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          as='a'
          href='#comment'
          className='btn btn-primary mb-1 me-1'
          onClick={handleReportScam}
        >
        Report Scam
        </Button>
        <Button
          as='a'
          href='#comment'
          className='btn btn-primary mb-1 ms-1'
          onClick={() => rest?.setData({ ...rest.data, isScam: false, star: 5 })}
        >
        Add Review
        </Button>
      </div>
    </div>

  // scam
  const scam = <>
    {productInfo?.details?.isScam ? (
      <ScamWarningDetail
        isShow={true}
        scamWarningReason={productInfo?.details?.proof?.isScam}
        proofType='error'
      />
    ) : productInfo?.details?.isWarning ? (
      <ScamWarningDetail
        isShow={true}
        scamWarningReason={productInfo?.details?.proof?.isWarning}
        proofType='warning'
      />
    ) : ''}
  </>

  console.log('productInfo', productInfo)
  const more = <>
    <div className='card-header pb-0 border-0 flex-wrap'>
      <div>
        <h4 className='heading mb-0'>More</h4>
      </div>
    </div>
    <div className='card-body'>
      <div className='basic-form'>
        {!_.isEmpty(productInfo?.details?.exchanges) && (
          <div className='crypto-info-item item-list'>
            <div className='crypto-info-item-key'>Exchanges: </div>
            <div className='crypto-info-item-address'>
              <Avatar.Group
                maxCount={4}
                size={25}
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  cursor: 'pointer'
                }}
              >
                {productInfo?.details?.exchanges?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item && (
                      <Avatar
                        size={25}
                        src={item}
                        key={index}
                        className='crypto-info-exchange'
                        onClick={(e) => handleClickExchange(e, item)}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Avatar.Group>
            </div>
          </div>
        )}
        {productInfo?.mores?.tag && (
          <div className='crypto-info'>
            <div className='crypto-overview-list-tags'>
              <div className='crypto-info-item-key'>Tag(s): </div>
              {productInfo?.mores?.tag?.map((item, index) => (
                <div
                  className='mb-0 btn btn-primary light btn-xs mb-1 me-1'
                  onClick={() => handleClickTag(item?.name)}
                  key={index}
                >
                  {item?.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {!showInfo && (
          <>
            <div className='crypto-info-item-key my-2'>Website(s): </div>
            <div className='d-flex align-items-center'>
              {isShow?.community && (
                <div className='basic-dropdown' style={{ marginRight: '10px' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Community
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {productInfo?.details &&
                      Object.keys(productInfo?.details?.community).map(
                        (key) => {
                          return (<React.Fragment key={key}>
                            {productInfo?.details?.community[key] !== '' && (
                              <Dropdown.Item
                                href={productInfo?.details?.community[key]}
                                key={key}
                                className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                target='_blank'
                              >
                                {productInfo?.details?.community[key] && (
                                  <>
                                    <span>
                                      {
                                        productInfo?.details?.community[
                                          key
                                        ]?.split('/')[2]
                                      }
                                    </span>
                                    <LinkOutlined />
                                  </>
                                )}
                              </Dropdown.Item>
                            )}
                          </React.Fragment>
                          )
                        }
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
              {isShow?.sourceCode && (
                <div className='basic-dropdown' style={{ marginRight: '10px' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Source Code
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {productInfo?.details?.sourceCode &&
                      Object.keys(productInfo?.details?.sourceCode)?.map(
                        (key) => {
                          return (
                            <React.Fragment key={key}>
                              {productInfo?.details?.sourceCode[key] !== '' && (
                                <Dropdown.Item
                                  href={productInfo?.details?.sourceCode[key]}
                                  key={key}
                                  className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                  target='_blank'
                                >
                                  {productInfo?.details?.sourceCode[key] && (
                                    <>
                                      {key}
                                    </>
                                  )}
                                </Dropdown.Item>
                              )}
                            </React.Fragment>
                          )
                        }
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
              {multichain && (
                <div className='basic-dropdown'>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Contract
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='cus-dropdown-menu'>
                      {multichain?.map((item, index) => (
                        <Dropdown.Item
                          href={`${item?.exploreWebsite}${item?.path}${item?.address}`}
                          target='_blank'
                          key={index}
                          className='crypto-tag-item-list-children-contract'
                        >
                          <Image src={item?.image} preview={false} />
                          <span className='crypto-tag-item-list-children-contract-address'>
                            {item?.address}
                          </span>
                          <CopyOutlined
                            style={{ padding: '0, 1rem' }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              copyAddress(e, item?.address)
                            }}
                          />
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
          </>

        )}
      </div>

      <div className='row mt-3'>
        <div className='col-xxl-6 col-6'>
          <div className='form-check custom-checkbox mb-3 checkbox-success'>
            <input
              type='checkbox'
              defaultChecked={productInfo?.details?.isCoingecko}
              className='form-check-input'
              id='customCheckBox3'
              disabled
            />
            <label
              className='form-check-label'
              htmlFor='customCheckBox3'
            >
              Coingecko
            </label>
          </div>
        </div>
        <div className='col-xxl-6 col-6'>
          <div className='form-check custom-checkbox mb-3 checkbox-success'>
            <input
              type='checkbox'
              defaultChecked={productInfo?.details?.isCoinmarketcap}
              className='form-check-input'
              id='customCheckBox3'
              disabled
            />
            <label
              className='form-check-label'
              htmlFor='customCheckBox3'
            >
              Coinmarketcap
            </label>
          </div>
        </div>
        <div className='col-xxl-6 col-6'>
          <div className='form-check custom-checkbox mb-3 checkbox-success'>
            <input
              type='checkbox'
              defaultChecked={productInfo?.details?.isProxy}
              className='form-check-input'
              id='customCheckBox3'
              disabled
            />
            <label
              className='form-check-label'
              htmlFor='customCheckBox3'
            >
              Proxy
            </label>
          </div>
        </div>
        <div className='col-xxl-6 col-6'>
          <div className='form-check custom-checkbox mb-3 checkbox-success'>
            <input
              type='checkbox'
              defaultChecked={productInfo?.details?.contractVerified}
              className='form-check-input'
              id='customCheckBox3'
              disabled
            />
            <label
              className='form-check-label'
              htmlFor='customCheckBox3'
            >
              Contract Verify
            </label>
          </div>
        </div>
      </div>
    </div>
  </>

  const about = <>
    <div className='card-header border-0 pb-0'>
      <h5 className='text-primary'>About {productInfo?.details?.name}</h5>
    </div>
    <div className='card-body pt-3'>
      <div className='profile-interest '>
        <Description
          text={productInfo?.details?.description
            ? productInfo?.details?.description
            : ''}
        />
      </div>
    </div>
  </>

  const coinChart = <div className='cus-height-chart'>
    {chartData ? <CoinChart symbol={productInfo?.details?.symbol}
      price={productInfo?.details?.priceUSD}
      marketCap={productInfo?.details?.marketcapUSD}
      totalSupply={productInfo?.details?.totalSupply}
      holders={productInfo?.details?.holders}
      transfer={productInfo?.details?.transfers}
      chartData={chartData}/> : <MySpinner />}
  </div>

  return (
    <>
      <DetailLayout
        Header={header}
        summary={summary}
        scam={scam}
        more={more}
        about={about}
        topDiscus={(<TopDiscussed/>)}
        coinChart={coinChart}
        // report={report}
        numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
        rest={rest}
      />
    </>
  )
}
export default CryptoInfo
