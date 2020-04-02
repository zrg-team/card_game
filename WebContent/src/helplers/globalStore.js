class Storage {
  constructor () {
    this.data = {}
    this.game = null
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
