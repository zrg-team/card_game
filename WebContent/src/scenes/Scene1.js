import Phaser from 'phaser'
import { delay } from '../utils/index'
import store from '../helplers/globalStore'
import firebase from '../helplers/firebase'
import generateGamePlayDialog from '../components/GamePlayDialog'
import {
  randomAllCards,
  readyToPlay,
  setOnRoomInfoChange,
  watchRoomInfo,
  deletePlayerFromRoom,
  getResult,
} from '../services/game'
import { getPlayersInfo } from '../services/players'

class Scene1 extends Phaser.Scene {
  constructor () {
    super('Scene1')
    this.handleChooseHiddenCard = this.handleChooseHiddenCard.bind(this)
    this.handleReadyToPlay = this.handleReadyToPlay.bind(this)
    this.handleChangeRoomInfo = this.handleChangeRoomInfo.bind(this)
    this.handleEndGame = this.handleEndGame.bind(this)

    this.randomChangeOrder = 0
  }

  async init (roomData) {
    this.room = roomData.room || {
      id: '1587274686115'
    }
    watchRoomInfo(this.room.id)
    this.loadingShufflingCard = null

    this.playersName = []
    this.playersScore = []
    this.cardAnimates = []

    const world = store.getAll()
    this.UISizes = {
      card: {
        width: world.width * 0.09,
        height: world.width * 0.09 * 120 / 80
      },
      openedCard: {
        width: world.width * 0.09,
        height: world.width * 0.09 * 90 / 60
      },
      users: {
        width: world.width * 0.12,
        height: world.width * 0.12,
        // BOTTOM
        1: {
          card: {
            x: 130,
            y: world.height - 200
          },
          openedCard: {
            x: 170,
            y: world.height - 200
          },
          icon: {
            x: 20,
            y: world.height - 200,
            origin: [0, 0.5]
          },
          text: {
            x: 20,
            y: world.height - world.width * 0.12 + 40,
            style: {
              fontSize: '26px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: true },
              align: 'left',
              fixedWidth: world.width * 0.14
            },
            origin: [0, 0]
          },
          score: {
            x: 20,
            y: world.height - world.width * 0.12 + 20,
            style: {
              fontSize: '18px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: true }
            },
            origin: [0, 0]
          }
        },
        2: {
          card: {
            x: world.width - 130,
            y: world.height - 200
          },
          openedCard: {
            x: world.width - 130,
            y: world.height - 200
          },
          icon: {
            x: world.width - 20,
            y: world.height - 200,
            origin: [1, 0.5]
          },
          text: {
            x: world.width - 20,
            y: world.height - world.width * 0.12 + 40,
            style: {
              fontSize: '26px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: false },
              align: 'right',
              fixedWidth: world.width * 0.14
            },
            origin: [1, 0]
          },
          score: {
            x: world.width - 20,
            y: world.height - world.width * 0.12 + 20,
            style: {
              fontSize: '18px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: true }
            },
            origin: [1, 0]
          }
        },
        // TOP
        3: {
          card: {
            x: world.width - 170,
            y: 80
          },
          openedCard: {
            x: world.width - 170,
            y: 80
          },
          icon: {
            x: world.width - 20,
            y: world.width * 0.12 + 40,
            origin: [1, 0.5]
          },
          text: {
            x: world.width - 20,
            y: 60,
            style: {
              fontSize: '26px',
              wordWrap: { width: world.width * 0.18, useAdvancedWrap: true }
            },
            origin: [1, 0]
          },
          score: {
            x: world.width - 20,
            y: 90,
            style: {
              fontSize: '18px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: true }
            },
            origin: [1, 0]
          }
        },
        4: {
          card: {
            x: 170,
            y: 80
          },
          openedCard: {
            x: 170,
            y: 60,
          },
          icon: {
            x: 20,
            y: world.width * 0.12 + 40,
            origin: [0, 0.5]
          },
          text: {
            x: 20,
            y: 60,
            style: {
              fontSize: '26px',
              wordWrap: { width: world.width * 0.18, useAdvancedWrap: true }
            },
            origin: [0, 0]
          },
          score: {
            x: 20,
            y: 90,
            style: {
              fontSize: '18px',
              wordWrap: { width: world.width * 0.14, useAdvancedWrap: true }
            },
            origin: [0, 0]
          }
        }
      }
    }
  }

  async create () {
    this.players = await getPlayersInfo('maubing', this.room)

    const world = store.getAll()
    this.bg = this.add
      .image(0, 0, 'main-background')
      .setOrigin(0, 0)
      .setDisplaySize(world.width, world.height)
      .setDepth(0)

    this.gameTable = this.add
      .image(0, 0, 'game-table')
      .setDisplaySize(world.width, world.height)
      .setOrigin(0, 0)

    this.createCommonUI(world)
    this.createExitRoomButton(world)
    this.createUserIcons(world)
    this.createUnvisibleCards(world)

    setOnRoomInfoChange(this.handleChangeRoomInfo)
  }

  update () {}

  createExitRoomButton (world) {
    const user = store.get('user')

    if (this.exitBtn) {
      this.exitBtn.setVisible(false)
      this.exitBtn.setActive(false)
    }

    this.exitBtn = this.add
      .image(world.width - 40, 30, 'exit-button')
      .setDisplaySize(100, 43)
      .setOrigin(0.5, 0.5)
      .setDepth(1000)
      .setInteractive()
      .on('pointerdown', async () => {
        this.tweens.add({
          targets: this.exitBtn,
          scaleX: 1.2,
          scaleY: 1.2,
          ease: 'Sine.easeInOut',
          duration: 100,
          repeat: 0,
          yoyo: true
        })
        deletePlayerFromRoom('maubing', this.room, user)
        this.scene.start('MenuScene')
      })
  }

  createButtonStart (world, callback) {
    if (this.buttonStart) {
      this.buttonStart.setVisible(true)
      this.buttonStart.setActive(true)
      return
    }
    this.buttonStart = this.add
      .image(world.width / 2, world.height / 2 - 20, 'playnow-button')
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
        callback()
      })

    this.tweens.add({
      targets: this.buttonStart,
      scale: 1.3,
      ease: 'Sine.easeInOut',
      duration: 800,
      repeat: -1,
      yoyo: true
    })
  }

  createCommonUI (world) {
    this.createButtonStart(world, this.handleReadyToPlay)

    this.hiddenCardNumberStyle = this.add
      .image(world.width / 2, 40, 'time-bg')
      .setDisplaySize(200, 50)
      .setOrigin(0.5, 0.5)
      .setDepth(0)
    this.hiddenCardNumber = this.add
      .text(world.width / 2 - 5, 40, `${this.randomChangeOrder}`, {
        font: '30px Arial',
        fill: '#FFFFFF'
      })
      .setOrigin(0.5, 0.5)
  }

  createUnvisibleCards (world, offset = 0.25, removeAll = true) {
    if (removeAll) {
      this.unvisibleCard = []
    }
    const cardWidth = this.UISizes.card.width
    const cardHeight = this.UISizes.card.height
    const bottom = world.height - cardHeight / 2 - 2
    const spaceBetweenCard = offset
    let startWidth = (world.width - 51 * spaceBetweenCard) / 2
    for (let i = 0; i < 52; i++) {
      if (this.unvisibleCard[i]) {
        this.tweens.killTweensOf(this.unvisibleCard[i])
        this.unvisibleCard[i].setPosition(startWidth, bottom)
      } else {
        this.unvisibleCard[i] = this.add
          .image(startWidth, bottom, 'green_back')
          .setDisplaySize(cardWidth, cardHeight)
          .setOrigin(0.5, 0.5)
      }
      
      startWidth += spaceBetweenCard
    }
  }

  createUserOpenedCards (cards) {
    this.openedCards = [[],[],[],[]]

    for (let i = 1; i <= this.players.length; i++) {
      let x = this.UISizes.users[i].openedCard.x;
      let y = this.UISizes.users[i].openedCard.y;

      for (let j = 0; j < cards[i-1].length; j++) {
        this.openedCards[i][j] = this.add.image(x, y, cards[i-1][j])
        .setDisplaySize(this.UISizes.openedCard.width, this.UISizes.openedCard.height)
        .setOrigin(0.5, 0.5)
  
        x = x + 20;
        if( j === 2 || j === 7) {
          x = this.UISizes.users[i].openedCard.x;
          y = y + 30;
        }
      }
    }
  }

  createDrawText (draw) {
    this.drawText = []
  
    for (let i = 1; i <= this.players.length; i++) {
      let x = this.UISizes.users[i].drawText.x;
      let y = this.UISizes.users[i].drawText.y;
      
      const { back, foul, front, maubinh, mid, winACE } = draw[i-1]

      const number = back + foul + front + maubinh + mid + winACE;

      if (number > 0) {
        this.drawText[i] = this.add
        .text(x, y, `Thắng ${Math.abs(Number(number))} chi`, {
          fontFamily: '"Arial Black"',
          fontSize: 15,
        })
        .setOrigin(0.5, 0.5)
      } else {
        this.drawText[i] = this.add
        .text(x, y, `Thua ${Math.abs(Number(number))} chi`, {
          fontFamily: '"Arial Black"',
          fontSize: 15,
        })
        .setOrigin(0.5, 0.5)
      }
    }
  }

  createUserIcons () {
    for (let i = 0; i < this.players.length; i++) {
      const user = this.UISizes.users[i + 1]
      this.add
        .image(user.icon.x, user.icon.y, 'user-icon')
        .setOrigin(...(user.icon.origin || [0.5, 0.5]))
        .setDisplaySize(this.UISizes.users.width, this.UISizes.users.height)
      this.playersName[i] = this.add
        .text(user.text.x, user.text.y, this.players[i].name, {
          fontFamily: '"Arial Black"',
          fontSize: 15,
          ...(user.text.style || {})
        })
        .setOrigin(...(user.text.origin || [0.5, 0.5]))

      this.playersScore[i] = this.add
        .text(user.score.x, user.score.y, `Score: ${this.players[i].balance}`, {
          fontFamily: '"Arial Black"',
          fontSize: 15,
          ...(user.score.style || {})
        })
        .setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        .setOrigin(...(user.score.origin || [0.5, 0.5]))
    }
  }

  createWaitingForPlayText () {
    const world = store.getAll()

    this.waitingText = this.add
      .text(world.width / 2, world.height / 2, 'Waiting for others...', {
        font: '34px Arial',
        fill: '#FFFFFF'
      })
      .setOrigin(0.5, 0.5)
    this.tweens.add({
      targets: this.waitingText,
      scale: 1.3,
      ease: 'Sine.easeInOut',
      duration: 800,
      repeat: -1,
      yoyo: true
    })
  }

  createWaitingEndGameText () {
    const world = store.getAll()

    this.waitingTextEnd = this.add
      .text(world.width / 2 - 5, 200, 'Waiting for result ...', {
        font: '30px Arial',
        fill: '#FFFFFF'
      })
      .setOrigin(0.5, 0.5)
    this.tweens.add({
      targets: this.waitingTextEnd,
      scale: 1.3,
      ease: 'Sine.easeInOut',
      duration: 800,
      repeat: -1,
      yoyo: true
    })
  }

  async handleChooseHiddenCard (players) {
    this.buttonStart.disableInteractive()
    this.buttonStart.setVisible(false)

    // xoc bai
    this.loadingShufflingCard = this.handleShufflingCard()

    const user = store.get('user')
    if (players[0] === user.uid) {
      console.log('randomAllCards>>>>>>>>>>>>>')
      randomAllCards(this.room)
    }

    this.randomInterval = setInterval(() => {
      this.randomChangeOrder = Math.floor(Math.random() * 10)
      this.hiddenCardNumber.setText(`${this.randomChangeOrder}`)
    }, 200)
  }

  async sendCardAnimation (count, i, totalPlayer) {
    console.log('>>>>>>>>>', (count % totalPlayer) + 1)
    const position = this.UISizes.users[(count % totalPlayer) + 1].card
    this.tweens.add({
      targets: this.unvisibleCard[i],
      repeat: 0,
      yoyo: false,
      props: {
        x: { value: position.x, duration: 100, ease: 'Bounce' },
        y: { value: position.y, duration: 100, ease: 'Bounce' },
        scale: { value: 0.105, duration: 100 }
      }
    })
    await delay(100)
  }

  handleShufflingCard () {
    const world = store.getAll()
    const leftX = world.width / 2 - this.UISizes.card.width / 1.5
    for (let i = 0; i < 25; i++) {
      this.tweens.add({
        targets: this.unvisibleCard[i],
        repeat: 0,
        yoyo: false,
        props: {
          x: {
            value: leftX,
            duration: 300,
            ease: 'Sine.easeInOut'
          }
        }
      })
    }
    const rightX = world.width / 2 + this.UISizes.card.width / 1.5
    for (let i = 25; i < 52; i++) {
      this.tweens.add({
        targets: this.unvisibleCard[i],
        repeat: 0,
        yoyo: false,
        props: {
          x: {
            value: rightX,
            duration: 300,
            ease: 'Sine.easeInOut'
          }
        }
      })
    }
    (async () => {
      await delay(400)

      const centerX = world.width / 2
      const positionX = this.UISizes.card.width / 1.5

      this.intervalShuffling = setInterval(() => {
        const random = Math.floor(Math.random() * 52)
        const newX =
          this.unvisibleCard[random].x < centerX ? centerX + positionX : centerX - positionX
        this.tweens.add({
          targets: this.unvisibleCard[random],
          repeat: 0,
          yoyo: false,
          props: {
            x: { value: newX, duration: 180, ease: 'Sine.easeInOut' }
          }
        })
      }, 200)
    })()
    return async () => {
      clearInterval(this.intervalShuffling)
      await delay(100)
      const spaceBetweenCard = 0.25
      const startWidth = (world.width - 51 * spaceBetweenCard) / 2
      for (let i = 0; i < 52; i++) {
        this.unvisibleCard[i].setX(startWidth + spaceBetweenCard * i)
      }
      await delay(0)
    }
  }

  async handleDealCard () {
    const world = store.getAll()

    const cardNumber = 51
    for (let i = 0; i < this.randomChangeOrder; i++) {
      // this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      this.tweens.add({
        targets: this.unvisibleCard[cardNumber - i],
        repeat: 0,
        yoyo: false,
        props: {
          x: {
            value: world.width / 2 + this.randomChangeOrder * 0.2,
            duration: 1000,
            ease: 'Sine.easeInOut'
          },
          y: {
            value: world.height / 2,
            duration: 1000,
            ease: 'Sine.easeInOut'
          }
        }
      })
    }

    await delay(1000)

    let countAnimation = 0
    for (let i = 0; i < this.randomChangeOrder; i++) {
      this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      countAnimation++
    }

    for (let i = this.randomChangeOrder; i < cardNumber + 1; i++) {
      this.unvisibleCard[cardNumber - i].setDepth(countAnimation)
      this.tweens.add({
        targets: this.unvisibleCard[cardNumber - i],
        repeat: 0,
        yoyo: false,
        props: {
          x: {
            value: world.width / 2 + 0.2 * i,
            duration: 1000,
            ease: 'Sine.easeInOut'
          },
          y: {
            value: world.height / 2,
            duration: 1000,
            ease: 'Sine.easeInOut'
          }
        }
      })
      countAnimation++
    }
    await delay(1000)

    const totalPlayer = this.room.players.length
    let max = cardNumber + 1

    if (totalPlayer === 2) {
      max = this.randomChangeOrder + 26
    }
    if (totalPlayer === 3) {
      max = this.randomChangeOrder + 39
    }

    let count = 1
    for (let i = 0; i < max; i++) {
      await this.sendCardAnimation(count, i, totalPlayer) // hard code 4 here for 4 players
      count++

      if (i === 51) {
        i = -1
        max = this.randomChangeOrder
      }
    }

    generateGamePlayDialog(this, world, this.room.id, {
      onSuccess: () => {
        this.playerDone = true
        for (let i = 0; i < 52; i++) {
          if (this.unvisibleCard[i]) {
            this.unvisibleCard[i].setVisible(false)
            this.unvisibleCard[i].destroy()
            delete this.unvisibleCard[i]
          }
        }
        this.unvisibleCard = null

        this.createWaitingEndGameText()
      },
      countdown: 60
    })
  }

  handleEndGame (result) {
    const world = store.getAll()
  
    if (this.waitingText) {
      this.waitingText.setVisible(true)
      this.waitingText.setActive(true)
    }
    if (this.waitingTextEnd) {
      this.waitingTextEnd.destroy()
    }

    if (!this.openedCards && !this.drawText) {
      this.createUserOpenedCards(result.cards)
      this.createDrawText(result.draw)
    }

    this.buttonStart.setVisible(true)
    this.buttonStart.setActive(true)
    this.buttonStart.setInteractive(true)

    if (!this.unvisibleCard) {
      this.createUnvisibleCards(world)
    }
  }

  async handleBeforePlaying (randomNumber) {
    if (this.loadingShufflingCard) {
      await this.loadingShufflingCard()
    }
    this.loadingShufflingCard = null
    if (this.randomInterval) {
      window.clearInterval(this.randomInterval)
      this.randomChangeOrder = randomNumber
      this.hiddenCardNumber.setText(`${randomNumber}`)
    }

    const cardNumber = 51
    if (this.randomChangeOrder) {
      for (let i = 0; i < this.randomChangeOrder; i++) {
        this.unvisibleCard[cardNumber - i].y += 10
      }
    }

    for (let i = 0; i < this.randomChangeOrder; i++) {
      this.unvisibleCard[cardNumber - i].y -= 10
    }

    await delay(400)
    this.handleDealCard()
  }

  handleReadyToPlay () {
    readyToPlay('maubing', this.room)

    if (this.openedCards) {
      for (let i = 1; i <= this.players.length; i++) {
        for (let k = 0; k < 13; k++) {
          this.openedCards[i][k].destroy()
          delete this.openedCards[i][k]
          
        }
      }
      this.openedCards = null
    }
    if (this.drawText) {
      for (let i = 1; i <= this.players.length; i++) {
        this.drawText[i].destroy()
        delete this.drawText[i]
      }
      this.drawText = null
    }

    this.buttonStart.setVisible(false)
    this.buttonStart.setActive(false)

    this.createWaitingForPlayText()
  }

  async handleChangeRoomInfo (roomInfo) {
    const user = store.get('user')

    if (this.room.players.length !== roomInfo.players.length) {
      this.players = await getPlayersInfo('maubing', roomInfo)
      this.createUserIcons()
    }

    if (this.playerDone && roomInfo.result.status === 'DONE' && !roomInfo.readyPlayers.includes(user.uid)) {
      this.result = await getResult('maubing', roomInfo)
      console.log('into done')
      this.handleEndGame(this.result)
    }

    if (roomInfo.result && roomInfo.result.status === 'WAITING_FOR_RANDOM') {
      this.room = roomInfo
      this.handleChooseHiddenCard(roomInfo.players)
      this.waitingText && this.waitingText.destroy()
    }

    if (roomInfo.result && roomInfo.result.status === 'PLAYING') {
      this.room = roomInfo
      this.handleBeforePlaying(roomInfo.randomNumber)
    }
  }
}

export default Scene1
