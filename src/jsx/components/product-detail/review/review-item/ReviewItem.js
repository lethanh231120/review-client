import React, { useEffect, useState, useContext } from 'react'
import { Image, Input, Form } from 'antd'
import './reviewItem.scss'
import { CaretDownOutlined, SendOutlined, LinkOutlined, PushpinOutlined } from '@ant-design/icons'
import user from '../../../../../images/product/user.webp'
// import moment from 'moment'
import ReplyComment from '../reply/Reply'
import _ from 'lodash'
import { post, patch } from '../../../../../api/BaseRequest'
import { getCookie, STORAGEKEY } from '../../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../../../App'
import scam from '../../../../../images/product/scam.png'
import ListEmoji from '../emoji/ListEmoji'
import Description from '../../description/Description'
import { reactions, reactionImg } from '../../../../constants/reaction'
import { timeAgoConvert } from '../../../common-widgets/home/click-function'
import { formatLargeNumberMoneyUSD } from '../../../../../utils/formatNumber'
import imgshit from '../../../common-widgets/home/reviews/shit-icon.svg'
import Swal from 'sweetalert2'

const ReviewItem = (props) => {
  const { data, productId, index, reviews, setReviews, setCurrentReview, curentReview, type } = props
  const signContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)

  const [form] = Form.useForm()

  const TYPE_REVIEW = 0
  const [addReply, setAddReply] = useState(false)
  const [comment, setComment] = useState('')
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [token, setToken] = useState()
  const [newData, setNewData] = useState()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    let currenReaction
    data?.reactions?.forEach((item) => {
      if ((item?.accountId === userInfo?.id)) {
        currenReaction = reactions[`${item?.reactionType}`]
      }
    })

    const listReactionType = []
    data?.reactions?.forEach((item) => {
      if (item?.commentId === data?.review?.id) {
        listReactionType.push(reactionImg[`${item?.reactionType}`])
      }
    })

    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }

    const unique = listReactionType?.filter(onlyUnique)
    // 1: Scam, Fucking Run Away
    // 2:  Warning, Be Careful
    // 3: Okay, Not Bad
    // 4:  Good, Should Try
    // 5: Great, To The Moon
    let textStar
    switch (data?.review?.star) {
      case 1:
        textStar = 'Scam, Fucking Run Away'
        break
      case 2:
        textStar = 'Warning, Be Careful'
        break
      case 3:
        textStar = 'Okay, Not Bad'
        break
      case 4:
        textStar = 'Good, Should Try'
        break
      case 5:
        textStar = 'Great, To The Moon'
        break
      default:
        break
    }
    setNewData({
      reactionType: unique,
      isReaction: data?.reactions?.some((item) => item?.accountId === userInfo?.id),
      currenReaction: currenReaction || '',
      isCollapse: data?.replies?.length > 2,
      reviewId: data?.replies?.length > 2 ? '' : data?.review?.id,
      textStar: textStar
    })
  }, [data])

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  const handleAddReply = () => {
    if (token) {
      setAddReply(!addReply)
      if (data?.replies?.length > 2) {
        setCurrentReview({
          reviewId: data?.review?.id,
          isCollapse: !!addReply
        })
      }
    } else {
      signContext?.handleSetOpenModal(true)
    }
  }

  const functionAddReply = async(params) => {
    try {
      let newDataReply
      const dataAdd = await post('reviews/reply', params)
      if (dataAdd) {
        const dataReply = {
          ...dataAdd?.data,
          accountType: userInfo?.accountType,
          email: userInfo?.email,
          acountImage: userInfo?.image,
          role: userInfo?.role,
          userName: userInfo?.userName
        }
        if (_.isEmpty(data?.replies)) {
          newDataReply = [{
            reply: dataReply,
            reactions: []
          }]
        } else {
          newDataReply = [
            ...data.replies,
            {
              reply: dataReply,
              reactions: []
            }
          ]
        }
        form.resetFields()
        setCurrentReview({
          isCollapse: false,
          reviewId: data?.review?.id
        })
        const currentReviews = [...reviews]
        currentReviews[index] = {
          ...currentReviews[index],
          replies: newDataReply
        }
        setReviews(currentReviews)
        setValidateTextArea(false)
        setComment('')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Review does not exist, has been hidden by Gear5 Admin!'
      })

      const newReviews = [...reviews]
      const indexReviewHide = newReviews?.findIndex((itemReview) => itemReview?.review?.id === params?.reviewId)
      newReviews?.splice(indexReviewHide, 1)
      setReviews(newReviews)
    }
  }

  const handleSend = async(e) => {
    if (!token) {
      signContext?.handleSetOpenModal(true)
    } else {
      if (comment !== '') {
        const params = {
          content: comment,
          reviewId: data?.review?.id,
          productId: productId,
          image: ''
        }
        functionAddReply(params)
      } else {
        setValidateTextArea(true)
      }
    }
  }

  const handleSubmit = async(e) => {
    // setLoading(false)
    if (!token) {
      signContext?.handleSetOpenModal(true)
    } else {
      if (e.ctrlKey && e.key === 'Enter') {
        form.setFieldsValue({ 'comment': `${comment}\n` })
      } else {
        e.preventDefault()
        if (e.target.value !== '') {
          const params = {
            content: e.target.value,
            reviewId: data?.review?.id,
            productId: productId,
            image: ''
          }
          functionAddReply(params)
        } else {
          setValidateTextArea(true)
        }
      }
    }
  }

  const handleClickReaction = async(value) => {
    if (token) {
      if (newData?.isReaction) {
        const itemReaction = data?.reactions?.find((item) => item?.accountId === userInfo?.id)
        if (itemReaction?.reactionType !== value) {
          const body = {
            commentId: data?.review?.id,
            type: TYPE_REVIEW,
            reactionType: value,
            productId: productId
          }
          try {
            const dataUpdate = await patch('reviews/reaction', body)
            if (dataUpdate) {
              const newListReview = [...reviews]
              const indexOfCurrentReaction = data?.reactions?.findIndex((itemReaction) => itemReaction?.accountId === userInfo?.id)
              if (indexOfCurrentReaction !== -1) {
                // update reactionType for current reaction
                const currentReactionAfterUpdate = {
                  // newListReview[index] is current repview
                  // newListReview[index].reaction[indexOfCurrentReaction] is current raction in current review
                  ...data?.reactions[indexOfCurrentReaction],
                  reactionType: body?.reactionType
                }

                // clone list reaction in current review
                const reactionAfterUpdate = [...newListReview[index].reactions]
                // update list reaction in current review
                reactionAfterUpdate[indexOfCurrentReaction] = currentReactionAfterUpdate

                // update data of current review
                newListReview[index] = {
                  ...newListReview[index],
                  reactions: reactionAfterUpdate
                }
                setReviews(newListReview)
              }
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Review does not exist, has been hidden by Gear5 Admin!'
            })

            const newReviews = [...reviews]
            const indexReviewHide = newReviews?.findIndex((itemReview) => itemReview?.review?.id === 'f15ee224-35be-4a79-a4ab-f77abe971310')
            newReviews?.splice(indexReviewHide, 1)
            setReviews(newReviews)
          }
        }
      } else {
        const body = {
          commentId: data?.review?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
        try {
          const dataAddReact = await post('reviews/reaction', body)
          if (dataAddReact) {
          // clone new list reply
            const newListReview = [...reviews]
            // update data of current reply
            newListReview[index] = {
              ...newListReview[index],
              reactions: _.isEmpty(newListReview[index]?.reactions) ? [dataAddReact?.data] : [...newListReview[index].reactions, dataAddReact?.data]
            }
            setReviews(newListReview)
            setNewData({
              ...newData,
              isReaction: true
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Review does not exist, has been hidden by Gear5 Admin!'
          })

          const newReviews = [...reviews]
          const indexReviewHide = newReviews?.findIndex((itemReview) => itemReview?.review?.id === 'f15ee224-35be-4a79-a4ab-f77abe971310')
          newReviews?.splice(indexReviewHide, 1)
          setReviews(newReviews)
        }
      }
    } else {
      signContext?.handleSetOpenModal(true)
    }
  }

  const handleChangeComment = _.debounce(async(e) => {
    if (e.target.value === '') {
      setValidateTextArea(true)
      setComment('')
    } else {
      setComment(e.target.value)
      setValidateTextArea(false)
    }
  }, 200)

  const handleHideReview = async(reviewId) => {
    const hideReview = await patch(`reviews/review/hide?reviewId=${reviewId}`)
    if (hideReview?.status === true) {
      const newReviews = [...reviews]
      const indexReviewHide = newReviews?.findIndex((itemReview) => itemReview?.review?.id === reviewId)
      newReviews?.splice(indexReviewHide, 1)
      setReviews(newReviews)
    }
  }

  return (
    <div className='review-item'>
      {type === 'founder' ? (
        <Image src={data?.acountImage} preview={false} alt='User Avatar'/>
      ) : (
        <Image src={data?.review?.acountImage ? data?.review?.acountImage : user} preview={false} alt='User Avatar'/>
      )}
      <div className='review-item-description'>
        <div className='review-item-data'>
          <div className='review-item-name'>
            {type === 'founder' ? (
              <span className='button-founder' style={{ display: 'flex', alignItems: 'center' }}>
                {data?.accountName}
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <PushpinOutlined style={{ marginLeft: '0.3rem' }}/>
                </span>
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>
                  {data?.review?.userName ? data?.review?.userName : 'Anonymous'}
                  <span>
                    {data?.review?.isScam && (<Image alt='Scam' src={scam} preview={false}/>)}
                  </span>
                </span>
                {userInfo?.role === 1 && (
                  <span
                    className='button-hide'
                    onClick={() => handleHideReview(data?.review?.id)}
                  >Hide</span>
                )}
              </span>
            )}
          </div>
          <div className='review-item-content'>
            {type === 'normal' && (
              <>
                {newData?.textStar && (
                  <div>
                    <strong style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                      <span>{newData?.textStar}</span>
                      {data?.review?.isScam && (
                        <>
                          <img src={imgshit} alt='scam' style={{ width: '1.5rem', marginLeft: '0.3rem' }}/>
                          <img src={imgshit} alt='scam' style={{ width: '1.5rem' }}/>
                          <img src={imgshit} alt='scam' style={{ width: '1.5rem' }}/>
                        </>
                      )}
                    </strong>
                  </div>
                )}
                {data?.review?.scamAmountUSD && (
                  <div>
                    <strong>
                      {`${data?.review?.userName ? data?.review?.userName : 'I'} `}
                        got scammed
                      {` ${formatLargeNumberMoneyUSD(data?.review?.scamAmountUSD?.split('.')[0] !== '-' ? data?.review?.scamAmountUSD?.split('.')[0] : data?.review?.scamAmountUSD?.split('.')[1])}`}
                    </strong>
                  </div>
                )}
              </>
            )}
            {type === 'founder' ? (
              <>
                {data?.content}
              </>
            ) : (
              <Description text={type === 'founder' ? data?.content : data?.review?.content}/>
            )}
            {type === 'normal' && (
              <>
                {!_.isEmpty(data?.review?.sources) && data?.review?.sources !== null && (
                  <div className='review-item-content-source'>
                    {data?.review?.sources?.map((item, index) => (
                      <span key={index}>
                        {item !== '' && (
                          <a href={item} target='_blank' rel='noreferrer'>
                            <LinkOutlined/>
                            {item?.split('/')[2]}
                          </a>
                        )}
                      </span>
                    ))}
                  </div>
                )}</>
            )}
          </div>
        </div>
        {type === 'normal' && (
          <>
            {!_.isEmpty(data?.review?.images) && (
              <div className='review-item-list-image'>
                {data?.review?.images?.map((itemImage, index) => (
                  <div className='review-item-list-image-item' key={index}>
                    <Image src={itemImage} preview={true} alt='Review Image'/>
                  </div>
                ))}
              </div>
            )}
            <div className='review-item-action'>
              <div className='review-item-action-list'>
                <ListEmoji
                  currenReaction={newData?.currenReaction}
                  handleClickReaction={handleClickReaction}
                />
                <div className='review-item-action-item' onClick={() => handleAddReply()}>Reply</div>
                <span className='review-item-action-item-time'>
                  {timeAgoConvert(data?.review?.createdDate)}
                </span>
              </div>
              {!_.isEmpty(newData?.reactionType) && (
                <div className='review-item-action-reaction'>
                  {newData?.reactionType?.map((item, index) => (
                    <div className='review-item-action-reaction-item' key={index}>
                      <img src={item} alt={`reaction ${index} icon`}/>
                    </div>
                  ))}
                  <div className='review-item-action-reaction-item'>
                    {data?.reactions?.length}
                  </div>
                </div>
              )}
            </div>
            {data?.replies?.length > 2 && (
              <div
                className='review-item-replies'
                onClick={() => {
                  setCurrentReview({
                    isCollapse: !curentReview?.isCollapse,
                    reviewId: data?.review?.id
                  })
                }}
              >
                <CaretDownOutlined/>
                {data?.replies?.length} reply
              </div>
            )}
            <Form form={form}>
              {addReply && token && (
                <div className='add-reply'>
                  <div className='add-reply-form-avatar'>
                    <Image src={userInfo?.image ? userInfo?.image : user} preview={false} style={{ width: '2.1875rem' }} alt='User Avatar'/>
                  </div>
                  <Form.Item
                    name={`comment`}
                  >
                    {/* <Input
                        name={`reply ${newData?.data?.id}`}
                        className={`${validateTextArea ? 'product-detail-form-content-textarea' : ''}`}
                        autoFocus
                        suffix={<>
                          <SendOutlined
                            style={{ cursor: 'pointer' }}
                            onClick={handleSend}
                          />
                        </>}
                        placeholder={`${validateTextArea ? 'Please enter reply' : 'Enter reply...'}`}
                        onChange={handleChangeComment}
                        onPressEnter={handleSubmit}
                      /> */}
                    <Input.TextArea
                      className={`${validateTextArea ? 'product-detail-form-content-textarea' : ''}`}
                      autoFocus
                      // value={comment}
                      suffix={<>
                        <SendOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={handleSend}
                        />
                      </>}
                      placeholder={`${validateTextArea ? 'Please enter reply' : 'Enter reply...'}`}
                      onChange={handleChangeComment}
                      onPressEnter={handleSubmit}
                      autoSize={{ minRows: 2 }}
                    />
                  </Form.Item>
                </div>
              )}
            </Form>
            <div
              className={`${
                data?.replies?.length > 2 ? (
                  curentReview?.reviewId !== undefined
                    ? (!curentReview?.isCollapse && curentReview?.reviewId === data?.review?.id) ? 'comment-reply' : 'isCollapse'
                    : (!newData?.isCollapse && newData?.reviewId === data?.review?.id) ? 'comment-reply' : 'isCollapse') : 'comment-reply'}`}
            >
              {data?.replies !== null && data?.replies?.map((item, i) => (<>
                <ReplyComment
                  indexReview={index}
                  index={i}
                  key={i}
                  data={item}
                  productId={productId}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewItem
