import React from 'react'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton } from 'react-share'
import Swal from 'sweetalert2'

const ShareButton = ({ name, setOpenModalShare }) => {
  const coppyLink = (value) => {
    navigator.clipboard.writeText(value)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'success',
      title: 'Copy link successfully !'
    })
    setOpenModalShare(false)
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
          <TwitterShareButton url={window.location.href} quote={name}>
            <TwitterIcon size={45} round={true}/>
            <div className='share-button-text'>Twitter</div>
          </TwitterShareButton>
        </div>
        <div className='share-list-item'>
          <TelegramShareButton url={window.location.href} quote={name}>
            <TelegramIcon size={45} round={true}/>
            <div className='share-button-text'>Telegram</div>
          </TelegramShareButton>
        </div>
        <div className='share-list-item'>
          <LinkedinShareButton url={window.location.href} quote={name}>
            <LinkedinIcon size={45} round={true}/>
            <div className='share-button-text'>Linkedin</div>
          </LinkedinShareButton>
        </div>
        <div className='share-list-item'>
          <PinterestShareButton url={window.location.href} quote={name}>
            <PinterestIcon size={45} round={true}/>
            <div className='share-button-text'>Pinterest</div>
          </PinterestShareButton>
        </div>
        <div className='share-list-item'>
          <RedditShareButton url={window.location.href} quote={name}>
            <RedditIcon size={45} round={true}/>
            <div className='share-button-text'>Reddit</div>
          </RedditShareButton>
        </div>
      </div>
      <div className='share-input'>
        <div className='share-input-text'>
          {window.location.href}
        </div>
        <div className='share-input-button' onClick={() => coppyLink(window.location.href)}>Copy</div>
      </div>
    </div>
  </>
}

export default ShareButton
