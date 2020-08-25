const MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '你的密码',
  database: 'blog',
  connectTimeout: 30000
} 

const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379
}
if (process.env.NODE_ENV === 'production') {}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}
