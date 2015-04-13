var zwave = require('../../../lib/zwave')
var MultilevelSceneSwitch = require('./multilevel_scene_switch')
var BinarySceneSwitch = require('./binary_scene_switch')
//var _ = require('underscore')

//var Base = function() {
function Base(id, node) {
  this.id = id
  this.node = node
 //this.extend = function(child) {
    //return _.extend({}, this, child)
  //}
}

Base.prototype.test = function() {
  console.log("woo")
}

//Base.extend = function(child) {
  //return _.extend({}, this, child)
//}

//var Base = {
  //extend: function(child) {
    //return _.extend({}, this, child)
  //},
  //find: function(id) {
    //id = parseInt(id, 10)
    //node = zwave.nodes[id]
    //if (node) {
      //return getNodeInstance(id, node)
    //}
  //}
//}

var getNodeInstance = function(id, node) {
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
