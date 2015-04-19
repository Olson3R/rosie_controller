var zwave = require('../../../lib/zwave')
var SwitchBinary = require('./classes/switch_binary')
var SwitchMultilevel = require('./classes/switch_multilevel')
var _ = require('underscore')

function Base(id, node) {
  this.id = id
  this.node = node
}

Base.find = function(id) {
  id = parseInt(id, 10)
  node = zwave.nodes[id]
  if (node) {
    return new Base(id, node)
  }
}

Base.prototype.update = function(payload) {
  var self = this
  _.each(payload, function(value, key) {
    switch(key) {
      case '37': // COMMAND_CLASS_SWITCH_BINARY
        new SwitchBinary(self.id, self.node).update(value)
        break
      case '38': // COMMAND_CLASS_SWITCH_MULTILEVEL
        new SwitchMultilevel(self.id, self.node).update(value)
        break
    }
  })
}

module.exports = Base
