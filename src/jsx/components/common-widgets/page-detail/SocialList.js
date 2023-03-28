import { Avatar, Tooltip } from 'antd'
import React from 'react'
import { toCammelCase } from '../../../../utils/formatText'
import ShortItem from './ShortItem'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'

const SocialList = ({ detailSocials }) => {
  return <div className='mb-3 col-12'>
    <ShortItem
      title={Object.keys(detailSocials).map(
        (socialName) => {
          // absent data string and, text only
          return detailSocials[socialName] !== '' && !detailSocials[socialName]?.trim().includes(' ') ? (
            <Tooltip
              className='me-1 mt-2'
              placementTooltip='topLeft'
              title={toCammelCase(socialName)}
              key={socialName}
            >
              <a
                href={ detailSocials[socialName]?.includes('http') ? detailSocials[socialName] : `//${detailSocials[socialName]}`}
                target='_blank'
                rel='noreferrer'
              >
                <Avatar
                  alt='Social Logo'
                  className='img-fluid p-1 rounded-circle cus-avatar'
                  style={{ backgroundColor: '#F0F2F5' }}
                  preview={false}
                  src={
                    socials?.find(
                      (social) =>
                        social?.key?.toLowerCase() ===
                          socialName?.toLowerCase()
                    )?.icon
                      ? socials?.find(
                        (social) =>
                          social?.key?.toLowerCase() ===
                              socialName?.toLowerCase()
                      ).icon
                      : defaultSocial
                  }
                />
              </a>
            </Tooltip>
          ) : null
        }
      )}
    />
  </div>
}

export default SocialList
