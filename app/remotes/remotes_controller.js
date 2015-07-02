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
    RemoteModel.sendCommand(req.params.remote, req.query.command)
    res()
  },
  validate: {
    query: {
      command: Joi.string()
    }
  }
}

module.exports = handlers
