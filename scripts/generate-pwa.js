const path = require('path')
const fs = require('fs')

function readDirs (currentPath, toFolder) {
  const results = []
  return new Promise((resolve, reject) => {
    fs.readdir(currentPath, function (err, files) {
      // handling error
      if (err) {
        return reject(err)
      }
      files.forEach(function (file) {
        const names = file.split('.', 2)
        if (!names[0] || !names[1]) {
          return
        }
        results.push(`${toFolder}/${file}`)
      })
      resolve(results)
    })
  })
}

async function main () {
  const imagesData = await readDirs(path.join(__dirname, '../WebContent/assets/images'), 'assets/images')
  const cardsData = await readDirs(path.join(__dirname, '../WebContent/assets/images/cards'), 'assets/images/cards')
  const sfxData = await readDirs(path.join(__dirname, '../WebContent/assets/sfx'), 'assets/sfx')
  const publicData = await readDirs(path.join(__dirname, '../WebContent/assets/public'), 'assets/public')
  const pwaData = await readDirs(path.join(__dirname, '../WebContent/assets/pwa/icons'), 'assets/pwa/icons')
  const jsData = await readDirs(path.join(__dirname, '../WebContent/build/js'), 'js')
  const template = fs.readFileSync(path.join(__dirname, '../WebContent/assets/pwa/service-worker.template.js'))
  const data = template.toString().split('\n')
  const devData = template.toString().split('\n')
  const cachedDatas = JSON.stringify([
    '/',
    ...jsData,
    ...imagesData,
    ...cardsData,
    ...sfxData,
    ...publicData,
    ...pwaData
  ])
  const devCachedDatas = JSON.stringify([
    '/',
    ...imagesData,
    ...cardsData,
    ...sfxData,
    ...publicData,
    ...pwaData
  ])
  data.splice(0, 0, `const precacheResources = JSON.parse('${cachedDatas}')`)
  devData.splice(0, 0, `const precacheResources = JSON.parse('${devCachedDatas}')`)
  fs.writeFileSync(path.join(__dirname, '../WebContent/build/service-worker.js'), data.join('\n'))
  fs.writeFileSync(path.join(__dirname, '../WebContent/dev/service-worker.js'), devData.join('\n'))
}

main()
