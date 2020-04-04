class Storage {
  constructor () {
    this.data = {}
    this.game = null
  }

  localStorageSet (key, value) {
    return localStorage.setItem(key, value)
  }

  localStorageGet (key) {
    return localStorage.getItem(key)
  }

  localStorageDelete (key) {
    return localStorage.removeItem(key)
  }

  init (game) {
    this.game = game
  }

  set (key, value) {
    this.data[key] = value
  }

  get (key) {
    return this.data[key]
  }

  setAll (data) {
    this.data = {
      ...this.data,
      ...data
    }
  }

  getAll () {
    return this.data
  }

  delete (key) {
    delete this.data[key]
  }

  clear () {
    this.data = {}
  }
}

export default new Storage()
