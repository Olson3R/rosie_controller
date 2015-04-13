var config = require('../../config/config')
var remotes = config.remotes
var handlers = {}

handlers.index = {
  handler: function(req, res) {
    res(remotes)
  }
}

handlers.show = {
  handler: function(req, res) {
    res(remotes[req.params.remote])
  }
}

module.exports = handlers
