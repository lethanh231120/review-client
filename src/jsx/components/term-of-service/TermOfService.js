import React from 'react'
import './TermOfService.scss'
import moment from 'moment'
import { formatDateStyle } from './../../../utils/time/time'
import { emailNika } from '../privacy-policy/PrivacyPolicy'

export const txtTermsOfService = 'Terms of Service'

export const website = 'https://gear5.io'

export const TermOfService = () => {
  const latestUpdatedDate = '2023/01/15' // YYYY/MM/DD

  return <div className='term'>
    <div className='term-header'>
      <h2 className='title-page'>{txtTermsOfService}</h2>
      <div>
        Last updated: {moment(latestUpdatedDate).format(formatDateStyle)}
      </div>
    </div>
    <div className='term-content' style={{ height: 'auto' }}>
      <h3 className='title-box text-primary'>1. Introduction</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>1.1.</b>&nbsp;
          The Terms of Use constitute a legal agreement between you (referred to as <b className='text-primary'>the User</b>&nbsp; or <b className='text-primary'>your</b>&nbsp;) and Nika JSC, a company incorporated under Vietnamese law, and its subsidiaries, affiliates and related corporations that provide the <b className='text-primary'><a href={website} className='text-primary txt-link'>GEAR 5</a></b>&nbsp; Services (referred to herein as <b className='text-primary'>the Company</b>&nbsp;, <b className='text-primary'>we</b>&nbsp;, <b className='text-primary'>us</b>&nbsp; or <b className='text-primary'>our</b>&nbsp;).
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.2.</b>&nbsp;
          When using any of the Services, you accept and agree to be bound by the Terms of Use, the Privacy Policy, all applicable laws and regulations, and agree to comply with all applicable local laws. Please read the Privacy Policy to find out how we collect, use, disclose, process and protect your personal data. For the avoidance of doubt, any and all terms, conditions, licenses, limitations, and obligations contained within and on the Site are incorporated into these Terms of Use by reference. In the event of any inconsistency between these Terms of Use and any other pages or policies on the Site, these Terms of Use shall prevail.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.3.</b>&nbsp;
          The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.4.</b>&nbsp;
          You agree that by using the Services, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.5.</b>&nbsp;
          It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Site after the date such revised Terms and Conditions are posted.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.7.</b>&nbsp;
          For the convenience of the Users, all content on this Site may be available in multiple languages. In case of any conflict between different language versions of such content or any omission in any language version, the English version of such content shall prevail.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>1.8.</b>&nbsp;
          Where the Company has published a document that is referred to within these Terms (such as a policy document), that document shall also form part of these Terms and shall be deemed to have been agreed to by you. In the event of any conflict between these Terms and a document referenced within them, these Terms shall prevail.
        </p>
      </div>
      <h3 className='title-box text-primary'>2. User Representations & Warranties</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>2.1.</b>&nbsp;
          You can only use our Services if permitted under the laws of your jurisdiction. Please make sure that these Terms are in compliance with all laws, rules, and regulations that apply to you.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>2.2.</b>&nbsp;
          Representations and warranties are statements and promises made by you to the Company upon which we rely as being accurate in our dealings with you. By using our Services, you represent and warrant to the Company that you meet all eligibility requirements outlined in these Terms. We may still refuse to let certain people access or use our Services, however, and we reserve the right to change our eligibility criteria at any time. You make the following representations and warranties to us at the time of entering into these Terms and every time you use our Services:
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(a)</b> You are able to form legally binding contracts;
          <br />
          <br />
          <b className='text-primary'>(b)</b> You are of sound mind and have the capacity to enter into these Terms;
          <br />
          <br />
          <b className='text-primary'>(f)</b> If you are accepting these Terms on behalf of a legal entity such as a company, trust or partnership, you further represent and warrant that:
          <br />
          <br />
          &nbsp;&nbsp;<b className='text-primary'>-</b> The legal entity is duly organized and validly exists under the applicable laws of the jurisdiction of its organization
          <br />
          <br />
          &nbsp;&nbsp;<b className='text-primary'>-</b> You are duly authorized by such legal entity to act on its behalf
          <br />
          <br />
          &nbsp;&nbsp;<b className='text-primary'>-</b> You are not breaking any laws or regulations applicable to you or any company, trust, or partnership upon whose instructions you are acting
          <br />
          <br />
          &nbsp;&nbsp;<b className='text-primary'>-</b> Our use of the Services does not violate any laws or regulations applicable in your country of residence.
        </p>
      </div>
      <h3 className='title-box text-primary'>3. Intellectual Property Rights</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>3.1.</b>&nbsp;
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (collectively, the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Vietnam, foreign jurisdictions, and international conventions.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>3.2.</b>&nbsp;
          The Content and the Marks are provided on the Site &quot;AS IS&quot; for your information and personal use only. Except as expressly provided in these Terms and Conditions, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>3.3.</b>&nbsp;
          Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content, and the Marks.
        </p>
      </div>
      <h3 className='title-box text-primary'>4. Prohibited Activities</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>4.1.</b>&nbsp;
          As a user of our Services, we grant you a limited, personal, non-commercial, non-exclusive, non-transferable, and revocable license to use them.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>4.2.</b>&nbsp; You may not:
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Use the Site or any Service to deal in any contraband digital assets, funds, or proceeds, including any local, provincial, state, federal, national, or international laws that may apply to you. You agree not to use our Services to support or engage in any illegal activities, including, but not limited to, illegal gambling, fraud, money laundering, or terrorist activities. If we discover that you have violated this Agreement or other regulatory requirements by participating in money laundering or financing terrorist activities, we will take proportional disciplinary action. You further agree not to encourage or induce any third party to engage in any of the activities prohibited under this Section.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Use the Site or any Services to interfere with or subvert the rights or obligations of the Company or the rights or obligations of any other Site user or any other third party without authorization, or use our Services in any manner that could interfere, disrupt, negatively affect, or inhibit other users from fully enjoying them.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Distribute any virus or other harmful computer code through our Services. You also agree not to take any action that may impose an unreasonable or disproportionately large load on our or any of our third-party providers&apos; infrastructure.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Bypass, circumvent, or attempt to bypass or circumvent any measures that we may use to prevent or restrict access to the Services, including, without limitation, other accounts, computer systems, or networks connected to the Services.
        </p>
      </div>

      <h3 className='title-box text-primary'>5. Third-Party Websites & Content</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>5.1.</b>&nbsp;
          The Site may contain links to Third-Party Websites and Third-Party Content, including articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items originating from third parties.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>5.2.</b>&nbsp;
          We do not investigate, monitor, or check for the accuracy, appropriateness, or completeness of any Third-Party Websites or Third-Party Content. We are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>5.3.</b>&nbsp;
          Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or Third-Party Content does not imply our approval or endorsement. If you choose to leave the Site and access Third-Party Websites or use/install any Third-Party Content, you do so at your own risk, and you acknowledge that these Terms and Conditions no longer govern.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>5.4.</b>&nbsp;
          You are responsible for reviewing the applicable terms and policies, including privacy and data gathering practices, of any website you navigate from the Site or any applications you use or install from the Site. Any purchases made through Third-Party Websites are exclusively between you and the applicable third party, and we take no responsibility whatsoever in relation to such purchases.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>5.5.</b>&nbsp;
          You acknowledge that we do not endorse the products or services offered on Third-Party Websites and agree to hold us harmless from any harm caused by your purchase of such products or services. Additionally, you agree to hold us harmless from any losses sustained or harm caused to you resulting from any Third-Party Content or any contact with Third-Party Websites.
        </p>
      </div>
      <h3 className='title-box text-primary'>6. Terms & Conditions</h3>
      <div>
        <p className='term-content-sub'>
        These Terms and Conditions shall remain in full force and effect while you use the Site. Without limiting any other provision of these terms and conditions, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Site (including blocking certain IP addresses), to any user for any or no reason, including without limitation for breach of any representation, warranty, or covenant contained in these terms and conditions or of any applicable law or regulation. We may terminate your use or participation in the Site or delete any content or information you posted at any time, without warning, at our sole discretion. In addition, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
        </p>
      </div>
      <h3 className='title-box text-primary'>7. Modifications & Interruptions</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>7.1.</b>&nbsp;
          We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>7.2.</b>&nbsp;
          We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Site.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>7.3.</b>&nbsp;
          We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>7.4.</b>&nbsp;
          We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>7.5.</b>&nbsp;
          Nothing in these Terms and Conditions will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.
        </p>
      </div>
      <h3 className='title-box text-primary'>8. Corrections</h3>
      <div>
        <p className='term-content-sub'>
        There may be information on the Site that contains typographical errors, inaccuracies, or omissions related to descriptions, pricing, availability, and other information. The Company does not warrant the accuracy, completeness, or currency of any materials on its Services. We reserve the right to correct any errors, inaccuracies, or omissions, and to modify or update the information on the Site at any time without prior notice. However, the Company does not guarantee to update the materials.
        </p>
      </div>
      <h3 className='title-box text-primary'>9. Disclaimer</h3>
      <div>
        <p className='term-content-sub'>
        The site is provided on an as-is and as-available basis. You agree that your use of the site and our services will be at your sole risk. We disclaim all warranties, express or implied, in connection with the site and your use thereof, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        We make no warranties or representations about the accuracy or completeness of the site&apos;s content or the content of any websites linked to the site. We assume no liability or responsibility for any errors, mistakes, or inaccuracies of content and materials, personal injury or property damage resulting from your access to and use of the site, any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein, any interruption or cessation of transmission to or from the site, or any bugs, viruses, trojan horses, or the like which may be transmitted to or through the site by any third party.
        We also disclaim any responsibility for any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the site. Furthermore, we do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the site, any hyperlinked website, or any website or mobile application featured in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services.
        Be responsible for monitoring any transaction between you and any third-party providers of products or services
        The site is provided on an as-is and as-available basis. You agree that your use of the site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties or representations about the accuracy or completeness of the site&apos;s content or the content of any websites linked to the site and we will assume no liability or responsibility for any:
        </p>

        <p className='term-content-sub'>
          <b className='text-primary'>(1)</b>&nbsp;
          errors, mistakes, or inaccuracies of content and materials
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(2)</b>&nbsp;
          personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the site
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(3)</b>&nbsp;
          any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(4)</b>&nbsp;
          any interruption or cessation of transmission to or from the site
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(5)</b>&nbsp;
          any bugs, viruses, Trojan horses, or the like which may be transmitted to or through the site by any third party
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>(6)</b>&nbsp;
          any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the site. We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the site, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services
        </p>

      </div>
      <h3 className='title-box text-primary'>10. Indemnification</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>10.1.</b>&nbsp;
          You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including, without limitation, attorneys&apos; fees or the costs of any claim or suit, made by any third party due to or arising out of:
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Use of the Site and the Services;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Breach of these Terms of Use;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Any breach of your representations and warranties set forth in these Terms and Use;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Any overt harmful act toward any other user of the Site with whom you connected via the Site;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          The real or perceived value of any digital assets, or the price of any digital asset displayed on the Site at any time;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Any inaccurate, misleading, or incomplete statement by the Company or on the Site regarding your wallets, whether caused by the Company&apos;s negligence or otherwise;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>-</b>&nbsp;
          Any failure, delay, malfunction, interruption, or decision (including any decision by the Company to vary or interfere with your rights) by the Company in operating the Site or providing any Service;
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>10.2.</b>&nbsp;
          Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, In such cases, you agree to cooperate with us, at your expense, in defending any such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding subject to this indemnification upon becoming aware of it.
        </p>
      </div>
      <h3 className='title-box text-primary'>11. Force Majeure Event</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>11.1.</b>&nbsp;
          In this clause, the term 	&quot;Force Majeure Event	&quot; refers to any unforeseeable circumstances that are beyond the control of the Company. Such circumstances may include, but are not limited to, interruptions or failures related to internet service providers, internet signals, connections, electricity providers, configurations of any user&apos;s computers, acts of God, natural disasters like floods, droughts, earthquakes, any collapse of buildings, fire, explosion or accidents, acts of terrorism, civil war, riots or any law or action taken by a government or public authority, including the failure to grant a necessary license or consent.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>11.2.</b>&nbsp;
          The Company shall not be considered in breach of these Terms, nor liable for any delay in performing or failure to perform any of its obligations under these Terms, if such delay or failure results from a Force Majeure Event.
        </p>
      </div>
      <h3 className='title-box text-primary'>
        12. Electronic Communications, Transactions, & Signature
      </h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>12.1.</b>&nbsp;
          Visiting the Site, sending us emails, and completing online forms may constitute electronic communications. That means you consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email, and on the Site, satisfy any legal requirement that such communication is in writing.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>12.2.</b>&nbsp;
          You hereby agree to the use of electronic signatures, contracts, orders, and other records, and to the electronic delivery of notices, policies, and records of transactions initiated or completed by us or via the site.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>12.3.</b>&nbsp;
          You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic methods.
        </p>
      </div>
      <h3 className='title-box text-primary'>13. Term and Termination</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>13.1.</b>&nbsp;
          These Terms of Use will become effective on the date you access the Site and will remain valid and binding as long as you continue to use the Site and the Services unless otherwise terminated in accordance with the provisions below. We reserve the right to deny access to and use of the Site (including blocking certain IP addresses) to any user, for any or no reason, including for breach of any representation, warranty, or covenant contained in these Terms of Use or any applicable law or regulation, in our sole discretion and without notice or liability. We may terminate your use or participation in the Site or delete any content or information you posted at any time, without warning, at our sole discretion. Additionally, we reserve the right to take appropriate legal action, including pursuing civil, criminal, and injunctive redress.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>13.2.</b>&nbsp;
          Any amended Terms will supersede these Terms of Use in accordance with clause <b className='text-primary'>16.1</b>&nbsp;.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>13.3.</b>&nbsp;
          The Company may terminate or amend these Terms of Use at any time without notice.
        </p>
      </div>
      <h3 className='title-box text-primary'>14. Miscellaneous</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>14.1.</b>&nbsp;
          These Terms of Use govern any dispute arising out of or in connection with their subject and shall be construed in accordance with the laws of Vietnam. The parties agree that the courts of Vietnam shall have exclusive jurisdiction to settle any dispute or claim arising in connection with these Terms.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>14.2.</b>&nbsp;
          These Terms of Use, together with any policies or operating rules posted on the Site, constitute the entire agreement and understanding between you and us. Any failure by the Company to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>14.3.</b>&nbsp;
          You may not assign these Terms of Use or any of the rights, duties, or obligations contained herein without the prior written consent of the Company. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time without notice or your consent.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>14.4.</b>&nbsp;
          If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>14.5.</b>&nbsp;
          For security and training purposes, the Company may record all telephone calls and other communications.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>14.6.</b>&nbsp;
          The Services and Site will aim to be available 24/7, but the Company offices and communication channels will be open on business days only. You acknowledge that the Company will make reasonable efforts to ensure continuous availability of the Services and Site, but there may be instances where access is restricted due to scheduled maintenance, technology failure, or network failure.
        </p>
      </div>
      <h3 className='title-box text-primary'>15. Contact us</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>15.1.</b>&nbsp;
          In the event that you have a complaint, the Company will make every effort to rectify the problem as soon as practicable.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>15.2.</b>&nbsp;
          Please write to us to make clear the details surrounding your complaint. You can send your complaint by email to {emailNika} or by writing Nika JSC at 10th floor, Viet A Building, 9 Duy Tan, Dich Vong Hau Ward, Cau Giay District, Hanoi, Vietnam.
        </p>
      </div>
      <h3 className='title-box text-primary'>16. Changes to Terms of Use</h3>
      <div>
        <p className='term-content-sub'>
          <b className='text-primary'>16.1.</b>&nbsp;
          The Company reserves the right to amend these Terms of Use at any time. By indicating your acceptance on the Site, you will be deemed to have accepted such amended Terms. Any further actions you take will be subject to the updated Terms in effect at that time. If you object to any changes, you may stop using the Services. Your continued use of the Services after we publish or provide notice about changes to the Terms of Use means that you consent to the updated Terms.
        </p>
        <p className='term-content-sub'>
          <b className='text-primary'>16.2.</b>&nbsp;
          We regularly review these Terms of Use. The last update was on {moment(latestUpdatedDate).format(formatDateStyle)}.
        </p>
      </div>
    </div>
  </div>
}
