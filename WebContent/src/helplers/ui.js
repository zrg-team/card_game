const GetValue = Phaser.Utils.Objects.GetValue
export function createTextBox (scene, x, y, config) {
  const wrapWidth = GetValue(config, 'wrapWidth', 0)
  const fixedWidth = GetValue(config, 'fixedWidth', 0)
  const fixedHeight = GetValue(config, 'fixedHeight', 0)
  let editor = null
  const printText = getBBcodeText(scene, x, y, '', {
    color: 'white',
    fontSize: '24px',
    wrapWidth: wrapWidth,
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,
    backgroundColor: '#000000',
    valign: 'center',
    ...config.styles || {}
  })
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => {
      if (editor) {
        editor.close()
        editor.destroy()
      }
      if (config.input && config.input.type === 'password') {
        printText.text = ''
        if (config.onTextChanged) {
          config.onTextChanged(printText, '')
        }
      }
      const editorConfig = {
        ...config.input,
        onTextChanged: function (textObject, text) {
          if (config.input && config.input.type === 'password') {
            textObject.text = '*********'
          } else {
            textObject.text = text
          }

          if (config.onTextChanged) {
            config.onTextChanged(textObject, text)
          }
        }
      }
      editor = scene.rexUI.edit(printText, editorConfig)
      if (config.onEditor) {
        config.onEditor(editor)
      }
    })

  return printText
}

export function createToast (scene, x, y, config = {}) {
  return scene.rexUI.add.toast({
    x,
    y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x0000000)
      .setStrokeStyle(2, 0xe1b884),
    space: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    },
    text: scene.add.text(0, 0, '', {
      fontSize: '14px',
      ...config.text
    }),
    ...config.toast
  }).setDepth(9998)
}

export function createLabel (scene, title, option = {}) {
  const {
    background = true,
    backgroundComponent,
    backgroundColor = 0x5e92f3,
    text = {},
    label = {}
  } = option
  return scene.rexUI.add.label({
    width: 40, // Minimum width of round-rectangle
    height: 40, // Minimum height of round-rectangle
    x: 100,
    background: background && (backgroundColor !== null || backgroundComponent)
      ? backgroundComponent || scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor)
      : null,

    text: scene.add.text(
      ...(text.offet || [0, 0]),
      title,
      {
        fontSize: '20px',
        ...(text.style || {})
      }
    ),

    space: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 10
    },
    ...label
  })
}

export function createLoading (scene, title, world) {
  const loadingComponent = scene.rexUI.add.label({
    width: world.width, // Minimum width of round-rectangle
    height: world.height, // Minimum height of round-rectangle
    x: 0,
    y: 0,
    background: scene.add.image(world.width / 2, world.height / 2, 'overlay')
      .setSize(world.width, world.height),

    text: scene.add.text(
      world.width / 2 - 50,
      world.height / 2 - 30,
      title,
      {
        fontSize: '20px'
      }
    ),

    space: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 10
    }
  }).setDepth(9999)
  return loadingComponent
}

export function createButton (scene, title, option = {}) {
  const {
    background = true,
    backgroundComponent,
    backgroundColor = 0xe0c48f,
    text = {},
    button = {}
  } = option
  const buttonComponent = scene.rexUI.add.label({
    width: 40, // Minimum width of round-rectangle
    height: 40, // Minimum height of round-rectangle
    x: 100,
    background: background && (backgroundColor !== null || backgroundComponent)
      ? (
        backgroundComponent ||
        scene.rexUI.add.roundRectangle(0, 0, 100, 40, 5, backgroundColor)
          .setStrokeStyle(2, 0x000000)
      )
      : null,

    text: scene.add.text(
      ...(text.offet || [0, 0]),
      title,
      {
        fontSize: '20px',
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000',
          blur: 2,
          stroke: true,
          fill: true
        },
        ...(text.style || {})
      }
    ),

    space: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 10
    },
    ...button
  })
    .setInteractive()
    .on('pointerdown', () => {
      scene.tweens.add({
        targets: buttonComponent,
        scaleX: 0.9,
        scaleY: 0.9,
        ease: 'Sine.easeInOut',
        duration: 100,
        repeat: 0,
        yoyo: true
      })
      if (option.onPress) {
        option.onPress(buttonComponent)
      }
    })
  return buttonComponent
}

export function getBBcodeText (scene, x, y, content, option = {}) {
  return scene.rexUI.add.BBCodeText(x, y, content || '', {
    fixedWidth: option.fixedWidth || 100,
    fixedHeight: option.fixedHeight || 20,

    fontSize: '20px',
    wrap: {
      mode: 'word',
      width: option.wrapWidth
    },
    maxLines: 1,
    ...option
  })
}

export function createConfirmPopup (scene, option = {}) {
  const titleOption = option.title || {}
  const contentOption = option.content || {}
  const dialog = scene.rexUI.add.dialog({
    x: 400,
    y: 300,

    background: scene.rexUI.add
      .roundRectangle(0, 0, 100, 100, 20, option.background || 0x222226)
      .setStrokeStyle(2, option.stroke || 0xe1b884),

    title: scene.rexUI.add.label({
      background: scene.rexUI.add
        .roundRectangle(0, 0, 100, 40, 20, titleOption.background || 0x0e0d0b)
        .setStrokeStyle(2, titleOption.stroke || 0xe1b884),
      text: scene.add.text(0, 0, titleOption.title, {
        fontSize: '24px',
        ...titleOption.style || {}
      }),
      space: {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10
      }
    }),

    content: scene.add.text(0, 0, contentOption.title, {
      fontSize: '24px'
    }),

    actions: [
      createButton(
        scene,
        'Yes',
        {
          backgroundColor: 0xdcbf8a,
          button: {
            space: {
              left: 20,
              right: 20,
              top: 10,
              bottom: 10
            }
          },
          onPress: option.onConfirm
        }
      ),
      createButton(
        scene,
        'No',
        {
          backgroundColor: 0xdcbf8a,
          button: {
            space: {
              left: 20,
              right: 20,
              top: 10,
              bottom: 10
            }
          },
          onPress: option.onCancel
        }
      )
    ],

    space: {
      title: 25,
      content: 25,
      action: 15,

      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    },

    align: {
      actions: 'right' // 'center'|'left'|'right'
    },

    expand: {
      content: false // Content is a pure text object
    },
    ...option.common
  })
    .layout()
    // .drawBounds(this.add.graphics(), 0xff0000)
    .popUp(400)
  return dialog
}
