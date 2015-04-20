var ZwaveBase = require('../models/zwave/base')
var _ = require('underscore')

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
