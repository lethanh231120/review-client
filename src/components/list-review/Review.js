import React from 'react'
import { Typography, Image, Rate, Progress, Form, Input } from 'antd'
import chart from '../../assets/images/chart.png'
import { StarOutlined, SendOutlined } from '@ant-design/icons'
import ReviewItem from './review-item/ReviewItem'
import { post } from '../../api/products'
import user from '../../assets/images/user.png'
import './review.scss'

const { Title, Text } = Typography
const Review = ({ setReloadPro, setReactionData, setReloadReaction, data, productId, handleReply, handleSend, userInfo, key, setImage }) => {
    const PERCENT = 100
    const [form] = Form.useForm()
    const reviews = [
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
        {
            account: {
                image: user,
                userName: 'Le Thanh',
            },
            review: {
                content: 'Chat luong',
                updatedDate: 1671011150
            }
        },
    ]
  
    // console.log(data)
    const onFinish = async(values) => {
      const data = {
        content: values?.review,
        productId: 1970324836975862,
        star: values?.rate
      }
      await post('reviews/review', data)
      setReloadPro(true)
      form.resetFields()
    }
  
    const onReset = () => {
      form.resetFields()
    }
  
    const handleChange = (value) => {
      console.log(`selected ${value}`)
    }

    return (
        <div className='review' key={key}>
            <div className='review-comment'>
                <div className='review-comment-content'>
                    <ReviewItem
                        data={data}
                        setReloadReaction={setReloadReaction}
                        handleReply={handleReply}
                        userInfo={userInfo}
                        productId={productId}
                        setReactionData={setReactionData}
                        setImage={setImage}
                        handleSend={handleSend}
                    />
                </div>
            </div>
        </div>
    )
}

export default Review
