import { Image } from 'antd'

export const myLogo = (type, projectId, category, size) => {
  const src = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${category}/${type}/${projectId}.png`
  return <Image
    src={src}
    alt='No Image'
    preview={false}
  />
}

