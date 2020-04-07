import { createLabel, createButton, createToast, createLoading } from '../helplers/ui'
import { getRooms, createRoom, joinRoom } from '../services/game'

export default function generateGamePlayDialog (scene, store, option = {}) {
  let loading = false
  const scrollablePanel = scene.rexUI.add.scrollablePanel({
    width: store.width, // Minimum width of round-rectangle
    height: store.height, // Minimum height of round-rectangle
    x: 0,
    y: 0,

    scrollMode: 1,

    background: scene.add.image(store.width / 2, store.height / 2, 'overlay')
      .setSize(store.width, store.height),

    panel: {
        child: scene.rexUI.add.sizer({
            orientation: 'x',
            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                item: 8,
                line: 8,
            }
        }),

        mask: {
            padding: 1
        },
    },

    space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        panel: 10,
    }
  })
  .layout()
  return scrollablePanel
}
