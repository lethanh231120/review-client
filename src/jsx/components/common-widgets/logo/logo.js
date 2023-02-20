import { Avatar } from 'antd'

const imageExist = async(src) => {
  if (!src) {
    return false
  }
  return new Promise(res => {
    const image = new Image()
    image.onload = () => res(true)
    image.onerror = () => res(false)
    image.src = src
  })
}

export const myLogo = (type, projectId, category, size) => {
  const src = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${category}/${type}/${projectId}.png`
  if (imageExist) {
    return <Avatar
      size={size}
      src={src}
      preview={false}
    />
  } else {
    return false
  }
}

