import React, { useEffect, useState, useContext } from 'react'
import { Image, Input, Form } from 'antd'
import './reviewItem.scss'
import { CaretDownOutlined, SendOutlined, LinkOutlined } from '@ant-design/icons'
import user from '../../../../../images/product/user.png'
import moment from 'moment'
import ReplyComment from '../reply/Reply'
import _ from 'lodash'
import { post, patch } from '../../../../../api/BaseRequest'
import { getCookie, STORAGEKEY } from '../../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../../../App'
import scam from '../../../../../images/product/scam.png'
import ListEmoji from '../emoji/ListEmoji'
import Description from '../../description/Description'
import { reactions } from '../../../../constants/reaction'

const ReviewItem = (props) => {
  const { data, productId, index, reviews, setReviews } = props
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
        listReactionType.push(item?.reactionType)
      }
    })

    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }

    const unique = listReactionType?.filter(onlyUnique)
    setNewData({
      reactionType: unique,
      isReaction: data?.reactions?.some((item) => item?.accountId === userInfo?.id),
      currenReaction: currenReaction || '',
      isCollapse: data?.replies?.length > 2,
      reviewId: data?.replies?.length > 2 ? '' : data?.review?.id
    })
  }, [data])

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  const handleAddReply = () => {
    if (token) {
      setAddReply(!addReply)
      setNewData({
        ...newData,
        isCollapse: false,
        reviewId: ''
      })
    } else {
      signContext?.handleSetOpenModal(true)
    }
  }

  const functionAddReply = async(params) => {
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
          {
            reply: dataReply,
            reactions: []
          },
          ...data.replies
        ]
      }
      form.resetFields()
      setNewData({
        ...newData,
        reviewId: data?.data?.id
      })
      const currentReview = [...reviews]
      currentReview[index] = {
        ...currentReview[index],
        replies: newDataReply
      }
      setReviews(currentReview)
      setValidateTextArea(false)
      setComment('')
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

  const handleClickReaction = async(value) => {
    if (token) {
      if (newData?.isReaction) {
        const body = {
          commentId: data?.review?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
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
            const reactionAfterUpdate = [newListReview[index].reactions]
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
      } else {
        const body = {
          commentId: data?.review?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
        const dataAddReact = await post('reviews/reaction', body)
        if (dataAddReact) {
          // clone new list reply
          const newListReview = [...reviews]
          // update data of current reply
          newListReview[index] = {
            ...newListReview[index],
            reactions: [dataAddReact?.data]
          }
          setReviews(newListReview)
          setNewData({
            ...newData,
            isReaction: true
          })
        }
      }
    } else {
      signContext?.handleSetOpenModal(true)
    }
  }

  const handleChangeComment = _.debounce(async(e) => {
    if (e.target.value === '') {
      setValidateTextArea(true)
    } else {
      setComment(e.target.value)
      setValidateTextArea(false)
    }
  }, 1000)

  return (
    <>
      <div className='review-item'>
        <Image src={data?.review?.acountImage ? data?.review?.acountImage : user} preview={false}/>
        <div className='review-item-description'>
          <div className='review-item-data'>
            <div className='review-item-name'>
              {data?.review?.userName ? data?.review?.userName : 'Anonymous'}
              <span>
                {data?.review?.isScam && (<Image src={scam} preview={false}/>)}
              </span>
            </div>
            <div className='review-item-content'>
              <div>
                <strong>{data?.review?.title}</strong>
              </div>
              <Description text={data?.review?.content}/>
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
              )}
            </div>
          </div>
          {data?.review?.image && (
            <div className='review-item-comment-image'>
              <Image src={data?.review?.image} preview={true}/>
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
                {moment.utc(data?.review?.updatedDate).fromNow()}
              </span>
            </div>
            {!_.isEmpty(newData?.reactionType) && (
              <div className='review-item-action-reaction'>
                {newData?.reactionType?.map((item, index) => (
                  <div className='review-item-action-reaction-item' key={index}>
                    {item}
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
                setNewData({
                  ...newData,
                  isCollapse: !newData?.isCollapse,
                  reviewId: ''
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
                  <Image src={userInfo?.image ? userInfo?.image : user} preview={false} style={{ width: '2.1875rem' }}/>
                </div>
                <Form.Item
                  name={`reply ${newData?.data?.id}`}
                >
                  <Input
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
                  />
                </Form.Item>
              </div>
            )}
          </Form>
          <div
            className={`${(newData?.isCollapse && newData?.reviewId === '') ? 'isCollapse' : 'comment-reply'}`}
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
        </div>
      </div>
    </>
  )
}

export default ReviewItem
