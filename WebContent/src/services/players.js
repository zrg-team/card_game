import firebase from '../helplers/firebase'
import { getRoomInfo } from '../services/game'

export const getPlayersInfo = async (game, room) => {
  const players = room.players
  
  const playerInfo = []

  for (let i = 0; i < players.length; i++) {
    await firebase.db.collection('rooms').doc(`${room.id}`)
    .collection('users')
    .doc(players[i])
    .get()
    .then(result => {
      if (!result.empty) {
        const data = result.data()
        playerInfo.push({
          name: data.name,
          balance: data.balance
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  return playerInfo;
}
