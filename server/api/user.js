const { login, register } = require('../controller/user')

const userApi = (req, res) => {
  if (req.method === 'POST' && req.path === '/api/user/login') {
    login(req, res)
  }

  if (req.method === 'POST' && req.path === '/api/user/register') {
    register(req, res)
  }
}

module.exports = userApi