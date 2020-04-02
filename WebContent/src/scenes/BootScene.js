import makeAnimations from '../helplers/animations'

class Boot extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'Boot'
    })
  }

  preload () {
    const progress = this.add.graphics()

    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60)
    })

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      // prepare all animations, defined in a separate file
      makeAnimations(this)
      progress.destroy()
      this.scene.start('Menu')
    })

    this.load.bitmapFont('font', '../../assets/fonts/font.png', '../../assets/fonts/font.fnt')
  }
}

export default Boot
