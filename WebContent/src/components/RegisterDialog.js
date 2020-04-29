import { createLabel, createTextBox, createToast, createButton, createLoading } from '../helplers/ui'
import { register } from '../services/auth'

export default function generateRegisterDialog (scene, store) {
  let email = ''
  let password = ''
  let displayName = ''
  let loading = false

  let nameEditor = null
  let emailEditor = null
  const passwordEditor = null

  const destroyAll = () => {
    if (emailEditor) {
      emailEditor.close()
      emailEditor.destroy()
    }
    if (passwordEditor) {
      passwordEditor.close()
      passwordEditor.destroy()
    }
    if (nameEditor) {
      nameEditor.close()
      nameEditor.destroy()
    }
    dialog.setVisible(false)
    dialog.destroy()
    dialog = null
  }

  let dialog = scene.rexUI.add.dialog({
    x: store.width / 2,
    y: store.height / 2,
    width: store.width * 0.8,
    height: store.height * 0.94,
    background: scene.add.image(0, 0, 'dialog-bg'),
    title: createLabel(
      scene,
      'REGISTER',
      {
        background: false,
        label: {
          x: 40,
          y: 40,
          align: 'center',
          space: {
            left: 82,
            right: 10,
            top: 65,
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
        .image(-10, 0, 'dialog-close')
        .setDisplaySize(store.width * 0.07, store.width * 0.07)
        .setInteractive()
        .on('pointerdown', () => {
          destroyAll()
        })
    ],
    leftToolbar: [],
    choices: [
      createLabel(scene, 'Display Name', {
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
        styles: {
          padding: {
            left: 10
          }
        },
        onTextChanged: (objTxt, text) => {
          displayName = text
        },
        onEditor: (editor) => {
          nameEditor = editor
        }
      }),
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
        styles: {
          padding: {
            left: 10
          }
        },
        onTextChanged: (objTxt, text) => {
          password = text
        },
        passwordEditor: (editor) => {
          emailEditor = editor
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
            loading = true
            const loadingComponent = createLoading(scene, 'Signup...', store)
            register(email, password, displayName)
              .then(result => {
                loading = false
                loadingComponent.setVisible(false)
                loadingComponent.destroy()
                if (result.errorCode) {
                  return createToast(scene, store.width / 2, store.height - 40)
                    .setOrigin(0.5, 0.5)
                    .show(result.errorMessage)
                }
                createToast(scene, store.width / 2, store.height - 40)
                  .setOrigin(0.5, 0.5)
                  .show('Please check your inbox to confirm your email.')
                destroyAll()
              })
          }
        }
      )
    ],
    space: {
      left: 40,
      right: 40,
      top: -5,
      bottom: -20,
      content: 25,
      description: 25,
      descriptionLeft: 20,
      descriptionRight: 20,
      choices: 25,
      title: 15,
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
    // click: {
    //   mode: 'release'
    // }
  })
    .setDraggable('background') // Draggable-background
    .layout()
    // .drawBounds(scene.add.graphics(), 0xff0000)
    .popUp(1000)

  const tween = scene.tweens.add({
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
