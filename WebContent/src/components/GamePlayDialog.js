import { createLoading } from '../helplers/ui'
import { formatCountdown } from '../utils'
import { submitCards, getUserCards } from '../services/game'

export default async function generateGamePlayDialog (scene, store, roomId, option = {
  countdown: 60,
  onSuccess
}) {
  const userCard = await getUserCards('maubinh', roomId)
  const cards = userCard.cards || ['XC', 'XD', '2D', '4C', '6D', 'QD', 'KH', 'AH', 'AC', '3D', '4S', '9D', '8C']

  let loading = false
  let locked = false
  const results = [...cards]
  let selectedInstance = null
  let selectedIndex = null
  const cardHeight = ((store.height / 3)) - 28
  const cardWidth = ((cardHeight * 691) / 1056)
  const cardScaleHeight = cardHeight / 1056
  const cardScaleWidth = cardWidth / 691 + 0.02

  // Dialog components
  let countdown = option.countdown
  let pages = null
  let bottomPanel = null
  let timePanel = null
  let timeText = null
  let userIcon = null
  let userBalance = null
  let buttonSubmit = null

  let timeInstance = null

  const destroyAll = () => {
    if (pages) {
      pages.setVisible(false)
      pages.destroy()
      pages = null
    }
    if (bottomPanel) {
      bottomPanel.setVisible(false)
      bottomPanel.destroy()
      bottomPanel = null
    }
    if (timePanel) {
      timePanel.setVisible(false)
      timePanel.destroy()
      timePanel = null
    }
    if (timeText) {
      timeText.setVisible(false)
      timeText.destroy()
      timeText = null
    }
    if (userIcon) {
      userIcon.setVisible(false)
      userIcon.destroy()
      userIcon = null
    }
    if (userBalance) {
      userBalance.setVisible(false)
      userBalance.destroy()
      userBalance = null
    }
    if (buttonSubmit) {
      buttonSubmit.setVisible(false)
      buttonSubmit.destroy()
      buttonSubmit = null
    }
  }

  const handleSubmitCard = async () => {
    loading = true
    clearInterval(timeInstance)
    const loadingComponent = createLoading(scene, 'Submit...', store)
    await submitCards('maubinh', scene.room, results)
    loadingComponent.setVisible(false)
    loadingComponent.destroy()
    destroyAll()
    if (option.onSuccess) {
      option.onSuccess()
    }
  }

  const createCountdown = () => {
    if (timeText) {
      timeText.text = formatCountdown(countdown)
    }
    timeInstance = setInterval(() => {
      countdown--
      const time = formatCountdown(countdown)
      if (timeText) {
        timeText.text = time
      }
      if (countdown <= 0) {
        locked = true
        clearInterval(timeInstance)
        return handleSubmitCard()
      }
    }, 1000)
  }

  pages = scene.rexUI.add.gridSizer({
    width: store.width, // Minimum width of round-rectangle
    height: store.height, // Minimum height of round-rectangle
    x: store.width / 2,
    y: store.height / 2,
    column: 5,
    row: 3
  })
    .addBackground(
      scene.add.image(store.width / 2, store.height / 2, 'overlay')
        .setSize(store.width, store.height)
        .setDepth(98)
        .setInteractive()
    )
    .layout()
    .setDepth(99)

  let row = 0
  let column = 0
  cards.forEach((item, i) => {
    pages.add(
      scene.add
        .image(0, 0, item)
        // .setDisplaySize(cardWidth, cardHeight)
        .setScale(cardScaleWidth, cardScaleHeight)
        .setDepth(99)
        .setInteractive()
        .on('pointerdown', function () {
          if (locked) {
            return
          }
          if (!selectedInstance) {
            selectedInstance = this
            selectedIndex = i
            scene.tweens.add({
              targets: selectedInstance,
              scaleX: cardScaleWidth + 0.01,
              scaleY: cardScaleHeight + 0.01,
              duration: 100,
              repeat: 0,
              yoyo: true
            })
            this.setAlpha(0.8)
          } else {
            selectedInstance.setAlpha(1)
            const lastItem = results[selectedIndex]
            this.setTexture(lastItem)
            selectedInstance.setTexture(results[i])
            results[selectedIndex] = results[i]
            results[i] = lastItem
            scene.tweens.add({
              targets: this,
              scaleX: cardScaleWidth + 0.02,
              scaleY: cardScaleHeight + 0.02,
              duration: 100,
              repeat: 0,
              yoyo: true
            })
            selectedIndex = null
            selectedInstance = null
          }
        }),
      column,
      row,
      'center',
      {
        left: 5,
        right: 0,
        top: 5,
        bottom: 0
      }
    )
    if ((
      row === 0 && column === 2
    ) || (
      column === 4
    )) {
      row++
      column = 0
    } else {
      column++
    }
  })
  bottomPanel = scene.add.image(0, store.height + 15, 'bottom-panel')
    .setSize(store.width, 10)
    .setDepth(999)
  timePanel = scene.add.image(store.width - 110, 25, 'time-bg')
    .setDisplaySize(200, 40)
    .setOrigin(0.5, 0.5)
    .setDepth(999)
  timeText = scene.add.text(store.width - 110, 25, '00:00', {
    fontSize: '24px'
  })
    .setOrigin(0.5, 0.5)
    .setDepth(1000)
  userIcon = scene.add
    .image(10, store.height - 56, 'user-icon')
    .setOrigin(0, 0)
    .setDisplaySize(56, 56)
    .setDepth(1000)
  userBalance = scene.add.text(
    86,
    store.height - 44,
      `${store.information.balance || 0} 💎`,
      {
        fontSize: '24px'
      }
  )
    .setDepth(1000)
  buttonSubmit = scene.add.image(store.width - 80, store.height - 30, 'done-button')
    .setDisplaySize(140, 40)
    .setOrigin(0.5, 0.5)
    .setDepth(1000)
    .setInteractive()
    .on('pointerdown', async () => {
      if (loading) {
        return
      }
      scene.tweens.add({
        targets: buttonSubmit,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: 'Sine.easeInOut',
        duration: 100,
        repeat: 0,
        yoyo: true
      })
      handleSubmitCard()
    })

  scene.tweens.add({
    targets: buttonSubmit,
    scaleX: 1.06,
    scaleY: 1.06,
    ease: 'Sine.easeInOut',
    duration: 400,
    repeat: -1,
    yoyo: true
  })

  pages
    .layout()
    .setDepth(998)
  createCountdown()
  return destroyAll
}
