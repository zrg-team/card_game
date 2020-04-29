const path = require('path')
const fs = require('fs')
const sizeOf = require('image-size')

const ACCEPTS = ['jpg', 'png']

function readDirs (currentPath, toFolder) {
  const results = []
  return new Promise((resolve, reject) => {
    fs.readdir(currentPath, function (err, files) {
      // handling error
      if (err) {
        return reject(err)
      }
      files.forEach(function (file) {
        const names = file.split('.')
        if (ACCEPTS.includes(names[1])) {
          const dimensions = sizeOf(`${currentPath}/${file}`)
          // Do whatever you want to do with the file
          if (!names[0]) {
            return
          }
          results.push({
            key: names[0],
            load: [names[0], `${toFolder}/${file}`],
            ...dimensions
          })
        }
      })
      resolve(results)
    })
  })
}

async function main () {
  const imagesData = await readDirs(path.join(__dirname, '../WebContent/assets/images'), 'assets/images')
  const cardsData = await readDirs(path.join(__dirname, '../WebContent/assets/images/cards'), 'assets/images/cards')
  fs.writeFileSync('./WebContent/src/json/images.json', JSON.stringify([...imagesData, ...cardsData], null, 2))
}

main()
