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

const ReviewItem = ({ data, productId }) => {
  const TYPE_REVIEW = 0
  const [isCollapse, setIsCollapse] = useState({
    isCollapse: true,
    reviewId: ''
  })
  const [form] = Form.useForm()
  const [addReply, setAddReply] = useState(false)
  const [isReaction, setIsReaction] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const signContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  // // const [isShowSource, setIsShowSource] = useState(false)
  const [currenReaction, setCurrenReaction] = useState()
  const [newData, setNewData] = useState(data)
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [token, setToken] = useState()
  const [reactionType, setReactionType] = useState([])
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    setIsCollapse({
      isCollapse: data?.replies?.length > 2,
      reviewId: data?.replies?.length > 2 ? '' : data?.review?.id
    })
  }, [data])

  useEffect(() => {
    newData?.reactions?.forEach((item) => {
      if (item?.accountId === userInfo?.id) {
        switch (item?.reactionType) {
          case '😆':
            setCurrenReaction('Haha')
            break
          case '💓':
            setCurrenReaction('Heart')
            break
          case '👍':
            setCurrenReaction('Like')
            break
          case '👎':
            setCurrenReaction('Dislike')
            break
          case '😮':
            setCurrenReaction('Wow')
            break
          default:
            break
        }
      }
    })
    if (!_.isEmpty(newData?.reactions)) {
      setIsReaction(newData?.reactions?.some((item) => (item?.accountId === userInfo?.id)))
    }
    setLoading(false)

    const listReactionType = []
    newData?.reactions?.forEach((item) => {
      listReactionType.push(item?.reactionType)
    })
    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }
    const unique = listReactionType?.filter(onlyUnique)
    setReactionType(unique)
  }, [newData])

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  const handleAddReply = () => {
    if (token) {
      setAddReply(!addReply)
      setIsCollapse({
        isCollapse: false,
        reviewId: ''
      })
    } else {
      signContext?.handleSetOpenModal(true)
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
        const dataAdd = await post('reviews/reply', params)
        if (dataAdd) {
          setNewData()
          const newReply = [
            {
              reply: {
                ...dataAdd?.data,
                accountType: userInfo?.accountType,
                email: userInfo?.email,
                acountImage: userInfo?.image,
                role: userInfo?.role,
                userName: userInfo?.userName
              },
              reactions: []
            },
            ...newData.replies
          ]
          setNewData({
            ...data,
            replies: newReply
          })
          form.resetFields()
          setIsCollapse({
            ...isCollapse,
            reviewId: data?.review?.id
          })
          setValidateTextArea(false)
          setComment('')
        }
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
      setNewData()
      if (e.target.value !== '') {
        const params = {
          content: e.target.value,
          reviewId: data?.review?.id,
          productId: productId,
          image: ''
        }
        const dataCopy = [{}, ...newData.replies]
        const dataAdd = await post('reviews/reply', params)
        if (dataAdd) {
          const newReply = {
            reply: {
              ...dataAdd?.data,
              accountType: userInfo?.accountType,
              email: userInfo?.email,
              acountImage: userInfo?.image,
              role: userInfo?.role,
              userName: userInfo?.userName
            },
            reactions: []
          }
          dataCopy[0] = newReply
          setNewData({
            ...newData,
            replies: dataCopy
          })
          // setLoading(true)
          form.resetFields()
          setIsCollapse({
            ...isCollapse,
            reviewId: ''
          })
          setValidateTextArea(false)
          setComment('')
        }
      } else {
        setValidateTextArea(true)
      }
    }
  }

  const handleClickReaction = async(value) => {
    if (token) {
      if (isReaction) {
        const body = {
          commentId: data?.review?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
        const dataUpdate = await patch('reviews/reaction', body)
        if (dataUpdate) {
          const index = newData?.reactions?.findIndex((itemReaction) => itemReaction?.accountId === userInfo?.id)
          if (index !== -1) {
            const newListReaction = [...newData.reactions]
            newListReaction[index] = {
              ...newListReaction[index],
              reactionType: body?.reactionType
            }
            setNewData({
              ...newData,
              reactions: newListReaction
            })
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
          const newListReaction = [...newData.reactions]
          const newReview = {
            ...newData,
            reactions: [
              dataAddReact?.data,
              ...newListReaction
            ]
          }
          setNewData(newReview)
          setIsReaction(!isReaction)
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
      {!Loading && (
        <div className='review-item'>
          <Image src={newData?.review?.acountImage ? newData?.review?.acountImage : user} preview={false}/>
          <div className='review-item-description'>
            <div className='review-item-data'>
              <div className='review-item-name'>
                {newData?.review?.userName ? newData?.review?.userName : 'Anonymous'}
                <span>
                  {newData?.review?.isScam && (<Image src={scam} preview={false}/>)}
                </span>
              </div>
              <div className='review-item-content'>
                {newData?.review?.content}
                {!_.isEmpty(newData?.review?.sources[0]) && (
                  <div className='review-item-content-source'>
                    {newData?.review?.sources?.map((item, index) => (
                      <span key={index}>
                        {item !== '' && (
                          <a href={item} target='_blank' rel='noreferrer'>
                            <LinkOutlined style={{ marginRight: '0rem' }}/>
                            {item?.split('/')[2]}
                          </a>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {newData?.review?.image && (
              <div className='review-item-comment-image'>
                <Image src={newData?.review?.image} preview={true}/>
              </div>
            )}
            <div className='review-item-action'>
              <div className='review-item-action-list'>
                <ListEmoji
                  currenReaction={currenReaction}
                  handleClickReaction={handleClickReaction}
                />
                <div className='review-item-action-item' onClick={() => handleAddReply()}>Reply</div>
                <span className='review-item-action-item-time'>
                  {moment.utc(newData?.review?.updatedDate).fromNow()}
                </span>
              </div>
              {!_.isEmpty(reactionType) && (
                <div className='review-item-action-reaction'>
                  {reactionType?.map((item, index) => (
                    <div className='review-item-action-reaction-item' key={index}>
                      {item}
                    </div>
                  ))}
                  <div className='review-item-action-reaction-item'>{newData?.reactions?.length}</div>
                </div>
              )}
            </div>
            {newData?.replies?.length > 2 && (
              <div
                className='review-item-replies'
                onClick={() => {
                  setIsCollapse({
                    isCollapse: !isCollapse?.isCollapse,
                    reviewId: ''
                  })
                }}
              >
                <CaretDownOutlined/>
                {newData?.replies?.length} reply
              </div>
            )}
            <Form form={form}>
              {addReply && token && (
                <div className='add-reply'>
                  <div className='add-reply-form-avatar'>
                    <Image src={userInfo?.image ? userInfo?.image : user} preview={false} style={{ width: '2.1875rem' }}/>
                  </div>
                  <Form.Item
                    name={`reply ${newData?.review?.id}`}
                  >
                    <Input
                      name={`reply ${newData?.review?.id}`}
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
              className={`${(isCollapse?.isCollapse && isCollapse?.reviewId === '') ? 'isCollapse' : 'comment-reply'}`}
            >
              {newData?.replies?.map((item, index) => (
                <ReplyComment
                  key={index}
                  data={item}
                  productId={productId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewItem
