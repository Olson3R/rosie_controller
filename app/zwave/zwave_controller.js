var ZwaveBase = require('./base_model')

var handlers = {}

handlers.index = {
  handler: function(req, res) {
    res(ZwaveBase.lights())
  }
}

handlers.update = {
  handler: function(req, res) {
    node = ZwaveBase.find(req.params.id)
    node.update(req.payload)
    res()
  }
}

module.exports = handlers
