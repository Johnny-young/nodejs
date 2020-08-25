const { query, esacpe } = require('../mysql')
const { SuccessModel, FailModel } = require('../model/model')
const xss = require('xss')

// 获取博客列表（支持分页查询，模糊查询）
const getBlogList = (req, res) => {
  const { title, author, page, pageSize } = JSON.parse(JSON.stringify(req.query))
  console.log(title, author, page, pageSize)
  let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM blog WHERE 1=1`
  let titleVal = esacpe('%' + xss(title) + '%')
  let authorVal = esacpe('%' + xss(author) + '%')

  if(title) {
    sql += ' AND title LIKE ' + titleVal 
    if (author) {
      sql += ' AND ' + authorVal
    }
  } else if(author) {
    sql += ' AND author LIKE ' + authorVal
  }

  sql += ` AND enable=1 order by createtime desc limit ${(page - 1) * pageSize}, ${pageSize};`
  
  query(sql)
    .then(resdata => {
      // console.log(JSON.parse(JSON.stringify(resdata)))
      query('SELECT FOUND_ROWS() as total;').then(data => {
        // console.log()
        if (data) {
          res.end(
            JSON.stringify(new SuccessModel({
              list: JSON.parse(JSON.stringify(resdata)),
              total: Math.ceil(JSON.parse(JSON.stringify(data))[0].total / pageSize),
              page: Number(page)
            }, '查询成功'))
          )
        } else {
          res.end(
            JSON.stringify(new FailModel(data, '查询失败'))
          )
        }
      })
      .catch(err => {
        console.log(err)
        res.end(
          JSON.stringify(new FailModel(err, '查询失败'))
        )
      })
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '查询失败'))
      )
    })
}

// 新增博客
const addBlog = (req, res) => {
  const { title, content, author } = JSON.parse(req.body)
  let titleVal = esacpe(xss(title))
  let contentVal = esacpe(xss(content))
  let authorVal = esacpe(xss(author))
  let sql = `INSERT INTO blog ( title, content, author ) VALUES (${titleVal}, ${contentVal}, ${authorVal});`
  query(sql)
    .then(resdata => {
      // console.log(resdata)
      res.end(
        JSON.stringify(new SuccessModel({}, '新增成功'))
      )
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '新增失败'))
      )
    })
}

// 查询博客详情
const checkBlog = (req, res) => {
  const { id } = req.query
  let sql = `SELECT * FROM blog WHERE id=${id} AND enable=1;`
  query(sql)
    .then(resData => {
      // console.log(resData)
      res.end(
        JSON.stringify(new SuccessModel(JSON.parse(JSON.stringify(resData)), '查询成功'))
      )
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '查询失败'))
      )
    })
}

// 修改博客
const updateBlog = (req, res) => {
  const { title, content, author, id } = JSON.parse(req.body)
  let titleVal = esacpe(xss(title))
  let contentVal = esacpe(xss(content))
  let authorVal = esacpe(xss(author))
  let sql = `UPDATE blog SET title=${titleVal}, content=${contentVal}, author=${authorVal} WHERE id=${id}`
  query(sql)
    .then(resData => {
      // console.log(resData)
      res.end(
        JSON.stringify(new SuccessModel({}, '更新成功'))
      )
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '查询失败'))
      )
    })
}

// 删除博客（软删除）
const deleteBlog = (req, res) => {
  const { id } = JSON.parse(req.body)
  let sql = `UPDATE blog SET enable=0 WHERE id=${id}`
  query(sql)
    .then(resData => {
      // console.log(resData)
      res.end(
        JSON.stringify(new SuccessModel({}, '删除成功'))
      )
    })
    .catch(err => {
      console.log(err)
      res.end(
        JSON.stringify(new FailModel(err, '查询失败'))
      )
    })
}

module.exports = {
  getBlogList,
  addBlog,
  checkBlog,
  updateBlog,
  deleteBlog
}