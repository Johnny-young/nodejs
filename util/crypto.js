const crypto = require('crypto')

const KEY = 'asd1#@342~--=_'

function md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function genPassword(password) {
  let str = `password=${password}&key=${KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}