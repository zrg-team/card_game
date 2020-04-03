import { createLabel, createTextBox } from '../helplers/ui'

export default function generateRegisterDialog (game) {
  let dialog = game.rexUI.add.dialog({
    x: 400,
    y: 230,
    width: 500,
    height: 400,

    background: game.add.image(0, 0, 'dialog-bg'),

    title: createLabel(
        game,
        'REGISTER' ,
        {
          background: false,
          label: {
            x: 40,
            y: 40,
            align: 'center',
            space: {
              left: 54,
              right: 10,
              top: 60,
              bottom: 10
            }
          }
        }
      )
      .setDraggable(),

    toolbar: [
      game.add
        .image(0, 0, 'dialog-close')
        .setInteractive()
        .on('pointerdown', () => {
          dialog.setVisible(false)
        })
    ],

    leftToolbar: [
    ],

    choices: [
      createLabel(game, 'Email', {
        backgroundColor: 0x0e0d0b
      }),
      createTextBox(game, 0, 0, {
        fixedWidth: 100,
        fixedHeight: 20
      })
        .start('hello', 50),
      createLabel(game, 'Password', {
        backgroundColor: 0x0e0d0b
      })
    ],

    actions: [
      createLabel(game, 'Submit', { backgroundColor: 0xdcbf8a })
    ],

    space: {
      left: 20,
      right: 20,
      top: -20,
      bottom: -20,

      title: 25,
      titleLeft: 30,
      content: 25,
      description: 25,
      descriptionLeft: 20,
      descriptionRight: 20,
      choices: 25,

      toolbarItem: 5,
      choice: 15,
      action: 15
    },

    expand: {
      title: false
      // content: false,
      // description: false,
      // choices: false,
      // actions: true,
    },

    align: {
      title: 'center',
      // content: 'left',
      // description: 'left',
      // choices: 'left',
      actions: 'right' // 'center'|'left'|'right'
    },

    // click: {
    //   mode: 'release'
    // }
  })
    // .setDraggable('background') // Draggable-background
    .layout()
  // .drawBounds(this.add.graphics(), 0xff0000)
    .popUp(1000)

  var tween = game.tweens.add({
    targets: dialog,
    scaleX: 1,
    scaleY: 1,
    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 1000,
    repeat: 0, // -1: infinity
    yoyo: false
  })
  return dialog
}
