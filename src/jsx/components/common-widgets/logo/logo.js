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

export const myLogo = (type, projectId, category, size) => {
  const src = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${category}/${type}/${projectId}.png`

  return <Avatar
    size={size}
    src={src}
    preview={false}
  />
}

