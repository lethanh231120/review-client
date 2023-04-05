export const getBrowserName = () => {
  const nAgt = navigator.userAgent
  let browserName = navigator.appName
  let fullVersion = '' + parseFloat(navigator.appVersion)
  let majorVersion = parseInt(navigator.appVersion, 10)
  let nameOffset, verOffset, ix

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
    browserName = 'Opera'
    fullVersion = nAgt.substring(verOffset + 6)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
  } else
  // In MSIE, the true version is after "MSIE" in userAgent
  if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
    browserName = 'Microsoft Internet Explorer'
    fullVersion = nAgt.substring(verOffset + 5)
  } else
  // In Chrome, the true version is after "Chrome"
  if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
    browserName = 'Chrome'
    fullVersion = nAgt.substring(verOffset + 7)
  } else
  // In Safari, the true version is after "Safari" or after "Version"
  if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
    browserName = 'Safari'
    fullVersion = nAgt.substring(verOffset + 7)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
  } else
  // In Firefox, the true version is after "Firefox"
  if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
    browserName = 'Firefox'
    fullVersion = nAgt.substring(verOffset + 8)
  } else
  // In most other browsers, "name/version" is at the end of userAgent
  if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset)
    fullVersion = nAgt.substring(verOffset + 1)
    if (browserName.toLowerCase() === browserName.toUpperCase()) {
      browserName = navigator.appName
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(';')) !== -1) { fullVersion = fullVersion.substring(0, ix) }
  if ((ix = fullVersion.indexOf(' ')) !== -1) { fullVersion = fullVersion.substring(0, ix) }

  majorVersion = parseInt('' + fullVersion, 10)
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion)
    majorVersion = parseInt(navigator.appVersion, 10)
  }

  return browserName
}

export const getBrowserFullVersion = () => {
  const nAgt = navigator.userAgent
  let fullVersion = '' + parseFloat(navigator.appVersion)
  const majorVersion = parseInt(navigator.appVersion, 10)
  let verOffset, ix

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
    fullVersion = nAgt.substring(verOffset + 6)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
  } else
  // In MSIE, the true version is after "MSIE" in userAgent
  if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
    fullVersion = nAgt.substring(verOffset + 5)
  } else
  // In Chrome, the true version is after "Chrome"
  if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
    fullVersion = nAgt.substring(verOffset + 7)
  } else
  // In Safari, the true version is after "Safari" or after "Version"
  if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
    fullVersion = nAgt.substring(verOffset + 7)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
  } else
  // In Firefox, the true version is after "Firefox"
  if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
    fullVersion = nAgt.substring(verOffset + 8)
  } else
  // In most other browsers, "name/version" is at the end of userAgent
  if (nAgt.lastIndexOf(' ') + 1 < nAgt.lastIndexOf('/')) {
    fullVersion = nAgt.substring(verOffset + 1)
  }
  // trim the fullVersion string at semicolon/space if present
  if (fullVersion.indexOf(';') !== -1) { fullVersion = fullVersion.substring(0, ix) }
  if (fullVersion.indexOf(' ') !== -1) { fullVersion = fullVersion.substring(0, ix) }

  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion)
  }

  return fullVersion
}

export const getBrowserMajorVersion = () => {
  const majorVersion = parseInt(navigator.appVersion, 10)
  return majorVersion
}

export const getBrowserUserAgent = () => {
  const userAgent = navigator.userAgent
  return userAgent
}

export const getBrowserAppName = () => {
  const appName = navigator.appName
  return appName
}
