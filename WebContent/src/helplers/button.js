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
