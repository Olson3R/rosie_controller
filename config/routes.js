var queueController = require('../app/queue/queue_controller')
var remotesController = require('../app/remotes/remotes_controller')
var zwaveController = require('../app/zwave/zwave_controller')

module.exports.routes = []

// Queue
module.exports.routes.push({
  method: 'GET',
  path: '/queue',
  config: queueController.index
})

module.exports.routes.push({
  method: 'POST',
  path: '/queue',
  config: queueController.create
})

module.exports.routes.push({
  method: 'PUT',
  path: '/queue/{id}',
  config: queueController.update
})

module.exports.routes.push({
  method: 'DELETE',
  path: '/queue/{id}',
  config: queueController.delete
})

// Remotes
module.exports.routes.push({
  method: 'GET',
  path: '/remotes',
  config: remotesController.index
})

module.exports.routes.push({
  method: 'PUT',
  path: '/remotes/{id}',
  config: remotesController.sendCommand
})

// Z-Wave
module.exports.routes.push({
  method: 'GET',
  path: '/zwave',
  config: zwaveController.index
})

module.exports.routes.push({
  method: 'PUT',
  path: '/zwave/{id}',
  config: zwaveController.update
})
