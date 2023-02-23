export const pair1 = [' ', '-']

export const encodeUrl = (url) => {
  if (url) {
    url = url.replaceAll(pair1[0], pair1[1])
  }
  return url
}

export const decodeUrl = (url) => {
  if (url) {
    url = url.replaceAll(pair1[1], pair1[0])
  }
  return url
}
