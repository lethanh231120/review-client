import React from 'react'
import './listEmoji.scss'

const ListEmoji = ({ currenReaction, handleClickReaction }) => {
  return (
    <div className='review-item-action-item'>
      {currenReaction ? (<span>{currenReaction}</span>) : 'Like'}
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
          onClick={() => handleClickReaction('😮')}
        >
                &#128558;
        </div>
      </div>
    </div>
  )
}

export default ListEmoji
