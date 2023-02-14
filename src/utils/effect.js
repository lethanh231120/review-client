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

export const copyContractAddress = (e, address) => {
  e.stopPropagation()
  e.preventDefault()
  navigator.clipboard.writeText(address)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })

  Toast.fire({
    icon: 'success',
    title: 'Copy address successfully !'
  })
}
