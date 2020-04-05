import { createLabel, createButton, createToast } from '../helplers/ui'
import { getRooms, createRoom } from '../services/game'

export default function generateRoomDialog (scene, world, option = {}) {
  let loading = false
  const panel = scene.rexUI.add.scrollablePanel({
    x: 400,
    y: 220,
    width: 600,
    height: 400,

    scrollMode: 0,

    background: scene.add.image(0, 0, 'gamelist-bg'),

    panel: {
        child: scene.rexUI.add.fixWidthSizer({
          space: {
              left: 3,
              right: 3,
              top: 3,
              bottom: 3,
              item: 8,
              line: 8,
          },
          rtl: true
        }),

        mask: {
            padding: 1
        },
    },
    footer: scene.rexUI.add
      .sizer({
        orientation: 'x'
      })
      .add(createButton(
        scene,
        'Cancel',
        {
          backgroundColor: 0xe0c48f,
          button: {
            space: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            }
          },
          onPress: (button) => {
            panel.setVisible(false)
            panel.destroy()
            panel = null
          }
        }
      ), 1)
      .add(createButton(
        scene,
        'Create Room',
        {
          backgroundColor: 0xe0c48f,
          button: {
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
            return createRoom('maubing').then((result) => {
              if (result.errorCode) {
                loading = false
                createToast(scene, world.width / 2, world.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show(result.errorMessage)
              } else {
                panel.setVisible(false)
                panel.destroy()
                panel = null
                createToast(scene, world.width / 2, world.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show('Room create.')
                if (option.onSuccess) {
                  option.onSuccess(result)
                }
              }
            })
          }
        }
      ), 1)
    ,

    slider: {
        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xe0c48f),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xFFFFFF),
    },

    space: {
        left: 15,
        right: 15,
        top: 20,
        bottom: 20,

        panel: 10,
        footer: 10
    }
  }).layout()

  return getRooms()
    .then((result) => {
      const sizerList = panel.getElement('panel')
      if (!result.empty) {
        result.forEach(doc => {
          const room = doc.data()
          sizerList.add(
            createLabel(panel.scene, room.title, {
              label: {
                x: 0,
                y: 0,
                width: 520,
                height: 40,
                space: {
                  left: 15,
                  right: 15,
                  top: 20,
                  bottom: 20
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
                scaleX: 1,
                scaleY: 1,
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 800,
                repeat: 0, // -1: infinity
                yoyo: false
              })
            })
          )
        })
      }  
      panel.layout()
      return panel
    })

}
