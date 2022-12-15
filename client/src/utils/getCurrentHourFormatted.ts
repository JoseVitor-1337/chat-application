type time = string | number

export default function getCurrentHourFormatted() {
  const date = new Date()

  let hour: time = date.getHours()
  let minutes: time = date.getMinutes()

  hour = hour < 10 ? `0${hour}` : hour
  minutes = minutes < 10 ? `0${minutes}` : minutes

  const time = `${hour}:${minutes}`

  return time
}
