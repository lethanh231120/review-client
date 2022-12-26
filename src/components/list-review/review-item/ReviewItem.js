import React, { useEffect, useState } from 'react'
import { Image, Input, Form, Upload } from 'antd'
import './reviewItem.scss'
import { CaretDownOutlined, SendOutlined, FileImageOutlined, LinkOutlined } from '@ant-design/icons'
import user from '../../../assets/images/user.png'
import moment from 'moment'
import ReplyComment from '../reply/Reply'
import _ from 'lodash'
import { post, patch } from '../../../api/products'

const ReviewItem = ({ data, setReloadReaction, handleReply, userInfo, productId, setReactionData, setData, handleSend }) => {
  const TYPE_REPLY = 'reply'
  const TYPE_REVIEW = 0
  const [isCollapse, setIsCollapse] = useState(true)
  const [addReply, setAddReply] = useState(false)
  const [isReaction, setIsReaction] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [imageReply, setImageReply] = useState()
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!_.isEmpty(data?.reactions)) {
      setIsReaction(data?.reactions?.some((item) => (item?.accountId === userInfo?.id)))
    }
    setLoading(false)
  }, [data, userInfo])

  const handleClickReaction = async(value) => {
    if (isReaction) {
      const body = {
        commentId: data?.review?.id,
        type: TYPE_REVIEW,
        reactionType: value
      }
      const dataUpdate = await patch('reviews/reaction', body)
      if (dataUpdate) {
        setReactionData({ type: TYPE_REVIEW, data: body, method: 'patch' })
      }
    } else {
      const body = {
        commentId: data?.review?.id,
        type: TYPE_REVIEW,
        reactionType: value,
        productId: productId
      }
      const dataAddReact = await post('reviews/reaction', body)
      setReactionData({ type: TYPE_REVIEW, data: dataAddReact?.data})
    }
    setIsReaction(!isReaction)
  }

  useEffect(() => {
    setIsCollapse(data?.replies?.length > 2)
  }, [data])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChangeFile = (e) => {
    const formData = new FormData()
    formData.append('file', e?.fileList[0]?.originFileObj)
    const time = moment().unix()
    getBase64(e.file.originFileObj, async(url) => {
        const fileName= `${userInfo.id}_${time}`
        const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
        setData({
          isScam: false,
          content: '',
          sources: [],
          image: dataImage?.data,
          star: 5
        })
        setImageReply(dataImage?.data)
    });
  }

  return (
    <>
      {!Loading && (
        <div className='review-item'>
          <Image src={data?.review?.acountImage ? data?.review?.acountImage : user} preview={false}/>
          <div className='review-item-description'>
            <div className='review-item-data'>
              <div className='review-item-name'>
                {data?.review?.userName}
                <span>{moment(data?.review?.updatedDate).startOf('day').fromNow()}</span>
              </div>
              <div className='review-item-content'>
                {data?.review?.content}
                {!_.isEmpty(data?.review?.sources) && (
                  <div className='review-item-content-source'>
                    {data?.review?.sources?.map((item, index) => (
                      <>
                        {item !== '' && (
                          <a href={item} target='_blank' rel="noreferrer">
                            <LinkOutlined style={{ marginRight: '0.5rem' }}/> Proof {index + 1}
                          </a>
                        )}
                      </>
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
                <div className='review-item-action-item' onClick={() => setAddReply(!addReply)}>Reply</div>
              </div>
              {!_.isEmpty(data?.reactions) && (
                <div className='review-item-action-reaction'>
                  {data?.reactions?.map((item, index) => (
                    <div className='review-item-action-reaction-item' key={index}>{item?.reactionType}</div>
                  ))}
                  <div className='review-item-action-reaction-item'>{data?.reactions?.length}</div>
                </div>
              )}
            </div>

            {data?.replies?.length > 2 && (
              <div
                className='review-item-replies'
                onClick={() => setIsCollapse(!isCollapse)}
              >
                <CaretDownOutlined/>
                {data?.replies?.length} reply
              </div>
            )}

            {addReply && (
                <div className='add-reply'>
                  <div className='add-reply-form-avatar'>
                    <Image src={user} preview={false} style={{ width: '3rem' }}/>
                  </div>
                  <Form.Item
                    name={`reply ${data?.review?.id}`}
                  >
                    <Input
                      name={`reply ${data?.review?.id}`}
                      autoFocus
                      suffix={<>
                        <Upload
                            onChange={handleChangeFile}
                        >
                          <FileImageOutlined style={{ marginRight: '1rem', cursor: 'pointer' }}/>
                        </Upload>
                        <SendOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            handleSend(TYPE_REPLY, data?.review?.id, comment)
                            setAddReply(false)
                            setImageReply()
                          }}
                        />
                      </>}
                      placeholder='Enter reply...'
                      onChange={(e) => setComment(e.target.value)}
                      onPressEnter={(e) => {
                        handleReply(e, TYPE_REPLY, data?.review?.id)
                        setAddReply(false)
                        setImageReply()
                      }}
                    />
                    {imageReply && (
                      <div className='review-item-form-image'>
                          <Image src={imageReply} preview={false}/>
                      </div>
                    )}
                  </Form.Item>
                </div>
            )}
            <div
              className={`${isCollapse ? 'isCollapse' : 'comment-reply'}`}
            >
              {data?.replies?.map((item, index) => (
                <ReplyComment
                  key={index}
                  data={item}
                  productId={productId}
                  setReloadReaction={setReloadReaction}
                  userInfo={userInfo}
                  setReactionData={setReactionData}
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
