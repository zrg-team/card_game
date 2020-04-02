import store from '../helplers/globalStore'

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
    store.setAll({
      width: this.cameras.main.width,
      height: this.cameras.main.height,
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY
    })
    this.scene.start('PreloaderScene')
  }
}

export default BootScene
