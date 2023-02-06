import React, { Fragment, useContext, useState, useEffect } from 'react'
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
import { ChainListContext } from '../../../../jsx/index'
import { Button, Dropdown } from 'react-bootstrap'
// import { Button, Modal, Tab, Nav, Dropdown, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { LinkOutlined } from '@ant-design/icons'
import { formatUrlDetailFromUrlImageExchange } from '../../../../utils/formatText'
import { DetailLayout } from '../detail-layout'

const CryptoInfo = ({ copyAddress, isShow, productInfo, ...rest }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)

  const [showInfo, setShowInfo] = useState()
  const [multichain, setMultichain] = useState()
  const [mainExplorer, setMainExplorer] = useState()

  useEffect(() => {
    setShowInfo(
      !isShow?.community &&
        _.isEmpty(productInfo?.details?.multichain) &&
        !isShow?.founders &&
        !isShow?.explorer &&
        !isShow?.sourceCode
    )
  }, [isShow, productInfo])

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

  // Header
  const header = <div className='row'>
    <div className='profile-head'>
      <div className='profile-info'>
        <div className='profile-details'>
          <div className='profile-photo'>
            {productInfo?.details?.bigLogo !== null ? (
              <Image src={productInfo?.details?.bigLogo} preview={false} />
            ) : productInfo?.details?.smallLogo !== null ? (
              <Image src={productInfo?.details?.smallLogo} preview={false} />
            ) : productInfo?.details?.thumbLogo !== null ? (
              <Image src={productInfo?.details?.thumbLogo} preview={false} />
            ) : (
              <span className='img-fluid rounded-circle'>
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
            {productInfo?.details?.totalReviews}
          </h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {productInfo?.details?.totalIsScam}
          </h3>
          <span>
          Total Scams
          </span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {productInfo?.details?.score}
          </h3>
          <span>
          Score
          </span>
        </div>
      </div>
      <div className='mt-4'>
        <Link
          to='/post-details'
          className='btn btn-primary mb-1 me-1'
        >
        Report Scam
        </Link>
        <Button
          as='a'
          href='#'
          className='btn btn-primary mb-1 ms-1'
        // onClick={() => dispatch({ type: 'sendMessage' })}
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

  const more = <>
    <div className='card-header pb-0 border-0 flex-wrap'>
      <div>
        <h4 className='heading mb-0'>More</h4>
      </div>
    </div>
    <div className='card-body pt-3'>
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
                  <>
                    {item && (
                      <Avatar
                        size={25}
                        src={item}
                        key={index}
                        className='crypto-info-exchange'
                        onClick={(e) => handleClickExchange(e, item)}
                      />
                    )}
                  </>
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
                  className='highlight-tag'
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
          <div className='d-flex align-items-center'>
            <div className='basic-dropdown' style={{ marginRight: '10px' }}>
              <Dropdown>
                <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                  Community
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {productInfo?.details &&
                    Object.keys(productInfo?.details?.community).map(
                      (key) => {
                        return (<>
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
                        </>
                        )
                      }
                    )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
            <div className='basic-dropdown'>
              <Dropdown>
                <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                  Contract
                </Dropdown.Toggle>
                <Dropdown.Menu className='cus-dropdown-menu'>
                  {multichain?.map((item, index) => (
                    <>
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
                    </>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}
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
    <CoinChart />
  </div>

  return (
    <>
      <DetailLayout
        header={header}
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
      {/* <Fragment>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='profile card card-body px-3 pt-3 pb-0'>
              <div className='profile-head'>
                <div className='profile-info'>
                  <div className='profile-details'>
                    <div className='profile-photo'>
                      {productInfo?.details?.bigLogo !== null ? (
                        <Image src={productInfo?.details?.bigLogo} preview={false} />
                      ) : productInfo?.details?.smallLogo !== null ? (
                        <Image src={productInfo?.details?.smallLogo} preview={false} />
                      ) : productInfo?.details?.thumbLogo !== null ? (
                        <Image src={productInfo?.details?.thumbLogo} preview={false} />
                      ) : (
                        <span className='img-fluid rounded-circle'>
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
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      <div className='text-center'>
                        <div className='row'>
                          <div className='col'>
                            <h3 className='m-b-0'>
                              {productInfo?.details?.totalReviews}
                            </h3>
                            <span>Reviews</span>
                          </div>
                          <div className='col'>
                            <h3 className='m-b-0'>
                              {productInfo?.details?.totalIsScam}
                            </h3>
                            <span>
                              Total Scams
                            </span>
                          </div>
                          <div className='col'>
                            <h3 className='m-b-0'>
                              {productInfo?.details?.score}
                            </h3>
                            <span>
                              Score
                            </span>
                          </div>
                        </div>
                        <div className='mt-4'>
                          <Link
                            to='/post-details'
                            className='btn btn-primary mb-1 me-1'
                          >
                            Report Scam
                          </Link>
                          <Button
                            as='a'
                            href='#'
                            className='btn btn-primary mb-1 ms-1'
                            // onClick={() => dispatch({ type: 'sendMessage' })}
                          >
                            Add Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-12 mb-3'>
                {productInfo?.details?.isScam ? (
                  <ScamWarningDetail
                    isShow={true}
                    scamWarningReason={productInfo?.details?.proof?.isScam}
                    proofType='error'
                  />
                ) : (
                  <ScamWarningDetail
                    isShow={true}
                    scamWarningReason={productInfo?.details?.proof?.isWarning}
                    proofType='warning'
                  />
                )}
              </div>

              <div className='col-lg-12'>
                <div className='card quick-trade'>
                  <div className='card-header pb-0 border-0 flex-wrap'>
                    <div>
                      <h4 className='heading mb-0'>More</h4>
                    </div>
                  </div>
                  <div className='card-body pt-3'>
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
                                <>
                                  {item && (
                                    <Avatar
                                      size={25}
                                      src={item}
                                      key={index}
                                      className='crypto-info-exchange'
                                      onClick={(e) => handleClickExchange(e, item)}
                                    />
                                  )}
                                </>
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
                                className='highlight-tag'
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
                        <div className='d-flex align-items-center'>
                          <div className='basic-dropdown' style={{ marginRight: '10px' }}>
                            <Dropdown>
                              <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                                Community
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {productInfo?.details &&
                                  Object.keys(productInfo?.details?.community).map(
                                    (key) => {
                                      return (<>
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
                                      </>
                                      )
                                    }
                                  )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
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
                          <div className='basic-dropdown'>
                            <Dropdown>
                              <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                                Contract
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='cus-dropdown-menu'>
                                {multichain?.map((item, index) => (
                                  <>
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
                                  </>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-header border-0 pb-0'>
                    <h5 className='text-primary'>About Bitcoin</h5>
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
                </div>
              </div>

              <div className='col-lg-12'>
                <TopDiscussed/>
              </div>
            </div>
          </div>
          <div className='col-xl-7'>
            <div className='cus-height-chart'>
              <CoinChart />
            </div>

            <div className='product-detail'>
              <FormReport
                // use in filter review
                defaultFilter={defaultFilter}
                setDefaultFilter={setDefaultFilter}
                productInfo={productInfo}

                // use in crypto info
                productId={productId}
                // data={data}
                // setData={setData}
                // handleSubmitComment={handleSubmitComment}
                // setValidateTextArea={setValidateTextArea}
                // validateTextArea={validateTextArea}
                // handleComment={handleComment}
                // recapcharRef={recapcharRef}
                // setFileList={setFileList}
                // fileList={fileList}
                showUser={true}
                // isRecaptcha={isRecaptcha}
                // setErrorLink={setErrorLink}
                // errorLink={errorLink}
                // setIsRecaptcha={setIsRecaptcha}
                // setTypeComment={setTypeComment}
                // setErrorType={setErrorType}
                // typeComment={typeComment}
                // errorType={errorType}
                // id={productInfo?.details?.id}
              />
              {(dataFilter || productInfo)?.reviews?.map((item) => (
                <ReviewItem
                  key={item?.review?.id}
                  data={item}
                  productId={productId}
                  // userInfo={userInfo}
                />
              ))}
            </div>
          </div>
        </div>
      </Fragment> */}
    </>
  )
}
export default CryptoInfo
