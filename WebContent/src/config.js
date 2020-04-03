export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDGCpgkZ8XJE_e2Xwp-9iVUtFOfKVTVbM0',
  authDomain: 'card-game-1.firebaseapp.com',
  databaseURL: 'https://card-game-1.firebaseio.com',
  projectId: 'card-game-1',
  storageBucket: 'card-game-1.appspot.com',
  messagingSenderId: '154392662057',
  appId: '1:154392662057:web:ef67220923b240fd72cc38',
  measurementId: 'G-GRM6F1ZDH8'
}

export const RESOURCES = {
  image: [
    {
      key: 'logo-game',
      width: 2048,
      height: 2048,
      load: ['logo-game', 'assets/images/logo-game.png']
    },
    {
      key: 'button',
      width: 269,
      height: 76,
      load: ['button', 'assets/images/button.png']
    },
    {
      key: 'playnow',
      width: 470,
      height: 146,
      load: ['playnow', 'assets/images/playnow.png']
    },
    {
      key: 'main-background',
      width: 1334,
      height: 750,
      load: ['main-background', 'assets/images/menu-bg.png']
    },
    {
      key: 'top-panel',
      width: 1334,
      height: 90,
      load: ['top-panel', 'assets/images/top-panel.png']
    },
    {
      key: 'user-panel',
      width: 450,
      height: 123,
      load: ['user-panel', 'assets/images/user-panel.png']
    },
    {
      key: 'user-icon',
      width: 84,
      height: 88,
      load: ['user-icon', 'assets/images/user-icon.png']
    },
    {
      key: 'login-button',
      width: 246,
      height: 78,
      load: ['login-button', 'assets/images/login-button.png']
    },
    {
      key: 'register-button',
      width: 246,
      height: 78,
      load: ['register-button', 'assets/images/register-button.png']
    },
    {
      key: 'setting-button',
      width: 60,
      height: 60,
      load: ['setting-button', 'assets/images/setting-button.png']
    },
    {
      key: 'dialog-bg',
      width: 1664,
      height: 990,
      load: ['dialog-bg', 'assets/images/dialog-bg.png']
    },
    {
      key: 'dialog-close',
      width: 65,
      height: 64,
      load: ['dialog-close', 'assets/images/dialog-close.png']
    },
    {
      key: 'avatar',
      load: ['avatar', 'assets/images/avatar.png']
    },
    {
      key: 'unvisible-card',
      load: ['unvisible-card', 'assets/images/unvisible-card.jpg']
    },
    {
      key: 'game-table',
      load: ['game-table', 'assets/images/game-table.jpg']
    },
    {
      key: 'kenh-bai',
      load: ['kenh-bai', 'assets/images/kenh-bai.png']
    },
  ],
  spritesheet: [
    {
      key: 'button-start',
      load: ['button-start', 'assets/spritesheets/button-start.png', { frameWidth: 180, frameHeight: 180 }]
    }
  ],
  audio: [
    {
      key: 'sound-click',
      load: [
        'sound-click',
        ['assets/sfx/audio-button.mp4', 'assets/sfx/audio-button.mp3', 'assets/sfx/audio-button.ogg']
      ]
    }
  ]
}
