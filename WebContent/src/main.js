import 'phaser'
import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'

console.log('Phaser', Phaser, Phaser.ScaleManager)
const config = {
  // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  type: Phaser.WEBGL,
  pixelArt: true,
  roundPixels: true,
  parent: 'game-container',
  width: 400,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800
      },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    BootScene,
    MenuScene
  ]
}
window.addEventListener('load', function () {
  const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
})
