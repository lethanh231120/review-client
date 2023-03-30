import React from 'react'
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FormLoginSignupKeyContext, SignInContext } from '../../../App'
import { whiteColorHex } from '../../constants/color'
import { logInKey } from '../common-widgets/user-form/account-tab'
import imgPart1 from '../../../images/referral-code/part1.png'
import imgPart1_1 from '../../../images/referral-code/part1_1.png'
import imgPart1_2 from '../../../images/referral-code/part1_2.png'
import imgPart1_3 from '../../../images/referral-code/part1_3.png'
import imgPart2 from '../../../images/referral-code/part2.png'
import imgPart2_1 from '../../../images/referral-code/part2_1.png'
import imgPart2_2 from '../../../images/referral-code/part2_2.png'
import imgPart2_3 from '../../../images/referral-code/part2_3.png'
const emailNika = 'zoro@nika.guru'

const emailContact = (htmlComp) => <>
  <a href ={`mailto:${emailNika}`} className='text-primary txt-link'>
    {htmlComp}
  </a>
</>

export const emailContactText = <>
  {emailContact(<>
    <b>
      {emailNika}
    </b>
  </>)}
</>

const mailImage = (size) => <>
  <svg fill='#fff' width={size} height={size} viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><path d='M15 2.5H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1zm-1.3 1.25L8.42 8.56a.62.62 0 0 1-.84 0L2.3 3.75zm-12.45 8.5V4.48l5.49 5a1.86 1.86 0 0 0 2.52 0l5.49-5v7.77z'/></svg>
</>

const buttonContactEmail = <>
  {emailContact(<>
    <Button className='btn btn-primary btn-large fs-20'>
      {mailImage(24)}
    &nbsp;
     Contact Us
    </Button>
  </>)}
</>

const subMenu = (title, content, image) => <>
  <p className='term-content-sub ms-3'>
    <b className='text-primary row mb-2 fs-22'>{title}</b>
    <div className='ms-1'>
      <div className='row'>
        {image && content ? <>
          <div className='col-12 col-sm-5'>
            <img src={image} style={{ width: '100%', minHeight: '50%' }}/>
          </div>
          <div className='col-12 col-sm-7 fs-20'>
            <p>{content}</p>
          </div>
        </>
          : content ? <>
            <div className='col-12 fs-20'>
              <p>{content}</p>
            </div>
          </>
            : image ? <>
              <div className='text-center'>
                <img src={image} style={{ width: '60%', minHeight: '50%', height: '10rem' }}/>
              </div>
            </> : ''}
      </div>

    </div>
  </p>
</>

const link = (url) => <>
  <a className='text-primary txt-link' href={url} target='_blank' rel='noreferrer'><ins>{url}</ins></a>
</>

export const signInImage = (size, fill) => <>
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3.95442 10.166C4.04608 9.76202 3.79293 9.36025 3.38898 9.26859C2.98504 9.17693 2.58327 9.43009 2.49161 9.83403L3.95442 10.166ZM5.49981 4.73283C5.19117 5.00907 5.1649 5.48322 5.44115 5.79187C5.71739 6.10051 6.19154 6.12678 6.50019 5.85053L5.49981 4.73283ZM15 14.25C14.5858 14.25 14.25 14.5858 14.25 15C14.25 15.4142 14.5858 15.75 15 15.75L15 14.25ZM17.25 18.7083C17.25 19.1225 17.5858 19.4583 18 19.4583C18.4142 19.4583 18.75 19.1225 18.75 18.7083H17.25ZM5.25 18.7083C5.25 19.1225 5.58579 19.4583 6 19.4583C6.41421 19.4583 6.75 19.1225 6.75 18.7083H5.25ZM9 15L8.99998 15.75H9V15ZM11 15.75C11.4142 15.75 11.75 15.4142 11.75 15C11.75 14.5858 11.4142 14.25 11 14.25V15.75ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM20.25 12C20.25 16.5563 16.5563 20.25 12 20.25V21.75C17.3848 21.75 21.75 17.3848 21.75 12H20.25ZM3.75 12C3.75 11.3688 3.82074 10.7551 3.95442 10.166L2.49161 9.83403C2.33338 10.5313 2.25 11.2564 2.25 12H3.75ZM6.50019 5.85053C7.96026 4.54373 9.88655 3.75 12 3.75V2.25C9.50333 2.25 7.22428 3.1894 5.49981 4.73283L6.50019 5.85053ZM14.25 9C14.25 10.2426 13.2426 11.25 12 11.25V12.75C14.0711 12.75 15.75 11.0711 15.75 9H14.25ZM12 11.25C10.7574 11.25 9.75 10.2426 9.75 9H8.25C8.25 11.0711 9.92893 12.75 12 12.75V11.25ZM9.75 9C9.75 7.75736 10.7574 6.75 12 6.75V5.25C9.92893 5.25 8.25 6.92893 8.25 9H9.75ZM12 6.75C13.2426 6.75 14.25 7.75736 14.25 9H15.75C15.75 6.92893 14.0711 5.25 12 5.25V6.75ZM15 15.75C15.6008 15.75 16.1482 16.0891 16.5769 16.6848C17.0089 17.2852 17.25 18.0598 17.25 18.7083H18.75C18.75 17.7371 18.4052 16.6575 17.7944 15.8086C17.1801 14.9551 16.2275 14.25 15 14.25L15 15.75ZM6.75 18.7083C6.75 18.0598 6.99109 17.2852 7.42315 16.6848C7.85183 16.0891 8.39919 15.75 8.99998 15.75L9.00002 14.25C7.77253 14.25 6.81989 14.9551 6.20564 15.8086C5.59477 16.6575 5.25 17.7371 5.25 18.7083H6.75ZM9 15.75H11V14.25H9V15.75Z' fill={fill}/>
  </svg>
</>

export const ReferralCodeNotification = ({ isSignedIn, isCollaboratorUser }) => {
  const formLoginSignupKeyContext = useContext(FormLoginSignupKeyContext)
  const signContext = useContext(SignInContext)

  return <div className='term'>
    <div className='term-header'>
      <h2 className='title-page'>Refer Friends</h2>
      <div>
      Earn Crypto Together
      </div>
    </div>
    <div className='term-content' style={{ height: 'auto' }}>
      {/* PART 1 */}
      <h3 className='title-box text-primary'>1. How Referral Works</h3>
      <img src={imgPart1} alt='img' style={{ width: '100%', maxHeight: '20rem' }} className='mb-2' ></img>
      <div>
        {subMenu('1.1. Share Commission', <>Contact us via email {emailContactText} to become each other&apos;s partners.</>, imgPart1_1)}
        <hr className='hr-custome mb-5'></hr>

        {subMenu('1.2. Refer Friends', <>Share link with your referral with your friends by copy link in social share button, or just add your referral at the end of the link you want to share.</>, imgPart1_2)}
        <div>{subMenu('Suppose:', <>
          1. You want to share this link {link('https://gear5.io/crypto')}
          <br/>2. Your referral code is <b className='text-primary'>GEAR5-1234</b>
          <br/>3. You will share this link {link('https://gear5.io/crypto?ref=GEAR5-1234', null)}
        </>)}</div>
        <hr className='hr-custome mb-5'></hr>

        {subMenu('1.3. Earn Crypto!', 'Earn up to 100% commission when your friends go to our webite.', imgPart1_3)}
      </div>

      <hr className='hr-custome my-5'></hr>
      {/* PART 2 */}
      <h3 className='title-box text-primary'>2. How To Refer Your Friends</h3>
      <img src={imgPart2} style={{ width: '100%', maxHeight: '20rem' }} className='mb-2' ></img>
      <div>
        {subMenu('2.1. Share your referral link with friends', null, imgPart2_1)}
        {subMenu('2.2. Invite friends to visit website', null, imgPart2_2)}
        {subMenu('2.3. Receive up to 100% interact fee for each visit from link attached your referral code', null, imgPart2_3)}
      </div>

      <hr className='hr-custome my-5'></hr>
      {/* PART 3 */}
      {
        isSignedIn && isCollaboratorUser ? '' : <>
          <div className='text-center'>
            <h3 className='title-box text-primary'>Start Earning Now</h3>
            {!isSignedIn
              ? <>
                <Button
                  className='btn btn-primary btn-large fs-20'
                  onClick={() => {
                    formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(logInKey)
                    signContext?.handleSetOpenModal(true)
                  }}
                >
                  {signInImage(24, whiteColorHex)}
                  &nbsp;
                Sign In
                </Button>
              </>
              : !isCollaboratorUser
                ? buttonContactEmail
                : ''}
          </div>
        </>
      }

    </div>
  </div>
}
