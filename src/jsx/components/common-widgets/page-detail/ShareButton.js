import React from 'react'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton } from 'react-share'
// import Swal from 'sweetalert2'
import { copyAddress } from '../../../../utils/effect'

const ShareButton = ({ name, setOpenModalShare }) => {
  const coppyLink = async(e, value) => {
    await setOpenModalShare(false)
    copyAddress(e, value, 'Copy link successfully!')
  }

  return <>
    <div className='share'>
      <div className='share-list'>
        <div className='share-list-item'>
          <FacebookShareButton url={window.location.href} quote={name}>
            <FacebookIcon size={45} round />
            <div className='share-button-text'>Facebook</div>
          </FacebookShareButton>
        </div>
        <div className='share-list-item'>
          <TwitterShareButton url={document.location.href} quote={name}>
            <TwitterIcon size={45} round={true}/>
            <div className='share-button-text'>Twitter</div>
          </TwitterShareButton>
        </div>
        <div className='share-list-item'>
          <TelegramShareButton url={document.location.href} quote={name}>
            <TelegramIcon size={45} round={true}/>
            <div className='share-button-text'>Telegram</div>
          </TelegramShareButton>
        </div>
        <div className='share-list-item'>
          <LinkedinShareButton url={document.location.href} quote={name}>
            <LinkedinIcon size={45} round={true}/>
            <div className='share-button-text'>Linkedin</div>
          </LinkedinShareButton>
        </div>
        <div className='share-list-item'>
          <PinterestShareButton url={document.location.href} media={document.location.href} quote={name}>
            <PinterestIcon size={45} round={true}/>
            <div className='share-button-text'>Pinterest</div>
          </PinterestShareButton>
        </div>
        <div className='share-list-item'>
          <RedditShareButton url={document.location.href} quote={name}>
            <RedditIcon size={45} round={true}/>
            <div className='share-button-text'>Reddit</div>
          </RedditShareButton>
        </div>
      </div>
      <div className='share-input'>
        <div className='share-input-text'>
          {document.location.href}
        </div>
        <div
          className='share-input-button'
          onClick={(e) => coppyLink(e, document.location.href)}
          onPointerDown={(e) => coppyLink(e, document.location.href)}
        >
          Copy
        </div>
      </div>
    </div>
  </>
}

export default ShareButton
