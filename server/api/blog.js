const { 
  getBlogList,
  addBlog,
  checkBlog,
  updateBlog,
  deleteBlog 
} = require('../controller/blog')

const blogApi = (req, res) => {
  // 查询列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    getBlogList(req, res)
  }

  // 新增
  if (req.method === 'POST' && req.path === '/api/blog/add') {
    addBlog(req, res)
  }

  // 查询文章详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    checkBlog(req, res)
  }

  // 修改
  if (req.method === 'PUT' && req.path === '/api/blog/update') {
    updateBlog(req, res)
  }

  // 删除
  if (req.method === 'DELETE' && req.path === '/api/blog/delete') {
    deleteBlog(req, res)
  }
  
}

module.exports = blogApi
