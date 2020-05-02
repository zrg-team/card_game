import store from '../helplers/globalStore'
import generateRegisterDialog from '../components/RegisterDialog'
import generateLoginDialog from '../components/LoginDialog'
import generateRoomDialog from '../components/RoomDialog'
import { createConfirmPopup } from '../helplers/ui'
import { setOnUserInformationChange, wathUserChangeInfo, logout } from '../services/auth'
import { getRoomInfo } from '../services/game'

class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'MenuScene'
    })
    this.wathUserInformation = this.wathUserInformation.bind(this)
    this.handleFullscreen = this.handleFullscreen.bind(this)
    this.createRoomDialog = this.createRoomDialog.bind(this)
    this.handleJoinRoom = this.handleJoinRoom.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  init () {
    const world = store.getAll()
    this.SIZES = {
      FONTSIZE: '34px',
      HEADER_HEIGHT: world.height * 0.125,
      GAME_LIST_HEIGHT: world.height - world.height * 0.125,
      USER_ICON_SIZE: world.width * 0.07,
      USER_LOGOUT_SIZE: world.width * 0.05,
      USER_PANEL_WIDTH: world.width * 0.34,
      USER_PANEL_HEIGH: world.height * 0.132,
      USER_HEADER_BUTTON_HEIGHT: world.height * 0.125,
      USER_HEADER_BUTTON_WIDTH: world.width * 0.125 - 40 * 4.5 / 3
    }
  }

  create () {
    this.createZoomButton()
    this.watchFullScreen(() => {
      this.createZoomButton()
    })
    this.world = store.getAll()
    // Create UI
    this.bg = this.add
      .image(0, 0, 'menu-bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.world.width, this.world.height)
      .setDepth(0)

    this.buttonSfx = this.sound.add('sound-click')

    this.createTopPanel(this.world)

    this.createGamesPanel(
      [
        {
          id: 'Scene1',
          title: 'MẬU BINH',
          scene: 'Scene1',
          icon: 'mau-binh',
          // scale: [0.8, 0.8],
          size: [220, 220],
          onClick: () => {
            const user = store.get('user')
            if (!user) {
              return
            }
            this.createRoomDialog('Scene1')
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

    this.add
      .text(
        this.world.width - 10,
        this.world.height - 5,
        '© 2020 Zrg-team',
        { font: '20px' }
      ).setOrigin(1, 1)
  }

  createRoomDialog (scene) {
    generateRoomDialog(this, store.getAll(), {
      onCreateRoomSuccess: () => this.createRoomDialog(scene),
      onJoinRoom: (room) => this.handleJoinRoom(scene, room)
    })
  }

  createTopPanel (world) {
    this.topPanel = this.add
      .image(-1, 0, 'top-panel')
      .setOrigin(0, 0)
      .setDisplaySize(world.width, this.SIZES.HEADER_HEIGHT)

    this.userPanel = this.add
      .image(0, 0, 'user-panel')
      .setOrigin(0, 0)
      .setDisplaySize(this.SIZES.USER_PANEL_WIDTH, this.SIZES.USER_PANEL_HEIGH)

    this.userIcon = this.add
      .image(5, 5, 'user-icon')
      .setOrigin(0, 0)
      .setDisplaySize(this.SIZES.USER_ICON_SIZE, this.SIZES.USER_ICON_SIZE)

    this.createUserPanel(world)
  }

  createUserPanel (world) {
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
      this.createUserInformationPanel(world)
    } else {
      this.userLogin = this.add
        .image(this.SIZES.USER_ICON_SIZE + 10, this.SIZES.HEADER_HEIGHT / 2, 'login-button')
        .setOrigin(0, 0.5)
        .setDisplaySize(
          this.SIZES.USER_HEADER_BUTTON_WIDTH,
          this.SIZES.USER_HEADER_BUTTON_HEIGHT
        )
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
        .image(
          this.SIZES.USER_ICON_SIZE + 40 + this.SIZES.USER_HEADER_BUTTON_WIDTH,
          this.SIZES.HEADER_HEIGHT / 2,
          'register-button'
        )
        .setOrigin(0, 0.5)
        .setDisplaySize(
          this.SIZES.USER_HEADER_BUTTON_WIDTH,
          this.SIZES.USER_HEADER_BUTTON_HEIGHT
        )
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

  createUserInformationPanel (world) {
    const userStore = store.get('information') || {}
    this.userBalance = this.add.text(
      this.SIZES.USER_ICON_SIZE + 25,
      this.SIZES.HEADER_HEIGHT / 2,
      `${userStore.balance} 💎`,
      {
        fontSize: this.SIZES.FONTSIZE
      }
    ).setOrigin(0, 0.5)
    this.userLogout = this.add
      .image(
        this.SIZES.USER_PANEL_WIDTH - this.SIZES.USER_LOGOUT_SIZE / 2,
        this.SIZES.HEADER_HEIGHT / 2,
        'dialog-close'
      )
      .setDisplaySize(this.SIZES.USER_LOGOUT_SIZE, this.SIZES.USER_LOGOUT_SIZE)
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
      y: this.SIZES.HEADER_HEIGHT + this.SIZES.GAME_LIST_HEIGHT / 2,
      width: world.width,
      height: this.SIZES.GAME_LIST_HEIGHT,
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

        panel: 10
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
    panel.layout()
    return panel
  }

  createGameItem (panel, item) {
    const scene = panel.scene

    const contentHeight = this.SIZES.GAME_LIST_HEIGHT - 10
    const contentWidth = contentHeight * 3 / 4.5
    const contentHeader = contentHeight * 0.125
    const imageHeight = contentHeight - contentHeader

    const sizer = scene.rexUI.add.sizer({
      orientation: 'v',
      width: contentWidth,
      height: contentHeight
    })
      .addBackground(
        scene.add
          .image(0, 0, 'game-bg-1')
          .setDisplaySize(contentWidth, contentHeight)
          .setOrigin(0, 0)
      ).add(
        scene.add
          .text(
            -contentWidth / 2 + 20,
            -contentHeight / 2 + contentHeader / 2,
            item.title,
            {
              fontSize: this.SIZES.FONTSIZE
            }
          ), // child
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
          .image(
            0,
            -imageHeight / 2 + contentHeader,
            item.icon
          )
          .setDisplaySize(contentWidth - 20, imageHeight - 70)
          .setOrigin(0.5, 0)
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
        true // expand
      )

    return sizer
  }

  async handleJoinRoom (scene, room) {
    // update latest room info
    const roomInfo = await getRoomInfo('maubinh', room.id)
    // TODO: Handle join game
    console.log('scene', scene, roomInfo)
    this.scene.start(scene, { room: roomInfo })
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
    this.confirmLogoutDialog = createConfirmPopup(this, world, {
      common: {
        x: world.width / 2,
        y: world.height / 2,
        width: world.width * 0.625,
        height: world.height * 0.4,
      },
      title: {
        title: 'Confirm',
        style: {
          fontSize: this.SIZES.FONTSIZE
        }
      },
      content: {
        title: 'Do you want to logout ?',
        style: {
          fontSize: this.SIZES.FONTSIZE
        }
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
    if (this.scale.isFullscreen) {
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
    this.userBalance.text = `${user && user.balance} 💎`
  }

  update (time, delta) {
  }
}

export default MenuScene
