import Phaser from "phaser";
import { delay } from "../utils/index";
import store from "../helplers/globalStore";
import firebase from "../helplers/firebase";
import generateGamePlayDialog from "../components/GamePlayDialog";

import { randomAllCards } from "../services/game";
import { createButton } from '../helplers/ui'

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
  }

  init(roomData){
    this.room = roomData.room;
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

    this._create(world);
  }

  update() {}

  async _create(world) {
    this.add.image(400.0, 225.0, "game-table").setScale(1.4, 1.4);

    centralBtn = this.add
      .image(400.0, 225.0, "kenh-bai")
      .setScale(0.2, 0.2)
      .setInteractive()
      .on("pointerdown", this.handleChooseHiddenCard);

    this.gameTable = this.add.image(0, 0, "game-table")
      .setDisplaySize(world.width, world.height)
      .setOrigin(0, 0);

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
      .on('pointerdown', () => {
        this.tweens.add({
          targets: this.buttonStart,
          scale: 1.2,
          ease: 'Sine.easeInOut',
          duration: 100,
          repeat: 0,
          yoyo: true
        })
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
    this.hiddenCardNumber = this.add.text(world.width / 2 - 5, 40, "0", {
      font: "30px Arial",
      fill: "#FFFFFF",
    }).setOrigin(0.5, 0.5)
  }

  createUnvisibleCards (world) {
    this.unvisibleCard = []
    const cardWidth = this.UISizes.card.width
    const cardHeight = this.UISizes.card.height
    const bottom = world.height - (cardHeight / 2) - 2
    const spaceBetweenCard = 10
    let startWidth = (world.width - (51 * spaceBetweenCard)) / 2
    for (let i = 0; i < 52; i++) {
      this.unvisibleCard[i] = this.add.image(startWidth, bottom, "green_back")
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
    let randomInterval = setInterval(() => {
			this.hiddenCardNumber.setText(Math.floor(Math.random() * (10 - 1)) + 1); // random between 10 -> 1
		}, 50);
		await delay(1500);
		window.clearInterval(randomInterval);

    // clear tint
    if (this.randomChangeOrder) {
      for (let i = 0; i < this.randomChangeOrder; i++) {
        this.unvisibleCard[i].clearTint();
      }
    }
  
    const random = Number(this.hiddenCardNumber._text);
    for (let i = 0; i < random; i++) {
      this.unvisibleCard[i].setTint(0x919191, 0x919191, 0x919191, 0x919191);
    }
    this.randomChangeOrder = random

    await delay(1000)
    this.handleDealCard()
  }

  async sendCardAnimation(count, i, totalPlayers) {
    const position = this.UISizes.users[(count % totalPlayers) + 1].card
    const tween = this.tweens.add({
      targets: this.unvisibleCard[i],
      repeat: 0,
      yoyo: false,
      props: {
        x: { value: position.x, duration: 100, ease: "Bounce" },
        y: { value: position.y, duration: 100, ease: "Bounce" },
      },
    });
    await delay(100);
  }

  async handleDealCard() {
    const world = store.getAll()

    // const totalPlayers = this.room && this.room.players && this.room.players.length;
    const totalPlayers = 4;
    let count = 0;
    let max;
  
    if (totalPlayers === 4) max = this.randomChangeOrder + 52;
    if (totalPlayers === 3) max = this.randomChangeOrder + 39;
    if (totalPlayers === 2) max = this.randomChangeOrder + 26;

    for (let i = this.randomChangeOrder; i < max; i++) {
      await this.sendCardAnimation(count, i, totalPlayers);
      count++;
    
      if (i === 51) {
        i = -1;
        max = this.randomChangeOrder;
      }
    }

    generateGamePlayDialog(this, world)
  }
}


export default Scene1;
