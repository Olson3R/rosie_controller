var zwave = require('../../../lib/zwave')
var Base = require('./base')
var util = require('util')

var BinarySceneSwitch = function(id, node) {
  Base.apply(this, arguments)
}

util.inherits(BinarySceneSwitch, Base)


BinarySceneSwitch.prototype.update = function(payload) {
  _.each(payload, function(key, value) {
    switch(key) {
      case "state:
        this.setState(value)
        break
    }
  })
}

BinarySceneSwitch.prototype.setState = function(state) {
  if (state) {
    zwave.setOn(this.id)
  } else {
    zwave.setOff(this.id)
  }
}

module.exports = BinarySceneSwitch
