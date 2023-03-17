import Swal from 'sweetalert2'

export const openWebsite = (link, setLoading, waitTime) => {
  setLoading(true)
  setTimeout(() => {
    if (link) {
      window.open(link, '_blank')
    }
    setLoading(false)
  }, waitTime)
}

const toastMesage = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })

  Toast.fire({
    icon: 'success',
    title: message
  })
}

export const copyAddress = async(e, value, message) => {
  e.stopPropagation()
  e.preventDefault()
  const text = new Blob([`${value}`], { type: 'text/plain' })
  const item = new ClipboardItem({
    'text/plain': text
  })
  navigator.clipboard.write([item])
  toastMesage(message)
}

