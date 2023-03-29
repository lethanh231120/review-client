import React, { useEffect } from 'react'
import { useState } from 'react'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton } from 'react-share'
// import { getReferralStatistics } from '../../Forms/form-user-referal/FormUserReferal'
import { notifyTopRightSuccess } from '../../product-detail/ProductDetail'

const ShareButton = ({ name, setOpenModalShare }) => {
  const [link, setLink] = useState()

  const getShareLink = async() =>{
    // let code = ''
    // try {
    //   [code] = await getReferralStatistics()
    // } catch (e) {
    //   console.error(e)
    // }
    const shareLink = window.location.href
    // if (code) {
    //   shareLink += `?ref=${code}`
    // }
    setLink(shareLink)
  }
  useEffect(() => {
    getShareLink()
  }, [])

  const coppyLink = async(e, value) => {
    const text = new Blob([`${value}`], { type: 'text/plain' })
    const item = new ClipboardItem({
      'text/plain': text
    })
    await navigator.clipboard.write([item])
    notifyTopRightSuccess('Copy link successfully!')
    await setOpenModalShare(false)
  }

  return <>
    <div className='share'>
      <div className='share-list'>
        <div className='share-list-item'>
          <FacebookShareButton url={link} quote={name}>
            <FacebookIcon size={45} round />
            <div className='share-button-text'>Facebook</div>
          </FacebookShareButton>
        </div>
        <div className='share-list-item'>
          <TwitterShareButton url={link} quote={name}>
            <TwitterIcon size={45} round={true}/>
            <div className='share-button-text'>Twitter</div>
          </TwitterShareButton>
        </div>
        <div className='share-list-item'>
          <TelegramShareButton url={link} quote={name}>
            <TelegramIcon size={45} round={true}/>
            <div className='share-button-text'>Telegram</div>
          </TelegramShareButton>
        </div>
        <div className='share-list-item'>
          <LinkedinShareButton url={link} quote={name}>
            <LinkedinIcon size={45} round={true}/>
            <div className='share-button-text'>Linkedin</div>
          </LinkedinShareButton>
        </div>
        <div className='share-list-item'>
          <PinterestShareButton url={link} media={link} quote={name}>
            <PinterestIcon size={45} round={true}/>
            <div className='share-button-text'>Pinterest</div>
          </PinterestShareButton>
        </div>
        <div className='share-list-item'>
          <RedditShareButton url={link} quote={name}>
            <RedditIcon size={45} round={true}/>
            <div className='share-button-text'>Reddit</div>
          </RedditShareButton>
        </div>
      </div>
      <div className='share-input'>
        <div className='share-input-text'>
          {link}
        </div>
        <div
          className='share-input-button'
          onClick={(e) => coppyLink(e, link)}
          onPointerDown={(e) => coppyLink(e, link)}
        >
          Copy
        </div>
      </div>
    </div>
  </>
}

export default ShareButton
