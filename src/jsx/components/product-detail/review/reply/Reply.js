import React, { useEffect, useState, useContext } from 'react'
// import React, { useEffect, useState, useContext } from 'react'
import { Image } from 'antd'
import './reply.scss'
import moment from 'moment'
import { post, patch } from '../../../../../api/BaseRequest'
import _ from 'lodash'
import user from '../../../../../images/product/user.png'
import ListEmoji from '../emoji/ListEmoji'
import { getCookie, STORAGEKEY } from '../../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../../../App'

const ReplyComment = ({ data, productId, listAcount, dataReaction }) => {
  const TYPE_REPLY = 1
  const [isReaction, setIsReaction] = useState(false)
  const [currenReaction, setCurrenReaction] = useState()
  const [newData, setNewData] = useState(data)
  const signInContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  const [reactionType, setReactionType] = useState([])
  const [token, setToken] = useState()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    if (!_.isEmpty(dataReaction)) {
      setIsReaction(dataReaction?.some((item) => (item?.accountId === userInfo?.id)))
    }
  }, [data, userInfo])

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  useEffect(() => {
    dataReaction?.forEach((item) => {
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
    const listReactionType = []
    dataReaction?.forEach((item) => {
      listReactionType.push(item?.reactionType)
    })
    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }
    const unique = listReactionType?.filter(onlyUnique)
    setReactionType(unique)
  }, [newData])

  const handleClickReaction = async(value) => {
    if (!token) {
      signInContext?.handleSetOpenModal(true)
    } else {
      if (isReaction) {
        const body = {
          commentId: data?.id,
          type: TYPE_REPLY,
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
          commentId: data?.id,
          type: TYPE_REPLY,
          reactionType: value,
          productId: productId
        }
        const dataAddReact = await post('reviews/reaction', body)
        if (dataAddReact) {
          const newListReaction = [...newData.reactions]
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
      <Image src={newData?.acountImage ? newData?.acountImage : user} preview={false}/>
      <div className='reply-description'>
        <div className='reply-data'>
          <div className='reply-name'>
            {listAcount?.find((item) => item?.id === newData?.accountId) ? listAcount?.find((item) => item?.id === newData?.accountId)?.userName : 'Anonymous'}
          </div>
          <div className='reply-content'>
            {newData?.content}
          </div>
        </div>
        {newData?.image && (
          <div className='reply-item-comment-image'>
            <Image src={newData?.image} preview={true}/>
          </div>
        )}
        <div className='review-item-action'>
          <div className='review-item-action-list'>
            <ListEmoji
              currenReaction={currenReaction}
              handleClickReaction={handleClickReaction}
            />
            <span className='review-item-action-item-time'>
              {moment.utc(newData?.updatedDate).fromNow()}
            </span>
          </div>
          {!_.isEmpty(dataReaction) && (
            <div className='review-item-action-reaction'>
              {reactionType?.map((item, index) => (
                <div className='review-item-action-reaction-item' key={index}>
                  {item}
                </div>
              ))}
              <div className='review-item-action-reaction-item'>
                {reactionType?.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReplyComment
