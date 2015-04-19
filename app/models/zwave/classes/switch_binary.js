var zwave = require('../../../../lib/zwave')
var _ = require('underscore')

function SwitchBinary(id, node) {
  this.id = id
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
  if (value) {
    zwave.switchOn(this.id)
  } else {
    zwave.switchOff(this.id)
  }
}

module.exports = SwitchBinary
