import React from 'react'
import './TermOfService.scss'
import moment from 'moment'

export const TermOfService = () => {
  const latestUpdatedDate = '2023/01/15' // YYYY/MM/DD
  const website = 'https://gear5.io'

  return <div className='term'>
    <div className='term-header'>
      <h2 className='title-page'>Terms of Service</h2>
      <div>
        Last updated: {moment(latestUpdatedDate).format('ddd, DD MMM YYYY')}
      </div>
    </div>
    <div className='term-content' style={{ height: 'auto' }}>
      <h3 className='title-box'>1. Introduction</h3>
      <div>
        <p className='term-content-sub'>
          <b>1.1.</b>
          This Terms of Use is a legal agreement between you (referred to
          herein as <b>the User</b> or <b>your</b>) and Nika JSC, a company
          incorporated under the laws of Vietnam, and its subsidiaries,
          affiliates and related corporations who own or operate the Services
          provided by the{' '}
          <u>
            <b>
              <a href={website}>GEAR 5</a>
            </b>
          </u>{' '}
          (referred to herein as <b>the Company</b>, <b>we</b>, <b>us</b> or{' '}
          <b>our</b>).
        </p>
        <p className='term-content-sub'>
          <b>1.2.</b> By using any of the Services, you accept and agree to be
          bound by the Terms of Use, the Privacy Policy, all applicable laws
          and regulations, and agree that you are responsible for compliance
          with any applicable local laws. Please read the Privacy Policy to
          find out how we collect, use, disclose, process and protect your
          personal data. For the avoidance of doubt, any and all terms,
          conditions, licenses, limitations, and obligations contained within
          and on the Site are incorporated into these Terms of Use by
          reference. In the event of any inconsistency between these Terms of
          Use and any other pages or policies on the Site, these Terms of Use
          shall prevail.
        </p>
        <p className='term-content-sub'>
          <b>1.3.</b> The information provided on the Site is not intended for
          distribution to or use by any person or entity in any jurisdiction
          or country where such distribution or use would be contrary to law
          or regulation or which would subject us to any registration
          requirement within such jurisdiction or country. Accordingly, those
          persons who choose to access the Site from other locations do so on
          their own initiative and are solely responsible for compliance with
          local laws, if and to the extent local laws are applicable.
        </p>
        <p className='term-content-sub'>
          <b>1.4.</b> You agree that by using the Services, you have read,
          understood, and agree to be bound by all of these Terms and
          Conditions. If you do not agree with all of these Terms and
          Conditions, then you are expressly prohibited from using the Site
          and you must discontinue use immediately.
        </p>
        <p className='term-content-sub'>
          <b>1.5.</b> It is your responsibility to periodically review these
          Terms and Conditions to stay informed of updates. You will be
          subject to and will be deemed to have been made aware of and to have
          accepted, the changes in any revised Terms and Conditions by your
          continued use of the Site after the date such revised Terms and
          Conditions are posted.
        </p>
        <p className='term-content-sub'>
          <b>1.7.</b> For the convenience of the Users, all content on this
          Site may be available in multiple languages. In case of any conflict
          between different language versions of such content or any omission
          in any language version, the English version of such content shall
          prevail.
        </p>
        <p className='term-content-sub'>
          <b>1.8.</b> Where the Company has published a document that is
          referred to within these Terms (such as a policy document), that
          document shall also form part of these Terms and shall be deemed to
          have been agreed to by you. In the event of any conflict between
          these Terms and a document referenced within them, these Terms shall
          prevail.
        </p>
      </div>
      <h3 className='title-box'>2. User Representations & Warranties</h3>
      <div>
        <p className='term-content-sub'>
          <b>2.1.</b> You can only use our Services if permitted under the
          laws of your jurisdiction. Please make sure that these Terms are in
          compliance with all laws, rules, and regulations that apply to you.
        </p>
        <p className='term-content-sub'>
          <b>2.2.</b> Representations and warranties are statements and
          promises made by you to the Company upon which we rely as being
          accurate in our dealings with you. By using our Services, you
          represent and warrant to the Company that you meet all eligibility
          requirements that we outline in these Terms. We may still refuse to
          let certain people access or use our Services, however, and we
          reserve the right to change our eligibility criteria at any time.
          You make the following representations and warranties to us at the
          time of entering into these Terms and every time you use our
          Services:
        </p>
        <p className='term-content-sub'>
          <b>(a)</b> you are able to form legally binding contracts;
          <b>(b)</b> you are of sound mind and have the capacity to enter into
          these Terms;
          <b>(f)</b> if you are accepting these Terms on behalf of a legal
          entity such as a company, trust or partnership, you further
          represent and warrant that: (a) the legal entity is duly organized
          and validly existing under the applicable laws of the jurisdiction
          of its organization, and (b) you are duly authorized by such legal
          entity to act on its behalf;
          <b>(g)</b> you are not breaking any laws or regulations that are
          applicable to you or any company, trust, or partnership upon whose
          instructions you are acting;
          <b>(j)</b> your use of the Services does not violate any laws or
          regulations applicable in your country of residence.
        </p>
      </div>
      <h3 className='title-box'>3. Intellectual Property Rights</h3>
      <div>
        <p className='term-content-sub'>
          <b>3.1.</b> Unless otherwise indicated, the Site is our proprietary
          property and all source code, databases, functionality, software,
          website designs, audio, video, text, photographs, and graphics on
          the Site (collectively, the “Content”) and the trademarks, service
          marks, and logos contained therein (collectively, the “Marks”) are
          owned or controlled by us or licensed to us, and are protected by
          copyright and trademark laws and various other intellectual property
          rights and unfair competition laws of Vietnam, foreign
          jurisdictions, and international conventions.
        </p>
        <p className='term-content-sub'>
          <b>3.2.</b> The Content and the Marks are provided on the Site “AS
          IS” for your information and personal use only. Except as expressly
          provided in these Terms and Conditions, no part of the Site and no
          Content or Marks may be copied, reproduced, aggregated, republished,
          uploaded, posted, publicly displayed, encoded, translated,
          transmitted, distributed, sold, licensed, or otherwise exploited for
          any commercial purpose whatsoever, without our express prior written
          permission.
        </p>
        <p className='term-content-sub'>
          <b>3.3.</b> Provided that you are eligible to use the Site, you are
          granted a limited license to access and use the Site and to download
          or print a copy of any portion of the Content to which you have
          properly gained access solely for your personal, non-commercial use.
          We reserve all rights not expressly granted to you in and to the
          Site, the Content, and the Marks.
        </p>
      </div>
      <h3 className='title-box'>4. Prohibited Activities</h3>
      <div>
        <p className='term-content-sub'>
          <b>4.1.</b> As a user of the Services, we grant you a limited,
          personal, non-commercial, non-exclusive, non-transferable, and
          revocable license to use our Services.
        </p>
        <p className='term-content-sub'>
          <b>4.2.</b> You may not:
        </p>
        <p className='term-content-sub'>
          <b>-</b> use the Site or any Service to deal in any contraband
          digital assets, funds, or proceeds. This includes any local,
          provincial, state, federal, national, or international laws that may
          apply to you. You agree that you will not use our Services to
          support, or engage in any illegal activities including, but not
          limited to, illegal gambling, fraud, money laundering, or terrorist
          activities. If we discover that you have violated this Agreement or
          other regulatory requirements by participating in money laundering
          or by financing terrorist activities, we will take proportional
          disciplinary action. You further agree not to encourage or induce
          any third party to engage in any of the activities prohibited under
          this Section.
        </p>
        <p className='term-content-sub'>
          <b>-</b> use the Site or any Services to interfere with or subvert
          the rights or obligations of the Company or the rights or
          obligations of any other Site user or any other third party without
          authorization or use our Services in any manner that could
          interfere, disrupt, negatively affect, or inhibit other users from
          fully enjoying it.
        </p>
        <p className='term-content-sub'>
          <b>-</b> distribute any virus or other harmful computer code through
          our Services. You also agree to not take any action that may impose
          an unreasonable or disproportionately large load on our or any of
          our third-party providers’ infrastructure.
        </p>
        <p className='term-content-sub'>
          <b>-</b> bypass, circumvent, or attempt to bypass or circumvent any
          measures that we may use to prevent or restrict access to the
          Services including, without limitation, other accounts, computer
          systems, or networks connected to the Services.
        </p>
      </div>

      <h3 className='title-box'>5. Third-Party Websites & Content</h3>
      <div>
        <p className='term-content-sub'>
          <b>5.1.</b> The Site may contain (or you may be sent via the Site)
          links to other websites (Third-Party Websites) as well as articles,
          photographs, text, graphics, pictures, designs, music, sound, video,
          information, applications, software, and other content or items
          belonging to or originating from third parties (Third-Party
          Content).
        </p>
        <p className='term-content-sub'>
          <b>5.2.</b> Such Third-Party Websites and Third-Party Content are
          not investigated, monitored, or checked for accuracy,
          appropriateness, or completeness by us, and we are not responsible
          for any Third-Party Websites accessed through the Site or any
          Third-Party Content posted on, available through, or installed from
          the Site, including the content, accuracy, offensiveness, opinions,
          reliability, privacy practices, or other policies of or contained in
          the Third-Party Websites or the Third-Party Content.
        </p>
        <p className='term-content-sub'>
          <b>5.3.</b> Inclusion of, linking to, or permitting the use or
          installation of any Third-Party Websites or any Third-Party Content
          does not imply approval or endorsement thereof by us. If you decide
          to leave the Site and access the Third-Party Websites or to use or
          install any Third-Party Content, you do so at your own risk, and you
          should be aware these Terms and Conditions no longer govern.
        </p>
        <p className='term-content-sub'>
          <b>5.4.</b> You should review the applicable terms and policies,
          including privacy and data gathering practices, of any website to
          which you navigate from the Site or relating to any applications you
          use or install from the Site. Any purchases you make through
          Third-Party Websites will be through other websites and from other
          companies, and we take no responsibility whatsoever in relation to
          such purchases which are exclusively between you and the applicable
          third party.
        </p>
        <p className='term-content-sub'>
          <b>5.5.</b> You agree and acknowledge that we do not endorse the
          products or services offered on Third-Party Websites and you shall
          hold us harmless from any harm caused by your purchase of such
          products or services. Additionally, you shall hold us harmless from
          any losses sustained by you or harm caused to you relating to or
          resulting in any way from any Third-Party Content or any contact
          with Third-Party Websites.
        </p>
      </div>
      <h3 className='title-box'>6. Term & Termination</h3>
      <div>
        <p className='term-content-sub'>
          These Terms and Conditions shall remain in full force and effect
          while you use the Site. Without limiting any other provision of
          these terms and conditions, we reserve the right to, in our sole
          discretion and without notice or liability, deny access to and use
          of the Site (including blocking certain IP addresses), to any user
          for any or no reason, including without limitation for breach of any
          representation, warranty, or covenant contained in these terms and
          conditions or of any applicable law or regulation. We may terminate
          your use or participation in the Site or delete any content or
          information that you posted at any time, without warning, at our
          sole discretion. In addition, we reserve the right to take
          appropriate legal action, including without limitation pursuing
          civil, criminal, and injunctive redress.
        </p>
      </div>
      <h3 className='title-box'>7. Modifications & Interruptions</h3>
      <div>
        <p className='term-content-sub'>
          <b>7.1.</b> We reserve the right to change, modify, or remove the
          contents of the Site at any time or for any reason at our sole
          discretion without notice. However, we have no obligation to update
          any information on our Site. We also reserve the right to modify or
          discontinue all or part of the Site without notice at any time.
        </p>
        <p className='term-content-sub'>
          <b>7.2.</b> We will not be liable to you or any third party for any
          modification, suspension, or discontinuance of the Site.
        </p>
        <p className='term-content-sub'>
          <b>7.3.</b> We cannot guarantee the Site will be available at all
          times. We may experience hardware, software, or other problems or
          need to perform maintenance related to the Site, resulting in
          interruptions, delays, or errors.
        </p>
        <p className='term-content-sub'>
          <b>7.4.</b> We reserve the right to change, revise, update, suspend,
          discontinue, or otherwise modify the Site at any time or for any
          reason without notice to you. You agree that we have no liability
          whatsoever for any loss, damage, or inconvenience caused by your
          inability to access or use the Site during any downtime or
          discontinuance of the Site.
        </p>
        <p className='term-content-sub'>
          <b>7.5.</b> Nothing in these Terms and Conditions will be construed
          to obligate us to maintain and support the Site or to supply any
          corrections, updates, or releases in connection therewith.
        </p>
      </div>
      <h3 className='title-box'>8. Corrections</h3>
      <div>
        <p className='term-content-sub'>
          There may be information on the Site that contains typographical
          errors, inaccuracies, or omissions that may relate to the Site,
          including descriptions, pricing, availability, and various other
          information. the Company does not warrant that any of the materials
          on its Services are accurate, complete, or current. We reserve the
          right to correct any errors, inaccuracies, or omissions and to
          change or update the information on the Site at any time, without
          prior notice. However, the Company does not make any commitment to
          update the materials.
        </p>
      </div>
      <h3 className='title-box'>9. Disclaimer</h3>
      <div>
        <p className='term-content-sub'>
          THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
          THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE
          RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
          WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
          USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY
          WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR
          RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
          CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF
          ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
          SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
          AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
          STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
          OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
          WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY,
          AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR
          FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
          OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
          THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
          RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
          THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY
          WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
          ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
          RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
          THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
        </p>
      </div>
      <h3 className='title-box'>10.</h3>
      <div>
        <p className='term-content-sub'>
          <b>10.1.</b> You agree to defend, indemnify, and hold us harmless,
          including our subsidiaries, affiliates, and all of our respective
          officers, agents, partners, and employees, from and against any
          loss, damage, liability, claim, or demand, including, without
          limitation, attorneys’ fees or the costs of any claim or suit), made
          by any third party due to or arising out of:
        </p>
        <p className='term-content-sub'>
          <b>-</b> use of the Site and the Services;
        </p>
        <p className='term-content-sub'>
          <b>-</b> breach of these Terms of Use;
        </p>
        <p className='term-content-sub'>
          <b>-</b> any breach of your representations and warranties set forth
          in these Terms and Use;
        </p>
        <p className='term-content-sub'>
          <b>-</b> any overt harmful act toward any other user of the Site
          with whom you connected via the Site.
        </p>
        <p className='term-content-sub'>
          <b>-</b> the real or perceived value of any digital assets, or the
          price of any digital asset displayed on the Site at any time;
        </p>
        <p className='term-content-sub'>
          <b>-</b> any inaccurate, misleading, or incomplete statement by the
          Company or on the Site regarding your wallets, whether caused by the
          Company’s negligence or otherwise;
        </p>
        <p className='term-content-sub'>
          <b>-</b> any failure, delay, malfunction, interruption, or decision
          (including any decision by the Company to vary or interfere with
          your rights) by the Company in operating the Site or providing any
          Service;
        </p>
        <p className='term-content-sub'>
          <b>10.2.</b> Notwithstanding the foregoing, we reserve the right, at
          your expense, to assume the exclusive defense and control of any
          matter for which you are required to indemnify us, and you agree to
          cooperate, at your expense, with our defense of such claims. We will
          use reasonable efforts to notify you of any such claim, action, or
          proceeding which is subject to this indemnification upon becoming
          aware of it.
        </p>
      </div>
      <h3 className='title-box'>11. Force Majeure Event</h3>
      <div>
        <p className='term-content-sub'>
          <b>11.1.</b> For the purposes of this clause, “Force Majeure Event”
          shall mean any circumstance outside the Company’s control including
          but not limited to any interruptions or failures relating to
          internet service providers, internet signal, connections,
          electricity providers, configurations of any user’s computers, any
          acts of God, flood, drought, earthquake or other natural disasters,
          any collapse of buildings, fire, explosion or accident, any acts of
          terrorism, civil war or commotion, riots or any law or any action
          taken by a government or public authority, including, without
          limitation, the failure to grant a necessary license or consent.
        </p>
        <p className='term-content-sub'>
          <b>11.2.</b> The Company shall not be in breach of these Terms nor
          liable for delay in performing or failure to perform any of its
          obligations under these Terms if such delay or failure results from
          a Force Majeure Event.
        </p>
      </div>
      <h3 className='title-box'>
        12. Electronic Communications, Transactions, & Signature
      </h3>
      <div>
        <p className='term-content-sub'>
          <b>12.1.</b> Visiting the Site, sending us emails, and completing
          online forms constitute electronic communications. You consent to
          receive electronic communications, and you agree that all
          agreements, notices, disclosures, and other communications we
          provide to you electronically, via email, and on the Site, satisfy
          any legal requirement that such communication is in writing.
        </p>
        <p className='term-content-sub'>
          <b>12.2.</b> YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
          CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
          NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR
          COMPLETED BY US OR VIA THE SITE.
        </p>
        <p className='term-content-sub'>
          <b>12.3.</b> You hereby waive any rights or requirements under any
          statutes, regulations, rules, ordinances, or other laws in any
          jurisdiction which require an original signature or delivery or
          retention of non-electronic records, or to payments or the granting
          of credits by any means other than electronic means.
        </p>
      </div>
      <h3 className='title-box'>13. Term and Termination</h3>
      <div>
        <p className='term-content-sub'>
          <b>13.1.</b> Except as otherwise terminated in accordance with the
          provisions below, these Terms of Use shall commence on the date you
          access the Site and shall remain valid and binding for as long as
          you are still using the Site and the Services. Without limiting any
          other provision of these Terms of Use, we reserve the right to, in
          our sole discretion and without notice or liability, deny access to
          and use of the Site (including blocking certain IP addresses), to
          any user for any or no reason, including without limitation for
          breach of any representation, warranty, or covenant contained in
          these Terms of Use or of any applicable law or regulation. We may
          terminate your use or participation in the Site or delete any
          content or information that you posted at any time, without warning,
          at our sole discretion. In addition, we reserve the right to take
          appropriate legal action, including without limitation pursuing
          civil, criminal, and injunctive redress.
        </p>
        <p className='term-content-sub'>
          <b>13.2.</b> These Terms may be superseded by any amended Terms in
          accordance with clause <b>16.1</b>
        </p>
        <p className='term-content-sub'>
          <b>13.3.</b> These Terms may be terminated or amended by the Company
          at any time without notice.
        </p>
      </div>
      <h3 className='title-box'>14. Miscellaneous</h3>
      <div>
        <p className='term-content-sub'>
          <b>14.1.</b> These Terms of Use and any dispute arising out of or in
          connection with their subject matter shall be governed by and
          construed in accordance with the laws of Vietnam and the parties
          agree that the courts of Vietnam shall have exclusive jurisdiction
          to settle any dispute or claim arising in connection with these
          Terms.
        </p>
        <p className='term-content-sub'>
          <b>14.2.</b> These Terms of Use and any policies or operating rules
          posted by us on the Site constitute the entire agreement and
          understanding between you and us. Any failure by the Company to
          exercise or enforce any right or provision of these Terms of Use
          shall not operate as a waiver of such right or provision.
        </p>
        <p className='term-content-sub'>
          <b>14.3.</b> These Terms of Use, and any of the rights, duties, and
          obligations contained herein, are not assignable by you without the
          prior written consent of the Company. These Terms of Use operate to
          the fullest extent permissible by law. We may assign any or all of
          our rights and obligations to others at any time without notice or
          your consent.
        </p>
        <p className='term-content-sub'>
          <b>14.4.</b> If any provision or part of a provision of these Terms
          of Use is determined to be unlawful, void, or unenforceable, that
          provision or part of the provision is deemed severable from these
          Terms of Use and does not affect the validity and enforceability of
          any remaining provisions.
        </p>
        <p className='term-content-sub'>
          <b>14.5.</b> The Company may record all telephone calls and other
          communications for the purposes of security and training.
        </p>
        <p className='term-content-sub'>
          <b>14.6.</b> You understand that the Services and Site will endeavor
          to be open 24/7. However, the Company offices and communications
          channels will be open on business days only. You further acknowledge
          that the Company will make reasonable efforts to ensure that the
          Services and Site are available continuously however that there may
          be instances where access to the Platform and Site are restricted as
          a result of scheduled maintenance, technology failure, or network
          failure.
        </p>
      </div>
      <h3 className='title-box'>15. Contact us</h3>
      <div>
        <p className='term-content-sub'>
          <b>15.1.</b> In the event that you have a complaint, the Company
          will make every effort to rectify the problem as soon as practicably
          possible.
        </p>
        <p className='term-content-sub'>
          <b>15.2.</b> Please write to us to make clear the details
          surrounding your complaint. You can send your complaint by e-mail to
          zoro@gear5.guru or by writing Nika JSC at 10th floor, Viet A
          Building, 9 Duy Tan, Dich Vong Hau Ward, Cau Giay District, Hanoi,
          Vietnam.
        </p>
      </div>
      <h3 className='title-box'>16. Changes to Terms of Use</h3>
      <div>
        <p className='term-content-sub'>
          <b>16.1.</b> The Company shall be permitted to make amendments to
          these Terms of Use from time to time. You will be deemed to have
          accepted such amended Terms by indicating your acceptance on the
          Site. Any further actions which you make will be subject to the
          Terms in effect at that time. If you object to any changes, you may
          stop using the Services. Your continued use of the Services after we
          publish or otherwise provide notice about our changes to the Terms
          of Use means that you are consenting to the updated Terms of Use.
        </p>
        <p className='term-content-sub'>
          <b>16.2.</b> We keep these Terms of Use under regular review. These
          Terms of Use were last updated in These Terms of Use were last
          updated on January, 15th 2023.
        </p>
      </div>
    </div>
  </div>
}
