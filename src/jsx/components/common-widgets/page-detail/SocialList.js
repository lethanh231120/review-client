import { Avatar, Tooltip } from 'antd'
import React from 'react'
import { toCammelCase } from '../../../../utils/formatText'
import ShortItem from './ShortItem'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'

export const isUrlValid = (userInput) => {
  var res = userInput?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  if (res == null) { return false } else { return true }
}

const SocialList = ({ detailSocials }) => {
  return <div className='mb-3 col-12'>
    <ShortItem
      title={Object.keys(detailSocials).map(
        (socialName) => {
          // absent data string and, text only
          return isUrlValid(detailSocials[socialName]?.trim()) ? (
            <Tooltip
              className='me-1 mt-2'
              placementTooltip='topLeft'
              title={toCammelCase(socialName)}
              key={socialName}
            >
              <a
                href={ detailSocials[socialName]?.startsWith('http') ? detailSocials[socialName] : `//${detailSocials[socialName]}`}
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
