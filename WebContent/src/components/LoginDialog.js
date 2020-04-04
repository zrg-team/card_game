import { createLabel, createTextBox, createToast, createButton } from '../helplers/ui'
import { login } from '../services/auth'

export default function generateLoginDialog (game, world, option = {}) {
  let email = ''
  let password = ''
  let loading = false
  let dialog = game.rexUI.add.dialog({
    x: 400,
    y: 210,
    width: 480,
    height: 344,
    background: game.add.image(0, 0, 'dialog-bg'),
    title: createLabel(
      game,
      'LOGIN',
      {
        background: false,
        label: {
          x: 40,
          y: 40,
          align: 'center',
          space: {
            left: 82,
            right: 10,
            top: 55,
            bottom: 10
          }
        }
      ),
    toolbar: [
      game.add
        .image(0, 0, 'dialog-close')
        .setInteractive()
        .on('pointerdown', () => {
          dialog.setVisible(false)
          dialog = null
        })
    ],
    leftToolbar: [],
    choices: [
      createLabel(game, 'Email', {
        backgroundColor: null
      }),
      createTextBox(game, 0, 0, {
        fixedWidth: 440,
        fixedHeight: 45,
        styles: {
          padding: {
            left: 10
          }
        },
        onTextChanged: (objTxt, text) => {
          email = text
        }
      }),
      createLabel(game, 'Password', {
        backgroundColor: null
      }),
      createTextBox(game, 0, 0, {
        fixedWidth: 440,
        fixedHeight: 45,
        input: {
          type: 'password'
        },
        styles: {
          padding: {
            left: 10
          }
        },
        onTextChanged: (objTxt, text) => {
          password = text
        }
      })
    ],
    actions: [
      createButton(
        game,
        'Submit',
        {
          backgroundColor: 0xe0c48f,
          button: {
            space: {
              left: 20,
              right: 20,
              top: 10,
              bottom: 10
            }
          },
          onPress: (button) => {
            if (loading) {
              return
            }
            game.tweens.add({
              targets: button,
              scaleX: 1.2,
              scaleY: 1.2,
              ease: 'Sine.easeInOut',
              duration: 100,
              repeat: 0,
              yoyo: true
            })
            loading = true
            login(email, password)
            .then(result => {
              loading = false
              if (result.errorCode || result.errorMessage) {
                return createToast(game, world.width / 2, world.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show(result.errorMessage)
              }
              createToast(game, world.width / 2, world.height - 40)
                .setOrigin(0.5, 0.5)
                .show('Login success.')
              dialog.setVisible(false)
              dialog = null
              if (option.loginSuccess) {
                option.loginSuccess(result)
              }
            })
          }
        }
      )
    ],
    space: {
      left: 20,
      right: 20,
      top: -20,
      bottom: -20,
      content: 25,
      description: 25,
      descriptionLeft: 20,
      descriptionRight: 20,
      choices: 25,
      title: 10,
      toolbarItem: 5,
      choice: 5,
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
    }
  })
    .setDraggable('background') // Draggable-background
    .layout()
    // .drawBounds(game.add.graphics(), 0xff0000)
    .popUp(800)

  const tween = game.tweens.add({
    targets: dialog,
    scaleX: 1,
    scaleY: 1,
    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0, // -1: infinity
    yoyo: false
  })
  return dialog
}
