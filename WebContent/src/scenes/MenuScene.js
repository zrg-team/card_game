import { createButton } from '../helplers/button'
import store from '../helplers/globalStore'

class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'MenuScene'
    })
    this.handleStart = this.handleStart.bind(this)
  }

  preload () {
  }

  create () {
    const world = store.getAll()
    // Create UI
    this.bg = this.add
      .sprite(0, 0, 'main-background')
      .setOrigin(0, 0)
      .setDisplaySize(800, 450)

    this.createTopPanel(world)

    this.title = this.add
      .sprite(world.centerX, world.centerY + 15, 'logo-game')
      .setOrigin(0.5, 0.5)
      .setScale(0.18, 0.18)

    this.tweens.add({
      targets: this.title,
      scale: this.title.scale + 0.09,
      duration: 1800,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.buttonSfx = this.sound.add('sound-click')

        this.playNowButton = this.add
          .sprite(world.centerX, world.centerY + 50, 'playnow')
          .setOrigin(0.5, 0.5)
          .setScale(0.4, 0.4)
          .setInteractive()
          .on('pointerdown', this.handleStart)

        this.tweens.add({
          targets: this.playNowButton,
          scale: this.playNowButton.scale - 0.05,
          duration: 1000,
          ease: 'Sine.easeInOut',
          yoyo: 1,
          loop: -1,
          delay: 0
        })

        this.tweens.add({
          targets: this.title,
          y: this.title.y - 10,
          duration: 4200,
          ease: 'Sine.easeInOut',
          yoyo: 1,
          loop: -1,
          delay: 0
        })
      }
    })

    const text = this.add.text(world.width - 100, world.height - 16, '© 2020 Zrg-team', { font: '10px' })
  }

  createTopPanel (world) {
    this.topPanel = this.add
      .sprite(-1, 0, 'top-panel')
      .setOrigin(0, 0)
      .setDisplaySize(801, 60)

    this.userPanel = this.add
      .sprite(0, 0, 'user-panel')
      .setOrigin(0, 0)
      .setDisplaySize(270, 64)

    this.userIcon = this.add
      .sprite(4, 5, 'user-icon')
      .setOrigin(0, 0)
      .setDisplaySize(56, 56)

    this.userLogin = this.add
      .sprite(106, 30, 'login-button')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(80, 26)

    this.tweens.add({
      targets: this.userLogin,
      scale: this.userLogin.scale - 0.01,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: 1,
      loop: -1,
      delay: 0
    })

    this.userSignup = this.add
      .sprite(196, 30, 'register-button')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(80, 26)

    this.tweens.add({
      targets: this.userSignup,
      scale: this.userSignup.scale - 0.01,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: 1,
      loop: -1,
      delay: 0
    })

    this.userSetting = this.add
      .sprite(world.width - 35, 30, 'setting-button')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 50)
  }

  handleStart () {
    console.log('handleStart')
    this.buttonSfx.play({
      loop: false
    })
  }

  update (time, delta) {
    // if (this.startKey.isDown) {
    //   this.startGame()
    // }
  }

  startGame () {
    this.scene.start('Scene1')
  }
}

export default MenuScene
