# nodejs 简单的博客项目 （适合入门nodejs）
博客的增删查改，分页，模糊查询等功能

## 安装
`git clone xxx`

---
## 运行
`启动服务器 yarn server:dev | npm run server:dev`

`启动代理服务器 yarn proxy | npm start proxy`

`启动静态资源服务器 yarn client | npm start client`

> 先安装、启动 mysql, redis, 不然报错！！！

---
### blog表
```
id: int 
title: varchar30
content: longtext
author: varchar20
createtime: timestamp
enable: int // 软删除
```

### user表
```
id: int 
account: varchar20
password: varchar50
enable: int // 软删除
```

### mysql配置  /config/db.js
```
  host: 'localhost',
  user: 'root',
  password: '你的密码',
  database: 'blog', // 我的数据库名为blog
  connectTimeout: 30000
```
