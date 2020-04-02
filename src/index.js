import Phaser from "phaser";
import Scene1 from '../src/assets/scenes/Scene1';

const config = {
  title: "card_game",
  width: 1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: "#88F",
  parent: "game-container",
  scale: {
      "mode": Phaser.Scale.FIT,
      "autoCenter": Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create
  }
}

const game = new Phaser.Game(config);

function preload() {}

function create() {
  this.scene.add('Scene1', Scene1, true);
}