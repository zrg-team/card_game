import store from '../helplers/globalStore'
import generateRegisterDialog from '../components/RegisterDialog'
import generateLoginDialog from '../components/LoginDialog'
import generateRoomDialog from '../components/RoomDialog'
import { createConfirmPopup } from '../helplers/ui'
import { setOnUserInformationChange, wathUserChangeInfo, logout } from '../services/auth'

class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'MenuScene'
    })
    this.wathUserInformation = this.wathUserInformation.bind(this)
    this.handleFullscreen = this.handleFullscreen.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  preload () {
  }

  create () {
    this.createZoomButton()
    this.watchFullScreen(() => {
      this.createZoomButton()
    })
    this.world = store.getAll()
    // Create UI
    this.bg = this.add
      .image(0, 0, 'main-background')
      .setOrigin(0, 0)
      .setDisplaySize(this.world.width, this.world.height)

    this.buttonSfx = this.sound.add('sound-click')

    this.createTopPanel(this.world)

    this.createGamesPanel(
      [
        {
          id: 'maubinh',
          title: 'MẬU BINH',
          icon: 'icon-mau-binh',
          // scale: [0.8, 0.8],
          size: [220, 220],
          onClick: () => {
            generateRoomDialog(this, store.getAll())
          }
        },
        {
          id: 'poker',
          title: 'POKER',
          icon: 'icon-poker',
          // scale: [0.6, 0.6],
          size: [220, 220],
          onClick: () => {}
        }
      ]
    )
    
    this.add.text(this.world.width - 100, this.world.height - 16, '© 2020 Zrg-team', { font: '10px' })
  }

  createTopPanel (world) {
    this.topPanel = this.add
      .image(-1, 0, 'top-panel')
      .setOrigin(0, 0)
      .setDisplaySize(801, 60)

    this.userPanel = this.add
      .image(0, 0, 'user-panel')
      .setOrigin(0, 0)
      .setDisplaySize(270, 64)

    this.userIcon = this.add
      .image(4, 5, 'user-icon')
      .setOrigin(0, 0)
      .setDisplaySize(56, 56)

    this.createUserPanel()
  }

  createUserPanel () {
    const user = store.get('user')

    if (this.userLogin) {
      this.userLogin.destroy()
    }
    if (this.userSignup) {
      this.userSignup.destroy()
    }
    if (this.userBalance) {
      this.userBalance.destroy()
    }
    if (this.userLogout) {
      this.userLogout.destroy()
    }

    if (user) {
      this.createUserInformationPanel()
    } else {
      this.userLogin = this.add
        .image(115, 30, 'login-button')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(100, 34)
        .setInteractive()
        .on('pointerdown', this.handleLogin)

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
        .image(196, 30, 'register-button')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(100, 34)
        .setInteractive()
        .on('pointerdown', this.handleRegister)

      this.tweens.add({
        targets: this.userSignup,
        scale: this.userSignup.scale - 0.01,
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: 1,
        loop: -1,
        delay: 0
      })
    }
  }

  createUserInformationPanel () {
    const userStore = store.get('information') || {}
    this.userBalance = this.add.text(
      100,
      16,
      `${userStore.balance} 💎`,
      {
        fontSize: '24px'
      }
    )
    this.userLogout = this.add
        .image(240, 30, 'dialog-close')
        .setScale(0.8, 0.8)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', this.handleLogout)
    wathUserChangeInfo(this.world.user.uid)
    setOnUserInformationChange(this.wathUserInformation)
  }

  createGamesPanel (data = []) {
    const world = store.getAll()
    this.scrollableGamesPanel = this.rexUI.add.scrollablePanel({
      x: world.width / 2,
      y: (world.height - 60) / 2 + 60,
      width: world.width,
      height: world.height - 60,
      scrollMode: 1,
      // background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x4e342e),
      panel: {
        child: this.rexUI.add.sizer({
          orientation: 'x'
        }),
        mask: {
          padding: 1
        }
      },
      slider: {
        track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x00000),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xe1b884)
      },
      // scroller: true,
      space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,

          panel: 10,
      }
    })
      .layout()
      // .drawBounds(this.add.graphics(), 0xff0000)

    this.createGameItems(this.scrollableGamesPanel, data)
  }

  createGameItems (panel, data) {
    const sizerList = panel.getElement('panel')

    const len = data.length
    for (let i = 0; i < len; i++) {
      sizerList.add(
        this.createGameItem(panel, data[i]), // child
        0, // proportion
        'top', // align
        {
          right: 8
        }, // paddingConfig
        true // expand
      )
    }
    panel.layout();
    return panel;
  }

  createGameItem (panel, item) {
    const scene = panel.scene

    const contentHeight = panel.displayHeight - 10
    const contentWidth = 250


    const sizer = scene.rexUI.add.sizer({
      orientation: 'v',
      width: contentWidth,
      height: contentHeight
    })
      .addBackground(
        scene.add
          .image(0, 0, 'game-background')
          .setDisplaySize(contentWidth, contentHeight)
          .setOrigin(0, 0)
      ).add(
        scene.add.text(-contentWidth /2 + 20, -contentHeight / 2 + 36, item.title), // child
        null, // proportion
        'center', // align
        {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, // paddingConfig
        true // expand
      )
      .add(
        scene.add
          .image(0, 22, item.icon)
          .setDisplaySize(contentWidth - 20, contentHeight - 110)
          .setOrigin(0.5, 0.5)
          .setInteractive()
          .on('pointerdown', function () {
            scene.tweens.add({
              targets: this,
              alpha: { from: 0, to: 1 },
              duration: 200,
              ease: 'Sine.easeInOut',
              yoyo: 0,
              loop: 0,
              delay: 0
            })
            if (item.onClick) {
              item.onClick(item)
            }
          }),
        null, // proportion
        'left', // align
        0, // paddingConfig
        true, // expand
      )

    return sizer
  }

  handleFullscreen () {
    this.buttonSfx.play({
      loop: false
    })
    this.tweens.add({
      targets: this.userSetting,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0,
      yoyo: true
    })
    this.scale.stopFullscreen()
  }

  handleLogout () {
    const world = store.getAll()
    this.buttonSfx.play({
      loop: false
    })
    this.tweens.add({
      targets: this.userLogout,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0,
      yoyo: true
    })
    this.confirmLogoutDialog = createConfirmPopup(this, {
      common: {
        x: world.width / 2,
        y: world.height / 2
      },
      title: {
        title: 'Confirm'
      },
      content: {
        title: 'Do you want to logout ?'
      },
      onConfirm: () => {
        this.confirmLogoutDialog.setVisible(false)
        this.confirmLogoutDialog = null
        logout()
          .then(() => {
            this.createUserPanel()
          })
      },
      onCancel: () => {
        this.confirmLogoutDialog.setVisible(false)
        this.confirmLogoutDialog = null
      }
    })
  }

  createZoomButton () {
    const world = store.getAll()
    if(this.scale.isFullscreen) {
      this.userSetting = this.add
        .image(world.width - 35, 30, 'zoomout-button')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(50, 50)
        .setInteractive()
        .on('pointerdown', this.handleFullscreen)
    } else if (this.userSetting) {
      this.userSetting.destroy()
    }
  }

  handleRegister () {
    this.buttonSfx.play({
      loop: false
    })
    this.tweens.add({
      targets: this.userSignup,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0,
      yoyo: true
    })
    this.registerDialog = generateRegisterDialog(this, this.world)
  }

  handleLogin () {
    this.buttonSfx.play({
      loop: false
    })
    this.tweens.add({
      targets: this.userLogin,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0,
      yoyo: true
    })
    this.loginDialog = generateLoginDialog(
      this,
      this.world,
      {
        loginSuccess: (user) => {

          this.userLogin.removeAllListeners()
          this.userLogin.destroy()
          this.userSignup.removeAllListeners()
          this.userSignup.destroy()

          this.createUserInformationPanel()
        }
      }
    )
  }

  watchFullScreen (func) {
    const arr = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange']
    arr.forEach(
      eventType => {
        try {
          document.removeEventListener(eventType, func, false)
          document.addEventListener(eventType, func, false)
        } catch (err) {
        }
      }
    )
  }

  wathUserInformation () {
    const user = store.get('information')
    this.userBalance.text = `${user.balance} 💎`
  }

  update (time, delta) {
    // if (this.startKey.isDown) {
    //   this.startGame()
    // }
  }
}

export default MenuScene
