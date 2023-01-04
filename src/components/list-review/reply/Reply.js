import React, { useEffect, useState, useContext } from 'react'
import { Image } from 'antd'
import './reply.scss'
import moment from 'moment'
import { post, patch } from '../../../api/products'
import _ from 'lodash'
import user from '../../../assets/images/user.png'
import ListEmoji from '../../emoji/ListEmoji'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import { SignInContext, Authenticated } from '../../layout/Main'

const ReplyComment = ({ data, productId, userInfo }) => {
  const TYPE_REPLY = 1
  const [isReaction, setIsReaction] = useState(false)
  const [currenReaction, setCurrenReaction] = useState()
  const [newData, setNewData] = useState(data)
  const signInContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  const [token, setToken] = useState()

  useEffect(() => {
    if (!_.isEmpty(data?.reactions)) {
      setIsReaction(data?.reactions?.some((item) => item?.accountId === userInfo?.id))
    }
  }, [data, userInfo])

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  useEffect(() => {
    newData?.reactions?.forEach((item) => {
      if (item?.accountId === userInfo?.id) {
        switch(item?.reactionType) {
          case '😆':
            setCurrenReaction('Haha')
            break;
          case '💓':
            setCurrenReaction('Heart')
            break;
          case '👍':
            setCurrenReaction('Like')
            break;
          case '👎':
            setCurrenReaction('Dislike')
            break;
          case '😮':
            setCurrenReaction('Wow')
            break;
          default:
            break;
        }
      }
    })
  }, [newData])

  const handleClickReaction = async(value) => {
    if (!token) {
      signInContext?.handleSetOpenModal(true)
    } else {
      if (isReaction) {
        const body = {
          commentId: data?.reply?.id,
          type: TYPE_REPLY, 
          reactionType: value,
          productId: productId
        }
        const dataUpdate = await patch('reviews/reaction', body)
        if (dataUpdate) {
          const index = newData?.reactions?.findIndex((itemReaction) => itemReaction?.accountId === userInfo?.id)
          if (index !== -1) {
            const newListReaction = [...newData?.reactions]
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
          commentId: data?.reply?.id,
          type: TYPE_REPLY,
          reactionType: value,
          productId: productId
        }
        const dataAddReact = await post('reviews/reaction', body)
        if (dataAddReact) {
          const newListReaction = [...newData?.reactions]
          const newReply = {
            ...newData,
            reactions: [
              dataAddReact?.data,
              ...newListReaction
            ]
          }
          setNewData(newReply)
          setIsReaction(!isReaction)
        }
      }
    }
  }

  return (
    <div className='reply'>
      <Image src={newData?.reply?.acountImage ? newData?.reply?.acountImage : user} preview={false}/>
      <div className='reply-description'>
        <div className='reply-data'>
          <div className='reply-name'>
            {newData?.reply?.userName}
            {/* <span>{moment(newData?.reply?.updatedDate).startOf('day').fromNow()}</span> */}
          </div>
          <div className='reply-content'>
            {newData?.reply?.content}
          </div>
        </div>
        {newData?.reply?.image && (
          <div className='reply-item-comment-image'>
            <Image src={newData?.reply?.image} preview={true}/>
          </div>
        )}
        <div className='review-item-action'>
          <div className='review-item-action-list'>
            <ListEmoji
              currenReaction={currenReaction}
              handleClickReaction={handleClickReaction}
            />
            <span className='review-item-action-item-time'>
              {moment.utc(newData?.review?.updatedDate).fromNow()}
            </span>
          </div>
          {!_.isEmpty(newData?.reactions) && (
            <div className='review-item-action-reaction'>
              {newData?.reactions?.map((item, index) => (
                <div className='review-item-action-reaction-item' key={index}>{item?.reactionType}</div>
              ))}
              <div className='review-item-action-reaction-item'>{newData?.reactions?.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReplyComment
