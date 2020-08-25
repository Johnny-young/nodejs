const http = require('http')
const queryString = require('querystring')
const router = require('./api')
const getPostData = require('../util/getPostData')
const { getAsync } = require('./redis')
const { FailModel } = require('./model/model')
const { writeAccessLog } = require('../util/log')

http.createServer((req, res) => {
  console.log('req.method: ', req.method)
  console.log('req.url: ', req.url)
  // 写日志
  writeAccessLog(req.method + ' -- ' + req.url + ' -- ' + req.headers['user-agent'] + ' -- ' + new Date().toLocaleString())

  // 跨域
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3033")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Credentials', true) // 跨域请求允许cookie携带
  res.setHeader('Content-type', "application/json") // 返回数据格式

  // 请求options处理
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  // 请求路径处理
  const pathArr = req.url.split('?')
  req.path = pathArr[0]
  // query参数
  req.query = pathArr[1] ? queryString.parse(pathArr[1]) : {}

  // 检测是否登录，cookie中是否有sessionid
  console.log('cookie: ', req.headers['cookie'])
  const whiteList = ['/api/user/login', '/api/user/register', '/api/user/forget'] // 白名单
  if (req.headers['cookie'] && /sessionid/.test(req.headers['cookie']) !== -1) {
    let sessionId = req.headers['cookie'].split('sessionid=')[1].split(';')[0].trim()
    getAsync(sessionId)
      .then(resData => {
        // console.log('redis resData:', resData)
        if (!resData && !whiteList.includes(req.path)) {
          res.end(
            JSON.stringify(new FailModel({}, '请先登录', 401))
          )
          return
        }
      })
      .catch(err => {
        console.log(err)
        res.end(
          JSON.stringify(new FailModel(err, '登录信息出错'))
        )
        return
      })
  } else {
    if (!whiteList.includes(req.path)) {
      res.end(
        JSON.stringify(new FailModel({}, '请先登录', 401))
      )
      return
    }
  }
  
  // 处理post请求
  getPostData(req).then(resData => {
    req.body = resData
    // 路由处理
    router(req, res)
  }).catch(err => {
    console.log(err)
  })
})
.listen(8080)

console.log('server on localhost:8080')