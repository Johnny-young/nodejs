class BaseModel {
  constructor(data ,msg) {
    this.data = data
    this.message = msg
  }
}

class SuccessModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg)
    this.status = 200
  }
}

class FailModel extends BaseModel {
  constructor(data, msg, statusCode=500) {
    super(data, msg)
    this.status = statusCode
  }
}

module.exports = {
  SuccessModel,
  FailModel
}