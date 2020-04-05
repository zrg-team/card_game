import firebase from '../helplers/firebase'
import store from '../helplers/globalStore'

export function createRoom (game) {
  const user = store.get('user')
  if (!user || !user.uid) {
    return
  }
  return firebase
    .functions
    .httpsCallable('games-createRoom')
    ({
      game,
      player: 4
    })
    .then(result => {
      console.log('createRoom', result)
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function getRooms (game) {
  const user = store.get('user')
  if (!user || !user.uid) {
    return
  }
  return firebase
    .db
    .collection('rooms')
    .get()
    .then(result => {
      console.log('getRooms', result)
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage, empty: true }
    })
}
