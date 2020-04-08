import Phaser from "phaser";
import { delay } from "../utils/index";
import store from "../helplers/globalStore";
import firebase from "../helplers/firebase";

import generateGamePlayDialog from "../components/GamePlayDialog";

import { randomAllCards } from "../services/game";

var hiddenCardNumber;
var hiddenCardNumberStyle;
var centralBtn;
const unvisibleCard = [];
var GAME_STATE = {
  isChoosingHiddenCard: true,
  chooseHiddenCardDone: false,
};
const players = [[], [], [], []];
var totalPlayer;

class Scene1 extends Phaser.Scene {
  constructor() {
    console.log("scense1");
    super("Scene1");
    this.handleChooseHiddenCard = this.handleChooseHiddenCard.bind(this);
    this.handleDealCard = this.handleDealCard.bind(this);
    this.sendCardAnimation = this.sendCardAnimation.bind(this);
    // this.handleDealCardTo2Players = this.handleDealCardTo2Players.bind(this);
    // this.handleDealCardTo3Players = this.handleDealCardTo3Players.bind(this);
    this.handleDealCardTo4Players = this.handleDealCardTo4Players.bind(this);
    // this.handleDealFirstRound = this.handleDealFirstRound.bind(this);
    // this.handleDealSecondRound = this.handleDealSecondRound.bind(this);
    // this.handleDealThirdRound = this.handleDealThirdRound.bind(this);
    // this.handleDealFourthRound = this.handleDealFourthRound.bind(this);
    // this.handleDealFifthRound = this.handleDealFifthRound.bind(this);
    // this.handleDealSixthRound = this.handleDealSixthRound.bind(this);
    // this.handleDealSeventhRound = this.handleDealSeventhRound.bind(this);
    // this.handleDealEighthRound = this.handleDealEighthRound.bind(this);
    // this.handleDealNinethRound = this.handleDealNinethRound.bind(this);
    // this.handleDealTenthRound = this.handleDealTenthRound.bind(this);
    // this.handleDealEleventhRound = this.handleDealEleventhRound.bind(this);
    // this.handleDealTwelfthRound = this.handleDealTwelfthRound.bind(this);
    // this.handleDealThirteenthRound = this.handleDealThirteenthRound.bind(this);
  }

  preload() {}

  create() {
		
    // const world = store.getAll()
    // this.bg = this.add
    //   .image(0, 0, 'main-background')
    //   .setOrigin(0, 0)
    //   .setDisplaySize(world.width, world.height)
    // 	.setDepth(0)
		// generateGamePlayDialog(this, world)
		

    this._create();
  }

  update() {}

  async _create() {
    this.add.image(400.0, 225.0, "game-table").setScale(1.4, 1.4);

    centralBtn = this.add
      .image(400.0, 225.0, "kenh-bai")
      .setScale(0.2, 0.2)
      .setInteractive()
      .on("pointerdown", this.handleChooseHiddenCard);

    hiddenCardNumberStyle = this.add.rectangle(400, 270, 50, 50, 0xf2e6e4, 1);
    hiddenCardNumber = this.add.text(390, 250, "0", {
      font: "40px Arial",
      fill: "#000000",
    });

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

    unvisibleCard[31] = this.add.image(470.0, 370.0, "unvisible-card");
    unvisibleCard[31].setScale(0.07, 0.07);

    unvisibleCard[32] = this.add.image(480.0, 370.0, "unvisible-card");
    unvisibleCard[32].setScale(0.07, 0.07);

    unvisibleCard[33] = this.add.image(490.0, 370.0, "unvisible-card");
    unvisibleCard[33].setScale(0.07, 0.07);

    unvisibleCard[34] = this.add.image(500.0, 370.0, "unvisible-card");
    unvisibleCard[34].setScale(0.07, 0.07);

    unvisibleCard[35] = this.add.image(510.0, 370.0, "unvisible-card");
    unvisibleCard[35].setScale(0.07, 0.07);

    unvisibleCard[36] = this.add.image(520.0, 370.0, "unvisible-card");
    unvisibleCard[36].setScale(0.07, 0.07);

    unvisibleCard[37] = this.add.image(530.0, 370.0, "unvisible-card");
    unvisibleCard[37].setScale(0.07, 0.07);

    unvisibleCard[38] = this.add.image(540.0, 370.0, "unvisible-card");
    unvisibleCard[38].setScale(0.07, 0.07);

    unvisibleCard[39] = this.add.image(550.0, 370.0, "unvisible-card");
    unvisibleCard[39].setScale(0.07, 0.07);

    unvisibleCard[40] = this.add.image(560.0, 370.0, "unvisible-card");
    unvisibleCard[40].setScale(0.07, 0.07);

    unvisibleCard[41] = this.add.image(570.0, 370.0, "unvisible-card");
    unvisibleCard[41].setScale(0.07, 0.07);

    unvisibleCard[42] = this.add.image(580.0, 370.0, "unvisible-card");
    unvisibleCard[42].setScale(0.07, 0.07);

    unvisibleCard[43] = this.add.image(590.0, 370.0, "unvisible-card");
    unvisibleCard[43].setScale(0.07, 0.07);

    unvisibleCard[44] = this.add.image(600.0, 370.0, "unvisible-card");
    unvisibleCard[44].setScale(0.07, 0.07);

    unvisibleCard[45] = this.add.image(610.0, 370.0, "unvisible-card");
    unvisibleCard[45].setScale(0.07, 0.07);

    unvisibleCard[46] = this.add.image(620.0, 370.0, "unvisible-card");
    unvisibleCard[46].setScale(0.07, 0.07);

    unvisibleCard[47] = this.add.image(630.0, 370.0, "unvisible-card");
    unvisibleCard[47].setScale(0.07, 0.07);

    unvisibleCard[48] = this.add.image(640.0, 370.0, "unvisible-card");
    unvisibleCard[48].setScale(0.07, 0.07);

    unvisibleCard[49] = this.add.image(650.0, 370.0, "unvisible-card");
    unvisibleCard[49].setScale(0.07, 0.07);

    unvisibleCard[50] = this.add.image(660.0, 370.0, "unvisible-card");
    unvisibleCard[50].setScale(0.07, 0.07);

    unvisibleCard[51] = this.add.image(670.0, 370.0, "unvisible-card");
    unvisibleCard[51].setScale(0.07, 0.07);

    // left bottom
    this.add.image(30.0, 300.0, "user-icon").setScale(0.7, 0.7);
    this.add.text(5, 255, "Player", {
      fontFamily: '"Arial Black"',
      fontSize: 15,
    });

    // right bottom
    this.add.image(770.0, 300.0, "user-icon").setScale(0.7, 0.7);
    this.add.text(745, 255, "Player", {
      fontFamily: '"Arial Black"',
      fontSize: 15,
    });

    // right top
    this.add.image(740.0, 80.0, "user-icon").setScale(0.7, 0.7);
    this.add.text(720, 35, "Player", {
      fontFamily: '"Arial Black"',
      fontSize: 15,
    });

    // left top
    this.add.image(60.0, 80.0, "user-icon").setScale(0.7, 0.7);
    this.add.text(40, 35, "Player", {
      fontFamily: '"Arial Black"',
      fontSize: 15,
    });

    const result = await randomAllCards();
    if (result.errorCode) {
      alert("Error");
      return;
    }
    store.set("allCards", result && result.data);
  }

  async handleChooseHiddenCard() {
    let randomInterval = setInterval(() => {
      hiddenCardNumber.setText(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    }, 50);
    await delay(1500);
    window.clearInterval(randomInterval);

    // clear tint
    for (let i = 0; i < 10; i++) {
      unvisibleCard[i].clearTint();
    }
    for (let i = 0; i < Number(hiddenCardNumber._text); i++) {
      unvisibleCard[i].setTint(0x919191, 0x919191, 0x919191, 0x919191);
    }

    centralBtn = this.add
      .image(400.0, 225.0, "start-game-btn")
      .setScale(0.2, 0.2)
      .setInteractive()
      .on("pointerdown", this.handleDealCard);
  }

  handleDealFirstRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][0] = this.add
        .image(80.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][0] = this.add
        .image(640.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][0] = this.add
        .image(600.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][0] = this.add
        .image(110.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealSecondRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][1] = this.add
        .image(100.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][1] = this.add
        .image(660.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][1] = this.add
        .image(620.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][1] = this.add
        .image(130.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealThirdRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][2] = this.add
        .image(120.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][2] = this.add
        .image(680.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][2] = this.add
        .image(640.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][2] = this.add
        .image(150.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealFourthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][3] = this.add
        .image(140.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][3] = this.add
        .image(700.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][3] = this.add
        .image(660.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][3] = this.add
        .image(170.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealFifthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][4] = this.add
        .image(160.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][4] = this.add
        .image(720.0, 310.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][4] = this.add
        .image(680.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][4] = this.add
        .image(190.0, 120.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealSixthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][5] = this.add
        .image(80.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][5] = this.add
        .image(640.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][5] = this.add
        .image(600.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][5] = this.add
        .image(110.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealSeventhRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][6] = this.add
        .image(100.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][6] = this.add
        .image(660.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][6] = this.add
        .image(620.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][6] = this.add
        .image(130.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealEighthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][7] = this.add
        .image(120.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][7] = this.add
        .image(680.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][7] = this.add
        .image(640.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][7] = this.add
        .image(150.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealNinethRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][8] = this.add
        .image(140.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][8] = this.add
        .image(700.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][8] = this.add
        .image(660.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][8] = this.add
        .image(170.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealTenthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][9] = this.add
        .image(160.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][9] = this.add
        .image(720.0, 280.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][9] = this.add
        .image(680.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][9] = this.add
        .image(190.0, 90.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealEleventhRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][10] = this.add
        .image(80.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][10] = this.add
        .image(680.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][10] = this.add
        .image(640.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][10] = this.add
        .image(110.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealTwelfthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][11] = this.add
        .image(100.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][11] = this.add
        .image(700.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][11] = this.add
        .image(660.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][11] = this.add
        .image(130.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  handleDealThirteenthRound(player1, player2, player3, player4) {
    if (player1) {
      players[0][12] = this.add
        .image(120.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player2) {
      players[1][12] = this.add
        .image(720.0, 250.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player3) {
      players[2][12] = this.add
        .image(680.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
    if (player4) {
      players[3][12] = this.add
        .image(150.0, 60.0, "unvisible-card")
        .setScale(0.07, 0.07);
    }
  }

  async sendCardAnimation(count, i) {
    let position = { x: 400, y: 225 };
    if (count % 4 === 1) {
      position = { x: 100, y: 280 };
    }
    if (count % 4 === 2) {
      position = { x: 660, y: 280 };
    }
    if (count % 4 === 3) {
      position = { x: 620, y: 90 };
    }
    if (count % 4 === 0) {
      position = { x: 130, y: 90 };
    }
    const tween = this.tweens.add({
      targets: unvisibleCard[i],
      repeat: 0,
      yoyo: false,
      props: {
        x: { value: position.x, duration: 100, ease: "Bounce" },
        y: { value: position.y, duration: 100, ease: "Bounce" },
      },
    });
    await delay(100);
    unvisibleCard[0].destroy();
  }

  async handleDealCardTo4Players() {
    let count = 1;
    for (let i = Number(hiddenCardNumber._text); i < 52; i++) {
      await this.sendCardAnimation(count, i);
      count++;
    }
    for (let i = 0; i < Number(hiddenCardNumber._text); i++) {
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
