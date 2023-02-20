import { Avatar } from 'antd'

// const imageExist = (src) => {
//   var obj = new Image()
//   obj.src = src

//   if (obj.complete) {
//     return true
//   } else {
//     return false
//   }
// }

// const imageExists = (image_url) => {
//   var http = new XMLHttpRequest()

//   http.open('HEAD', image_url, false)
//   http.send()

//   return http.status !== 404
// }

export const myLogo = (type, projectId, category, size) => {
  const src = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${category}/${type}/${projectId}.png`
  return <Avatar
    size={size}
    src={src}
    alt='No Image'
    preview={false}
  />
}

