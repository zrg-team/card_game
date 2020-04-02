class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'Menu'
    })
  }

  preload () {
  }

  create () {
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)

    this.input.on('pointerdown', () => {
      this.startGame()
    })
  }

  update (time, delta) {
    if (this.startKey.isDown) {
      this.startGame()
    }
  }

  startGame () {
    this.scene.start('Scene1')
  }
}

export default MenuScene
