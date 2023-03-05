import React from 'react'
import { Dropdown, Button } from 'react-bootstrap'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton } from 'react-share'

const ShareButton = ({ name }) => {
  return <Dropdown className='sidebar-dropdown me-2 cus-dropdown'>
    <Dropdown.Toggle
      variant=''
      as='a'
      className='ai-icon i-false c-pointer button-signup-home'
      role='button'
    >
      <Button className='btn btn-primary'>Share</Button>
    </Dropdown.Toggle>
    <Dropdown.Menu className='detail-list-social-share'>
      <Dropdown.Item >
        <FacebookShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <FacebookIcon size={26} round />
          </span>
        </FacebookShareButton>
      </Dropdown.Item>
      <Dropdown.Item >
        <TwitterShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <TwitterIcon size={26} round={true}/>
          </span>
        </TwitterShareButton>
      </Dropdown.Item>
      <Dropdown.Item >
        <TelegramShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <TelegramIcon size={26} round={true}/>
          </span>
        </TelegramShareButton>
      </Dropdown.Item>
      <Dropdown.Item >
        <LinkedinShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <LinkedinIcon size={26} round={true}/>
          </span>
        </LinkedinShareButton>
      </Dropdown.Item>
      <Dropdown.Item >
        <PinterestShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <PinterestIcon size={26} round={true}/>
          </span>
        </PinterestShareButton>
      </Dropdown.Item>
      <Dropdown.Item >
        <RedditShareButton url={window.location.href} quote={name}>
          <span className='share-icon'>
            <RedditIcon size={26} round={true}/>
          </span>
        </RedditShareButton>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
}

export default ShareButton
