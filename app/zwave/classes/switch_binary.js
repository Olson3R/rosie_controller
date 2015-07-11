var zwave = require('../../../lib/zwave').zwave
var _ = require('underscore')

function SwitchBinary(node) {
  this.node = node
}

SwitchBinary.prototype.update = function(attrs) {
  var self = this
  _.each(attrs, function(value, key) {
    switch(key) {
      case '0': // Switch
        self.setSwitch(value)
        break
    }
  })
}

SwitchBinary.prototype.setSwitch = function(value) {
  if (_.result(value, 'value')) {
    zwave.switchOn(this.node.id)
  } else {
    zwave.switchOff(this.node.id)
  }
}

SwitchBinary.prototype.turnOff = function() {
  this.setSwitch({value: false})
}

module.exports = SwitchBinary
