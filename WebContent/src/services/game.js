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

export function getRoomInfo (game, roomId) {
  return firebase.db.collection('rooms').doc(roomId)
    .get()
    .then(result => {
      return { ...result.data(), id: roomId }
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage, empty: true }
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

export async function submitCards (game, room, cards) {
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
  return firebase
    .functions
    .httpsCallable('games-exitRoom')
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

export const getResult = async (game, room) => {
  const players = room.players
  
  const result = {
    cards: [],
    draw: []
  }
  console.log(room)
  for (let i = 0; i < players.length; i++) {
    await firebase.db.collection('rooms').doc(`${room.id}`)
    .collection('users')
    .doc(players[i])
    .get()
    .then(res => {
      const cards =  res.data().cards
      const draw = res.data().draw
     
      result.cards.push(cards)
      result.draw.push(draw)
    })
    .catch(err => {
      console.log('can not get players info', err)
    })
  }
  console.log(result)

  return result
}