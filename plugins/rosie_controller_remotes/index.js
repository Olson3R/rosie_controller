var Remotes = require('./lib/remotes')

var register = function(server, options, next) {
  remotes = new Remotes(server, options)
  server.expose('remotes', remotes)
  server.expose('RemoteModel', require('./lib/remote_model'))

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
