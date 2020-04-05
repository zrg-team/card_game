import store from '../helplers/globalStore'
import { parseJSON } from '../helplers/json'

class BootScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'BootScene'
    })
  }

  preload () {
    this.load.image('background', 'assets/images/bg.png')
    this.load.image('logo-card', 'assets/images/logo-card.png')
    this.load.image('loading-background', 'assets/images/loading-background.png')
  }

  create () {
    const user = parseJSON(store.localStorageGet('user'))
    const information = parseJSON(store.localStorageGet('information'))

    store.setAll({
      width: this.cameras.main.width,
      height: this.cameras.main.height,
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY,
      user,
      information
    })
    this.scene.start('PreloaderScene')
  }
}

export default BootScene
