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
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function joinRoom (game, roomId) {
  const user = store.get('user')
  if (!user || !user.uid) {
    return
  }
  return firebase
    .functions
    .httpsCallable('games-joinRoom')
    ({
      id: roomId,
      game
    })
    .then(result => {
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function getRooms (game) {
  return firebase
    .db
    .collection('rooms')
    .get()
    .then(result => {
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage, empty: true }
    })
}

export function randomAllCards () {
  const user = store.get('user')
  if (!user || !user.uid) {
    return
  }
  return firebase
    .functions
    .httpsCallable('games-randomAllCards')
    ()
    .then(result => {
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}