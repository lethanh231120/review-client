import { Image } from 'antd'

export const myLogo = (type, projectId, category, size) => {
  const src = `${process.env.REACT_APP_API_IMAGE}/image/${category}/${type}/${projectId}.png`
  return <Image
    src={src}
    alt='No Image'
    preview={false}
  />
}

export const WARNING_ICON = (fillColor, size) => {
  return <div style={{ width: size, height: size, display: 'flex' }}>
    <svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'><path d='M14.876,2.672a3.309,3.309,0,0,0-5.752,0L.414,18.19a3.178,3.178,0,0,0,.029,3.189A3.264,3.264,0,0,0,3.29,23H20.71a3.264,3.264,0,0,0,2.847-1.621,3.178,3.178,0,0,0,.029-3.189ZM12,19a1,1,0,1,1,1-1A1,1,0,0,1,12,19Zm1-5a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Z' fill={fillColor} className='color000000 svgShape'></path></svg>
  </div>
}
