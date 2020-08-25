const xss = require('xss')
const { query, esacpe } = require('../mysql')
const { setAsync } = require('../redis')
const { SuccessModel, FailModel } = require('../model/model')
const { genPassword } = require('../../util/crypto')

const register = (req, res) => {
  const { account, password } = JSON.parse(req.body)
  if (!account || !password) {
    res.end(new FailModel({}, '参数不能为空!'))
  }
  let accountVal = esacpe(xss(account))
  let passwordVal = esacpe(xss(genPassword(password)))
  // 名称查重
  let sql = `SELECT * FROM user WHERE account=${accountVal}`
  query(sql)
    .then(resData => {
      console.log(resData)
      if (resData.length) {
        res.end(
          JSON.stringify(new FailModel({}, '账号名称已存在!'))
        )
      } else {
        sql = `INSERT INTO user (account, password) VALUES (${accountVal}, ${passwordVal})`
        query(sql)
          .then((resData) => {
            console.log(JSON.parse(JSON.stringify(resData)))
            res.end(
              JSON.stringify(new SuccessModel({}, '注册成功'))
            )
          })
          .catch(err => {
            console.log(err)
            res.end(
              JSON.stringify(new FailModel({}, '注册失败'))
            )
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '注册失败'))
      )
    })
}

const login = (req, res) => {
  const { account, password } = JSON.parse(req.body)
  if (!account || !password) {
    res.end(new FailModel({}, '参数不能为空!'))
  }
  let accountVal = esacpe(xss(account))
  let passwordVal = esacpe(xss(genPassword(password)))
  let sql = `SELECT account, id FROM user WHERE account=${accountVal} AND password=${passwordVal}`
  query(sql)
    .then((resData) => {
      // console.log(JSON.parse(JSON.stringify(resData)))
      const userData = JSON.parse(JSON.stringify(resData))
      if (userData.length) {
        let sessionId = Date.now()
        // redis 设置sessionId
        setAsync(sessionId,　JSON.stringify(userData[0]))
        // 请求返回头设置cookie
        res.setHeader('Set-Cookie', `sessionid=${sessionId}; path=/;`)
        res.end(
          JSON.stringify(new SuccessModel({}, '登录成功'))
        )
      } else {
        res.end(
          JSON.stringify(new FailModel(userData, '没有该账号(账号密码、错误)'))
        )
      }
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel({}, '登录失败'))
      )
    })
}

module.exports = {
  login,
  register
}