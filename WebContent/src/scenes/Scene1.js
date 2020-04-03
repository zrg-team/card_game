import Phaser from "phaser";
import { setIntervalXTimes } from '../utils/index';

var number;

class Scene1 extends Phaser.Scene {
	constructor() {
		console.log('scense1');
		super("Scene1");
		this.handleRandomNumber = this.handleRandomNumber.bind(this)
	}
	
	_create() {
		var BG = this.add.image(400.0, 225.0, "game-table");
		BG.setScale(1.4, 1.4);

		var kenhBai = this.add.image(400.0, 225.0, "kenh-bai").setInteractive().on('pointerdown', this.handleRandomNumber);
		kenhBai.setScale(0.2, 0.2);

		const rect = this.add.rectangle(400, 270, 50, 50, 0xF2E6E4, 1);
		number = this.add.text(390, 250, '0', { font: '40px Arial', fill: '#000000' });

		var unvisible1 = this.add.image(160.0, 370.0, "unvisible-card");
		unvisible1.setScale(0.07, 0.07);
		
		var unvisible2 = this.add.image(170.0, 370.0, "unvisible-card");
		unvisible2.setScale(0.07, 0.07);
		
		var unvisible3 = this.add.image(180.0, 370.0, "unvisible-card");
		unvisible3.setScale(0.07, 0.07);
		
		var unvisible4 = this.add.image(190.0, 370.0, "unvisible-card");
		unvisible4.setScale(0.07, 0.07);
		
		var unvisible5 = this.add.image(200.0, 370.0, "unvisible-card");
		unvisible5.setScale(0.07, 0.07);
		
		var unvisible6 = this.add.image(210.0, 370.0, "unvisible-card");
		unvisible6.setScale(0.07, 0.07);
		
		var unvisible7 = this.add.image(220.0, 370.0, "unvisible-card");
		unvisible7.setScale(0.07, 0.07);
		
		var unvisible8 = this.add.image(230.0, 370.0, "unvisible-card");
		unvisible8.setScale(0.07, 0.07);
		
		var unvisible9 = this.add.image(240.0, 370.0, "unvisible-card");
		unvisible9.setScale(0.07, 0.07);
		
		var unvisible10 = this.add.image(250.0, 370.0, "unvisible-card");
		unvisible10.setScale(0.07, 0.07);
		
		var unvisible11 = this.add.image(260.0, 370.0, "unvisible-card");
		unvisible11.setScale(0.07, 0.07);
		
		var unvisible12 = this.add.image(270.0, 370.0, "unvisible-card")
		unvisible12.setScale(0.07, 0.07);
		
		var unvisible13 = this.add.image(280.0, 370.0, "unvisible-card");
		unvisible13.setScale(0.07, 0.07);
		
		var unvisible14 = this.add.image(290.0, 370.0, "unvisible-card");
		unvisible14.setScale(0.07, 0.07);
		
		var unvisible15 = this.add.image(300.0, 370.0, "unvisible-card");
		unvisible15.setScale(0.07, 0.07);
		
		var unvisible16 = this.add.image(310.0, 370.0, "unvisible-card");
		unvisible16.setScale(0.07, 0.07);
		
		var unvisible17 = this.add.image(320.0, 370.0, "unvisible-card");
		unvisible17.setScale(0.07, 0.07);
		
		var unvisible18 = this.add.image(330.0, 370.0, "unvisible-card");
		unvisible18.setScale(0.07, 0.07);
		
		var unvisible19 = this.add.image(340.0, 370.0, "unvisible-card");
		unvisible19.setScale(0.07, 0.07);
		
		var unvisible20 = this.add.image(350.0, 370.0, "unvisible-card");
		unvisible20.setScale(0.07, 0.07);
		
		var unvisible21 = this.add.image(360.0, 370.0, "unvisible-card");
		unvisible21.setScale(0.07, 0.07);
		
		var unvisible22 = this.add.image(370.0, 370.0, "unvisible-card");
		unvisible22.setScale(0.07, 0.07);
		
		var unvisible23 = this.add.image(380.0, 370.0, "unvisible-card");
		unvisible23.setScale(0.07, 0.07);
		
		var unvisible24 = this.add.image(390.0, 370.0, "unvisible-card");
		unvisible24.setScale(0.07, 0.07);
		
		var unvisible25 = this.add.image(400.0, 370.0, "unvisible-card");
		unvisible25.setScale(0.07, 0.07);
		
		var unvisible26 = this.add.image(410.0, 370.0, "unvisible-card");
		unvisible26.setScale(0.07, 0.07);
		
		var unvisible27 = this.add.image(420.0, 370.0, "unvisible-card");
		unvisible27.setScale(0.07, 0.07);
		
		var unvisible28 = this.add.image(430.0, 370.0, "unvisible-card");
		unvisible28.setScale(0.07, 0.07);
		
		var unvisible29 = this.add.image(440.0, 370.0, "unvisible-card");
		unvisible29.setScale(0.07, 0.07);
		
		var unvisible30 = this.add.image(450.0, 370.0, "unvisible-card");
		unvisible30.setScale(0.07, 0.07);
		
		var unvisible31 = this.add.image(460.0, 370.0, "unvisible-card");
		unvisible31.setScale(0.07, 0.07);
		
		var unvisible32 = this.add.image(470.0, 370.0, "unvisible-card");
		unvisible32.setScale(0.07, 0.07);
		
		var unvisible33 = this.add.image(480.0, 370.0, "unvisible-card");
		unvisible33.setScale(0.07, 0.07);
		
		var unvisible34 = this.add.image(490.0, 370.0, "unvisible-card");
		unvisible34.setScale(0.07, 0.07);
		
		var unvisible35 = this.add.image(500.0, 370.0, "unvisible-card");
		unvisible35.setScale(0.07, 0.07);
		
		var unvisible36 = this.add.image(510.0, 370.0, "unvisible-card");
		unvisible36.setScale(0.07, 0.07);
		
		var unvisible37 = this.add.image(520.0, 370.0, "unvisible-card");
		unvisible37.setScale(0.07, 0.07);
		
		var unvisible38 = this.add.image(530.0, 370.0, "unvisible-card");
		unvisible38.setScale(0.07, 0.07);
		
		var unvisible39 = this.add.image(540.0, 370.0, "unvisible-card");
		unvisible39.setScale(0.07, 0.07);
		
		var unvisible40 = this.add.image(550.0, 370.0, "unvisible-card");
		unvisible40.setScale(0.07, 0.07);
		
		var unvisible41 = this.add.image(560.0, 370.0, "unvisible-card");
		unvisible41.setScale(0.07, 0.07);
		
		var unvisible42 = this.add.image(570.0, 370.0, "unvisible-card");
		unvisible42.setScale(0.07, 0.07);
		
		var unvisible43 = this.add.image(580.0, 370.0, "unvisible-card");
		unvisible43.setScale(0.07, 0.07);
		
		var unvisible44 = this.add.image(590.0, 370.0, "unvisible-card");
		unvisible44.setScale(0.07, 0.07);
		
		var unvisible45 = this.add.image(600.0, 370.0, "unvisible-card");
		unvisible45.setScale(0.07, 0.07);
		
		var unvisible46 = this.add.image(610.0, 370.0, "unvisible-card");
		unvisible46.setScale(0.07, 0.07);
		
		var unvisible47 = this.add.image(620.0, 370.0, "unvisible-card");
		unvisible47.setScale(0.07, 0.07);
		
		var unvisible48 = this.add.image(630.0, 370.0, "unvisible-card");
		unvisible48.setScale(0.07, 0.07);
		
		var unvisible49 = this.add.image(640.0, 370.0, "unvisible-card");
		unvisible49.setScale(0.07, 0.07);
		
		var unvisible50 = this.add.image(650.0, 370.0, "unvisible-card");
		unvisible50.setScale(0.07, 0.07);
		
		var unvisible51 = this.add.image(660.0, 370.0, "unvisible-card");
		unvisible51.setScale(0.07, 0.07);
		
		var unvisible52 = this.add.image(670.0, 370.0, "unvisible-card");
		unvisible52.setScale(0.07, 0.07);
		
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
    // this.load.image('avatar', avatar);
    // this.load.image('unvisible', unvisibleCard);
    // this.load.image('gameTable', gameTable)
	}

	create() {
		this._create();
	}

	update() {
	}
	
	handleRandomNumber() {
		// random number from 1 -> 9
		setIntervalXTimes( function () {
			number.setText(Math.floor(Math.random() * (9 - 1)) + 1);
		}, 50, 50);
	}
}

export default Scene1;