import store from '../helplers/globalStore'
import { RESOURCES } from '../config'
import { getImageScale } from '../helplers/size'

class PreloaderScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'PreloaderScene'
    })
  }

  preload () {
    this.add.sprite(0, 0, 'background').setOrigin(0, 0)
    const world = store.getAll()
    const logoGame = this.add
      .sprite(world.centerX, world.centerY - 45, 'logo-card')
      .setOrigin(0.5, 0.5)
      .setScale(0.15, 0.15)

    this.tweens.add({
      targets: logoGame,
      scale: logoGame.scale - 0.01,
      duration: 2200,
      ease: 'Sine.easeInOut',
      yoyo: 1,
      loop: -1,
      delay: 0
    })

    const loadingBg = this.add
      .sprite(world.centerX, world.centerY + 100, 'loading-background')
      .setOrigin(0.5, 0.5)
    loadingBg.setScale(1, 1)

    const progress = this.add.graphics()
    this.load.on('progress', function (value) {
      progress.clear()
      progress.fillStyle(0xFF1D24, 1)
      progress.fillRoundedRect(
        loadingBg.x - (loadingBg.width * 0.5) + 10,
        loadingBg.y - (loadingBg.height * 0.5) + 12,
        310 + value,
        25,
        6)
    })
    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Scene1')
    })

    for (const method in RESOURCES) {
      RESOURCES[method].forEach((args) => {
        const loader = this.load[method].bind(this.load)
        loader(...args.load)
      })
    }
  }

  create () {
  }
}

export default PreloaderScene
