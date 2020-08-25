const urlData = (data) => {
  if (!data) {
    return ''
  } 
  if (typeof data !== 'object') {
    throw Error('传参不是对象')
  }

  let content = '?'
  let arr = Object.keys(data)
  arr.forEach((key, index) => {
    content += `${key}=${data[key]}${index !== arr.length-1 ? '&' : ''}`
  })
  return content
}

const fetch = (method, url, data={}, async=true) => {
  console.log(method, url, data)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.response)
        }
      }
    }

    url = 'http://localhost' + url
    console.log("url: ", url)
    // 跨域请求，携带cookie
    xhr.withCredentials = true
    if (method.toUpperCase() === 'GET') {
      xhr.open(method, url + urlData(data), async)
      xhr.send()
    } else if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
      xhr.open(method, url, async)
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(JSON.stringify(data))
    }
  })
}