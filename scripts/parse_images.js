const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../WebContent/assets/images/cards')

const results = []
fs.readdir(directoryPath, function (err, files) {
  // handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const names = file.split('.')
    if (!names[0]) {
      return
    }
    results.push({
      key: names[0],
      load: [names[0], `assets/images/cards/${file}`]
    })
  })
  fs.writeFileSync('./WebContent/src/json/cards.json', JSON.stringify(results, null, 2))
})
