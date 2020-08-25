const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
  const writeStream = fs.createWriteStream(path.join(__dirname, '../logs/' + fileName))
  return writeStream
}

const writeLog = (writeStream, log) => {
  console.log('log: ', log)
  writeStream.write(log + '\n')
}

const accessWriteStream = createWriteStream('access.log', { flags: 'a' })
const writeAccessLog = (log) => {
  writeLog(accessWriteStream, log)
}

module.exports = {
  writeAccessLog
}