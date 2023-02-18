import React, { useEffect, useState, useContext } from 'react'
import { Image } from 'antd'
import './reply.scss'
import moment from 'moment'
import { post, patch } from '../../../../../api/BaseRequest'
import _ from 'lodash'
import user from '../../../../../images/product/user.png'
import ListEmoji from '../emoji/ListEmoji'
import { getCookie, STORAGEKEY } from '../../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../../../App'

const ReplyComment = ({ data, productId, listAccount, dataReaction }) => {
  const TYPE_REPLY = 1
  const [isReaction, setIsReaction] = useState(false)
  const [currenReaction, setCurrenReaction] = useState()
  const signInContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  const [reactionType, setReactionType] = useState([])
  const [listReaction, setListReaction] = useState(dataReaction[`${TYPE_REPLY}`]?.filter((itemReact) => (itemReact?.commentId === data?.id)))
  const [token, setToken] = useState()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  useEffect(() => {
    listReaction?.forEach((item) => {
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
    if (!_.isEmpty(listReaction)) {
      setIsReaction(listReaction?.some((item) => (item?.accountId === userInfo?.id)))
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
  }, [listReaction, data])

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
          type: TYPE_REPLY,
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
    }
  }

  return (
    <div className='reply'>
      <Image src={data?.acountImage ? data?.acountImage : user} preview={false}/>
      <div className='reply-description'>
        <div className='reply-data'>
          <div className='reply-name'>
            {listAccount?.find((item) => item?.id === data?.accountId) ? listAccount?.find((item) => item?.id === data?.accountId)?.userName : 'Anonymous'}
          </div>
          <div className='reply-content'>
            {data?.content}
          </div>
        </div>
        {data?.image && (
          <div className='reply-item-comment-image'>
            <Image src={data?.image} preview={true}/>
          </div>
        )}
        <div className='review-item-action'>
          <div className='review-item-action-list'>
            <ListEmoji
              currenReaction={currenReaction}
              handleClickReaction={handleClickReaction}
            />
            <span className='review-item-action-item-time'>
              {moment.utc(data?.updatedDate).fromNow()}
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
      </div>
    </div>
  )
}

export default ReplyComment
