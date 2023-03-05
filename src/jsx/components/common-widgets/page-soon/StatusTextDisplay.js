import { txtAbsentTakeUpData } from '../../../constants/data'
import { displayOngoing, displayPast, displayUpcoming, statusOngoing, statusPast, statusUpcoming } from '../../../constants/page-soon'

export const StatusTextDisplay = ({ status }) => {
  switch (status) {
    case statusUpcoming:
      return displayUpcoming
    case statusOngoing:
      return displayOngoing
    case statusPast:
      return displayPast
    default:
      return txtAbsentTakeUpData
  }
}
