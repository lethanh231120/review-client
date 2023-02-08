import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { onItemClicked } from '../click-function'

export const ScamItem = ({ item }) => {
  const type = item?.type
  const detail = item?.detail
  const navigate = useNavigate()

  switch (type) {
    case 'crypto':
      return <li key={detail?.cryptoId} onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'><Avatar src={detail?.bigLogo} ></Avatar></div>
          <div className='media-body'>
            <h5 className='mb-1'>
              {detail?.name} ({detail?.symbol})
              <Badge className='badge-sm ms-2 ' bg='danger light'>{item?.type}</Badge>
            </h5>
            <p className='mb-1'>
              {detail?.address && detail.address?.substring(0, 20)}
            </p>
          </div>
          <p className='mb-1'>
            {detail?.totalIsScam && detail?.totalIsScam} Reports Scam
          </p>
        </div>
      </li>
    case 'dapp' :
      return <li key={detail?.dAppId} onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'><Avatar src={detail?.dAppLogo} ></Avatar></div>
          <div className='media-body'>
            <h5 className='mb-1'>
              {detail?.dAppName}
              <Badge className='badge-sm ms-2 ' bg='danger light'>{item?.type}</Badge>
            </h5>
            <p className='mb-1'>
              {detail?.website && detail.website?.substring(0, 20)}
            </p>
          </div>
          <p className='mb-1'>
            {detail?.totalIsScam && detail?.totalIsScam} Reports Scam
          </p>
        </div>
      </li>
    case 'venture' :
      return <li key={detail?.ventureId} onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'><Avatar src={detail?.ventureLogo} ></Avatar></div>
          <div className='media-body'>
            <h5 className='mb-1'>
              {detail?.ventureName}
              <Badge className='badge-sm ms-2 ' bg='danger light'>{item?.type}</Badge>
            </h5>
            <p className='mb-1'>
              {detail?.website && detail.website?.substring(0, 20)}
            </p>
          </div>
          <p className='mb-1'>
            {detail?.totalIsScam && detail?.totalIsScam} Reports Scam
          </p>
        </div>
      </li>
    case 'exchange' :
      return <li key={detail?.exchangeId} onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'><Avatar src={detail?.exchangeLogo} ></Avatar></div>
          <div className='media-body'>
            <h5 className='mb-1'>
              {detail?.exchangeName}
              <Badge className='badge-sm ms-2 ' bg='danger light'>{item?.type}</Badge>
            </h5>
            <p className='mb-1'>
              {detail?.website && detail.website?.substring(0, 20)}
            </p>
          </div>
          <p className='mb-1'>
            {detail?.totalIsScam && detail?.totalIsScam} Reports Scam
          </p>
        </div>
      </li>
    default:
      return <div></div>
  }
}
