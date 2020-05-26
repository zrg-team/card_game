import images from './json/images.json'

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
  image: images,
  spritesheet: [
  ],
  audio: [
    {
      key: 'sound-click',
      load: [
        'sound-click',
        ['assets/sfx/audio-button.mp4', 'assets/sfx/audio-button.mp3', 'assets/sfx/audio-button.ogg']
      ]
    },
    {
      key: 'button-click',
      load: [
        'button-click',
        ['assets/sfx/button.mp3']
      ]
    },
    {
      key: 'background-music',
      load: [
        'background-music',
        ['assets/sfx/bgm2.mp3']
      ]
    }
  ]
}
