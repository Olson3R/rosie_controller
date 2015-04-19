var zwave = require('../../../../lib/zwave')
var _ = require('underscore')

function SwitchMultilevel(id, node) {
  this.id = id
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
  if (value < 0 || value > 99) return

  zwave.setLevel(this.id, value)
}

module.exports = SwitchMultilevel
