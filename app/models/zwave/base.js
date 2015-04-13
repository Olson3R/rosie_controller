var zwave = require('../../../lib/zwave')

function Base(id, node) {
  this.id = id
  this.node = node
}

Base.find = function(id) {
  id = parseInt(id, 10)
  node = zwave.nodes[id]
  if (node) {
    return getNodeInstance(id, node)
  }
}

var getNodeInstance = function(id, node) {
  var MultilevelSceneSwitch = require('./multilevel_scene_switch')
  var BinarySceneSwitch = require('./binary_scene_switch')

  switch(node.type) {
    case "Binary Scene Switch":
      return new BinarySceneSwitch(id, node)
    case "Multilevel Scene Switch":
      return new MultilevelSceneSwitch(id, node)
    default:
      return new Base(id, node)
  }
}

module.exports = Base
