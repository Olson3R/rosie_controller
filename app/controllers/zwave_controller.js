var config = require('../../config/config')
var zwave = require('../../lib/zwave')
var ZwaveBase = require('../models/zwave/base')

var handlers = {}

handlers.index = {
  handler: function(req, res) {
    res(zwave.nodes)
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
