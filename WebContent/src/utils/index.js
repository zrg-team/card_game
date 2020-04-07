export const delay = async (ms) => {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

export function formatCountdown (time) {
  const totalSeconds = parseInt(time, 10)
  let minutes = Math.floor((totalSeconds) / 60)
  let seconds = totalSeconds - (minutes * 60)

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}
