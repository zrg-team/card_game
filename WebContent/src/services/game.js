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

let unsubscribeRoom = null
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
      const roomInfo = doc.data()
      roomInfo.id = roomId

      if (onRoomInfoChange) {
        onRoomInfoChange(roomInfo)
      }
    })
}

export function randomAllCards (roomInfo) {
  const user = store.get('user')
  if (!user || !user.uid) {
    return
  }
  return firebase
    .functions
    .httpsCallable('games-randomAllCards')
    ({
      ...roomInfo
    })
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

export function submitCards (game, room, cards) {
  return firebase
    .functions
    .httpsCallable('games-submitCards')
    ({
      id: room.id,
      game,
      cards,
    })
    .then(result => {
      return result
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function getUserCards (game, roomId) {
  const user = store.get('user')
  return firebase.db.collection('rooms').doc(`${roomId}`)
    .collection('users')
    .doc(user.uid)
    .get()
    .then(result => {
      return result.data()
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export const deletePlayerFromRoom = (game, room, user) => {
  firebase.db.collection('rooms').doc(room.id).collection('users').doc(user.uid).delete().then(function (result) {
    return result.data()
  }).catch(function (err) {
    const errorCode = err.code
    const errorMessage = err.message
    return { errorCode, errorMessage }
  })

  const newPlayers = room.players.filter(player => player !== user.uid)
  firebase.db.collection('rooms').doc(room.id).update({
    players: newPlayers
  }).then(function (result) {
    return result.data()
  }).catch(function (err) {
    const errorCode = err.code
    const errorMessage = err.message
    return { errorCode, errorMessage }
  })
}

export const getResult = async (game, room) => {
  return firebase.db.collection('rooms').doc(room.id)
    .collection('users')
    .get()
    .then(function (data) {
      const result = {
        cards: [],
        draw: [],
      }

      data.forEach(function (doc) {
        const obj = {
          name: doc.data().name,
          balance: doc.data().balance
        }
        result.cards.push(doc.data().cards)
        result.draw.push(doc.data().draw)
      })

      return result
    })
    .catch(err => {
      console.log('can not get players info', err)
      return []
    })
}