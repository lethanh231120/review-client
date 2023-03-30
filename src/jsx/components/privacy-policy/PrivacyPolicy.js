import React from 'react'
import '../term-of-service/TermOfService.scss'
import moment from 'moment'
import { formatDateStyle } from '../../../utils/time/time'
import { emailContactText } from '../referral-code/ReferralCodeNotification'

export const txtPrivacyPolicy = 'Privacy Policy'
export const PrivacyPolicy = () => {
  const latestUpdatedDate = '2023/01/15' // YYYY/MM/DD

  return <div className='term'>
    <div className='term-header'>
      <h2 className='title-page'>{txtPrivacyPolicy}</h2>
      <div>
      Last updated: {moment(latestUpdatedDate).format(formatDateStyle)}
      </div>
    </div>
    <div className='term-content' style={{ height: 'auto' }}>

      <p className='term-content-sub'>
        This <b className='text-primary'>Privacy Policy</b> describes the policies and procedures of various services provided by our company (hereinafter referred to as &quot;Services&quot;) operated by <b className='text-primary'>Gear5</b> (hereinafter referred to as &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), pertaining to the collection, use, and disclosure of your information on our service and products we offer.

      </p>

      <h3 className='title-box text-primary'>What we collect</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>Gear5</b> collects (a) Information that we ask you to provide, such as your name, password,  email address; and Social Network ID (if you have signed up using a social network account (e.g. Facebook or Google)) (b) aggregate information concerning what pages users access or visit; (c) information given by the user (such as survey information and/or site registrations); and (d) information related to your use of the Website and/or the mobile application, including IP address, Device ID, geographic location, and date and time of your request; (e) any other information that you might provide voluntarily.
        </p>
      </div>
      <h3 className='title-box text-primary'>Purpose of Personal Information collection</h3>
      <div>
        <p className='term-content-sub'>
        Personal Information is collected in order to:
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>1.</b>&nbsp;
            Provide our services efficiently and effectively;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>2.</b>&nbsp;
            Inform you about <b className='text-primary'>Gear5</b> features;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>3.</b>&nbsp;
            Develop, enhance, market, and deliver products and services to you;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>4.</b>&nbsp;
            Understand your needs and your eligibility for products and services;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>5.</b>&nbsp;
            Provide information to you about developments and new products, including changes and enhancements to the Site;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>6.</b>&nbsp;
            Conduct surveys and get feedback from you;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>7.</b>&nbsp;
            Establish and maintain a responsible commercial relationship with you;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>8.</b>&nbsp;
            Provide you with news and other matters of general interest to you as <b className='text-primary'>Gear5</b> customer;
        </p>
        <p className='term-content-sub'>
            &nbsp;&nbsp;<b className='text-primary'>9.</b>&nbsp;
            Meet <b className='text-primary'>Gear5</b>&apos;s legal and regulatory requirements (eg, information required to verify your identity).
        </p>
      </div>

      <h3 className='title-box text-primary'>Security, Protection and Use of Personal Information</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>Gear5</b> is committed to protecting your privacy. Internally, only a specified number of employees within our business have access to your Personal Information. These employees have duties that reasonably require access to your Personal Information.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>Gear5</b>&apos;s systems and data are constantly under review to ensure that you are getting the best level of service and that market-leading security features are in place.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>Gear5</b> reserves the right to retain and share certain Personal Information in order to meet our regulatory and statutory requirements. In addition, <b className='text-primary'>Gear5</b> reserves the right to retain and share certain Personal Information with our corporate partners, and third parties acting on behalf of <b className='text-primary'>Gear5</b>.
        </p>
        <p className='term-content-sub'>
        Personal Information and other related data may be exported outside of the jurisdiction in which you reside. Your Personal Information may be processed and stored in a foreign country or country. Under those circumstances, the governments, courts, law enforcement or regulatory agencies of that country or those countries may be able to obtain access to your Personal Information through foreign laws. You need to be aware that the privacy standards of those countries may be lower than those of the jurisdiction in which you reside. You should note that you are not obliged to give your Personal Information to <b className='text-primary'>Gear5</b>, but if you choose not to do so, we may not be able to provide our services, or your access to our services may be limited.
        </p>
      </div>

      <h3 className='title-box text-primary'>Consent</h3>
      <div>
        <p className='term-content-sub'>
        Consent is required for the collection of Personal Information and the subsequent use of disclosure of Personal Information. The form of consent may vary depending upon the circumstances and the type of Personal information obtained. Your agreement with <b className='text-primary'>Gear5</b>&apos;s Terms of Use constitutes your consent to the collection and use of Personal Information as described in this Privacy Policy. Geat5 reserves the right to use and disclose Personal Information without your knowledge or consent as permitted by applicable law.
        </p>
      </div>

      <h3 className='title-box text-primary'>Disclosure of Personal Information</h3>
      <div>
        <p className='term-content-sub'>
        We use the Personal Information for the purposes indicated at the time you provide us with such information, and/or otherwise for the purposes set out in this Privacy Policy and/or as otherwise permitted by law. We may make available the Personal Information that you provide to us to our affiliates, agents, representatives, service providers and contractors for these purposes. We also reserve the right to disclose Personal information that <b className='text-primary'>Gear5</b> believes, in good faith, is appropriate or necessary to enforce our Terms of Use, take precautions against liability or harm, to investigate and respond to third-party claims or allegations, to respond to a court order or official requests, to protect security or integrity of <b className='text-primary'>Gear5</b> and to protect the rights, property or safety of <b className='text-primary'>Gear5</b>, our uses or others.
        </p>
        <p className='term-content-sub'>
        We may share Users&apos; Personal Information with any financial dispute resolution scheme to which the Company subscribes, and other law enforcement bodies, regulatory agencies, courts, arbitration bodies and dispute resolution schemes, as may be required by law.
        </p>
        <p className='term-content-sub'>
        If you request it in writing, we may share your Personal Information with your nominated advisers. Except where disclosure of your Personal Information is required by law or requested by you, we will generally require any third party which receives or has access to Personal Information to protect such Personal Information and to use it only to carry out the services they are performing for you or for us, unless otherwise required or permitted by law. We will ensure that any such third party is aware of our obligations under this Privacy Policy and we will take reasonable steps to ensure that contracts we enter with such third parties bind them to terms no less protective of any Personal Information disclosed to them than the obligations we undertake to you under this Privacy Policy or which are imposed on us under applicable data protection laws.
        </p>
        <p className='term-content-sub'>
        In the event that <b className='text-primary'>Gear5</b> is involved in a merger, acquisition, sale, bankruptcy, insolvency, reorganization, receivership, assignment or the application of laws or change of control, there may be a disclosure of your information to another entity related to such an event.
        </p>
      </div>

      <h3 className='title-box text-primary'>Access and Changing of Personal Information</h3>
      <div>
        <p className='term-content-sub'>
        You have the right to access the Personal Information we hold about you, and to require the correction, updating and blocking of inaccurate and/or incorrect data by sending an email to us. We will aim to respond to your request within 14 days. You may also request the deletion or destruction of your Personal Information, your Account details, or your Transaction details by sending an email to us. <b className='text-primary'>Gear5</b> will act on your request only when it is not inconsistent with its legal and regulatory obligations and compliance procedures. Upon your written request, we will inform you of the use and general disclosure of your Personal Information.
        </p>
      </div>

      <h3 className='title-box text-primary'>Retention of Your Personal Information</h3>
      <div>
        <p className='term-content-sub'>
        We will hold your Personal Information only for as long as it is necessary for us to do so, having regard to the purposes described in this Privacy Policy and our own legal and regulatory requirements. In general, Personal Information relating to your Account for at least a period of 5 years after your Account is closed. Similarly, we usually retain information about Transactions on your Account for a period of 5 years from the date of the Transaction. Personal Information which is collected for other purposes will be discarded in accordance with our policies in place from time to time.
        </p>
      </div>

      <h3 className='title-box text-primary'>Users Under Age of 18</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>Gear5</b> does not knowingly collect or store any personal information about children under 18 without verifiable prior parental consent. If you believe such information has been inadvertently collected, we will take necessary steps in order to remove such information from our database. Users under 18 must seek and obtain parental consent to use this website.
        </p>
      </div>

      <h3 className='title-box text-primary'>Links</h3>
      <div>
        <p className='term-content-sub'>
        There may be links from our Site to other sites and resources provided by third parties. This Privacy Policy applies only to our Site. Accessing those third-party sites or sources requires you to leave our Site. We do not control those third-party sites or any of the content contained therein and you agree that we are in no way responsible or liable for any of those third-party sites, including, without limitation, their content, policies, failures, promotions, products, services or actions and/or any damages, losses, failures or problems caused by, related to or arising from those sites. We encourage you to review all policies, rules, terms and regulations, including the privacy policies, of each site that you visit.
        </p>
      </div>

      <h3 className='title-box text-primary'>Changes</h3>
      <div>
        <p className='term-content-sub'>
        We reserve the right to update and revise this privacy policy at any time. We occasionally review this Privacy Policy to make sure it complies with applicable laws and conforms to changes in our business. If we do revise this Privacy Policy, we will update the &quot;Effective Date&quot; at the top of this page so that you can tell if it has changed since your last visit and will do our best to notify you. Please review this Privacy Policy regularly to ensure that you are aware of its terms. Any use of <b className='text-primary'>Gear5</b> after an amendment to our Privacy Policy constitutes your acceptance of the revised or amended agreement.
        </p>
      </div>

      <h3 className='title-box text-primary'>Contact Us</h3>
      <div>
        <p className='term-content-sub'>
        If you have any questions, comments, or concerns regarding our Privacy Policy and/or practices, please contact us at {emailContactText} or by writing Nika JSC at 10th floor, Viet A Building, 9 Duy Tan, Dich Vong Hau Ward, Cau Giay District, Hanoi, Vietnam.
        </p>
      </div>
    </div>
  </div>
}
