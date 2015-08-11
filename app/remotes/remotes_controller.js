var Joi = require('joi')
var RemoteModel = require('./remote_model')
var handlers = {}

handlers.index = {
  handler: function(req, res) {
    res(RemoteModel.list())
  }
}

handlers.sendCommand = {
  handler: function(req, res) {
    RemoteModel.sendCommand(req.params.id, req.payload.command)
    res()
  },
  validate: {
    payload: {
      command: Joi.string()
    }
  }
}

module.exports = handlers
