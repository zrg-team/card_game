import { RESOURCES } from '../config'
import store from './globalStore'

export function getImageScale (key, { width, height }) {
  const item = RESOURCES.image.find(item => item.key === key)
  const widthPercent = (store.get('width') / item.width) * 100
  const heightPercent = (store.get('height') / item.height) * 100
  return [
    (width / widthPercent) * 100,
    (height / heightPercent) * 100
  ]
}
