var Path = require('path')
var Hapi = require('hapi')
var config = require('./config/config')
var zwave = require('./lib/zwave')

// server
var server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 4001,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  },
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  }
})

// routes
server.route(require('./config/routes').routes)

// register plugins and start server
server.register(require('./config/plugins').plugins, function(err) {
  if (err) {
    throw err
  }

  // start server
  server.start(function() {
    zwave.connect()
    console.info('Server started at ' + server.info.uri)
  })
})

process.on('SIGINT', function() {
  console.log('zwave: disconnecting...')
  zwave.disconnect()
  process.exit()
})
