var RemoteModel = require('./remote_model')
var routes = require('./routes')

var Remotes = function(server, options) {
  RemoteModel.configure(options)
  routes(server)
}

module.exports = Remotes
