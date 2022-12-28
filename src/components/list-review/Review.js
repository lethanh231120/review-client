import React from 'react'
import ReviewItem from './review-item/ReviewItem'
import './review.scss'

const Review = ({ setReactionData, setReloadReaction, data, productId, handleReply, handleSend, userInfo, setData, setOpenComment }) => {
    return (
        <div className='review' key={data?.review?.id}>
            <div className='review-comment'>
                <div className='review-comment-content'>
                    <ReviewItem
                        data={data}
                        setReloadReaction={setReloadReaction}
                        handleReply={handleReply}
                        userInfo={userInfo}
                        productId={productId}
                        setReactionData={setReactionData}
                        setData={setData}
                        handleSend={handleSend}
                        setOpenComment={setOpenComment}
                    />
                </div>
            </div>
        </div>
    )
}

export default Review
