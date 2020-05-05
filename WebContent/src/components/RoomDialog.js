import dayjs from 'dayjs'
import { createLabel, createButton, createToast, createLoading } from '../helplers/ui'
import { getRooms, createRoom, joinRoom } from '../services/game'

export default function generateRoomDialog (scene, store, option = {}) {
  let loading = false
  let done = false
  let selectedRoom = null
  const roomList = []

  let panel = null
  let background = null
  let buttons = null
  let roomInfoText = null

  const destroyAll = () => {
    roomList.forEach(item => {
      if (item) {
        item.setVisible(false)
        item.destroy()
        item = null
      }
    })
    if (panel) {
      panel.setVisible(false)
      panel.destroy()
      panel = null
    }
    if (background) {
      background.setVisible(false)
      background.destroy()
      background = null
    }
    if (buttons) {
      buttons.setVisible(false)
      buttons.destroy()
      buttons = null
    }
    if (roomInfoText) {
      roomInfoText.setVisible(false)
      roomInfoText.destroy()
      roomInfoText = null
    }
  }

  const SIZES = {
    MAIN_PANEL_WIDTH: store.width * 0.7,
    SUB_PANEL_WIDTH: store.width * 0.3,
    INFOMATION_HEIGHT: store.height - store.height * 0.3,
    BUTTON_CONTAINER: store.height * 0.3
  }
  background = scene.add
    .image(store.width / 2, store.height / 2, 'gamelist-bg')
    .setDisplaySize(store.width, store.height)
    .setDepth(99)

  panel = scene.rexUI.add.scrollablePanel({
    x: 0,
    y: 0,
    width: SIZES.MAIN_PANEL_WIDTH,
    height: store.height,

    scrollMode: 0,

    panel: {
      child: scene.rexUI.add.fixWidthSizer({
        space: {
          left: 3,
          right: 3,
          top: 3,
          bottom: 3,
          item: 8,
          line: 8
        },
        rtl: true
      }),

      mask: {
        padding: 1
      }
    },

    slider: {
      track: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 20, 0xe0c48f),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xFFFFFF)
    },

    space: {
      left: 15,
      right: 15,
      top: 20,
      bottom: 20,

      panel: 10,
      footer: 10
    }
  })
  .setOrigin(0, 0)
  .layout()

  buttons = scene.rexUI.add
    .sizer({
      orientation: 'y',
      x: store.width * 0.7,
      y: store.height - SIZES.BUTTON_CONTAINER,
      width: SIZES.BUTTON_CONTAINER,
      height: SIZES.BUTTOUN_CONTAINER,
    })
    .add(createButton(
      scene,
      'Join Room',
      {
        backgroundColor: 0xe0c48f,
        button: {
          width: SIZES.SUB_PANEL_WIDTH - 10,
          space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        onPress: (button) => {
          if (loading || !selectedRoom) {
            return
          }
          loading = true
          const loadingComponent = createLoading(scene, 'Joining...', store)
          console.time('[START_JOIN]')
          return joinRoom('maubinh', selectedRoom.id)
            .then((result) => {
              done = true
              console.timeEnd('[START_JOIN]')
              if (result.errorCode) {
                createToast(scene, store.width / 2, store.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show(result.errorMessage)
              } else {
                // destroyAll()
                createToast(scene, store.width / 2, store.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show(`Joined to room ${selectedRoom.title}.`)
                option.onJoinRoom(selectedRoom)
              }
              loadingComponent.setVisible(false)
              loadingComponent.destroy()
            })
        }
      }
    ).setDepth(9999), 1)
    .add(createButton(
      scene,
      'Create Room',
      {
        backgroundColor: 0xe0c48f,
        button: {
          width: SIZES.SUB_PANEL_WIDTH - 10,
          space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        onPress: (button) => {
          if (loading) {
            return
          }
          loading = true
          const loadingComponent = createLoading(scene, 'Creating...', store)
          return createRoom('maubinh').then((result) => {
            if (result.errorCode) {
              createToast(scene, store.width / 2, store.height - 40)
                .setOrigin(0.5, 0.5)
                .show(result.errorMessage)
            } else {
              destroyAll()
              createToast(scene, store.width / 2, store.height - 40)
                .setOrigin(0.5, 0.5)
                .show('Room create.')
              if (option.onCreateRoomSuccess) {
                option.onCreateRoomSuccess(result)
              }
            }
            loadingComponent.setVisible(false)
            loadingComponent.destroy()
          })
        }
      }
    ).setDepth(9999), 1)
    .add(createButton(
      scene,
      'Cancel',
      {
        backgroundColor: 0xe0c48f,
        button: {
          width: SIZES.SUB_PANEL_WIDTH - 10,
          space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        onPress: destroyAll
      }
    ).setDepth(9999), 1)
    .setOrigin(0, 0)
    .layout()

  return getRooms()
    .then((result) => {
      if (!panel || done) {
        return
      }
      const sizerList = panel.getElement('panel')
      if (!result.empty) {
        const itemWidth = SIZES.MAIN_PANEL_WIDTH - 90
        const itemHeight = itemWidth * 0.08
        result.forEach(doc => {
          const room = {
            id: doc.id,
            ...doc.data()
          }
          const status = room.players.includes(store.user.uid)
              ? '(joined)'
              : ''
          const item = createLabel(
            panel.scene,
            `${room.title} - ${room.players.length}/${room.playerCount} ${status}`,
            {
              label: {
                x: 0,
                y: 0,
                width: itemWidth,
                height: itemHeight,
                space: {
                  left: 18,
                  right: 18,
                  top: 30,
                  bottom: 30
                }
              },
              text: {
                style: {
                  fontSize: '34px'
                }
              },
              backgroundComponent: scene.rexUI.add
                .roundRectangle(0, 0, 100, 40, 20, 0x0e0d0b)
                .setStrokeStyle(2, 0xe1b884)
            })
            .setInteractive()
            .on('pointerdown', function () {
              scene.tweens.add({
                targets: this,
                scaleX: 0.92,
                ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 200,
                repeat: 0, // -1: infinity
                yoyo: true
              })
              selectedRoom = room
              if (roomInfoText) {
                roomInfoText.setVisible(false)
                roomInfoText.destroy()
              }
              roomInfoText = scene.add.text(
                SIZES.MAIN_PANEL_WIDTH,
                0,
                `
⚜️ ${selectedRoom.title} ⚜️

🏷️ Draw: ${selectedRoom.draw} 🏷️
⏱️ Created Date ⏱️
${dayjs(selectedRoom.createDate).format('DD-MM-YYYY HH:mm')}

👤 Players 👤
+ ${selectedRoom.playerNames.join('\n +')}


`,
                {
                  font: '24px',
                  align: 'center',
                  fixedWidth: SIZES.SUB_PANEL_WIDTH,
                  fixedHeight: SIZES.INFOMATION_HEIGHT,
                  wordWrap: {
                    width: SIZES.SUB_PANEL_WIDTH,
                    useAdvancedWrap: true
                  }
                }
              )
              .setOrigin(0, 0)
              .setDepth(998)
            }).setDepth(998)
          roomList.push(item)
          sizerList.add(item)
        })
      }
      panel.layout().setDepth(999)
      return panel
    })
}
