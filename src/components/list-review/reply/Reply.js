import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import './reply.scss'
import moment from 'moment'
import { post, patch } from '../../../api/products'
import _ from 'lodash'
import user from '../../../assets/images/user.png'

const ReplyComment = ({ data, productId, setReactionData, userInfo }) => {
  const TYPE_REPLY = 1
  const [isReaction, setIsReaction] = useState(false)

  useEffect(() => {
    if (!_.isEmpty(data?.reactions)) {
      setIsReaction(data?.reactions?.some((item) => item?.accountId === userInfo?.id))
    }
  }, [data, userInfo])

  const handleClickReaction = async(value) => {
    if (isReaction) {
      const body = {
        commentId: data?.reply?.id,
        type: TYPE_REPLY, 
        reactionType: value
      }
      const dataUpdate = await patch('reviews/reaction', body)
      if (dataUpdate) {
        setReactionData({ type: TYPE_REPLY, data: body, method: 'patch' })
      }
    } else {
      const body = {
        commentId: data?.reply?.id,
        type: TYPE_REPLY,
        reactionType: value,
        productId: productId
      }
      const reactionReply = await post('reviews/reaction', body)
      setReactionData({ type: TYPE_REPLY, data: reactionReply?.data })
    }
    setIsReaction(!isReaction)
  }

  return (
    <div className='reply'>
      <Image src={data?.reply?.acountImage ? data?.reply?.acountImage : user} preview={false}/>
      <div className='reply-description'>
        <div className='reply-data'>
          <div className='reply-name'>
            {data?.reply?.userName}
            <span>{moment(data?.reply?.updatedDate).startOf('day').fromNow()}</span>
          </div>
          <div className='reply-content'>
            {data?.reply?.content}
          </div>
        </div>
        {data?.reply?.image && (
          <div className='reply-item-comment-image'>
            <Image src={data?.reply?.image} preview={true}/>
          </div>
        )}
        <div className='review-item-action'>
          <div className='review-item-action-list'>
            <div className='review-item-action-item'>
              Like
              <div className='review-item-action-item-emoji'>
                <div
                    className='product-footer-item-emoji-item'
                    onClick={() => handleClickReaction('💓')}
                >
                    &#128147;
                </div>
                <div
                    className='product-footer-item-emoji-item'
                    onClick={() => handleClickReaction('👍')}
                >
                    &#128077;
                </div>
                <div
                    className='product-footer-item-emoji-item'
                    onClick={() => handleClickReaction('👎')}
                >
                    &#128078;
                </div>
                <div
                    className='product-footer-item-emoji-item'
                    onClick={() => handleClickReaction('😆')}
                >
                    &#128516;
                </div>
                <div
                    className='product-footer-item-emoji-item'
                    onClick={() => handleClickReaction('😍')}
                >
                    &#128525;
                </div>
              </div>
            </div>
          </div>
          {!_.isEmpty(data?.reactions) && (
            <div className='review-item-action-reaction'>
              {data?.reactions?.map((item) => (
                <div className='review-item-action-reaction-item'>{item?.reactionType}</div>
              ))}
              <div className='review-item-action-reaction-item'>{data?.reactions?.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReplyComment
