import firebase from '../helplers/firebase'
import store from '../helplers/globalStore'

export function register (email, password, displayName = '') {
  return firebase.auth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      return result.user
        .sendEmailVerification()
        .then(() => {
          return result.user.updateProfile({
            displayName: displayName || ''
          }).then((response) => {
            return result.user
          })
        })
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function logout () {
  store.delete('user')
  store.delete('information')
  store.localStorageDelete('user')
  store.localStorageDelete('information')
  return firebase.auth.signOut().then(() => {
    return true
  }).catch(err => {
    return false
  })
}

let unsubscribeUser = null
let onUserInformationChange = null

export function setOnUserInformationChange (func) {
  onUserInformationChange = func
}

export function wathUserChangeInfo (uid) {
  if (unsubscribeUser) {
    unsubscribeUser()
  }
  unsubscribeUser = firebase.db.collection('users').doc(uid)
    .onSnapshot(function (doc) {
      store.set('information', doc.data())
      store.localStorageSet('information', JSON.stringify(doc.data()))
      if (onUserInformationChange) {
        onUserInformationChange(doc.data())
      }
    })
}

export function login (email, password) {
  return firebase.auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user.toJSON()
      if (!user.emailVerified) {
        return firebase.auth.signOut().then(() => {
          return { errorCode: 100, errorMessage: 'Please verify your email.' }
        })
      }
      store.set('user', user)
      store.localStorageSet('user', JSON.stringify(user))
      const uid = firebase.auth.currentUser.uid
      return firebase.db
        .collection('users')
        .doc(`${uid}`)
        .get()
        .then(function (doc) {
          const userInformation = doc.data()
          userInformation.uid = uid
          store.set('information', userInformation)
          store.localStorageSet('information', JSON.stringify(userInformation))
          wathUserChangeInfo(`${uid}`)
          return {
            ...user,
            ...userInformation
          }
        })
        .catch(function(error) {
          return {
            errorCode: 101,
            errorMessage: error.message
          }
        })
    }).catch(err => {
      const errorCode = err.code
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}
