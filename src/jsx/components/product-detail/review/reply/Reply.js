import React, { useEffect, useState, useContext } from 'react'
import { Image } from 'antd'
import './reply.scss'
// import moment from 'moment'
import { post, patch } from '../../../../../api/BaseRequest'
import _ from 'lodash'
import user from '../../../../../images/product/user.webp'
import ListEmoji from '../emoji/ListEmoji'
import { getCookie, STORAGEKEY } from '../../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../../../App'
import { reactionImg, reactions } from '../../../../constants/reaction'
import { timeAgoConvert } from '../../../common-widgets/home/click-function'

const ReplyComment = (props) => {
  const { data, productId, index, reviews, setReviews, indexReview } = props
  const TYPE_REPLY = 1
  const signInContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)

  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  const [token, setToken] = useState()
  const [newData, setNewData] = useState()

  useEffect(() => {
    setToken(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [authenticated?.isAuthenticated])

  useEffect(() => {
    let currenReaction
    // account's cureReaction
    data?.reactions?.forEach((item) => {
      if (item?.accountId === userInfo?.id) {
        currenReaction = reactions[`${item?.reactionType}`]
      }
    })

    let colorTextReaction
    switch (currenReaction) {
      case 'Haha':
        colorTextReaction = { color: 'rgb(247, 177, 37)' }
        break
      case 'Heart':
        colorTextReaction = { color: 'rgb(243, 62, 88)' }
        break
      case 'Like':
        colorTextReaction = { color: 'rgb(32, 120, 244)' }
        break
      case 'Sad':
        colorTextReaction = { color: 'rgb(247, 177, 37)' }
        break
      case 'Wow':
        colorTextReaction = { color: 'rgb(247, 177, 37)' }
        break
      default:
        break
    }
    // get list reaction for curren reply
    const listReactionType = []
    data?.reactions?.forEach((item) => {
      if (item?.commentId === data?.reply?.id) {
        listReactionType.push(reactionImg[`${item?.reactionType}`])
      }
    })

    // clean list reaction for curren reply
    const onlyUnique = (item, index, self) => {
      return (self.indexOf(item) === index)
    }
    const unique = listReactionType?.filter(onlyUnique)

    setNewData({
      reactionType: unique,
      isReaction: data?.reactions?.some((item) => item?.accountId === userInfo?.id),
      currenReaction: currenReaction || '',
      colorTextReaction: colorTextReaction
    })
  }, [data])

  // function add reaction for reply
  const handleClickReaction = async(value) => {
    if (!token) {
      signInContext?.handleSetOpenModal(true)
    } else {
      // check if the account has reacted to the current reply, update the reactionType for the reaction
      if (newData?.isReaction) {
        const itemReaction = data?.reactions?.find((item) => item?.accountId === userInfo?.id)
        if (itemReaction?.reactionType !== value) {
          const body = {
            commentId: data?.reply?.id,
            type: TYPE_REPLY,
            reactionType: value,
            productId: productId
          }
          const dataUpdate = await patch('reviews/reaction', body)
          if (dataUpdate) {
            // find index of item reaction by current account in list reaction of current reply
            const indexOfReaction = data?.reactions?.findIndex((itemReaction) => itemReaction?.accountId === userInfo?.id)
            if (indexOfReaction !== -1) {
              const currentReaction = {
                ...data.reactions[indexOfReaction],
                reactionType: body?.reactionType
              }

              const listReactionAfterUpdate = [...data.reactions]
              listReactionAfterUpdate[indexOfReaction] = currentReaction

              const newListReview = [...reviews]
              // newListReview[indexReview].replies[index].reactions = listReactionAfterUpdate

              newListReview[indexReview].replies[index] = {
                ...newListReview[indexReview].replies[index],
                reactions: listReactionAfterUpdate
              }
              setReviews(newListReview)
            }
          }
        }
      } else {
        // If the account hasn't reacted yet, add a new reaction
        const body = {
          commentId: data?.reply?.id,
          type: TYPE_REPLY,
          reactionType: value,
          productId: productId
        }
        const dataAddReact = await post('reviews/reaction', body)
        if (dataAddReact) {
          // clone new list reply
          // const newListReply = [...newReply]
          const newListReview = [...reviews]
          newListReview[indexReview].replies[index] = {
            ...newListReview[indexReview].replies[index],
            reactions: [
              dataAddReact?.data,
              ...newListReview[indexReview].replies[index].reactions
            ]
          }
          setReviews(newListReview)
          setNewData({
            ...newData,
            isReaction: true
          })
        }
      }
    }
  }

  return (
    <div className='reply' key={index}>
      <Image src={data?.reply?.acountImage ? data?.reply?.acountImage : user} preview={false} alt='User Avatar'/>
      <div className='reply-description'>
        <div className='reply-data'>
          <div className='reply-name'>
            {data?.reply?.userName ? data?.reply?.userName : 'Anonymous'}
          </div>
          <div className='reply-content'>
            {data?.reply?.content}
          </div>
        </div>
        {data?.reply?.image && (
          <div className='reply-item-comment-image'>
            <Image src={data?.reply?.image} preview={true} alt='Reply Image'/>
          </div>
        )}
        <div className='review-item-action'>
          <div className='review-item-action-list'>
            <ListEmoji
              currenReaction={newData?.currenReaction}
              handleClickReaction={handleClickReaction}
              colorTextReaction={newData?.colorTextReaction}
            />
            <span className='review-item-action-item-time'>
              {/* {moment.utc(data?.reply?.updatedDate).fromNow()} */}
              {timeAgoConvert(data?.reply?.createdDate)}
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
      </div>
    </div>
  )
}

export default ReplyComment
