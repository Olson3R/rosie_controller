var zwave = require('../../../lib/zwave')
var Base = require('./base')
var util = require('util')
var _ = require('underscore')

var MultilevelSceneSwitch = function() {
  Base.apply(this, arguments)
}

util.inherits(MultilevelSceneSwitch, Base)

MultilevelSceneSwitch.prototype.update = function(payload) {
  _.each(payload, function(key, value) {
    switch(key) {
      case "level":
        this.setLevel(value)
        break
    }
  })
}

MultilevelSceneSwitch.prototype.setLevel = function(level) {
  if (level < 0 || level > 99) return

  zwave.setLevel(this.id, level)
}

module.exports = MultilevelSceneSwitch
