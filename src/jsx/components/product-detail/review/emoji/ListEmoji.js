import React from 'react'
import './listEmoji.scss'
import like from '../../../../../images/emoji/like.png'
import heart from '../../../../../images/emoji/love.png'
import haha from '../../../../../images/emoji/haha.png'
import wow from '../../../../../images/emoji/wow.png'
import sad from '../../../../../images/emoji/sad.png'

const ListEmoji = ({ currenReaction, handleClickReaction }) => {
  return (
    <div className='review-item-action-item'>
      {currenReaction ? (<span>{currenReaction}</span>) : 'Like'}
      <div className='review-item-action-list-emoji'>
        <div onClick={() => handleClickReaction('heart')}>
          <img src={heart} alt='icon heart'/>
        </div>
        <div onClick={() => handleClickReaction('like')}>
          <img src={like} alt='icon like'/>
        </div>
        <div onClick={() => handleClickReaction('sad')}>
          <img src={sad} alt='icon sad'/>
        </div>
        <div onClick={() => handleClickReaction('haha')}>
          <img src={haha} alt='icon haha'/>
        </div>
        <div onClick={() => handleClickReaction('wow')}>
          <img src={wow} alt='icon wow'/>
        </div>
      </div>
    </div>
  )
}

export default ListEmoji
