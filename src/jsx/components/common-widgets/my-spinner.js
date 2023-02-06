import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const MySpinner = ({ fontSize }) => {
  return <Spin className='d-flex align-items-center justify-content-center' indicator={<LoadingOutlined style={{ color: '#18A594', fontSize: { fontSize }}} spin />}/>
}
