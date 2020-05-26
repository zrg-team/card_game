const button = document.getElementById('toggle')

button.addEventListener('click', function () {
  const elem = document.getElementById('game-container')

  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen()
  }
})
watchFullScreen(function () {
  if(window.innerHeight > window.innerWidth){
    const prefix = 'orientation' in window.screen ? 'orientation' :
      'mozOrientation' in window.screen ? 'mozOrientation' :
      'msOrientation' in window.screen ? 'msOrientation' :
      null
    if (prefix) {
      window.screen[prefix].lock('landscape')
    } else {
    }
  }
})
function watchFullScreen (func) {
  const arr = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange']
  arr.forEach(
    eventType => {
      try {
        document.removeEventListener(eventType, func, false)
        document.addEventListener(eventType, func, false)
      } catch (err) {
      }
    }
  )
}