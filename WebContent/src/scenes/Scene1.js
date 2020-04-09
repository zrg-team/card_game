import Phaser from "phaser";
import { delay } from "../utils/index";
import store from "../helplers/globalStore";
import firebase from "../helplers/firebase";
import generateGamePlayDialog from "../components/GamePlayDialog";
import { createButton } from '../helplers/ui'

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
    // this.handleDealCardTo2Players = this.handleDealCardTo2Players.bind(this);
    // this.handleDealCardTo3Players = this.handleDealCardTo3Players.bind(this);
    this.handleDealCardTo4Players = this.handleDealCardTo4Players.bind(this);
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
		generateGamePlayDialog(this, world)


    this._create(world);
  }

  update() {}

  async _create() {
    this.add.image(400.0, 225.0, "game-table").setScale(1.4, 1.4);

    centralBtn = this.add
      .image(400.0, 225.0, "kenh-bai")
      .setScale(0.2, 0.2)
      .setInteractive()
      .on("pointerdown", this.handleChooseHiddenCard);

    // centralBtn = createButton(
    //   this,
    //   'Submit aa a a',
    //   {
    //     backgroundColor: 0xe0c48f,
    //     button: {
    //       x: 400,
    //       y: 225
    //     },
    //     onPress: () => {
    //       this.handleChooseHiddenCard
    //     }
    //   }
    // );
   
    hiddenCardNumberStyle = this.add.rectangle(400, 270, 50, 50, 0xf2e6e4, 1);
    hiddenCardNumber = this.add.text(390, 250, "0", {
      font: "40px Arial",
      fill: "#000000",
    });

    this.gameTable = this.add.image(0, 0, "game-table")
      .setDisplaySize(world.width, world.height)
      .setOrigin(0, 0)

    unvisibleCard[0] = this.add.image(160.0, 370.0, "unvisible-card");
    unvisibleCard[0].setScale(0.07, 0.07);

    unvisibleCard[1] = this.add.image(170.0, 370.0, "unvisible-card");
    unvisibleCard[1].setScale(0.07, 0.07);

    unvisibleCard[2] = this.add.image(180.0, 370.0, "unvisible-card");
    unvisibleCard[2].setScale(0.07, 0.07);

    unvisibleCard[3] = this.add.image(190.0, 370.0, "unvisible-card");
    unvisibleCard[3].setScale(0.07, 0.07);

    unvisibleCard[4] = this.add.image(200.0, 370.0, "unvisible-card");
    unvisibleCard[4].setScale(0.07, 0.07);

    unvisibleCard[5] = this.add.image(210.0, 370.0, "unvisible-card");
    unvisibleCard[5].setScale(0.07, 0.07);

    unvisibleCard[6] = this.add.image(220.0, 370.0, "unvisible-card");
    unvisibleCard[6].setScale(0.07, 0.07);

    unvisibleCard[7] = this.add.image(230.0, 370.0, "unvisible-card");
    unvisibleCard[7].setScale(0.07, 0.07);

    unvisibleCard[8] = this.add.image(240.0, 370.0, "unvisible-card");
    unvisibleCard[8].setScale(0.07, 0.07);

    unvisibleCard[9] = this.add.image(250.0, 370.0, "unvisible-card");
    unvisibleCard[9].setScale(0.07, 0.07);

    unvisibleCard[10] = this.add.image(260.0, 370.0, "unvisible-card");
    unvisibleCard[10].setScale(0.07, 0.07);

    unvisibleCard[11] = this.add.image(270.0, 370.0, "unvisible-card");
    unvisibleCard[11].setScale(0.07, 0.07);

    unvisibleCard[12] = this.add.image(280.0, 370.0, "unvisible-card");
    unvisibleCard[12].setScale(0.07, 0.07);

    unvisibleCard[13] = this.add.image(290.0, 370.0, "unvisible-card");
    unvisibleCard[13].setScale(0.07, 0.07);

    unvisibleCard[14] = this.add.image(300.0, 370.0, "unvisible-card");
    unvisibleCard[14].setScale(0.07, 0.07);

    unvisibleCard[15] = this.add.image(310.0, 370.0, "unvisible-card");
    unvisibleCard[15].setScale(0.07, 0.07);

    unvisibleCard[16] = this.add.image(320.0, 370.0, "unvisible-card");
    unvisibleCard[16].setScale(0.07, 0.07);

    unvisibleCard[17] = this.add.image(330.0, 370.0, "unvisible-card");
    unvisibleCard[17].setScale(0.07, 0.07);

    unvisibleCard[18] = this.add.image(340.0, 370.0, "unvisible-card");
    unvisibleCard[18].setScale(0.07, 0.07);

    unvisibleCard[19] = this.add.image(350.0, 370.0, "unvisible-card");
    unvisibleCard[19].setScale(0.07, 0.07);

    unvisibleCard[20] = this.add.image(360.0, 370.0, "unvisible-card");
    unvisibleCard[20].setScale(0.07, 0.07);

    unvisibleCard[21] = this.add.image(370.0, 370.0, "unvisible-card");
    unvisibleCard[21].setScale(0.07, 0.07);

    unvisibleCard[22] = this.add.image(380.0, 370.0, "unvisible-card");
    unvisibleCard[22].setScale(0.07, 0.07);

    unvisibleCard[23] = this.add.image(390.0, 370.0, "unvisible-card");
    unvisibleCard[23].setScale(0.07, 0.07);

    unvisibleCard[24] = this.add.image(400.0, 370.0, "unvisible-card");
    unvisibleCard[24].setScale(0.07, 0.07);

    unvisibleCard[25] = this.add.image(410.0, 370.0, "unvisible-card");
    unvisibleCard[25].setScale(0.07, 0.07);

    unvisibleCard[26] = this.add.image(420.0, 370.0, "unvisible-card");
    unvisibleCard[26].setScale(0.07, 0.07);

    unvisibleCard[27] = this.add.image(430.0, 370.0, "unvisible-card");
    unvisibleCard[27].setScale(0.07, 0.07);

    unvisibleCard[28] = this.add.image(440.0, 370.0, "unvisible-card");
    unvisibleCard[28].setScale(0.07, 0.07);

    unvisibleCard[29] = this.add.image(450.0, 370.0, "unvisible-card");
    unvisibleCard[29].setScale(0.07, 0.07);

    unvisibleCard[30] = this.add.image(460.0, 370.0, "unvisible-card");
    unvisibleCard[30].setScale(0.07, 0.07);

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
    const spaceBetweenCard = 10
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
    const random = Math.floor(Math.random() * 51)
    await delay(1500)

    // clear tint
    if (this.randomChangeOrder) {
      for (let i = 0; i < this.randomChangeOrder; i++) {
        this.unvisibleCard[i].clearTint();
      }
    }
    
    for (let i = 0; i < random; i++) {
      this.unvisibleCard[i].setTint(0x919191, 0x919191, 0x919191, 0x919191);
    }
    this.randomChangeOrder = random

    await delay(1000)
    this.handleDealCard()
  }

  async sendCardAnimation(count, i) {
    const position = this.UISizes.users[(count % 4) + 1].card
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
    this.unvisibleCard[0].destroy();
  }

  async handleDealCardTo4Players() {
    let count = 1;
    for (let i = this.randomChangeOrder; i < 52; i++) {
      await this.sendCardAnimation(count, i);
      count++;
    }
    for (let i = 0; i < this.randomChangeOrder; i++) {
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
