import Phaser from "phaser";
import { delay } from "../utils/index";
import store from "../helplers/globalStore";
import firebase from "../helplers/firebase";
import generateGamePlayDialog from "../components/GamePlayDialog";
import { randomAllCards } from "../services/game";
import { createButton } from '../helplers/ui'
import { deepEqual } from "assert";

var centralBtn;
var GAME_STATE = {
  isChoosingHiddenCard: true,
  chooseHiddenCardDone: false,
};
const players = [[], [], [], []];
var totalPlayer;

class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
    this.handleChooseHiddenCard = this.handleChooseHiddenCard.bind(this);
    this.handleDealCard = this.handleDealCard.bind(this);
    this.sendCardAnimation = this.sendCardAnimation.bind(this);
    // this.handleDealCardTo2Players = this.handleDealCardTo2Players.bind(this);
    // this.handleDealCardTo3Players = this.handleDealCardTo3Players.bind(this);
    this.handleDealCardTo4Players = this.handleDealCardTo4Players.bind(this);
  }

  preload() {
    this.playerTexts = []
    const world = store.getAll()
    this.UISizes = {
      card: {
        width: 80,
        height: 120
      },
      users: {
        // BOTTOM
        1: {
          card: {
            x: 130,
            y: world.height - 200
          },
          icon: {
            x: 40,
            y: world.height - 200
          },
          text: {
            x: 40,
            y: world.height - 200 + 30,
            style: {
              wordWrap: { width: 120, useAdvancedWrap: true }
            },
            origin: [0.5, 0]
          }
        },
        2: {
          card: {
            x: world.width - 130,
            y: world.height - 200
          },
          icon: {
            x: world.width - 40,
            y: world.height - 200
          },
          text: {
            x: world.width - 40,
            y: world.height - 200 + 30,
            style: {
              wordWrap: { width: 120, useAdvancedWrap: true }
            },
            origin: [0.5, 0]
          }
        },
        // TOP
        3: {
          card: {
            x: world.width - 170,
            y: 80
          },
          icon: {
            x: world.width - 80,
            y: 80
          },
          text: {
            x: world.width - 80,
            y: 110,
            style: {
              wordWrap: { width: 120, useAdvancedWrap: true }
            },
            origin: [0.5, 0]
          }
        },
        4: {
          card: {
            x: 170,
            y: 80
          },
          icon: {
            x: 80,
            y: 80,
          },
          text: {
            x: 80,
            y: 110,
            style: {
              wordWrap: { width: 120, useAdvancedWrap: true }
            },
            origin: [0.5, 0]
          }
        }
      }
    }
    this.players = ['Player1', 'Player2', 'Player 3', 'Player 4']
  }

  create() {
		
    const world = store.getAll()
    this.bg = this.add
      .image(0, 0, 'main-background')
      .setOrigin(0, 0)
      .setDisplaySize(world.width, world.height)
    	.setDepth(0)
		// generateGamePlayDialog(this, world)
		

    this._create(world);
  }

  update() {}

  async _create(world) {
    this.gameTable = this.add.image(0, 0, "game-table")
      .setDisplaySize(world.width, world.height)
      .setOrigin(0, 0)

    this.createCommonUI(world)
    this.createUserIcons(world)
    this.createUnvisibleCards(world)

    const result = await randomAllCards();
    if (result.errorCode) {
      alert("Error");
      return;
    }
    store.set("allCards", result && result.data);
  }

  createCommonUI (world) {
    this.buttonStart = this.add.image(world.width / 2, world.height / 2 - 20, 'playnow-button')
      .setDisplaySize(200, 64)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on('pointerdown', async () => {
        this.tweens.add({
          targets: this.buttonStart,
          scale: 1.2,
          ease: 'Sine.easeInOut',
          duration: 100,
          repeat: 0,
          yoyo: true
        })
        const loading = this.handleShufflingCard()
        await delay(2000)
        await loading()
        this.handleChooseHiddenCard()
        
      })

    this.tweens.add({
      targets: this.buttonStart,
      scale: 1.3,
      ease: 'Sine.easeInOut',
      duration: 800,
      repeat: -1,
      yoyo: true
    })

    this.hiddenCardNumberStyle = this.add.image(world.width / 2, 40, 'time-bg')
      .setDisplaySize(200, 50)
      .setOrigin(0.5, 0.5)
      .setDepth(0)
    this.hiddenCardNumber = this.add.text(world.width / 2 - 5, 40, "DRAW: 1", {
      font: "30px Arial",
      fill: "#FFFFFF",
    }).setOrigin(0.5, 0.5)
  }

  createUnvisibleCards (world) {
    this.unvisibleCard = []
    const cardWidth = this.UISizes.card.width
    const cardHeight = this.UISizes.card.height
    const bottom = world.height - (cardHeight / 2) - 2
    const spaceBetweenCard = 0.25
    let startWidth = (world.width - (51 * spaceBetweenCard)) / 2
    for (let i = 0; i < 52; i++) {
      this.unvisibleCard[i] = this.add.image(startWidth, bottom, "unvisible-card")
        .setDisplaySize(cardWidth, cardHeight)
        .setOrigin(0.5, 0.5)
        startWidth += spaceBetweenCard
    }
  }

  createUserIcons (world) {
    for (let i = 0; i < this.players.length; i++) {
      const user = this.UISizes.users[i + 1]
      this.add.image(user.icon.x, user.icon.y, "user-icon")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(80, 80)
      this.playerTexts[i] = this.add.text(user.text.x, user.text.y, this.players[i], {
        fontFamily: '"Arial Black"',
        fontSize: 15,
        ...user.text.style || {}
      }).setOrigin(...user.text.origin || [0.5, 0.5])
    }
  }

  async handleChooseHiddenCard() {
    this.buttonStart.disableInteractive()
    this.buttonStart.setVisible(false)
  
    const random = Math.floor(Math.random() * 51)
    await delay(200)
    // clear tint
    const cardNumber = 51
    if (this.randomChangeOrder) {
      for (let i = 0; i < this.randomChangeOrder; i++) {
        this.unvisibleCard[cardNumber - i].y += 10
      }
    }
    
    for (let i = 0; i < random; i++) {
      this.unvisibleCard[cardNumber - i].y -= 10
    }
    this.randomChangeOrder = random
    await delay(400)
    this.handleDealCard()
  }

  async sendCardAnimation(count, i) {
    const position = this.UISizes.users[(count % 4) + 1].card
    this.tweens.add({
      targets: this.unvisibleCard[i],
      repeat: 0,
      yoyo: false,
      props: {
        x: { value: position.x, duration: 100, ease: "Bounce" },
        y: { value: position.y, duration: 100, ease: "Bounce" },
        scale: { value: 0.105, duration: 100 }
      },
    });
    await delay(100);
    // this.unvisibleCard[0].destroy();
  }

  handleShufflingCard () {
    const world = store.getAll()
    for (let i = 0; i < 25; i++) {
      this.tweens.add({
        targets: this.unvisibleCard[i],
        repeat: 0,
        yoyo: false,
        props: {
          x: { value: world.width / 2 - 50, duration: 300, ease: "Sine.easeInOut" }
        },
      })
    }
    for (let i = 25; i < 52; i++) {
      this.tweens.add({
        targets: this.unvisibleCard[i],
        repeat: 0,
        yoyo: false,
        props: {
          x: { value: world.width / 2 + 50, duration: 300, ease: "Sine.easeInOut" }
        },
      })
    }
    (async () => {
      await delay(400)

      const centerX = world.width / 2

      this.intervalShuffling = setInterval(() => {
        const random = Math.floor(Math.random() * 52)
        const newX = this.unvisibleCard[random].x < centerX
          ? centerX + 50
          : centerX - 50
        this.tweens.add({
          targets: this.unvisibleCard[random],
          repeat: 0,
          yoyo: false,
          props: {
            x: { value: newX, duration: 180, ease: "Sine.easeInOut" }
          },
        })
      }, 200)
    })()
    return async () => {
      clearInterval(this.intervalShuffling)
      await delay(100)
      let spaceBetweenCard = 0.25
      let startWidth = (world.width - (51 * spaceBetweenCard)) / 2
      for (let i = 0; i < 52; i++) {
        this.tweens.add({
          targets: this.unvisibleCard[i],
          repeat: 0,
          yoyo: false,
          props: {
            x: { value: startWidth + spaceBetweenCard * i, duration: 100, ease: "Sine.easeInOut" }
          }
        })
      }
      await delay(100)
    }
  }

  async handleDealCardTo4Players() {
    const world = store.getAll()
    const cardNumber = 51
    for (let i = 0; i < this.randomChangeOrder; i++) {
      // this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      this.tweens.add({
        targets: this.unvisibleCard[cardNumber - i],
        repeat: 0,
        yoyo: false,
        props: {
          x: { value: world.width / 2 + this.randomChangeOrder * 0.2, duration: 1000, ease: "Sine.easeInOut" },
          y: { value: world.height / 2, duration: 1000, ease: "Sine.easeInOut" }
        },
      })
    }
    await delay(1000)
    let countAnimation = 0
    for (let i = 0; i < this.randomChangeOrder; i++) {
      this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      countAnimation++
    }
    for (let i = this.randomChangeOrder; i < (cardNumber + 1); i++) {
      this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      this.tweens.add({
        targets: this.unvisibleCard[cardNumber - i],
        repeat: 0,
        yoyo: false,
        props: {
          x: { value: world.width / 2 + 0.2 * i, duration: 1000, ease: "Sine.easeInOut" },
          y: { value: world.height / 2, duration: 1000, ease: "Sine.easeInOut" }
        },
      })
      countAnimation++
    }
    await delay(1000)
    let count = 1
    for (let i = 0; i < (cardNumber + 1); i++) {
      await this.sendCardAnimation(count, i);
      count++;
    }
  }

  async handleDealCard() {
    // totalPlayer = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    // if (totalPlayer === 2) {
    // 	handleDealCardTo2Players();
    // }
    // if (totalPlayer === 3) {
    // 	handleDealCardTo3Players();
    // }
    // if (totalPlayer === 4) {
    this.handleDealCardTo4Players();
  }
}

export default Scene1;
