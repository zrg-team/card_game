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
    x: store.width / 2,
    y: store.height / 2,
    width: store.width * 0.6,
    height: store.height * 0.7,
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
        },
        text: {
          style: {
            fontSize: '34px'
          }
        }
      }
    ),
    toolbar: [
      scene.add
        .image(0, 0, 'dialog-close')
        .setDisplaySize(store.width * 0.07, store.width * 0.07)
        .setInteractive()
        .on('pointerdown', () => {
          destroyAll()
        })
    ],
    leftToolbar: [],
    choices: [
      createLabel(scene, 'Email', {
        backgroundColor: null,
        text: {
          style: {
            fontSize: '34px'
          }
        }
      }),
      createTextBox(scene, 0, 0, {
        fixedWidth: store.width * 0.6,
        fixedHeight: (store.width * 0.6) * 0.1,
        onTextChanged: (objTxt, text) => {
          email = text
        },
        onEditor: (editor) => {
          emailEditor = editor
        }
      }),
      createLabel(scene, 'Password', {
        backgroundColor: null,
        text: {
          style: {
            fontSize: '34px'
          }
        }
      }),
      createTextBox(scene, 0, 0, {
        fixedWidth: store.width * 0.6,
        fixedHeight: (store.width * 0.6) * 0.1,
        input: {
          type: 'password'
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
      left: 40,
      right: 40,
      top: -10,
      bottom: -20,
      content: 25,
      description: 25,
      descriptionLeft: 20,
      descriptionRight: 20,
      choices: 25,
      title: 10,
      titleLeft: 30,
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
