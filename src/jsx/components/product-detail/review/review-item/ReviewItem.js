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

const ReviewItem = ({ data, productId, dataReply, listAccount, dataReaction }) => {
  const TYPE_REVIEW = 0
  const [isCollapse, setIsCollapse] = useState({
    isCollapse: true,
    reviewId: ''
  })
  const [form] = Form.useForm()
  const [addReply, setAddReply] = useState(false)
  const [isReaction, setIsReaction] = useState(false)
  // const [Loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const signContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  // // const [isShowSource, setIsShowSource] = useState(false)
  const [currenReaction, setCurrenReaction] = useState()
  const [newData, setNewData] = useState()
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [token, setToken] = useState()
  const [reactionType, setReactionType] = useState([])
  const [listReaction, setListReaction] = useState(dataReaction[`${TYPE_REVIEW}`]?.filter((itemReaction) => itemReaction?.commentId === data?.id))
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    setNewData({
      dataComment: data,
      dataReply: dataReply || null
    })
    setIsCollapse({
      isCollapse: dataReply?.length > 2,
      reviewId: dataReply?.length > 2 ? '' : data?.id
    })
  }, [data, dataReply])

  // useEffect(() => {
  //   setIsCollapse({
  //     isCollapse: dataReply?.length > 2,
  //     reviewId: dataReply?.length > 2 ? '' : data?.id
  //   })
  // }, [data, dataReply])

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

  const functionAddReply = async(params) => {
    const dataAdd = await post('reviews/reply', params)
    if (dataAdd) {
      const newReply = {
        ...dataAdd?.data,
        accountType: userInfo?.accountType,
        email: userInfo?.email,
        acountImage: userInfo?.image,
        role: userInfo?.role,
        userName: userInfo?.userName
      }
      if (newData?.dataReply === null) {
        setNewData({
          ...newData,
          dataReply: [newReply]
        })
      } else {
        setNewData({
          ...newData,
          dataReply: [
            newReply,
            ...newData.dataReply
          ]
        })
      }

      form.resetFields()
      setIsCollapse({
        ...isCollapse,
        reviewId: data?.id
      })
      setValidateTextArea(false)
      setComment('')
    }
  }

  const handleSend = async(e) => {
    if (!token) {
      signContext?.handleSetOpenModal(true)
    } else {
      if (comment !== '') {
        // setNewData()
        const params = {
          content: comment,
          reviewId: data?.id,
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
        // setNewData()
        const params = {
          content: e.target.value,
          reviewId: data?.id,
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
      if (isReaction) {
        const body = {
          commentId: data?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
        const dataUpdate = await patch('reviews/reaction', body)
        if (dataUpdate) {
          const index = listReaction?.findIndex((itemReaction) => itemReaction?.accountId === userInfo?.id)
          if (index !== -1) {
            const newListReaction = [...listReaction]
            newListReaction[index] = {
              ...newListReaction[index],
              reactionType: body?.reactionType
            }
            setListReaction(newListReaction)
          }
        }
      } else {
        const body = {
          commentId: data?.id,
          type: TYPE_REVIEW,
          reactionType: value,
          productId: productId
        }
        const dataAddReact = await post('reviews/reaction', body)
        if (dataAddReact) {
          if (!_.isEmpty(listReaction)) {
            setListReaction([
              dataAddReact?.data,
              ...listReaction
            ])
          } else {
            setListReaction([dataAddReact?.data])
          }
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

  useEffect(() => {
    listReaction?.forEach((item) => {
      if ((item?.accountId === userInfo?.id) && (item?.commentId === data?.id)) {
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

    if (!_.isEmpty(listReaction)) {
      setIsReaction(listReaction?.some((item) => item?.accountId === userInfo?.id))
    }

    const listReactionType = []
    listReaction?.forEach((item) => {
      if (item?.commentId === data?.id) {
        listReactionType.push(item?.reactionType)
      }
    })

    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }

    const unique = listReactionType?.filter(onlyUnique)
    setReactionType(unique)
  }, [listReaction])

  return (
    <>
      <div className='review-item'>
        <Image src={newData?.dataComment?.acountImage ? newData?.dataComment?.acountImage : user} preview={false}/>
        <div className='review-item-description'>
          <div className='review-item-data'>
            <div className='review-item-name'>
              {listAccount?.find((item) => item?.id === newData?.dataComment?.accountId) ? listAccount?.find((item) => item?.id === newData?.dataComment?.accountId)?.userName : 'Anonymous'}
              <span>
                {newData?.dataComment?.isScam && (<Image src={scam} preview={false}/>)}
              </span>
            </div>
            <div className='review-item-content'>
              <div>
                <strong>{newData?.title}</strong>
              </div>
              <Description text={newData?.dataComment?.content}/>
              {!_.isEmpty(newData?.dataComment?.sources) && newData?.dataComment?.sources !== null && (
                <div className='review-item-content-source'>
                  {newData?.dataComment?.sources?.map((item, index) => (
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
          {newData?.dataComment?.image && (
            <div className='review-item-comment-image'>
              <Image src={newData?.dataComment?.image} preview={true}/>
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
                {moment.utc(newData?.dataComment?.updatedDate).fromNow()}
              </span>
            </div>
            {!_.isEmpty(reactionType) && (
              <div className='review-item-action-reaction'>
                {reactionType?.map((item, index) => (
                  <div className='review-item-action-reaction-item' key={index}>
                    {item}
                  </div>
                ))}
                <div className='review-item-action-reaction-item'>
                  {listReaction?.length}
                </div>
              </div>
            )}
          </div>
          {newData?.dataReply?.length > 2 && (
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
              {newData?.dataReply?.length} reply
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
            {newData?.dataReply !== null && newData?.dataReply?.map((item, index) => (<>
              <ReplyComment
                key={index}
                data={item}
                productId={productId}
                listAccount={listAccount}
                dataReaction={dataReaction}
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
