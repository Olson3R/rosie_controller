var zwave = require('../../../lib/zwave').zwave
var _ = require('underscore')

function SwitchMultilevel(node) {
  this.node = node
}

SwitchMultilevel.prototype.update = function(attrs) {
  var self = this
  _.each(attrs, function(value, key) {
    switch(key) {
      case '0': // Level
        self.setLevel(value)
        break
    }
  })
}

SwitchMultilevel.prototype.setLevel = function(value) {
  var level = _.result(value, 'value')
  if (typeof level === 'undefined' || level < 0 || level > 99) return

  zwave.setLevel(this.node.id, level)
}

SwitchMultilevel.prototype.turnOff = function() {
  this.setLevel({value: 0})
}

module.exports = SwitchMultilevel
