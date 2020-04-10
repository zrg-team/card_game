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

let unsubscribeRoom = null;
let onRoomInfoChange = null

export function setOnRoomInfoChange (func) {
  onRoomInfoChange = func
}

export function watchRoomInfo (roomId) {
  if (unsubscribeRoom) {
    unsubscribeRoom()
  }
  unsubscribeRoom = firebase.db.collection('rooms').doc(roomId)
    .onSnapshot(function (doc) {
      store.set('rooms', doc.data())
      store.localStorageSet('rooms', JSON.stringify(doc.data()))
      if (onRoomInfoChange) {
        onRoomInfoChange(doc.data())
      }
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

export function readyToPlay (game, room) {
  return firebase
    .functions
    .httpsCallable('games-readyToPlay')
    ({
      id: room.id,
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

export function endGame (game, room) {
  return firebase
    .functions
    .httpsCallable('games-endGame')
    ({
      id: room.id,
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

export function getUserCards (game, roomId, user) {
  firebase.db.collection('rooms').doc(roomId)
    .collection('users')
    .doc(user)
    .get()
    .then(result => {
      return result.data()
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}