const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({})

proxy.on('error', (err, req, res) => {
  res.writeHead(500, {  
    'Content-Type': 'text/plain'  
  });  
  res.end('Something went wrong. And we are reporting a custom error message.');  
})

const server = http.createServer((req, res) => {
  console.log('proxy url: ', req.url)
  if (/^\/api/.test(req.url)) {
    proxy.web(req, res, { target: 'http://localhost:8080' })
  }
})

server.listen(80)