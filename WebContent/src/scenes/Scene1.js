import Phaser from "phaser";
import { delay } from '../utils/index';

var hiddenCardNumber;
var hiddenCardNumberStyle;
var centralBtn;
const unvisibleCard = [];
var GAME_STATE = {
	isChoosingHiddenCard: true,
	chooseHiddenCardDone: false,
}

class Scene1 extends Phaser.Scene {
	constructor() {
		console.log('scense1');
		super("Scene1");
		this.handleChooseHiddenCard = this.handleChooseHiddenCard.bind(this);
		this.handleDealCard = this.handleDealCard(this);
	}
	
	_create() {
		this.add.image(400.0, 225.0, "game-table").setScale(1.4, 1.4);

		centralBtn = this.add.image(400.0, 225.0, "kenh-bai").setInteractive().on('pointerdown', this.handleChooseHiddenCard).setScale(0.2, 0.2);

		hiddenCardNumberStyle = this.add.rectangle(400, 270, 50, 50, 0xF2E6E4, 1);
		hiddenCardNumber = this.add.text(390, 250, '0', { font: '40px Arial', fill: '#000000' });

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
		
		unvisibleCard[11] = this.add.image(270.0, 370.0, "unvisible-card")
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
		this.add.image(30.0, 300.0, 'avatar');
		this.add.text(5, 255, 'Player', { fontFamily: '"Arial Black"', fontSize: 15 });

		// right bottom
		this.add.image(770.0, 300.0, 'avatar');
		this.add.text(745, 255, 'Player', { fontFamily: '"Arial Black"', fontSize: 15 });

		// right top
		this.add.image(60.0, 80.0, 'avatar');
		this.add.text(40, 35, 'Player', { fontFamily: '"Arial Black"', fontSize: 15 });

		// left top
		this.add.image(740.0, 80.0, 'avatar');
		this.add.text(720, 35, 'Player', { fontFamily: '"Arial Black"', fontSize: 15 });
	}
	
	preload() {
	}

	create() {
		this._create();
	}

	update() {
	}
	
	async handleChooseHiddenCard() {
		let randomInterval = setInterval(() => {
			hiddenCardNumber.setText(Math.floor(Math.random() * (10 - 1)) + 1);
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
		
		centralBtn = this.add.image(400.0, 225.0, "start-game-btn").setScale(0.2, 0.2).setInteractive().on('pointerdown', this.handleDealCard).setScale(0.2, 0.2);
	}

	async handleDealCard() {
		
	}
}

export default Scene1;