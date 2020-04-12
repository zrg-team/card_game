import firebase from '../helplers/firebase'

export const getPlayersInfo = async (game, room) => {
  return firebase.db.collection('rooms').doc(room.id)
    .collection('users')
    .get()
    .then(function(data) {
      const players = [];

      data.forEach(function(doc) {
        const player = {
          name: doc.data().name,
          balance: doc.data().balance,
        }
        players.push(player);
      });

      return players;
    })
    .catch(err => {
      debugger;
      console.log('can not get players info', err)
      return [];
    })
}