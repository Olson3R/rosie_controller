var zwave = require('../../lib/zwave').zwave
var SwitchBinary = require('./classes/switch_binary')
var SwitchMultilevel = require('./classes/switch_multilevel')
var _ = require('underscore')

function Base(id, node) {
  this.id = id
}

Base.create = function(id, node) {
  return _.extend(new Base(id), node)
}

Base.find = function(id) {
  id = parseInt(id, 10)
  node = zwave.nodes[id]
  if (node) {
    return Base.create(id, node)
  }
}

Base.lights = function() {
  return _.filter(Base.nodes(), function(node) {
    return node.isLight()
  })
}

Base.nodes = function() {
  return _.map(zwave.nodes, function(node, index) {
    return Base.create(index, node)
  })
}

Base.prototype.update = function(payload) {
  var self = this
  var classes = _.result(payload, 'classes') || {}
  _.each(classes, function(value, key) {
    switch(key) {
      case '37': // COMMAND_CLASS_SWITCH_BINARY
        new SwitchBinary(self).update(value)
        break
      case '38': // COMMAND_CLASS_SWITCH_MULTILEVEL
        new SwitchMultilevel(self).update(value)
        break
    }
  })
}

Base.prototype.isLight = function() {
  return this.isSwitchBinary() || this.isSwitchMultilevel()
}

Base.prototype.isSwitchBinary = function() {
  classes = this.classes
  return classes && !_.isEmpty(classes['37'])
}

Base.prototype.isSwitchMultilevel = function() {
  classes = this.classes
  return classes && !_.isEmpty(classes['38'])
}

Base.prototype.turnOff = function() {
 if(this.isSwitchBinary()) new SwitchBinary(this).turnOff()
 if(this.isSwitchMultilevel()) new SwitchMultilevel(this).turnOff()
}

module.exports = Base
