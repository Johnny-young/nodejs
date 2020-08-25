const blogApi = require('./blog')
const userApi = require('./user')

const router = (req, res) => {
  if (/blog/.test(req.path)) {
    blogApi(req, res)
  } else if (/user/.test(req.path)) {
    userApi(req, res)
  } else {
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 not Found')
    res.end()
  }
}

module.exports = router