import firebase from '../helplers/firebase'

export const getPlayersInfo = async (game, room) => {
  const players = room.players
  const playerInfo = []
  await firebase.db
    .collection('rooms')
    .doc(`${room.id}`)
    .collection('users')
    .get()
    .then(result => {
      if (!result.empty) {
        result.forEach(item => {
          const data = item.data()
          playerInfo.push({
            name: data.name,
            balance: data.balance
          })
        })
      }
    }).catch(err => {
      console.log(err)
    })
  return playerInfo;
}
