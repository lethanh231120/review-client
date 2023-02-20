import { Avatar } from 'antd'

// const imageExist = async(src) => {
//   if (!src) {
//     return false
//   }
//   return new Promise(res => {
//     const image = new Image()
//     image.onload = () => res(true)
//     image.onerror = () => res(false)
//     image.src = src
//   })
// }

const imageExists = (image_url) => {
  var http = new XMLHttpRequest()

  http.open('HEAD', image_url, false)
  http.send()

  return http.status !== 404
}

export const myLogo = async(type, projectId, category, size) => {
  const src = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${category}/${type}/${projectId}.png`
  const isExxist = await imageExists(src)
  if (isExxist) {
    return <Avatar
      size={size}
      src={src}
      preview={false}
    />
  } else {
    return false
  }
}

