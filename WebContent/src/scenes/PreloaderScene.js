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

    const loadingBg = this.add
      .sprite(world.centerX, world.centerY + 100, 'loading-background')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(360, 16)

    const progress = this.add.graphics()
    this.load.on('progress', function (value) {
      progress.clear()
      progress.fillStyle(0xFF1D24, 1)
      progress.fillRoundedRect(
        loadingBg.x - (360 * 0.5) + 2,
        loadingBg.y - (16 * 0.5) + 2,
        355 * (value < 0.05 ? 0.05 : value),
        12,
        6)
    })
    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('MenuScene')
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
