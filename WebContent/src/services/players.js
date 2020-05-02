import firebase from '../helplers/firebase'

export const getPlayersInfo = async (game, room) => {
  const players = room.players
  const playerInfo = []
  for (let i = 0; i < players.length; i++) {
    await firebase.db.collection('rooms').doc(`${room.id}`)
    .collection('users')
    .doc(players[i])
    .get()
    .then(result => {
      const player = {
        name: result.data().name,
        balance: result.data().balance
      }
      playerInfo.push(player)
    }).catch(err => {
      console.log(err)
      return playerInfo
    })
  }
  return playerInfo;
}
