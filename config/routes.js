var remotesController = require('../app/controllers/remotes_controller')
var zwaveController = require('../app/controllers/zwave_controller')

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
  config: remotesController.show
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
