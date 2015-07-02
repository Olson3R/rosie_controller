var remotesController = require('../app/remotes/remotes_controller')
var zwaveController = require('../app/zwave/zwave_controller')

module.exports.routes = []

// Remotes
module.exports.routes.push({
  method: 'GET',
  path: '/remotes',
  config: remotesController.index
})

module.exports.routes.push({
  method: 'GET',
  path: '/remotes/{remote}',
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
