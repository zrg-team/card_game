const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

export function createButton (scene, text) {
  return scene.rexUI.add.label({
    width: 40,
    height: 40,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
    text: scene.add.text(0, 0, text, {
      fontSize: 18
    }),
    space: {
      left: 10,
      right: 10
    },
    align: 'center'
  })
}

const GetValue = Phaser.Utils.Objects.GetValue
export function createTextBox (scene, x, y, config) {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  const textInput = scene.add.text(100, 100, 'Hello World', { fixedWidth: 150, fixedHeight: 36 })
  textInput.setOrigin(0.5, 0.5)
  
  const textBox = scene.rexUI.add.textBox({
      x: x,
      y: y,

      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x0000000)
        .setStrokeStyle(2, 0xe1b884),

      // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

      // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      text: textInput,

      action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

      space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          icon: 10,
          text: 10,
      }
  })
      .setOrigin(0)
      .layout();

  textBox
      .setInteractive()
      .on('pointerdown', () => {
        const editor = scene.rexUI.edit(textInput, { onTextChanged: () => {
          console.log('text', textInput)
        } })
        // console.log('const editor = ', editor)
      })

  return textBox;
}

export function createLabel (scene, title, option = {}) {
  const { background = true, backgroundColor = 0x5e92f3, text = {}, label = {} } = option
  return scene.rexUI.add.label({
    width: 40, // Minimum width of round-rectangle
    height: 40, // Minimum height of round-rectangle
    x: 100,
    background: background
      ? scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor) : null,

    text: scene.add.text(
      ...(text.offet || [0, 0]),
      title,
      {
        fontSize: '20px',
        ...(text.style || {})
      }
    ),

    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    },
    ...label
  })
}

export function getBBcodeText (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
      fixedWidth: fixedWidth,
      fixedHeight: fixedHeight,

      fontSize: '20px',
      wrap: {
          mode: 'word',
          width: wrapWidth
      },
      maxLines: 3
  })
}
