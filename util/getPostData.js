const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
      resolve({})
      return
    }

    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })

    req.on('end', () => {
      resolve(data)
    })
  })
}

module.exports = getPostData