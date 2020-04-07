import Phaser from "phaser";

var players = [[],[],[],[]];
class Scene2 extends Phaser.Scene {
	constructor() {
		console.log('scense2');
		super("Scene2");
  }
  
  create() {
		var BG = this.add.image(400.0, 225.0, "game-table");
		BG.setScale(1.4, 1.4);
		
		this.add.image(30.0, 300.0, "avatar");
		
		this.add.image(770.0, 300.0, "avatar");
		
		this.add.image(740.0, 80.0, "avatar");
		
		this.add.image(60.0, 80.0, "avatar");
        
    // player 1
		players[0][0] = this.add.image(80.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][1] = this.add.image(100.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][2] = this.add.image(120.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][3] = this.add.image(140.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
				
    players[0][4] = this.add.image(160.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[0][5] = this.add.image(80.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][6] = this.add.image(100.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][7] = this.add.image(120.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][8] = this.add.image(140.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[0][9] = this.add.image(160.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[0][10] = this.add.image(80.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[0][11] = this.add.image(100.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[0][12] = this.add.image(120.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
    
    // player 2
		players[1][0] = this.add.image(110.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][1] = this.add.image(130.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][2] = this.add.image(150.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][3] = this.add.image(170.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
				
    players[1][4] = this.add.image(190.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][5] = this.add.image(110.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][6] = this.add.image(130.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][7] = this.add.image(150.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][8] = this.add.image(170.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][9] = this.add.image(190.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][10] = this.add.image(110.0, 60.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][11] = this.add.image(130.0, 60.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][12] = this.add.image(150.0, 60.0, "unvisible-card").setScale(0.07, 0.07);

    // player 3
		players[1][0] = this.add.image(600.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][1] = this.add.image(620.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][2] = this.add.image(640.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][3] = this.add.image(660.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
				
    players[1][4] = this.add.image(680.0, 120.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][5] = this.add.image(600.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][6] = this.add.image(620.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][7] = this.add.image(640.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][8] = this.add.image(660.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][9] = this.add.image(680.0, 90.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][10] = this.add.image(640.0, 60.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][11] = this.add.image(660.0, 60.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][12] = this.add.image(680.0, 60.0, "unvisible-card").setScale(0.07, 0.07);

    // player 4
		players[1][0] = this.add.image(640.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][1] = this.add.image(660.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][2] = this.add.image(680.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][3] = this.add.image(700.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
				
    players[1][4] = this.add.image(720.0, 310.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][5] = this.add.image(640.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][6] = this.add.image(660.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][7] = this.add.image(680.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][8] = this.add.image(700.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
		players[1][9] = this.add.image(720.0, 280.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][10] = this.add.image(680.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
    
    players[1][11] = this.add.image(700.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
		
    players[1][12] = this.add.image(720.0, 250.0, "unvisible-card").setScale(0.07, 0.07);
		
  }
}

export default Scene2;