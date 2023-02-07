import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const MySpinner = () => {
  return <div className='widget-stat card'> <Spin className=' card-body p-4' indicator={<LoadingOutlined style={{ color: '#18A594', fontSize: '28px', width: '100%' }} spin />}/></div>
}
