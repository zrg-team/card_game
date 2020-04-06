import { createLabel, createTextBox, createToast, createButton, createLoading } from '../helplers/ui'
import { login } from '../services/auth'

export default function generateLoginDialog (scene, store, option = {}) {
  let email = ''
  let password = ''
  let loading = false

  let emailEditor = null
  let passwordEditor = null

  const destroyAll = () => {
    if (emailEditor) {
      emailEditor.close()
      emailEditor.destroy()
    }
    if (passwordEditor) {
      passwordEditor.close()
      passwordEditor.destroy()
    }
    dialog.setVisible(false)
    dialog.destroy()
    dialog = null
  }

  let dialog = scene.rexUI.add.dialog({
    x: 400,
    y: 210,
    width: 480,
    height: 344,
    background: scene.add.image(0, 0, 'dialog-bg'),
    title: createLabel(
      scene,
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
      }
    ),
    toolbar: [
      scene.add
        .image(0, 0, 'dialog-close')
        .setInteractive()
        .on('pointerdown', () => {
          destroyAll()
        })
    ],
    leftToolbar: [],
    choices: [
      createLabel(scene, 'Email', {
        backgroundColor: null
      }),
      createTextBox(scene, 0, 0, {
        fixedWidth: 440,
        fixedHeight: 45,
        styles: {
          padding: {
            left: 10
          }
        },
        onTextChanged: (objTxt, text) => {
          email = text
        },
        onEditor: (editor) => {
          emailEditor = editor
        }
      }),
      createLabel(scene, 'Password', {
        backgroundColor: null
      }),
      createTextBox(scene, 0, 0, {
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
        },
        onEditor: (editor) => {
          passwordEditor = editor
        }
      })
    ],
    actions: [
      createButton(
        scene,
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
            scene.tweens.add({
              targets: button,
              scaleX: 1.2,
              scaleY: 1.2,
              ease: 'Sine.easeInOut',
              duration: 100,
              repeat: 0,
              yoyo: true
            })
            loading = true
            const loadingComponent = createLoading(scene, 'Login...', store)
            login(email, password)
              .then(result => {
                loading = false
                loadingComponent.setVisible(false)
                loadingComponent.destroy()
                if (result.errorCode || result.errorMessage) {
                  return createToast(scene, store.width / 2, store.height - 40)
                    .setOrigin(0.5, 0.5)
                    .show(result.errorMessage)
                }
                createToast(scene, store.width / 2, store.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show('Login success.')
                  destroyAll()
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
    // .drawBounds(scene.add.graphics(), 0xff0000)
    .popUp(800)

  const tween = scene.tweens.add({
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
